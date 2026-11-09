import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { EXAM_PAPERS } from '../data/examRevisionData';
import NotebookBridgeModal from '../components/NotebookBridgeModal';
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

  const isPqaComplete = currentComp && selectedChunks.length === currentComp.pqaChunks.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, gap: '0.5rem' }}>
      {/* COMPACT SMARTBOARD CONTROL BAR */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.45rem',
          backgroundColor: '#FFFFFF',
          border: '2px solid #1E1E24',
          borderRadius: '16px',
          boxShadow: '3px 3px 0px #1E1E24',
          padding: '0.4rem 0.8rem',
          flexShrink: 0
        }}
      >
        {/* Paper Toggle */}
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          <button
            onClick={() => handlePaperSwitch('nonfiction')}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '999px',
              border: '2px solid #1E1E24',
              fontWeight: 800,
              fontSize: '0.84rem',
              backgroundColor: activePaperId === 'nonfiction' ? '#F5C0A1' : '#FFFFFF',
              boxShadow: activePaperId === 'nonfiction' ? '2px 2px 0px #1E1E24' : 'none',
              cursor: 'pointer'
            }}
          >
            🌍 Paper 1: Animals
          </button>
          <button
            onClick={() => handlePaperSwitch('fiction')}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '999px',
              border: '2px solid #1E1E24',
              fontWeight: 800,
              fontSize: '0.84rem',
              backgroundColor: activePaperId === 'fiction' ? '#F1DFFE' : '#FFFFFF',
              boxShadow: activePaperId === 'fiction' ? '2px 2px 0px #1E1E24' : 'none',
              cursor: 'pointer'
            }}
          >
            🐉 Paper 2: Dragon
          </button>
        </div>

        {/* Station Navigation */}
        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
          <button
            onClick={() => setActiveStation('comprehension')}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '10px',
              border: '2px solid #1E1E24',
              fontWeight: 800,
              fontSize: '0.84rem',
              backgroundColor: activeStation === 'comprehension' ? '#1E1E24' : '#FFFFFF',
              color: activeStation === 'comprehension' ? '#FFFFFF' : '#1E1E24',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <BookOpen size={14} /> 1. P.Q.A. ({paper.comprehension.length})
          </button>

          <button
            onClick={() => setActiveStation('vocabGrammar')}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '10px',
              border: '2px solid #1E1E24',
              fontWeight: 800,
              fontSize: '0.84rem',
              backgroundColor: activeStation === 'vocabGrammar' ? '#1E1E24' : '#FFFFFF',
              color: activeStation === 'vocabGrammar' ? '#FFFFFF' : '#1E1E24',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <Sparkles size={14} /> 2. Vocab & Grammar ({paper.vocabAndGrammar.length})
          </button>

          <button
            onClick={() => setActiveStation('fullPassage')}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '10px',
              border: '2px solid #1E1E24',
              fontWeight: 800,
              fontSize: '0.84rem',
              backgroundColor: activeStation === 'fullPassage' ? '#1E1E24' : '#FFFFFF',
              color: activeStation === 'fullPassage' ? '#FFFFFF' : '#1E1E24',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <Eye size={14} /> Full Reading
          </button>

          <Link
            to={`/punctuation-clinic?paper=${activePaperId}`}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '10px',
              border: '2px solid #1E1E24',
              fontWeight: 800,
              fontSize: '0.84rem',
              backgroundColor: '#FCE3A1',
              color: '#1E1E24',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <Wrench size={14} /> Punctuation Surgery →
          </Link>
        </div>
      </div>

      {/* =========================================================
          STATION 1: COMPACT SINGLE-VIEW P.Q.A. COMPREHENSION
         ========================================================= */}
      {activeStation === 'comprehension' && currentComp && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '0.5rem' }}>
          {/* Substrip: Question Pills + Stepper */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
              flexShrink: 0
            }}
          >
            <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {paper.comprehension.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCompIndex(idx)}
                  style={{
                    minWidth: '44px',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '8px',
                    border: '2px solid #1E1E24',
                    fontWeight: 900,
                    fontSize: '0.85rem',
                    backgroundColor: compIndex === idx ? '#2329D6' : '#FFFFFF',
                    color: compIndex === idx ? '#FFFFFF' : '#1E1E24',
                    boxShadow: compIndex === idx ? '2px 2px 0px #1E1E24' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  {q.number}
                </button>
              ))}
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#4B5563', marginLeft: '0.3rem' }}>
                ({currentComp.marks})
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <button
                disabled={compIndex === 0}
                onClick={() => setCompIndex((i) => Math.max(0, i - 1))}
                className="retro-btn-outline"
                style={{ padding: '0.25rem 0.6rem', fontSize: '0.82rem', opacity: compIndex === 0 ? 0.45 : 1 }}
              >
                <ChevronLeft size={15} /> Prev
              </button>
              <button
                disabled={compIndex === paper.comprehension.length - 1}
                onClick={() => setCompIndex((i) => Math.min(paper.comprehension.length - 1, i + 1))}
                className="retro-btn-outline"
                style={{
                  padding: '0.25rem 0.6rem',
                  fontSize: '0.82rem',
                  opacity: compIndex === paper.comprehension.length - 1 ? 0.45 : 1
                }}
              >
                Next <ChevronRight size={15} />
              </button>
            </div>
          </div>

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
                backgroundColor: activePaperId === 'nonfiction' ? '#F5C0A1' : '#F1DFFE',
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
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #1E1E24',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    boxShadow: '3px 3px 0px #1E1E24',
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
                          backgroundColor: spotlightOn ? '#FEF3C7' : '#F8FAFC',
                          border: spotlightOn ? '2px solid #D97706' : '1px solid #E2E8F0',
                          fontSize: '1rem',
                          lineHeight: 1.45,
                          fontWeight: 600,
                          color: '#1E1E24'
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-block',
                            backgroundColor: '#1E1E24',
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
                    backgroundColor: spotlightOn ? '#D97706' : '#1E1E24',
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
                      backgroundColor: '#FFFBEB',
                      border: '2px solid #1E1E24',
                      borderRadius: '10px',
                      padding: '0.6rem 0.8rem',
                      boxShadow: '2px 2px 0px #1E1E24',
                      fontSize: '0.85rem'
                    }}
                  >
                    <div style={{ fontWeight: 800, color: '#B45309', marginBottom: '0.2rem' }}>
                      💡 Evidence: &ldquo;{currentComp.cluePhrase}&rdquo;
                    </div>
                    <div style={{ fontWeight: 600, color: '#1E1E24' }}>{currentComp.supportTip}</div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT PANEL: Question + Assembled Track + Chunk Bank */}
            <div
              className="retro-window"
              style={{
                backgroundColor: '#FFFFFF',
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
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#15803D' }}>
                    P.Q.A. STEM RULE
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: '1.22rem',
                    fontWeight: 900,
                    color: '#1E1E24',
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
                    backgroundColor: isPqaComplete ? '#ECFDF5' : '#FAF7F0',
                    border: isPqaComplete ? '2.5px solid #16A34A' : '2px dashed #1E1E24',
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
                    <span style={{ color: '#6B7280', fontWeight: 600, fontSize: '0.92rem' }}>
                      👆 Tap the Sentence Stem first to build your answer...
                    </span>
                  )}

                  {selectedChunks.map((chunk, i) => (
                    <div
                      key={chunk.id}
                      style={{
                        backgroundColor: i === 0 ? '#92C5E3' : i === 1 ? '#FCE3A1' : '#C7E0CD',
                        border: '2px solid #1E1E24',
                        boxShadow: '2px 2px 0px #1E1E24',
                        padding: '0.35rem 0.65rem',
                        borderRadius: '9px',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        color: '#1E1E24'
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
                  <div style={{ fontWeight: 800, fontSize: '0.78rem', color: '#4B5563', marginBottom: '0.35rem' }}>
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
                            backgroundColor: isWrong ? '#FEE2E2' : '#FFFFFF',
                            borderColor: isWrong ? '#DC2626' : '#1E1E24',
                            border: '2px solid',
                            boxShadow: '3px 3px 0px #1E1E24',
                            borderRadius: '10px',
                            fontSize: '0.95rem',
                            fontWeight: 800,
                            padding: '0.45rem 0.8rem',
                            cursor: 'pointer'
                          }}
                        >
                          {chunk.text}
                          {isWrong && (
                            <span style={{ color: '#DC2626', fontWeight: 900, marginLeft: '0.3rem', fontSize: '0.75rem' }}>
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
                      backgroundColor: '#C7E0CD',
                      border: '2px solid #1E1E24',
                      borderRadius: '10px',
                      padding: '0.6rem 0.8rem',
                      boxShadow: '2px 2px 0px #1E1E24'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 900, fontSize: '0.85rem' }}>
                      <CheckCircle2 size={16} color="#15803D" />
                      FULL P.Q.A. ANSWER:
                    </div>
                    <p style={{ fontSize: '1rem', fontWeight: 800, color: '#1E1E24', marginTop: '0.2rem' }}>
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
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem', backgroundColor: '#F1DFFE' }}
                >
                  <Eye size={14} /> {showModelAnswer ? 'Hide' : 'Reveal Model Answer'}
                </button>

                <button
                  onClick={() =>
                    setNotebookModal({
                      open: true,
                      title: `${paper.title} • ${currentComp.number}`,
                      task: `Write your complete P.Q.A. answer in your notebook: "${currentComp.question}"`,
                      checklist: [
                        'Capital letter at start',
                        'Used question words in answer (P.Q.A.)',
                        'Exact text fact included',
                        'Full stop (.) at end'
                      ]
                    })
                  }
                  className="retro-btn-primary"
                  style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem', backgroundColor: '#2329D6', marginLeft: 'auto' }}
                >
                  <Pencil size={14} /> ✏️ Write in Notebook (60s)
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
                  border: '2px solid #1E1E24',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  backgroundColor: vgIndex === idx ? '#2329D6' : '#FFFFFF',
                  color: vgIndex === idx ? '#FFFFFF' : '#1E1E24',
                  boxShadow: vgIndex === idx ? '2px 2px 0px #1E1E24' : 'none',
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
                backgroundColor: '#FCE3A1',
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
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #1E1E24',
                    borderRadius: '12px',
                    padding: '0.85rem',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    lineHeight: 1.45,
                    boxShadow: '3px 3px 0px #1E1E24',
                    margin: '0.65rem 0',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {currentVg.sentence}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 800 }}>
                  <span>Target Word:</span>
                  <span style={{ backgroundColor: '#1E1E24', color: '#FCE3A1', padding: '0.15rem 0.55rem', borderRadius: '6px' }}>
                    {currentVg.highlightWord}
                  </span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setVgHintOn(!vgHintOn)}
                  className="retro-btn-primary"
                  style={{ width: '100%', justifyContent: 'center', backgroundColor: '#1E1E24', padding: '0.45rem', fontSize: '0.85rem' }}
                >
                  <HelpCircle size={15} /> {vgHintOn ? 'Hide Clue' : '💡 Show Detective Clue'}
                </button>
                {vgHintOn && (
                  <div
                    style={{
                      marginTop: '0.35rem',
                      backgroundColor: '#FFFFFF',
                      border: '2px solid #1E1E24',
                      borderRadius: '8px',
                      padding: '0.5rem',
                      fontSize: '0.85rem',
                      fontWeight: 700
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
                backgroundColor: '#FFFFFF',
                padding: '0.9rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 0
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, marginBottom: '0.65rem', color: '#1E1E24' }}>
                  {currentVg.question}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {currentVg.options.map((opt, idx) => {
                    const isPicked = selectedOptionIdx === idx;
                    let bg = '#FAF7F0';
                    let borderCol = '#1E1E24';
                    if (isPicked) {
                      bg = opt.isCorrect ? '#C7E0CD' : '#FEE2E2';
                      borderCol = opt.isCorrect ? '#15803D' : '#DC2626';
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
                          boxShadow: '2px 2px 0px #1E1E24',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '1rem', fontWeight: 800, color: '#1E1E24' }}>{opt.text}</span>
                          {isPicked && (opt.isCorrect ? <CheckCircle2 size={18} color="#15803D" /> : <XCircle size={18} color="#DC2626" />)}
                        </div>
                        {isPicked && (
                          <div style={{ marginTop: '0.25rem', fontSize: '0.85rem', fontWeight: 700, color: opt.isCorrect ? '#14532D' : '#7F1D1D' }}>
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
            backgroundColor: '#FFFFFF',
            padding: '1rem',
            flex: 1,
            minHeight: 0,
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900 }}>{paper.subtitle}</h3>
            <button onClick={() => setActiveStation('comprehension')} className="retro-btn-primary" style={{ padding: '0.3rem 0.75rem', fontSize: '0.82rem' }}>
              Back to Questions
            </button>
          </div>

          <div style={{ backgroundColor: '#FAF7F0', border: '2px solid #1E1E24', borderRadius: '12px', padding: '0.85rem' }}>
            {paper.passageLines.map((l) => (
              <div key={l.line} style={{ padding: '0.25rem 0', borderBottom: '1px dashed #D1D5DB', fontSize: '0.98rem', display: 'flex', gap: '0.6rem' }}>
                <span style={{ minWidth: '60px', fontWeight: 800, color: '#2329D6' }}>L{l.line}:</span>
                <span style={{ fontWeight: 600 }}>{l.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <NotebookBridgeModal
        isOpen={notebookModal.open}
        onClose={() => setNotebookModal({ ...notebookModal, open: false })}
        promptTitle={notebookModal.title}
        promptTask={notebookModal.task}
        checklist={notebookModal.checklist}
      />
    </div>
  );
}
