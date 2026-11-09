import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PUNCTUATION_SURGERY_ITEMS } from '../data/examRevisionData';
import NotebookBridgeModal from '../components/NotebookBridgeModal';
import { useTheme } from '../context/ThemeContext';
import {
  CheckCircle2,
  RotateCcw,
  Lightbulb,
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  GripHorizontal
} from 'lucide-react';

export const PUNCTUATION_STAMPS = [
  {
    id: 'capital',
    symbol: 'Aa',
    name: 'Capital',
    color: '#F5C0A1', // Retro Orange
    darkColor: '#351A0C',
    accentColor: '#D95D1E',
    icon: '🔠',
    hint: 'Starts & Names'
  },
  {
    id: 'comma',
    symbol: ',',
    name: 'Comma',
    color: '#C7E0CD', // Retro Mint Green
    darkColor: '#0E2616',
    accentColor: '#15803D',
    icon: '🌿',
    hint: 'Pause & Lists'
  },
  {
    id: 'fullstop',
    symbol: '.',
    name: 'Full Stop',
    color: '#FCA5A5', // Poppy Coral / Red
    darkColor: '#3B1212',
    accentColor: '#DC2626',
    icon: '🛑',
    hint: 'Statement End'
  },
  {
    id: 'question',
    symbol: '?',
    name: 'Question',
    color: '#92C5E3', // Retro Sky Blue
    darkColor: '#0E2138',
    accentColor: '#1E40AF',
    icon: '❓',
    hint: 'Asks Something'
  },
  {
    id: 'exclamation',
    symbol: '!',
    name: 'Exclaim',
    color: '#FCE3A1', // Retro Gold / Yellow
    darkColor: '#2B1E05',
    accentColor: '#B45309',
    icon: '❗',
    hint: 'Excitement!'
  },
  {
    id: 'speech',
    symbol: '“ ”',
    name: 'Speech',
    color: '#F1DFFE', // Retro Lavender
    darkColor: '#261338',
    accentColor: '#7C3AED',
    icon: '💬',
    hint: 'Spoken Words'
  },
  {
    id: 'apostrophe',
    symbol: '’',
    name: 'Apostrophe',
    color: '#F9BDD5', // Retro Pink
    darkColor: '#330F20',
    accentColor: '#BE185D',
    icon: '🪄',
    hint: 'Belonging & Shortening'
  }
];

function evaluateToolMatch(toolId, token) {
  if (!token.needsFix) {
    return {
      isMatch: false,
      reason: 'already_clean',
      message: `🔎 "${token.raw}" is already correct!`,
      detail: 'Look for words that need capital letters, commas, speech marks, or end punctuation.'
    };
  }

  const fixType = (token.fixType || '').toLowerCase();
  const raw = token.raw;
  const fixed = token.fixed;
  const tool = PUNCTUATION_STAMPS.find((t) => t.id === toolId);
  const toolName = tool ? tool.name : 'stamp';

  let isMatch = false;

  switch (toolId) {
    case 'capital':
      isMatch =
        fixType.includes('capital') ||
        fixType.includes('proper noun') ||
        (fixed[0] && fixed[0] !== raw[0] && fixed[0] === fixed[0].toUpperCase());
      break;

    case 'comma':
      isMatch =
        fixType.includes('comma') ||
        fixed.includes(',');
      break;

    case 'fullstop':
      isMatch =
        fixType.includes('full stop') ||
        fixed.includes('.') ||
        fixed.endsWith('.') ||
        fixed.endsWith('."');
      break;

    case 'question':
      isMatch =
        fixType.includes('question') ||
        fixed.includes('?') ||
        fixed.endsWith('?');
      break;

    case 'exclamation':
      isMatch =
        fixType.includes('exclamation') ||
        fixed.includes('!');
      break;

    case 'speech':
      isMatch =
        fixType.includes('speech') ||
        fixType.includes('quote') ||
        fixed.includes('"');
      break;

    case 'apostrophe':
      isMatch =
        fixType.includes('apostrophe') ||
        fixType.includes('contraction') ||
        fixType.includes('possession') ||
        fixed.includes("'");
      break;

    default:
      isMatch = false;
  }

  if (isMatch) {
    return {
      isMatch: true,
      reason: 'success',
      message: `✅ Applied ${toolName}! "${raw}" → "${fixed}" (${token.fixType})`,
      detail: token.explain
    };
  } else {
    let hint = 'Check what this word needs to be grammatically correct.';
    if (fixType.includes('capital')) {
      hint = 'Does this word start the sentence or is it a person/place name? Try the 🔠 Capital stamp!';
    } else if (fixType.includes('comma')) {
      hint = 'Does this word need a pause, fronted adverbial, or list separator? Try the 🌿 Comma stamp!';
    } else if (fixType.includes('question')) {
      hint = 'Does this sentence ask a question? Try the ❓ Question stamp!';
    } else if (fixType.includes('exclamation')) {
      hint = 'Does this sentence show strong emotion or interjection? Try the ❗ Exclaim stamp!';
    } else if (fixType.includes('speech')) {
      hint = 'Are these words spoken out loud? Try the 💬 Speech stamp!';
    } else if (fixType.includes('apostrophe')) {
      hint = 'Does this word show ownership or a contraction? Try the 🪄 Apostrophe stamp!';
    } else if (fixType.includes('full stop')) {
      hint = 'Does this finish a normal statement? Try the 🛑 Full Stop stamp!';
    }

    return {
      isMatch: false,
      reason: 'wrong_tool',
      message: `Almost! "${raw}" needs attention, but NOT with a ${toolName} stamp.`,
      detail: hint
    };
  }
}

