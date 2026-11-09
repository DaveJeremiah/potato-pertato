import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { EXAM_PAPERS } from '../data/examRevisionData';
import NotebookBridgeModal from '../components/NotebookBridgeModal';
import ScribblePad from '../components/ScribblePad';
import {
  Sparkles,
  Lightbulb,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Pencil,
  Eye,
  BookOpen,
  Wrench,
  ChevronLeft,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

export default function ExamRevisionStudio() {
  const { isDark } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPaper = searchParams.get('paper') === 'fiction' ? 'fiction' : 'nonfiction';

  const [activePaperId, setActivePaperId] = useState(initialPaper);
  const [activeStation, setActiveStation] = useState('comprehension'); // 'comprehension' | 'vocabGrammar' | 'fullPassage'
  const [compIndex, setCompIndex] = useState(0);
  const [vgIndex, setVgIndex] = useState(0);

  // Comprehension state
  const [spotlightOn, setSpotlightOn] = useState(false);
  const [selectedChunks, setSelectedChunks] = useState([]);
  const [wrongChunkId, setWrongChunkId] = useState(null);
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [shuffledPool, setShuffledPool] = useState([]);

  // Vocab & Grammar state
  const [vgHintOn, setVgHintOn] = useState(false);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);

  // Notebook modal state
  const [notebookModal, setNotebookModal] = useState({ open: false, title: '', task: '', checklist: [] });

  const paper = EXAM_PAPERS[activePaperId];
  const currentComp = paper.comprehension[compIndex] || paper.comprehension[0];
  const currentVg = paper.vocabAndGrammar[vgIndex] || paper.vocabAndGrammar[0];

  useEffect(() => {
    setSpotlightOn(false);
    setSelectedChunks([]);
    setWrongChunkId(null);
    setShowModelAnswer(false);

    if (currentComp) {
      const combined = [
        ...currentComp.pqaChunks.map((c, idx) => ({ ...c, isCorrectOrder: idx, isDistractor: false })),
        ...(currentComp.distractorChunks || []).map((d) => ({ ...d, isDistractor: true }))
      ];
      setShuffledPool(combined.sort(() => Math.random() - 0.5));
    }
  }, [activePaperId, compIndex]);

  useEffect(() => {
    setVgHintOn(false);
    setSelectedOptionIdx(null);
  }, [activePaperId, vgIndex]);

  const handlePaperSwitch = (paperId) => {
    setActivePaperId(paperId);
    setCompIndex(0);
    setVgIndex(0);
    setSearchParams({ paper: paperId });
  };

  const handleChunkTap = (chunk) => {
    const nextRequiredIndex = selectedChunks.length;
    if (!chunk.isDistractor && chunk.isCorrectOrder === nextRequiredIndex) {
      setSelectedChunks([...selectedChunks, chunk]);
      setWrongChunkId(null);
    } else {
      setWrongChunkId(chunk.id);
      setTimeout(() => setWrongChunkId(null), 650);
    }
  };

  // Handle handwritten scribble input during P.Q.A. or Vocab questions
  const handleScribbleRevision = ({ text, candidates = [] }) => {
    const allWords = [text, ...candidates].filter(Boolean).map((s) => s.toLowerCase().trim());
    if (allWords.length === 0) return;

    if (activeStation === 'comprehension' && currentComp) {
      // Check if scribbled word matches the next required chunk or clue phrase
      const nextIdx = selectedChunks.length;
      const nextChunk = shuffledPool.find((c) => !c.isDistractor && c.isCorrectOrder === nextIdx);
      if (nextChunk) {
        const chunkLower = nextChunk.text.toLowerCase();
        const matchesNext = allWords.some((w) => w.length >= 2 && chunkLower.includes(w));
        if (matchesNext) {
          setSelectedChunks((prev) => [...prev, nextChunk]);
          return;
        }
      }
      // Or if scribbled word matches the key answer clue, complete the answer!
      const clueLower = (currentComp.cluePhrase || '').toLowerCase();
      if (allWords.some((w) => w.length >= 3 && clueLower.includes(w))) {
        const ordered = shuffledPool
          .filter((c) => !c.isDistractor)
          .sort((a, b) => a.isCorrectOrder - b.isCorrectOrder);
        setSelectedChunks(ordered);
      }
    } else if (activeStation === 'vocabGrammar' && currentVg) {
      const matchedOptIdx = currentVg.options.findIndex((opt) =>
        allWords.some((w) => w.length >= 2 && opt.text.toLowerCase().includes(w))
      );
      if (matchedOptIdx !== -1) {
        setSelectedOptionIdx(matchedOptIdx);
      }
    }
  };

  const isPqaComplete = currentComp && selectedChunks.length === currentComp.pqaChunks.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, gap: '0.65rem' }}>
      {/* =========================================================
          UNIFIED SMARTBOARD CONTROLLER (TUCKED NAVIGATION)
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
        {/* Left: Paper Toggle + Station Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {/* Paper Toggle */}
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
              { id: 'nonfiction', label: '🌍 Paper 1' },
              { id: 'fiction', label: '🐉 Paper 2' }
            ].map((p) => {
              const active = activePaperId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handlePaperSwitch(p.id)}
                  style={{
                    padding: '0.22rem 0.65rem',
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

          {/* Station Selector Segmented */}
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
              { id: 'comprehension', label: `📖 P.Q.A. (${paper.comprehension.length})` },
              { id: 'vocabGrammar', label: `✨ Vocab (${paper.vocabAndGrammar.length})` },
              { id: 'fullPassage', label: '📜 Reading' }
            ].map((s) => {
              const active = activeStation === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStation(s.id)}
                  style={{
                    padding: '0.22rem 0.65rem',
                    borderRadius: '999px',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    backgroundColor: active ? 'var(--cobalt)' : 'transparent',
                    color: active ? '#FFFFFF' : 'var(--text-secondary)'
                  }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Question Stepper + Quick Notebook Link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          {activeStation === 'comprehension' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <button
                disabled={compIndex === 0}
                onClick={() => setCompIndex((i) => Math.max(0, i - 1))}
                className="retro-btn-outline"
                style={{ padding: '0.2rem 0.45rem', borderRadius: '8px', opacity: compIndex === 0 ? 0.35 : 1 }}
                title="Previous Question"
              >
                <ChevronLeft size={16} />
              </button>

              <div style={{ display: 'flex', gap: '0.2rem' }}>
                {paper.comprehension.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setCompIndex(idx)}
                    style={{
                      padding: '0.2rem 0.45rem',
                      borderRadius: '6px',
                      border: compIndex === idx ? '2px solid var(--border-ink)' : '1px solid var(--border-ink)',
                      fontWeight: 900,
                      fontSize: '0.76rem',
                      backgroundColor: compIndex === idx ? 'var(--cobalt)' : 'var(--surface-alt)',
                      color: compIndex === idx ? '#FFFFFF' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    {q.number}
                  </button>
                ))}
              </div>

              <button
                disabled={compIndex === paper.comprehension.length - 1}
                onClick={() => setCompIndex((i) => Math.min(paper.comprehension.length - 1, i + 1))}
                className="retro-btn-outline"
                style={{
                  padding: '0.2rem 0.45rem',
                  borderRadius: '8px',
                  opacity: compIndex === paper.comprehension.length - 1 ? 0.35 : 1
                }}
                title="Next Question"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {activeStation === 'vocabGrammar' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <button
                disabled={vgIndex === 0}
                onClick={() => setVgIndex((i) => Math.max(0, i - 1))}
                className="retro-btn-outline"
                style={{ padding: '0.2rem 0.45rem', borderRadius: '8px', opacity: vgIndex === 0 ? 0.35 : 1 }}
                title="Previous Vocab Question"
              >
                <ChevronLeft size={16} />
              </button>

              <span style={{ fontSize: '0.82rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                {currentVg.number}
              </span>

              <button
                disabled={vgIndex === paper.vocabAndGrammar.length - 1}
                onClick={() => setVgIndex((i) => Math.min(paper.vocabAndGrammar.length - 1, i + 1))}
                className="retro-btn-outline"
                style={{
                  padding: '0.2rem 0.45rem',
                  borderRadius: '8px',
                  opacity: vgIndex === paper.vocabAndGrammar.length - 1 ? 0.35 : 1
                }}
                title="Next Vocab Question"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          <ScribblePad
            mode="text"
            buttonLabel="✍️ Scribble"
            placeholder="Handwrite the key clue word or answer..."
            onApply={handleScribbleRevision}
          />

          <Link
            to={`/punctuation-clinic?paper=${activePaperId}`}
            style={{
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
              border: '1.5px solid var(--border-ink)',
              fontWeight: 800,
              fontSize: '0.78rem',
              backgroundColor: isDark ? '#2B1E05' : '#FCE3A1',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <Wrench size={13} /> Surgery →
          </Link>
        </div>
      </div>

      {/* =========================================================
          STATION 1: COMPACT SINGLE-VIEW P.Q.A. COMPREHENSION
         ========================================================= */}
      {activeStation === 'comprehension' && currentComp && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '0.5rem' }}>
          {/* MAIN 2-COLUMN SINGLE-VIEWPORT SPLIT */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(320px, 0.95fr) 1.25fr',
              gap: '0.75rem',
              flex: 1,
              minHeight: 0
            }}
          >
            {/* LEFT PANEL: Target Reading Lines + 1-Tap Clue Spotlight */}
            <div
              className="retro-window"
              style={{
                backgroundColor: activePaperId === 'nonfiction' ? 'var(--card-orange)' : 'var(--card-purple)',
                padding: '0.9rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 0
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                  <span className="retro-pill-dark" style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem' }}>
                    📖 TEXT EVIDENCE • {currentComp.number}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>Lines {currentComp.focusLines.join(', ')}</span>
                </div>

                <div
                  className="study-scrollable"
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '2px solid var(--border-ink)',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    boxShadow: '3px 3px 0px var(--shadow-ink)',
                    maxHeight: 'calc(100vh - 280px)',
                    overflowY: 'auto'
                  }}
                >
                  {paper.passageLines
                    .filter((l) => currentComp.focusLines.includes(l.line))
                    .map((lineObj) => (
                      <div
                        key={lineObj.line}
                        style={{
                          padding: '0.45rem 0.6rem',
                          marginBottom: '0.35rem',
                          borderRadius: '8px',
                          backgroundColor: spotlightOn ? (isDark ? '#3D2D0C' : '#FEF3C7') : isDark ? '#151928' : '#F8FAFC',
                          border: spotlightOn ? `2px solid ${isDark ? '#FBBF24' : '#D97706'}` : `1px solid ${isDark ? '#262D40' : '#E2E8F0'}`,
                          fontSize: '1rem',
                          lineHeight: 1.45,
                          fontWeight: 600,
                          color: 'var(--text-primary)'
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-block',
                            backgroundColor: 'var(--border-ink)',
                            color: '#FFFFFF',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            padding: '0.1rem 0.45rem',
                            borderRadius: '5px',
                            marginRight: '0.5rem'
                          }}
                        >
                          L{lineObj.line}
                        </span>
                        {lineObj.text}
                      </div>
                    ))}
                </div>
              </div>

              {/* Spotlight Clue Area */}
              <div style={{ marginTop: '0.5rem' }}>
                <button
                  onClick={() => setSpotlightOn(!spotlightOn)}
                  className="retro-btn-primary"
                  style={{
                    backgroundColor: spotlightOn ? '#D97706' : 'var(--border-ink)',
                    width: '100%',
                    justifyContent: 'center',
                    padding: '0.45rem 0.8rem',
                    fontSize: '0.85rem'
                  }}
                >
                  <Lightbulb size={15} />
                  {spotlightOn ? 'Hide Clue Spotlight' : '🔦 Shine Clue Spotlight on Text!'}
                </button>

                {spotlightOn && (
                  <div
                    style={{
                      marginTop: '0.4rem',
                      backgroundColor: isDark ? '#2C2005' : '#FFFBEB',
                      border: '2px solid var(--border-ink)',
                      borderRadius: '10px',
                      padding: '0.6rem 0.8rem',
                      boxShadow: '2px 2px 0px var(--shadow-ink)',
                      fontSize: '0.85rem',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <div style={{ fontWeight: 800, color: isDark ? '#FBBF24' : '#B45309', marginBottom: '0.2rem' }}>
                      💡 Evidence: &ldquo;{currentComp.cluePhrase}&rdquo;
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{currentComp.supportTip}</div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT PANEL: Question + Assembled Track + Chunk Bank */}
            <div
              className="retro-window"
              style={{
                backgroundColor: 'var(--surface)',
                padding: '0.9rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 0
              }}
            >
              <div>
                {/* Question Line */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span className="retro-pill-dark" style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem' }}>
                    {currentComp.number} • {currentComp.marks}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: isDark ? '#4ADE80' : '#15803D' }}>
                    P.Q.A. STEM RULE
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: '1.22rem',
                    fontWeight: 900,
                    color: 'var(--text-primary)',
                    lineHeight: 1.25,
                    marginBottom: '0.65rem'
                  }}
                >
                  {currentComp.question}
                </h2>

                {/* Assembled Sentence Track */}
                <div
                  style={{
                    minHeight: '68px',
                    backgroundColor: isPqaComplete ? (isDark ? '#0C2314' : '#ECFDF5') : (isDark ? '#121520' : '#FAF7F0'),
                    border: isPqaComplete ? '2.5px solid #16A34A' : '2px dashed var(--border-ink)',
                    borderRadius: '12px',
                    padding: '0.55rem 0.75rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.45rem',
                    alignItems: 'center',
                    marginBottom: '0.65rem'
                  }}
                >
                  {selectedChunks.length === 0 && (
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.92rem' }}>
                      👆 Tap the Sentence Stem first to build your answer...
                    </span>
                  )}

                  {selectedChunks.map((chunk, i) => (
                    <div
                      key={chunk.id}
                      style={{
                        backgroundColor: i === 0 ? 'var(--card-blue)' : i === 1 ? 'var(--card-yellow)' : 'var(--card-green)',
                        border: '2px solid var(--border-ink)',
                        boxShadow: '2px 2px 0px var(--shadow-ink)',
                        padding: '0.35rem 0.65rem',
                        borderRadius: '9px',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        color: 'var(--text-primary)'
                      }}
                    >
                      <span style={{ fontSize: '0.6rem', display: 'block', textTransform: 'uppercase', opacity: 0.75 }}>
                        {chunk.role}
                      </span>
                      {chunk.text}
                    </div>
                  ))}
                </div>

                {/* Chunk Bank */}
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    📦 SMARTBOARD CHUNK BANK:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {shuffledPool.map((chunk) => {
                      const alreadyUsed = selectedChunks.some((c) => c.id === chunk.id);
                      const isWrong = wrongChunkId === chunk.id;
                      if (alreadyUsed) return null;

                      return (
                        <button
                          key={chunk.id}
                          onClick={() => handleChunkTap(chunk)}
                          style={{
                            backgroundColor: isWrong ? (isDark ? '#3E1010' : '#FEE2E2') : 'var(--surface-alt)',
                            borderColor: isWrong ? '#EF4444' : 'var(--border-ink)',
                            border: '2px solid',
                            boxShadow: '3px 3px 0px var(--shadow-ink)',
                            borderRadius: '10px',
                            fontSize: '0.95rem',
                            fontWeight: 800,
                            padding: '0.45rem 0.8rem',
                            color: 'var(--text-primary)',
                            cursor: 'pointer'
                          }}
                        >
                          {chunk.text}
                          {isWrong && (
                            <span style={{ color: '#EF4444', fontWeight: 900, marginLeft: '0.3rem', fontSize: '0.75rem' }}>
                              {chunk.isDistractor ? '❌ Fragment!' : '⏳ Order'}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Model Answer Banner */}
                {(isPqaComplete || showModelAnswer) && (
                  <div
                    style={{
                      marginTop: '0.55rem',
                      backgroundColor: isDark ? '#0C2314' : '#C7E0CD',
                      border: '2px solid var(--border-ink)',
                      borderRadius: '10px',
                      padding: '0.6rem 0.8rem',
                      boxShadow: '2px 2px 0px var(--shadow-ink)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 900, fontSize: '0.85rem', color: isDark ? '#4ADE80' : '#15803D' }}>
                      <CheckCircle2 size={16} color={isDark ? '#4ADE80' : '#15803D'} />
                      FULL P.Q.A. ANSWER:
                    </div>
                    <p style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                      {currentComp.modelAnswer}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Actions Row */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '0.5rem' }}>
                <button
                  onClick={() => setSelectedChunks([])}
                  className="retro-btn-outline"
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem' }}
                >
                  <RotateCcw size={14} /> Reset
                </button>

                <button
                  onClick={() => setShowModelAnswer(!showModelAnswer)}
                  className="retro-btn-outline"
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem', backgroundColor: 'var(--card-purple)' }}
                >
                  <Eye size={14} /> {showModelAnswer ? 'Hide' : 'Reveal Model Answer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          STATION 2: COMPACT VOCABULARY & GRAMMAR
         ========================================================= */}
      {activeStation === 'vocabGrammar' && currentVg && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '0.5rem' }}>
          {/* Question Selector Pills */}
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', flexShrink: 0 }}>
            {paper.vocabAndGrammar.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setVgIndex(idx)}
                style={{
                  padding: '0.25rem 0.65rem',
                  borderRadius: '8px',
                  border: '2px solid var(--border-ink)',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  backgroundColor: vgIndex === idx ? 'var(--cobalt)' : 'var(--surface)',
                  color: vgIndex === idx ? '#FFFFFF' : 'var(--text-primary)',
                  boxShadow: vgIndex === idx ? '2px 2px 0px var(--shadow-ink)' : 'none',
                  cursor: 'pointer'
                }}
              >
                {item.number}: {item.category}
              </button>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(320px, 0.95fr) 1.25fr',
              gap: '0.75rem',
              flex: 1,
              minHeight: 0
            }}
          >
            {/* Left Box: Target Sentence */}
            <div
              className="retro-window"
              style={{
                backgroundColor: 'var(--card-yellow)',
                padding: '0.9rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 0
              }}
            >
              <div>
                <span className="retro-pill-dark" style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem' }}>
                  {currentVg.number} • {currentVg.category}
                </span>

                <div
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '2px solid var(--border-ink)',
                    borderRadius: '12px',
                    padding: '0.85rem',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    lineHeight: 1.45,
                    boxShadow: '3px 3px 0px var(--shadow-ink)',
                    margin: '0.65rem 0',
                    color: 'var(--text-primary)',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {currentVg.sentence}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 800 }}>
                  <span>Target Word:</span>
                  <span style={{ backgroundColor: 'var(--border-ink)', color: '#FCE3A1', padding: '0.15rem 0.55rem', borderRadius: '6px' }}>
                    {currentVg.highlightWord}
                  </span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setVgHintOn(!vgHintOn)}
                  className="retro-btn-primary"
                  style={{ width: '100%', justifyContent: 'center', backgroundColor: 'var(--border-ink)', padding: '0.45rem', fontSize: '0.85rem' }}
                >
                  <HelpCircle size={15} /> {vgHintOn ? 'Hide Clue' : '💡 Show Detective Clue'}
                </button>
                {vgHintOn && (
                  <div
                    style={{
                      marginTop: '0.35rem',
                      backgroundColor: 'var(--surface)',
                      border: '2px solid var(--border-ink)',
                      borderRadius: '8px',
                      padding: '0.5rem',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)'
                    }}
                  >
                    💡 {currentVg.hint}
                  </div>
                )}
              </div>
            </div>

            {/* Right Box: Options */}
            <div
              className="retro-window"
              style={{
                backgroundColor: 'var(--surface)',
                padding: '0.9rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 0
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, marginBottom: '0.65rem', color: 'var(--text-primary)' }}>
                  {currentVg.question}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {currentVg.options.map((opt, idx) => {
                    const isPicked = selectedOptionIdx === idx;
                    let bg = 'var(--surface-alt)';
                    let borderCol = 'var(--border-ink)';
                    if (isPicked) {
                      bg = opt.isCorrect ? (isDark ? '#0C2314' : '#C7E0CD') : (isDark ? '#330F0F' : '#FEE2E2');
                      borderCol = opt.isCorrect ? '#22C55E' : '#EF4444';
                    }

                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedOptionIdx(idx)}
                        style={{
                          backgroundColor: bg,
                          border: `2px solid ${borderCol}`,
                          borderRadius: '12px',
                          padding: '0.65rem 0.85rem',
                          boxShadow: '2px 2px 0px var(--shadow-ink)',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{opt.text}</span>
                          {isPicked && (opt.isCorrect ? <CheckCircle2 size={18} color="#22C55E" /> : <XCircle size={18} color="#EF4444" />)}
                        </div>
                        {isPicked && (
                          <div style={{ marginTop: '0.25rem', fontSize: '0.85rem', fontWeight: 700, color: opt.isCorrect ? '#22C55E' : '#EF4444' }}>
                            {opt.feedback}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <button
                  disabled={vgIndex === 0}
                  onClick={() => setVgIndex((i) => Math.max(0, i - 1))}
                  className="retro-btn-outline"
                  style={{ padding: '0.3rem 0.7rem', fontSize: '0.82rem' }}
                >
                  <ChevronLeft size={14} /> Prev
                </button>
                <button
                  disabled={vgIndex === paper.vocabAndGrammar.length - 1}
                  onClick={() => setVgIndex((i) => Math.min(paper.vocabAndGrammar.length - 1, i + 1))}
                  className="retro-btn-primary"
                  style={{ padding: '0.3rem 0.7rem', fontSize: '0.82rem' }}
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          STATION 3: FULL PASSAGE VIEW
         ========================================================= */}
      {activeStation === 'fullPassage' && (
        <div
          className="retro-window study-scrollable"
          style={{
            backgroundColor: 'var(--surface)',
            padding: '1rem',
            flex: 1,
            minHeight: 0,
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>{paper.subtitle}</h3>
            <button onClick={() => setActiveStation('comprehension')} className="retro-btn-primary" style={{ padding: '0.3rem 0.75rem', fontSize: '0.82rem' }}>
              Back to Questions
            </button>
          </div>

          <div style={{ backgroundColor: 'var(--surface-alt)', border: '2px solid var(--border-ink)', borderRadius: '12px', padding: '0.85rem' }}>
            {paper.passageLines.map((l) => (
              <div key={l.line} style={{ padding: '0.25rem 0', borderBottom: '1px dashed var(--border-ink)', fontSize: '0.98rem', display: 'flex', gap: '0.6rem' }}>
                <span style={{ minWidth: '60px', fontWeight: 800, color: '#3B82F6' }}>L{l.line}:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{l.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
