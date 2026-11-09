import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PUNCTUATION_SURGERY_ITEMS } from '../data/examRevisionData';
import NotebookBridgeModal from '../components/NotebookBridgeModal';
import { useTheme } from '../context/ThemeContext';
import {
  Wrench,
  CheckCircle2,
  RotateCcw,
  Lightbulb,
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  HelpCircle,
  GripVertical
} from 'lucide-react';

export const PUNCTUATION_TOOLS = [
  {
    id: 'capital',
    symbol: 'Aa',
    name: 'Capital Letter',
    subtitle: 'Starts & Names',
    color: '#F5C0A1', // Retro Orange
    darkColor: '#351A0C',
    accentColor: '#D95D1E',
    icon: '🔠',
    badge: 'Capitalise',
    description: 'Capitalize sentence starters, "I", and proper names'
  },
  {
    id: 'comma',
    symbol: ',',
    name: 'Comma',
    subtitle: 'Pause & Lists',
    color: '#C7E0CD', // Retro Mint Green
    darkColor: '#0E2616',
    accentColor: '#15803D',
    icon: '🌿',
    badge: 'Comma',
    description: 'Fronted adverbials, reporting verbs ("said,"), and lists'
  },
  {
    id: 'fullstop',
    symbol: '.',
    name: 'Full Stop',
    subtitle: 'Statement End',
    color: '#FCA5A5', // Poppy Coral / Red
    darkColor: '#3B1212',
    accentColor: '#DC2626',
    icon: '🛑',
    badge: 'Full Stop',
    description: 'Finishes a complete statement sentence'
  },
  {
    id: 'question',
    symbol: '?',
    name: 'Question Mark',
    subtitle: 'Ask a Question',
    color: '#92C5E3', // Retro Sky Blue
    darkColor: '#0E2138',
    accentColor: '#1E40AF',
    icon: '❓',
    badge: 'Question ?',
    description: 'Ends asking sentences ("Where did...", "Why didn\'t...")'
  },
  {
    id: 'exclamation',
    symbol: '!',
    name: 'Exclamation',
    subtitle: 'Excitement & Drama',
    color: '#FCE3A1', // Retro Gold / Yellow
    darkColor: '#2B1E05',
    accentColor: '#B45309',
    icon: '❗',
    badge: 'Exclamation !',
    description: 'Strong emotions, interjections ("Wow!"), or surprises'
  },
  {
    id: 'speech',
    symbol: '“ ”',
    name: 'Speech Marks',
    subtitle: 'Spoken Words',
    color: '#F1DFFE', // Retro Lavender
    darkColor: '#261338',
    accentColor: '#7C3AED',
    icon: '💬',
    badge: 'Speech Quotes',
    description: 'Encloses the exact words spoken out loud'
  },
  {
    id: 'apostrophe',
    symbol: '’',
    name: 'Apostrophe',
    subtitle: 'Contraction & Belonging',
    color: '#F9BDD5', // Retro Pink
    darkColor: '#330F20',
    accentColor: '#BE185D',
    icon: '🪄',
    badge: 'Apostrophe',
    description: 'Shortened words (didn\'t) or possession (Dan\'s, sister\'s)'
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
  const tool = PUNCTUATION_TOOLS.find((t) => t.id === toolId);
  const toolName = tool ? tool.name : 'tool';

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
      hint = 'Does this word start a sentence or is it a person/place name? Try the 🔠 Capital Letter card!';
    } else if (fixType.includes('comma')) {
      hint = 'Does this word need a pause, fronted adverbial, or list separator? Try the 🌿 Comma card!';
    } else if (fixType.includes('question')) {
      hint = 'Does this sentence ask a question? Try the ❓ Question Mark card!';
    } else if (fixType.includes('exclamation')) {
      hint = 'Does this sentence express strong excitement or command? Try the ❗ Exclamation card!';
    } else if (fixType.includes('speech')) {
      hint = 'Are these words spoken out loud by someone? Try the 💬 Speech Marks card!';
    } else if (fixType.includes('apostrophe')) {
      hint = 'Does this word have missing letters (contraction) or show who owns something? Try the 🪄 Apostrophe card!';
    } else if (fixType.includes('full stop')) {
      hint = 'Does this finish a normal statement sentence? Try the 🛑 Full Stop card!';
    }

    return {
      isMatch: false,
      reason: 'wrong_tool',
      message: `Almost! "${raw}" needs fixing, but NOT with a ${toolName}.`,
      detail: hint
    };
  }
}

