import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  PenTool,
  Eraser,
  Undo2,
  Check,
  Sparkles,
  X,
  GripHorizontal
} from 'lucide-react';

const STAMP_MAP = {
  capital: { id: 'capital', label: '🔠 Capital Letter', symbol: 'Aa', color: '#F5C0A1', darkColor: '#351A0C' },
  comma: { id: 'comma', label: '🌿 Comma', symbol: ',', color: '#C7E0CD', darkColor: '#0E2616' },
  fullstop: { id: 'fullstop', label: '🛑 Full Stop', symbol: '.', color: '#FCA5A5', darkColor: '#3B1212' },
  question: { id: 'question', label: '❓ Question Mark', symbol: '?', color: '#92C5E3', darkColor: '#0E2138' },
  exclamation: { id: 'exclamation', label: '❗ Exclamation', symbol: '!', color: '#FCE3A1', darkColor: '#2B1E05' },
  speech: { id: 'speech', label: '💬 Speech Marks', symbol: '“ ”', color: '#F1DFFE', darkColor: '#261338' },
  apostrophe: { id: 'apostrophe', label: '🪄 Apostrophe', symbol: '’', color: '#F9BDD5', darkColor: '#330F20' }
};

/**
 * Local geometric stroke analyzer for instant punctuation & symbol detection
 * Works 100% offline with 0ms latency.
 */
function analyzeGeometry(strokes, canvasWidth, canvasHeight) {
  if (!strokes || strokes.length === 0) return [];

  const getBounds = (pts) => {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    pts.forEach((p) => {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    });
    const width = Math.max(1, maxX - minX);
    const height = Math.max(1, maxY - minY);
    return {
      minX,
      maxX,
      minY,
      maxY,
      width,
      height,
      centerX: (minX + maxX) / 2,
      centerY: (minY + maxY) / 2
    };
  };

  const allPoints = strokes.flatMap((s) => s.points);
  const totalBounds = getBounds(allPoints);
  const strokeBounds = strokes.map((s) => getBounds(s.points));

  const results = [];

  // 1. Single stroke analysis
  if (strokes.length === 1) {
    const b = strokeBounds[0];
    const pts = strokes[0].points;
    const isTinyDot = b.width < 26 && b.height < 26 && pts.length < 25;

    if (isTinyDot) {
      if (b.centerY > canvasHeight * 0.48) {
        results.push({ text: '.', stampId: 'fullstop', confidence: 0.96 });
        results.push({ text: ',', stampId: 'comma', confidence: 0.7 });
      } else {
        results.push({ text: "'", stampId: 'apostrophe', confidence: 0.94 });
        results.push({ text: '.', stampId: 'fullstop', confidence: 0.65 });
      }
      return results;
    }

    // Short curved stroke (comma vs apostrophe)
    if (b.height < canvasHeight * 0.55 && b.width < b.height * 1.35) {
      if (b.centerY > canvasHeight * 0.45) {
        results.push({ text: ',', stampId: 'comma', confidence: 0.92 });
        results.push({ text: '.', stampId: 'fullstop', confidence: 0.6 });
      } else {
        results.push({ text: "'", stampId: 'apostrophe', confidence: 0.92 });
        results.push({ text: '“ ”', stampId: 'speech', confidence: 0.7 });
      }
      return results;
    }
  }

  // 2. Two strokes analysis (!, ?, "", capital letters)
  if (strokes.length === 2) {
    const [b1, b2] = strokeBounds;
    // Check if one stroke is a bottom dot
    const secondIsDot = b2.width < 28 && b2.height < 28 && b2.centerY > b1.maxY - 12;
    const firstIsDot = b1.width < 28 && b1.height < 28 && b1.centerY > b2.maxY - 12;

    if (secondIsDot || firstIsDot) {
      const main = secondIsDot ? b1 : b2;
      if (main.width < main.height * 0.42) {
        results.push({ text: '!', stampId: 'exclamation', confidence: 0.96 });
        results.push({ text: '?', stampId: 'question', confidence: 0.72 });
      } else {
        results.push({ text: '?', stampId: 'question', confidence: 0.96 });
        results.push({ text: '!', stampId: 'exclamation', confidence: 0.72 });
      }
      return results;
    }

    // Check if both are short upper strokes -> Speech marks ""
    if (b1.height < canvasHeight * 0.5 && b2.height < canvasHeight * 0.5 && totalBounds.maxY < canvasHeight * 0.72) {
      results.push({ text: '“ ”', stampId: 'speech', confidence: 0.95 });
      results.push({ text: "'", stampId: 'apostrophe', confidence: 0.75 });
      return results;
    }
  }

  // 3. 3 to 4 short upper strokes -> Speech marks “ ”
  if (strokes.length >= 2 && strokes.length <= 4) {
    const allShortUpper = strokeBounds.every(
      (b) => b.height < canvasHeight * 0.48 && b.centerY < canvasHeight * 0.65
    );
    if (allShortUpper) {
      results.push({ text: '“ ”', stampId: 'speech', confidence: 0.95 });
      return results;
    }
  }

  // Default fallback for larger multi-stroke shapes -> Capital Letter
  if (totalBounds.height > canvasHeight * 0.35) {
    results.push({ text: 'Aa', stampId: 'capital', confidence: 0.75 });
  }

  return results;
}