export default function PunctuationClinic() {
  const { isDark } = useTheme();
  const [searchParams] = useSearchParams();
  const initialPaper = searchParams.get('paper') === 'fiction' ? 'Paper 2 (Fiction)' : 'All';

  const [paperFilter, setPaperFilter] = useState(initialPaper);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fixedTokenIds, setFixedTokenIds] = useState([]);
  const [shakeTokenId, setShakeTokenId] = useState(null);
  const [lastFeedback, setLastFeedback] = useState(null);
  const [showChecklist, setShowChecklist] = useState(false);
  const [revealAll, setRevealAll] = useState(false);
  const [notebookModal, setNotebookModal] = useState({ open: false, title: '', task: '' });

  // Punctuation Stamp Dock State
  const [armedStampId, setArmedStampId] = useState(null);
  const [draggingStampId, setDraggingStampId] = useState(null);
  const [dragOverTokenId, setDragOverTokenId] = useState(null);

  const filteredItems =
    paperFilter === 'All'
      ? PUNCTUATION_SURGERY_ITEMS
      : PUNCTUATION_SURGERY_ITEMS.filter((item) => item.paper === paperFilter);

  const currentItem = filteredItems[currentIndex] || filteredItems[0];

  useEffect(() => {
    setFixedTokenIds([]);
    setShakeTokenId(null);
    setLastFeedback(null);
    setRevealAll(false);
    setArmedStampId(null);
    setShowChecklist(false);
  }, [currentIndex, paperFilter]);

  const totalFixableTokens = currentItem ? currentItem.tokens.filter((t) => t.needsFix).length : 0;
  const isAllFixed = fixedTokenIds.length === totalFixableTokens || revealAll;

  const applyStampToToken = (stampId, token) => {
    if (!stampId) {
      if (token.needsFix) {
        setLastFeedback({
          type: 'info',
          title: `👇 Pick a stamp from the tray below to fix "${token.raw}"!`,
          detail: 'Drag a stamp onto the word, OR tap any stamp to arm it, then tap the word.'
        });
      } else {
        setShakeTokenId(token.id);
        setLastFeedback({
          type: 'info',
          title: `🔎 "${token.raw}" is already correct!`,
          detail: 'Look for words that need capital letters, commas, speech marks, or end punctuation.'
        });
        setTimeout(() => setShakeTokenId(null), 500);
      }
      return;
    }

    const evaluation = evaluateToolMatch(stampId, token);

    if (evaluation.isMatch) {
      if (!fixedTokenIds.includes(token.id)) {
        setFixedTokenIds((prev) => [...prev, token.id]);
      }
      setLastFeedback({
        type: 'success',
        title: evaluation.message,
        detail: evaluation.detail
      });
    } else {
      setShakeTokenId(token.id);
      setLastFeedback({
        type: evaluation.reason === 'already_clean' ? 'info' : 'wrong',
        title: evaluation.message,
        detail: evaluation.detail
      });
      setTimeout(() => setShakeTokenId(null), 500);
    }
  };

  const handleStampDragStart = (e, stampId) => {
    e.dataTransfer.setData('stampId', stampId);
    setDraggingStampId(stampId);
  };

  const handleStampDragEnd = () => {
    setDraggingStampId(null);
    setDragOverTokenId(null);
  };

  const handleTokenDragOver = (e, tokenId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (dragOverTokenId !== tokenId) {
      setDragOverTokenId(tokenId);
    }
  };

  const handleTokenDragLeave = (e, tokenId) => {
    if (dragOverTokenId === tokenId) {
      setDragOverTokenId(null);
    }
  };

  const handleTokenDrop = (e, token) => {
    e.preventDefault();
    const droppedStampId = e.dataTransfer.getData('stampId') || draggingStampId || armedStampId;
    setDragOverTokenId(null);
    if (droppedStampId) {
      applyStampToToken(droppedStampId, token);
    }
  };

  const activeStamp = PUNCTUATION_STAMPS.find((s) => s.id === armedStampId);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        gap: '0.65rem',
        position: 'relative'
      }}
    >
      {/* =========================================================
          1. SLEEK UNIFIED TOP CONTROLLER (TUCKED NAVIGATION & ACTIONS)
         ========================================================= */}
      <div
        className="retro-window"
        style={{
          backgroundColor: 'var(--surface)',
          padding: '0.45rem 0.85rem',
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          flexShrink: 0
        }}
      >
        {/* Left: Paper Toggle + Sleek Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'inline-flex',
              backgroundColor: 'var(--surface-alt)',
              padding: '2px',
              borderRadius: '999px',
              border: '1.5px solid var(--border-ink)'
            }}
          >
            {[
              { id: 'All', label: 'All' },
              { id: 'Paper 1 (Non-Fiction)', label: '🌍 Paper 1' },
              { id: 'Paper 2 (Fiction)', label: '🐉 Paper 2' }
            ].map((p) => {
              const active = paperFilter === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setPaperFilter(p.id);
                    setCurrentIndex(0);
                  }}
                  style={{
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    backgroundColor: active ? (isDark ? '#423108' : '#FCE3A1') : 'transparent',
                    color: active ? (isDark ? '#FBBF24' : '#1E1E24') : 'var(--text-secondary)'
                  }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Stepper with Question Counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              className="retro-btn-outline"
              style={{ padding: '0.2rem 0.45rem', borderRadius: '8px', opacity: currentIndex === 0 ? 0.35 : 1 }}
              title="Previous Question"
            >
              <ChevronLeft size={16} />
            </button>

            <span
              style={{
                fontSize: '0.86rem',
                fontWeight: 900,
                color: 'var(--text-primary)',
                padding: '0.2rem 0.5rem'
              }}
            >
              {currentItem.label} ({currentIndex + 1}/{filteredItems.length})
            </span>

            <button
              disabled={currentIndex === filteredItems.length - 1}
              onClick={() => setCurrentIndex((i) => Math.min(filteredItems.length - 1, i + 1))}
              className="retro-btn-outline"
              style={{
                padding: '0.2rem 0.45rem',
                borderRadius: '8px',
                opacity: currentIndex === filteredItems.length - 1 ? 0.35 : 1
              }}
              title="Next Question"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Right: Targets Score + Tucked Helpers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          {/* Target Score Pill */}
          <span
            style={{
              backgroundColor: isAllFixed
                ? isDark
                  ? '#0C2314'
                  : '#C7E0CD'
                : isDark
                ? '#271C04'
                : '#FCE3A1',
              color: isAllFixed
                ? isDark
                  ? '#4ADE80'
                  : '#15803D'
                : isDark
                ? '#FBBF24'
                : '#B45309',
              border: '2px solid var(--border-ink)',
              padding: '0.22rem 0.65rem',
              borderRadius: '999px',
              fontWeight: 900,
              fontSize: '0.82rem'
            }}
          >
            🎯 {revealAll ? totalFixableTokens : fixedTokenIds.length} / {totalFixableTokens} Fixed
          </span>

          {/* Tucked Clue Checklist Toggle */}
          <button
            onClick={() => setShowChecklist(!showChecklist)}
            className="retro-btn-outline"
            style={{
              padding: '0.25rem 0.65rem',
              fontSize: '0.8rem',
              backgroundColor: showChecklist ? (isDark ? '#2B1E05' : '#FCE3A1') : 'var(--surface)'
            }}
          >
            <Lightbulb size={13} /> {showChecklist ? 'Hide Clues' : '💡 Checklist'}
          </button>

          {/* Reveal Fixes */}
          <button
            onClick={() => setRevealAll(!revealAll)}
            className="retro-btn-outline"
            style={{
              padding: '0.25rem 0.65rem',
              fontSize: '0.8rem',
              backgroundColor: isDark ? '#261338' : '#F1DFFE'
            }}
          >
            <Eye size={13} /> {revealAll ? 'Hide Answers' : 'Reveal'}
          </button>

          {/* Reset */}
          <button
            onClick={() => {
              setFixedTokenIds([]);
              setRevealAll(false);
              setLastFeedback(null);
              setArmedStampId(null);
            }}
            className="retro-btn-outline"
            style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
            title="Reset Sentence"
          >
            <RotateCcw size={13} />
          </button>

          {/* Notebook Bridge (60s) */}
          <button
            onClick={() =>
              setNotebookModal({
                open: true,
                title: `Punctuation Surgery • ${currentItem.label}`,
                task: `Rewrite this sentence neatly in your exercise book with all punctuation marks: "${currentItem.rawSentence}"`
              })
            }
            className="retro-btn-primary"
            style={{
              padding: '0.25rem 0.75rem',
              fontSize: '0.8rem',
              backgroundColor: 'var(--cobalt)',
              marginLeft: '0.2rem'
            }}
          >
            <Pencil size={13} /> ✏️ Notebook (60s)
          </button>
        </div>
      </div>

      {/* =========================================================
          2. THE MAIN SURGICAL STAGE (CLEAN, WIDE, SPACIOUS HERO)
         ========================================================= */}
      <div
        className="retro-window"
        style={{
          backgroundColor: 'var(--surface)',
          border: '2.5px solid var(--border-ink)',
          borderRadius: '24px',
          boxShadow: '5px 5px 0px var(--shadow-ink)',
          padding: '1.25rem 1.75rem',
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative'
        }}
      >
        {/* Subtle Guidance Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
              ✍️ Drag stamps from the tray below onto the words, or tap a stamp to arm your pointer:
            </span>
          </div>

          {activeStamp && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: isDark ? activeStamp.darkColor : activeStamp.color,
                border: '1.5px solid var(--border-ink)',
                borderRadius: '999px',
                padding: '0.2rem 0.65rem',
                fontSize: '0.75rem',
                fontWeight: 900,
                color: 'var(--text-primary)'
              }}
            >
              <span>{activeStamp.icon} Armed: <strong>{activeStamp.name}</strong></span>
              <button
                onClick={() => setArmedStampId(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  color: 'var(--text-primary)'
                }}
                title="Cancel armed stamp"
              >
                <X size={13} />
              </button>
            </div>
          )}
        </div>

        {/* Spacious Interactive Sentence Canvas */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.85rem',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1rem',
            margin: 'auto 0'
          }}
        >
          {currentItem.tokens.map((token) => {
            const isFixed = fixedTokenIds.includes(token.id) || (revealAll && token.needsFix);
            const isShaking = shakeTokenId === token.id;
            const isDraggedOver = dragOverTokenId === token.id;

            return (
              <div
                key={token.id}
                onClick={() => applyStampToToken(armedStampId, token)}
                onDragOver={(e) => handleTokenDragOver(e, token.id)}
                onDragLeave={(e) => handleTokenDragLeave(e, token.id)}
                onDrop={(e) => handleTokenDrop(e, token)}
                style={{
                  backgroundColor: isFixed
                    ? isDark
                      ? '#163B23'
                      : '#C7E0CD'
                    : isDraggedOver
                    ? isDark
                      ? '#271C04'
                      : '#FCE3A1'
                    : isShaking
                    ? isDark
                      ? '#450A0A'
                      : '#FEE2E2'
                    : 'var(--surface-alt)',
                  border: isDraggedOver
                    ? '3px dashed var(--cobalt)'
                    : isFixed
                    ? '2.5px solid var(--accent-green)'
                    : '2.5px solid var(--border-ink)',
                  boxShadow: isFixed
                    ? isDark
                      ? '3px 3px 0px #22C55E'
                      : '3px 3px 0px #15803D'
                    : isDraggedOver
                    ? '5px 5px 0px var(--cobalt)'
                    : '4px 4px 0px var(--shadow-ink)',
                  borderRadius: '16px',
                  padding: '0.85rem 1.4rem',
                  fontSize: '1.65rem',
                  fontWeight: 900,
                  color: isFixed
                    ? isDark
                      ? '#86EFAC'
                      : '#14532D'
                    : 'var(--text-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease',
                  transform: isShaking
                    ? 'translateX(-6px)'
                    : isDraggedOver
                    ? 'scale(1.08) translateY(-4px)'
                    : isFixed
                    ? 'translateY(-2px)'
                    : 'none',
                  userSelect: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: '70px',
                  textAlign: 'center'
                }}
              >
                <span>{isFixed ? token.fixed : token.raw}</span>
                {isFixed && (
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      color: isDark ? '#4ADE80' : '#14532D',
                      marginTop: '0.2rem',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    ✨ {token.fixType}
                  </span>
                )}
                {!isFixed && isDraggedOver && (
                  <span
                    style={{
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      color: 'var(--cobalt)',
                      marginTop: '0.2rem'
                    }}
                  >
                    Release to Stamp!
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Complete Banner or Contextual Live Toast */}
        {isAllFixed ? (
          <div
            style={{
              backgroundColor: isDark ? '#271C04' : '#FCE3A1',
              border: '2px solid var(--border-ink)',
              borderRadius: '14px',
              padding: '0.75rem 1.25rem',
              boxShadow: '3px 3px 0px var(--shadow-ink)',
              color: isDark ? '#FBBF24' : '#1E1E24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900, fontSize: '0.92rem' }}>
              <CheckCircle2 size={20} color={isDark ? '#4ADE80' : '#15803D'} />
              <span>PERFECT REWRITE:</span>
              <span style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginLeft: '0.4rem' }}>
                &ldquo;{currentItem.correctSentence}&rdquo;
              </span>
            </div>

            {currentIndex < filteredItems.length - 1 && (
              <button
                onClick={() => setCurrentIndex((i) => i + 1)}
                className="retro-btn-primary"
                style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem', backgroundColor: 'var(--cobalt)' }}
              >
                Next Sentence →
              </button>
            )}
          </div>
        ) : lastFeedback ? (
          <div
            style={{
              backgroundColor:
                lastFeedback.type === 'success'
                  ? isDark
                    ? '#0C2314'
                    : '#C7E0CD'
                  : lastFeedback.type === 'wrong'
                  ? isDark
                    ? '#450A0A'
                    : '#FEE2E2'
                  : 'var(--surface-alt)',
              border: '2px solid var(--border-ink)',
              borderRadius: '12px',
              padding: '0.55rem 1rem',
              boxShadow: '2px 2px 0px var(--shadow-ink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem',
              fontSize: '0.88rem',
              color: 'var(--text-primary)'
            }}
          >
            <div>
              <strong style={{ marginRight: '0.4rem' }}>{lastFeedback.title}</strong>
              <span style={{ color: 'var(--text-secondary)' }}>{lastFeedback.detail}</span>
            </div>
            <button
              onClick={() => setLastFeedback(null)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <X size={15} color="var(--text-secondary)" />
            </button>
          </div>
        ) : null}

        {/* Tucked Clue Drawer (Overlays Stage smoothly without resizing canvas) */}
        {showChecklist && (
          <div
            style={{
              position: 'absolute',
              top: '0.75rem',
              right: '0.75rem',
              backgroundColor: 'var(--surface)',
              border: '2px solid var(--border-ink)',
              boxShadow: '6px 6px 0px var(--shadow-ink)',
              borderRadius: '16px',
              padding: '0.85rem 1rem',
              maxWidth: '340px',
              width: '90%',
              zIndex: 20
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ fontWeight: 900, color: isDark ? '#FBBF24' : '#B45309', fontSize: '0.86rem' }}>
                🔍 Targets for this sentence:
              </div>
              <button
                onClick={() => setShowChecklist(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {currentItem.clueList.map((clue, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'var(--surface-alt)',
                    border: '1px solid var(--border-ink)',
                    borderRadius: '8px',
                    padding: '0.4rem 0.6rem',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  {clue}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* =========================================================
          3. TACTILE STAMP DOCK (THE PENCIL CASE RIBBON AT BOTTOM)
         ========================================================= */}
      <div
        className="retro-window"
        style={{
          backgroundColor: 'var(--surface)',
          padding: '0.5rem 0.85rem',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.65rem',
          flexShrink: 0,
          overflowX: 'auto'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
          <span className="retro-pill-dark" style={{ fontSize: '0.68rem', padding: '0.2rem 0.55rem' }}>
            🧰 STAMP TRAY
          </span>
        </div>

        {/* 7 Colorful Horizontal Stamp Buttons */}
        <div style={{ display: 'flex', gap: '0.55rem', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          {PUNCTUATION_STAMPS.map((stamp) => {
            const isArmed = armedStampId === stamp.id;
            const stampBg = isDark ? stamp.darkColor : stamp.color;

            return (
              <div
                key={stamp.id}
                draggable
                onDragStart={(e) => handleStampDragStart(e, stamp.id)}
                onDragEnd={handleStampDragEnd}
                onClick={() => setArmedStampId(isArmed ? null : stamp.id)}
                style={{
                  backgroundColor: stampBg,
                  border: isArmed ? '2.5px solid var(--cobalt)' : '2px solid var(--border-ink)',
                  boxShadow: isArmed
                    ? '3px 3px 0px var(--cobalt)'
                    : '2px 2px 0px var(--shadow-ink)',
                  borderRadius: '12px',
                  padding: '0.35rem 0.75rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  cursor: 'grab',
                  userSelect: 'none',
                  transition: 'all 0.12s ease',
                  transform: isArmed ? 'translateY(-3px)' : 'none',
                  position: 'relative'
                }}
                title={`${stamp.name} (${stamp.hint}) — Drag to word or click to arm`}
              >
                {/* Tactile Symbol Box */}
                <span
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '1.5px solid var(--border-ink)',
                    borderRadius: '6px',
                    width: '26px',
                    height: '26px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: 900,
                    color: stamp.accentColor,
                    flexShrink: 0
                  }}
                >
                  {stamp.symbol}
                </span>

                <span style={{ fontSize: '0.86rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  {stamp.name}
                </span>

                {isArmed && (
                  <span
                    style={{
                      fontSize: '0.6rem',
                      fontWeight: 900,
                      backgroundColor: 'var(--cobalt)',
                      color: '#FFFFFF',
                      padding: '0.1rem 0.35rem',
                      borderRadius: '999px'
                    }}
                  >
                    ARMED
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-secondary)', flexShrink: 0 }}>
          ⠿ Drag up or tap stamp
        </div>
      </div>

      {/* Notebook Modal */}
      <NotebookBridgeModal
        isOpen={notebookModal.open}
        onClose={() => setNotebookModal({ ...notebookModal, open: false })}
        promptTitle={notebookModal.title}
        promptTask={notebookModal.task}
        checklist={[
          'Capital letters for sentence start & names',
          'Speech marks ("...") or commas (,)',
          'Apostrophes for possession or contractions',
          'Correct end mark (. ? or !)'
        ]}
      />
    </div>
  );
}