export default function PunctuationClinic() {
  const { isDark } = useTheme();
  const [searchParams] = useSearchParams();
  const initialPaperFilter = searchParams.get('paper') === 'fiction' ? 'Paper 2 (Fiction)' : 'All';

  const [paperFilter, setPaperFilter] = useState(initialPaperFilter);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fixedTokenIds, setFixedTokenIds] = useState([]);
  const [shakeTokenId, setShakeTokenId] = useState(null);
  const [lastFeedback, setLastFeedback] = useState(null);
  const [showClues, setShowClues] = useState(true);
  const [revealAll, setRevealAll] = useState(false);
  const [notebookModal, setNotebookModal] = useState({ open: false, title: '', task: '' });

  // Punctuation Toolbox State
  const [activeToolId, setActiveToolId] = useState(null);
  const [draggingToolId, setDraggingToolId] = useState(null);
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
    setActiveToolId(null);
  }, [currentIndex, paperFilter]);

  const totalFixableTokens = currentItem ? currentItem.tokens.filter((t) => t.needsFix).length : 0;
  const isAllFixed = fixedTokenIds.length === totalFixableTokens || revealAll;

  // Execute tool application onto a token
  const applyToolToToken = (toolId, token) => {
    if (!toolId) {
      if (token.needsFix) {
        setLastFeedback({
          type: 'info',
          title: `👇 Choose a tool from the Punctuation Toolbox on the right!`,
          detail: `Drag a card (like Capital Letter, Comma, etc.) or tap a tool to arm it, then tap "${token.raw}".`
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

    const evaluation = evaluateToolMatch(toolId, token);

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

  // Drag and Drop Handlers for Toolbox Cards
  const handleToolDragStart = (e, toolId) => {
    e.dataTransfer.setData('toolId', toolId);
    setDraggingToolId(toolId);
  };

  const handleToolDragEnd = () => {
    setDraggingToolId(null);
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
    const droppedToolId = e.dataTransfer.getData('toolId') || draggingToolId || activeToolId;
    setDragOverTokenId(null);
    if (droppedToolId) {
      applyToolToToken(droppedToolId, token);
    }
  };

  const handleTokenClick = (token) => {
    applyToolToToken(activeToolId, token);
  };

  const activeTool = PUNCTUATION_TOOLS.find((t) => t.id === activeToolId);

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
          backgroundColor: 'var(--surface)',
          border: '2px solid var(--border-ink)',
          borderRadius: '16px',
          boxShadow: '3px 3px 0px var(--shadow-ink)',
          padding: '0.4rem 0.8rem',
          flexShrink: 0
        }}
      >
        {/* Paper Filters */}
        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
          {['All', 'Paper 1 (Non-Fiction)', 'Paper 2 (Fiction)'].map((filterName) => (
            <button
              key={filterName}
              onClick={() => {
                setPaperFilter(filterName);
                setCurrentIndex(0);
              }}
              style={{
                padding: '0.25rem 0.65rem',
                borderRadius: '999px',
                border: '2px solid var(--border-ink)',
                fontWeight: 800,
                fontSize: '0.82rem',
                backgroundColor:
                  paperFilter === filterName
                    ? isDark
                      ? '#423108'
                      : '#FCE3A1'
                    : 'var(--surface)',
                color:
                  paperFilter === filterName
                    ? isDark
                      ? '#FBBF24'
                      : '#1E1E24'
                    : 'var(--text-primary)',
                boxShadow: paperFilter === filterName ? '2px 2px 0px var(--shadow-ink)' : 'none',
                cursor: 'pointer'
              }}
            >
              {filterName === 'Paper 1 (Non-Fiction)' ? '🌍 Paper 1' : filterName === 'Paper 2 (Fiction)' ? '🐉 Paper 2' : 'All (10)'}
            </button>
          ))}
        </div>

        {/* Sentence Pills */}
        <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {filteredItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              style={{
                padding: '0.2rem 0.55rem',
                borderRadius: '7px',
                border: '2px solid var(--border-ink)',
                fontWeight: 900,
                fontSize: '0.82rem',
                backgroundColor: currentIndex === idx ? 'var(--cobalt)' : 'var(--surface)',
                color: currentIndex === idx ? '#FFFFFF' : 'var(--text-primary)',
                boxShadow: currentIndex === idx ? '2px 2px 0px var(--shadow-ink)' : 'none',
                cursor: 'pointer'
              }}
            >
              {item.id.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Stepper */}
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            className="retro-btn-outline"
            style={{ padding: '0.25rem 0.6rem', fontSize: '0.82rem', opacity: currentIndex === 0 ? 0.45 : 1 }}
          >
            <ChevronLeft size={14} /> Prev
          </button>
          <button
            disabled={currentIndex === filteredItems.length - 1}
            onClick={() => setCurrentIndex((i) => Math.min(filteredItems.length - 1, i + 1))}
            className="retro-btn-outline"
            style={{ padding: '0.25rem 0.6rem', fontSize: '0.82rem', opacity: currentIndex === filteredItems.length - 1 ? 0.45 : 1 }}
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {currentItem && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.45fr) 340px',
            gap: '0.75rem',
            flex: 1,
            minHeight: 0
          }}
        >
          {/* =========================================================
              LEFT COLUMN: SURGICAL THEATER (INTERACTIVE SENTENCE BOARD)
             ========================================================= */}
          <div
            className="retro-window"
            style={{
              backgroundColor: 'var(--surface)',
              border: '2.5px solid var(--border-ink)',
              borderRadius: '20px',
              boxShadow: '4px 4px 0px var(--shadow-ink)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 0
            }}
          >
            <div>
              {/* Top metadata strip */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                <span className="retro-pill-dark" style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem' }}>
                  {currentItem.label} • {currentItem.marks}
                </span>

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
                    padding: '0.2rem 0.65rem',
                    borderRadius: '999px',
                    fontWeight: 900,
                    fontSize: '0.82rem'
                  }}
                >
                  🎯 Target: {currentItem.targetCount} marks • Fixed: {revealAll ? totalFixableTokens : fixedTokenIds.length} / {totalFixableTokens} spots
                </span>
              </div>

              {/* Raw sentence bar */}
              <div
                style={{
                  backgroundColor: 'var(--surface-alt)',
                  border: '1.5px dashed var(--border-ink)',
                  borderRadius: '10px',
                  padding: '0.45rem 0.75rem',
                  marginBottom: '0.55rem'
                }}
              >
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginRight: '0.4rem' }}>
                  Exam Question Sentence:
                </span>
                <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                  {currentItem.rawSentence}
                </span>
              </div>

              {/* Active Tool / Stamp Indicator Banner */}
              <div
                style={{
                  backgroundColor: activeTool ? (isDark ? activeTool.darkColor : activeTool.color) : 'var(--surface-alt)',
                  border: activeTool ? '2px solid var(--border-ink)' : '1px dashed var(--border-ink)',
                  borderRadius: '10px',
                  padding: '0.4rem 0.75rem',
                  marginBottom: '0.55rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {activeTool ? (
                    <>
                      <span style={{ fontSize: '1.1rem' }}>{activeTool.icon}</span>
                      <span>
                        Armed Tool: <strong>{activeTool.name}</strong> [{activeTool.symbol}] — Tap any word tile below to apply!
                      </span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} color="var(--cobalt)" />
                      <span>
                        Drag a card from the <strong>Punctuation Tray</strong> onto a word, OR tap a card to arm your stamp!
                      </span>
                    </>
                  )}
                </div>

                {activeTool && (
                  <button
                    onClick={() => setActiveToolId(null)}
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      backgroundColor: 'var(--surface)',
                      border: '1.5px solid var(--border-ink)',
                      borderRadius: '6px',
                      padding: '0.15rem 0.45rem',
                      cursor: 'pointer',
                      color: 'var(--text-primary)'
                    }}
                  >
                    Unarm Stamp ✕
                  </button>
                )}
              </div>

              {/* Smartboard Interactive Word Tiles (Drag-and-Drop Targets) */}
              <div
                style={{
                  backgroundColor: isAllFixed
                    ? isDark
                      ? '#0C2314'
                      : '#ECFDF5'
                    : 'var(--surface-alt)',
                  border: '2.5px solid var(--border-ink)',
                  borderRadius: '16px',
                  padding: '1rem',
                  boxShadow: '4px 4px 0px var(--shadow-ink)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.65rem',
                  alignItems: 'center',
                  marginBottom: '0.65rem',
                  minHeight: '120px'
                }}
              >
                {currentItem.tokens.map((token) => {
                  const isFixed = fixedTokenIds.includes(token.id) || (revealAll && token.needsFix);
                  const isShaking = shakeTokenId === token.id;
                  const isDraggedOver = dragOverTokenId === token.id;

                  return (
                    <div
                      key={token.id}
                      onClick={() => handleTokenClick(token)}
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
                          : 'var(--surface)',
                        border: isDraggedOver
                          ? '2.5px dashed var(--cobalt)'
                          : isFixed
                          ? '2.5px solid var(--accent-green)'
                          : '2.5px solid var(--border-ink)',
                        boxShadow: isFixed
                          ? isDark
                            ? '3px 3px 0px #22C55E'
                            : '3px 3px 0px #15803D'
                          : isDraggedOver
                          ? '4px 4px 0px var(--cobalt)'
                          : '3px 3px 0px var(--shadow-ink)',
                        borderRadius: '12px',
                        padding: '0.55rem 0.95rem',
                        fontSize: '1.28rem',
                        fontWeight: 900,
                        color: isFixed
                          ? isDark
                            ? '#86EFAC'
                            : '#14532D'
                          : 'var(--text-primary)',
                        cursor: 'pointer',
                        transition: 'all 0.12s ease',
                        transform: isShaking
                          ? 'translateX(-5px)'
                          : isDraggedOver
                          ? 'scale(1.06)'
                          : isFixed
                          ? 'translateY(-2px)'
                          : 'none',
                        userSelect: 'none'
                      }}
                    >
                      <span>{isFixed ? token.fixed : token.raw}</span>
                      {isFixed && (
                        <span
                          style={{
                            display: 'block',
                            fontSize: '0.64rem',
                            fontWeight: 800,
                            color: isDark ? '#4ADE80' : '#14532D',
                            marginTop: '0.1rem'
                          }}
                        >
                          ✨ {token.fixType}
                        </span>
                      )}
                      {!isFixed && isDraggedOver && (
                        <span
                          style={{
                            display: 'block',
                            fontSize: '0.6rem',
                            fontWeight: 800,
                            color: 'var(--cobalt)',
                            marginTop: '0.1rem'
                          }}
                        >
                          Drop to Apply!
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Live Rule Explanation or Finished Banner */}
              {isAllFixed ? (
                <div
                  style={{
                    backgroundColor: isDark ? '#271C04' : '#FCE3A1',
                    border: '2px solid var(--border-ink)',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    boxShadow: '3px 3px 0px var(--shadow-ink)',
                    marginBottom: '0.5rem',
                    color: isDark ? '#FBBF24' : '#1E1E24'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 900, fontSize: '0.85rem' }}>
                    <CheckCircle2 size={18} color={isDark ? '#4ADE80' : '#15803D'} />
                    SURGERY COMPLETE! PERFECT REWRITE:
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                    {currentItem.correctSentence}
                  </div>
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
                        : isDark
                        ? '#221133'
                        : '#F1DFFE',
                    border: '2px solid var(--border-ink)',
                    borderRadius: '10px',
                    padding: '0.6rem 0.85rem',
                    boxShadow: '2px 2px 0px var(--shadow-ink)',
                    marginBottom: '0.5rem',
                    fontSize: '0.88rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  <div style={{ fontWeight: 900 }}>{lastFeedback.title}</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                    {lastFeedback.detail}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Bottom Actions Row */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={() => {
                  setFixedTokenIds([]);
                  setRevealAll(false);
                  setLastFeedback(null);
                  setActiveToolId(null);
                }}
                className="retro-btn-outline"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem' }}
              >
                <RotateCcw size={14} /> Reset Sentence
              </button>

              <button
                onClick={() => setRevealAll(!revealAll)}
                className="retro-btn-outline"
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.82rem',
                  backgroundColor: isDark ? '#261338' : '#F1DFFE'
                }}
              >
                <Eye size={14} /> {revealAll ? 'Hide Answer' : 'Reveal All Fixes'}
              </button>

              <button
                onClick={() => setShowClues(!showClues)}
                className="retro-btn-outline"
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.82rem',
                  backgroundColor: showClues
                    ? isDark
                      ? '#2B1E05'
                      : '#FCE3A1'
                    : 'var(--surface)'
                }}
              >
                <Lightbulb size={14} /> {showClues ? 'Hide Checklist' : `💡 Show ${currentItem.targetCount} Targets Checklist`}
              </button>

              <button
                onClick={() =>
                  setNotebookModal({
                    open: true,
                    title: `Punctuation Surgery • ${currentItem.label}`,
                    task: `Rewrite this sentence neatly in your notebook with all ${currentItem.targetCount} punctuation marks: "${currentItem.rawSentence}"`
                  })
                }
                className="retro-btn-primary"
                style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem', backgroundColor: 'var(--cobalt)', marginLeft: 'auto' }}
              >
                <Pencil size={14} /> ✏️ Write in Notebook (60s)
              </button>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: TACTILE PUNCTUATION TOOLBOX + CHECKLIST
             ========================================================= */}
          <div
            className="retro-window study-scrollable"
            style={{
              backgroundColor: 'var(--surface-alt)',
              border: '2.5px solid var(--border-ink)',
              borderRadius: '20px',
              boxShadow: '4px 4px 0px var(--shadow-ink)',
              padding: '0.85rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              minHeight: 0,
              overflowY: 'auto'
            }}
          >
            {/* Toolbox Header */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="retro-pill-dark" style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem' }}>
                  🧰 PUNCTUATION TRAY
                </span>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
                  Drag or Tap to Stamp
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                Pick a punctuation card below and drop it onto the word that needs it!
              </p>
            </div>

            {/* Draggable Punctuation Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {PUNCTUATION_TOOLS.map((tool) => {
                const isSelected = activeToolId === tool.id;
                const toolBg = isDark ? tool.darkColor : tool.color;

                return (
                  <div
                    key={tool.id}
                    draggable
                    onDragStart={(e) => handleToolDragStart(e, tool.id)}
                    onDragEnd={handleToolDragEnd}
                    onClick={() => setActiveToolId(isSelected ? null : tool.id)}
                    style={{
                      backgroundColor: toolBg,
                      border: isSelected
                        ? '2.5px solid var(--cobalt)'
                        : '2px solid var(--border-ink)',
                      boxShadow: isSelected
                        ? '3px 3px 0px var(--cobalt)'
                        : '2.5px 2.5px 0px var(--shadow-ink)',
                      borderRadius: '12px',
                      padding: '0.45rem 0.65rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'grab',
                      userSelect: 'none',
                      transition: 'all 0.12s ease',
                      transform: isSelected ? 'scale(1.02)' : 'none'
                    }}
                    title={tool.description}
                  >
                    {/* Left: Tactile Symbol Stamp Pill */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <div
                        style={{
                          backgroundColor: 'var(--surface)',
                          border: '2px solid var(--border-ink)',
                          boxShadow: '1.5px 1.5px 0px var(--shadow-ink)',
                          borderRadius: '8px',
                          width: '38px',
                          height: '38px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.25rem',
                          fontWeight: 900,
                          color: tool.accentColor,
                          flexShrink: 0
                        }}
                      >
                        {tool.symbol}
                      </div>

                      <div>
                        <div style={{ fontSize: '0.86rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                          {tool.name}
                        </div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                          {tool.subtitle}
                        </div>
                      </div>
                    </div>

                    {/* Right: Grip & Stamp Status */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      {isSelected ? (
                        <span
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: 900,
                            backgroundColor: 'var(--cobalt)',
                            color: '#FFFFFF',
                            padding: '0.15rem 0.45rem',
                            borderRadius: '999px'
                          }}
                        >
                          ARMED
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: '0.66rem',
                            fontWeight: 800,
                            color: 'var(--text-secondary)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.2rem'
                          }}
                        >
                          <GripVertical size={13} /> Drag
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Optional Hunt Checklist */}
            {showClues && (
              <div
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1.5px solid var(--border-ink)',
                  borderRadius: '12px',
                  padding: '0.65rem',
                  marginTop: 'auto'
                }}
              >
                <div style={{ fontWeight: 900, color: isDark ? '#FBBF24' : '#B45309', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                  🔍 Hunt for these {currentItem.targetCount} marks:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {currentItem.clueList.map((clue, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: 'var(--surface-alt)',
                        border: '1px solid var(--border-ink)',
                        borderRadius: '6px',
                        padding: '0.3rem 0.5rem',
                        fontWeight: 700,
                        fontSize: '0.78rem',
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
        </div>
      )}

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