/**
 * Maps recognized text strings to a Punctuation Stamp ID if applicable
 */
function inferStampFromText(text) {
  if (!text) return null;
  const trimmed = text.trim();
  if (trimmed === '.' || trimmed === '。') return 'fullstop';
  if (trimmed === ',' || trimmed === '،') return 'comma';
  if (trimmed === '?' || trimmed === '？' || trimmed.endsWith('?')) return 'question';
  if (trimmed === '!' || trimmed === '！' || trimmed.endsWith('!')) return 'exclamation';
  if (trimmed === '"' || trimmed === '“' || trimmed === '”' || trimmed === "''" || trimmed === '""' || trimmed === '“ ”') return 'speech';
  if (trimmed === "'" || trimmed === '’' || trimmed.includes("'")) return 'apostrophe';
  // Single uppercase letter or Title Case word
  if (/^[A-Z][a-zA-Z]*$/.test(trimmed)) return 'capital';
  return null;
}

export default function ScribblePad({
  mode = 'text', // 'punctuation' | 'text'
  onApply,
  targetHints = [],
  placeholder = 'Scribble here with pen or finger...',
  buttonLabel = '✍️ Scribble',
  defaultOpen = false
}) {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [strokes, setStrokes] = useState([]);
  const [currentStroke, setCurrentStroke] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [detectedStampId, setDetectedStampId] = useState(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [position, setPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const canvasRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const debounceTimerRef = useRef(null);
  const dragStartRef = useRef({ startX: 0, startY: 0, initialPosX: 0, initialPosY: 0 });

  // Initialize position when opened if not set yet
  useEffect(() => {
    if (isOpen && !position) {
      const defaultX = Math.max(16, window.innerWidth - 440);
      const defaultY = Math.max(16, window.innerHeight - 340);
      setPosition({ x: defaultX, y: defaultY });
    }
  }, [isOpen, position]);

  const handleDragPointerDown = (e) => {
    if (e.target.closest('button')) return;
    e.preventDefault();
    setIsDragging(true);

    const currentX = position ? position.x : Math.max(16, window.innerWidth - 440);
    const currentY = position ? position.y : Math.max(16, window.innerHeight - 340);

    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialPosX: currentX,
      initialPosY: currentY
    };

    const handlePointerMove = (moveEvt) => {
      const deltaX = moveEvt.clientX - dragStartRef.current.startX;
      const deltaY = moveEvt.clientY - dragStartRef.current.startY;
      const newX = Math.max(8, Math.min(window.innerWidth - 430, dragStartRef.current.initialPosX + deltaX));
      const newY = Math.max(8, Math.min(window.innerHeight - 310, dragStartRef.current.initialPosY + deltaY));
      setPosition({ x: newX, y: newY });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const CANVAS_WIDTH = 380;
  const CANVAS_HEIGHT = 135;

  // Redraw canvas whenever strokes or currentStroke change
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);

    // Draw subtle ruled notebook baseline
    ctx.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(30, 30, 36, 0.14)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(16, CANVAS_HEIGHT * 0.72);
    ctx.lineTo(CANVAS_WIDTH - 16, CANVAS_HEIGHT * 0.72);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw all completed strokes + active stroke
    const allStrokes = currentStroke ? [...strokes, currentStroke] : strokes;
    ctx.strokeStyle = isDark ? '#F8FAFC' : '#1E1E24';
    ctx.lineWidth = 4.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    allStrokes.forEach((stroke) => {
      const pts = stroke.points;
      if (!pts || pts.length === 0) return;

      if (pts.length === 1) {
        ctx.fillStyle = isDark ? '#F8FAFC' : '#1E1E24';
        ctx.beginPath();
        ctx.arc(pts[0].x, pts[0].y, 3.5, 0, Math.PI * 2);
        ctx.fill();
        return;
      }

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        const midX = (pts[i - 1].x + pts[i].x) / 2;
        const midY = (pts[i - 1].y + pts[i].y) / 2;
        ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, midX, midY);
      }
      const last = pts[pts.length - 1];
      ctx.lineTo(last.x, last.y);
      ctx.stroke();
    });

    ctx.restore();
  }, [strokes, currentStroke, isDark]);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_WIDTH * dpr;
    canvas.height = CANVAS_HEIGHT * dpr;
    redrawCanvas();
  }, [isOpen, redrawCanvas]);

  // Run hybrid recognition (Local Geometry + Google Handwriting Ink API)
  const recognizeStrokes = useCallback(
    async (updatedStrokes) => {
      if (!updatedStrokes || updatedStrokes.length === 0) {
        setCandidates([]);
        setSelectedCandidate('');
        setDetectedStampId(null);
        return;
      }

      // 1. Instant local geometry analysis
      const geoResults = analyzeGeometry(updatedStrokes, CANVAS_WIDTH, CANVAS_HEIGHT);
      const localTexts = geoResults.map((g) => g.text);

      if (geoResults.length > 0 && mode === 'punctuation') {
        setDetectedStampId(geoResults[0].stampId);
        setSelectedCandidate(geoResults[0].text);
        setCandidates(localTexts);
      }

      // 2. Online Handwriting Ink Recognition
      setIsRecognizing(true);
      try {
        const inkPayload = updatedStrokes.map((s) => [
          s.points.map((p) => Math.round(p.x)),
          s.points.map((p) => Math.round(p.y)),
          s.points.map((p) => p.t)
        ]);

        const response = await fetch(
          'https://inputtools.google.com/request?ime=handwriting&app=mobilesearch&cs=1&oe=UTF-8',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              app_version: 0.4,
              api_level: '537.36',
              device: '5.0 (Windows NT 10.0; Win64; x64)',
              input_type: 0,
              options: 'enable_pre_space',
              requests: [
                {
                  writing_guide: {
                    writing_area_width: CANVAS_WIDTH,
                    writing_area_height: CANVAS_HEIGHT
                  },
                  pre_context: '',
                  max_num_results: 6,
                  max_completions: 0,
                  language: 'en',
                  ink: inkPayload
                }
              ]
            })
          }
        );

        const data = await response.json();
        if (data && data[0] === 'SUCCESS' && data[1]?.[0]?.[1]) {
          const apiCandidates = data[1][0][1];

          // Combine and prioritize targetHints if any match closely
          const merged = [...new Set([...apiCandidates, ...localTexts])];

          // Boost any candidate that matches a targetHint
          if (targetHints.length > 0) {
            merged.sort((a, b) => {
              const aMatches = targetHints.some(
                (h) => h.toLowerCase() === a.trim().toLowerCase()
              );
              const bMatches = targetHints.some(
                (h) => h.toLowerCase() === b.trim().toLowerCase()
              );
              if (aMatches && !bMatches) return -1;
              if (!aMatches && bMatches) return 1;
              return 0;
            });
          }

          // For single-dot or two-stroke punctuation, keep geometry priority if high confidence
          if (mode === 'punctuation' && geoResults[0]?.confidence >= 0.92) {
            const topGeo = geoResults[0].text;
            const filtered = [topGeo, ...merged.filter((c) => c !== topGeo)].slice(0, 6);
            setCandidates(filtered);
            setSelectedCandidate(topGeo);
            setDetectedStampId(geoResults[0].stampId);
          } else {
            const topChoice = merged[0] || '';
            setCandidates(merged.slice(0, 6));
            setSelectedCandidate(topChoice);
            const inferred = inferStampFromText(topChoice) || geoResults[0]?.stampId || null;
            setDetectedStampId(inferred);
          }
        }
      } catch {
        // Offline fallback: rely on geometric analyzer
        if (geoResults.length > 0) {
          setCandidates(localTexts);
          setSelectedCandidate(geoResults[0].text);
          setDetectedStampId(geoResults[0].stampId);
        }
      } finally {
        setIsRecognizing(false);
      }
    },
    [mode, targetHints]
  );

  const getPointerPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
      t: Date.now() - startTimeRef.current
    };
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    if (strokes.length === 0) {
      startTimeRef.current = Date.now();
    }
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    const pt = getPointerPos(e);
    setCurrentStroke({ points: [pt] });
  };

  const handlePointerMove = (e) => {
    if (!currentStroke) return;
    e.preventDefault();
    const pt = getPointerPos(e);
    setCurrentStroke((prev) => ({
      points: [...prev.points, pt]
    }));
  };

  const handlePointerUp = (e) => {
    if (!currentStroke) return;
    e.preventDefault();
    const updated = [...strokes, currentStroke];
    setStrokes(updated);
    setCurrentStroke(null);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      recognizeStrokes(updated);
    }, 320);
  };

  const handleClear = () => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    setStrokes([]);
    setCurrentStroke(null);
    setCandidates([]);
    setSelectedCandidate('');
    setDetectedStampId(null);
  };

  const handleUndo = () => {
    if (strokes.length === 0) return;
    const updated = strokes.slice(0, -1);
    setStrokes(updated);
    recognizeStrokes(updated);
  };

  const handleSelectCandidate = (cand) => {
    setSelectedCandidate(cand);
    const stamp = inferStampFromText(cand);
    if (stamp) setDetectedStampId(stamp);
  };

  const handleConfirmApply = (overrideText, overrideStampId) => {
    const finalText = overrideText !== undefined ? overrideText : selectedCandidate;
    const finalStamp = overrideStampId !== undefined ? overrideStampId : detectedStampId || inferStampFromText(finalText);
    if (!finalText && !finalStamp) return;

    if (onApply) {
      onApply({
        text: finalText,
        stampId: finalStamp,
        candidates
      });
    }
    handleClear();
  };

  const detectedStamp = detectedStampId ? STAMP_MAP[detectedStampId] : null;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Tucked Trigger Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="retro-btn-outline"
        style={{
          padding: '0.32rem 0.75rem',
          fontSize: '0.8rem',
          borderRadius: '999px',
          backgroundColor: isOpen
            ? isDark
              ? '#261338'
              : '#F1DFFE'
            : 'var(--surface)',
          borderColor: isOpen ? 'var(--cobalt)' : 'var(--border-ink)',
          boxShadow: isOpen ? '2px 2px 0px var(--cobalt)' : '2px 2px 0px var(--shadow-ink)'
        }}
        title="Open Smartboard Handwriting / Scribble Input"
      >
        <PenTool size={13} />
        <span>{buttonLabel}</span>
      </button>

      {/* Popover Scribble Pad Window (Draggable) */}
      {isOpen && (
        <div
          className="retro-window"
          style={{
            position: 'fixed',
            left: position ? `${position.x}px` : undefined,
            top: position ? `${position.y}px` : undefined,
            bottom: position ? undefined : '4.3rem',
            right: position ? undefined : '1.25rem',
            width: '415px',
            maxWidth: 'calc(100vw - 2rem)',
            backgroundColor: 'var(--surface)',
            border: '2.5px solid var(--border-ink)',
            borderRadius: '20px',
            boxShadow: isDragging ? '10px 10px 0px var(--shadow-ink)' : '7px 7px 0px var(--shadow-ink)',
            padding: '0.85rem',
            zIndex: 250,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.55rem',
            transition: isDragging ? 'none' : 'box-shadow 0.15s ease'
          }}
        >
          {/* Header (Draggable Handle) */}
          <div
            onPointerDown={handleDragPointerDown}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              touchAction: 'none',
              paddingBottom: '0.2rem'
            }}
            title="Click and drag to move Scribble Pad anywhere on screen"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <GripHorizontal size={15} style={{ color: 'var(--text-secondary)', opacity: 0.8 }} />
              <span className="retro-pill-dark" style={{ fontSize: '0.68rem', padding: '0.18rem 0.5rem' }}>
                ✍️ SCRIBBLE INPUT
              </span>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                {isRecognizing ? 'Reading ink...' : 'Stylus / Finger'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <button
                type="button"
                onClick={handleUndo}
                disabled={strokes.length === 0}
                className="retro-btn-outline"
                style={{
                  padding: '0.2rem 0.45rem',
                  fontSize: '0.72rem',
                  borderRadius: '7px',
                  opacity: strokes.length === 0 ? 0.4 : 1
                }}
                title="Undo last stroke"
              >
                <Undo2 size={13} />
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={strokes.length === 0}
                className="retro-btn-outline"
                style={{
                  padding: '0.2rem 0.45rem',
                  fontSize: '0.72rem',
                  borderRadius: '7px',
                  opacity: strokes.length === 0 ? 0.4 : 1
                }}
                title="Clear pad"
              >
                <Eraser size={13} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.2rem',
                  color: 'var(--text-secondary)',
                  display: 'flex'
                }}
                title="Close Scribble Pad"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Drawing Canvas */}
          <div
            style={{
              position: 'relative',
              backgroundColor: isDark ? '#121521' : '#FAF7F0',
              border: '2px solid var(--border-ink)',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)'
            }}
          >
            {strokes.length === 0 && !currentStroke && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  opacity: 0.65,
                  padding: '0 1rem',
                  textAlign: 'center'
                }}
              >
                {placeholder}
              </div>
            )}

            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              style={{
                width: '100%',
                height: `${CANVAS_HEIGHT}px`,
                display: 'block',
                touchAction: 'none',
                cursor: 'crosshair'
              }}
            />
          </div>

          {/* Live Interpretation & Candidate Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.45rem',
              flexWrap: 'wrap',
              minHeight: '36px'
            }}
          >
            {candidates.length > 0 || detectedStamp ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexWrap: 'wrap', flex: 1 }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
                    Read as:
                  </span>
                  {candidates.map((cand, idx) => {
                    const active = selectedCandidate === cand;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectCandidate(cand)}
                        style={{
                          padding: '0.18rem 0.5rem',
                          borderRadius: '7px',
                          border: active ? '2px solid var(--cobalt)' : '1.5px solid var(--border-ink)',
                          backgroundColor: active
                            ? isDark
                              ? '#1E293B'
                              : '#FCE3A1'
                            : 'var(--surface-alt)',
                          color: 'var(--text-primary)',
                          fontWeight: 900,
                          fontSize: '0.84rem',
                          cursor: 'pointer'
                        }}
                      >
                        {cand}
                      </button>
                    );
                  })}

                  {mode === 'punctuation' && detectedStamp && (
                    <span
                      style={{
                        backgroundColor: isDark ? detectedStamp.darkColor : detectedStamp.color,
                        border: '1.5px solid var(--border-ink)',
                        borderRadius: '999px',
                        padding: '0.15rem 0.55rem',
                        fontSize: '0.72rem',
                        fontWeight: 900,
                        color: 'var(--text-primary)'
                      }}
                    >
                      {detectedStamp.label}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleConfirmApply()}
                  className="retro-btn-primary"
                  style={{
                    padding: '0.3rem 0.75rem',
                    fontSize: '0.8rem',
                    borderRadius: '10px',
                    backgroundColor: 'var(--accent-green)'
                  }}
                >
                  <Check size={14} /> Apply
                </button>
              </>
            ) : (
              <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Sparkles size={13} color="var(--cobalt)" />
                <span>
                  {mode === 'punctuation'
                    ? 'Tip: Draw ? ! . , “ ” ’ or a capital word to stamp!'
                    : 'Tip: Write any word or phrase and tap Apply!'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

