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
  ChevronRight
} from 'lucide-react';

export default function PunctuationClinic() {
  const { isDark } = useTheme();
  const [searchParams] = useSearchParams();
  const initialPaperFilter = searchParams.get('paper') === 'fiction' ? 'Paper 2 (Fiction)' : 'All';

  const [paperFilter, setPaperFilter] = useState(initialPaperFilter);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fixedTokenIds, setFixedTokenIds] = useState([]);
  const [shakeTokenId, setShakeTokenId] = useState(null);
  const [lastFeedback, setLastFeedback] = useState(null);
  const [showClues, setShowClues] = useState(false);
  const [revealAll, setRevealAll] = useState(false);
  const [notebookModal, setNotebookModal] = useState({ open: false, title: '', task: '' });

  const filteredItems =
    paperFilter === 'All'
      ? PUNCTUATION_SURGERY_ITEMS
      : PUNCTUATION_SURGERY_ITEMS.filter((item) => item.paper === paperFilter);

  const currentItem = filteredItems[currentIndex] || filteredItems[0];

  useEffect(() => {
    setFixedTokenIds([]);
    setShakeTokenId(null);
    setLastFeedback(null);
    setShowClues(false);
    setRevealAll(false);
  }, [currentIndex, paperFilter]);

  const totalFixableTokens = currentItem ? currentItem.tokens.filter((t) => t.needsFix).length : 0;
  const isAllFixed = fixedTokenIds.length === totalFixableTokens || revealAll;

  const handleTokenTap = (token) => {
    if (token.needsFix) {
      if (!fixedTokenIds.includes(token.id)) {
        setFixedTokenIds([...fixedTokenIds, token.id]);
      }
      setLastFeedback({
        type: 'success',
        title: `✅ Fixed: "${token.raw}" → "${token.fixed}" (${token.fixType})`,
        detail: token.explain
      });
    } else {
      setShakeTokenId(token.id);
      setLastFeedback({
        type: 'info',
        title: `🔎 "${token.raw}" looks fine!`,
        detail: 'Look for sentence starts, names (Dan, Ali), speech marks ("..."), apostrophes, or end marks (. ? !).'
      });
      setTimeout(() => setShakeTokenId(null), 500);
    }
  };

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
            gridTemplateColumns: showClues ? '1.25fr 0.75fr' : '1fr',
            gap: '0.75rem',
            flex: 1,
            minHeight: 0
          }}
        >
          {/* MAIN SURGICAL THEATER */}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
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
                  padding: '0.5rem 0.75rem',
                  marginBottom: '0.65rem'
                }}
              >
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginRight: '0.4rem' }}>
                  Exam Line:
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                  {currentItem.rawSentence}
                </span>
              </div>

              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                👆 TAP THE WORDS BELOW THAT NEED CAPITAL LETTERS, SPEECH MARKS, COMMAS, OR END MARKS:
              </div>

              {/* Smartboard Interactive Word Tiles */}
              <div
                style={{
                  backgroundColor: isAllFixed
                    ? isDark
                      ? '#0C2314'
                      : '#ECFDF5'
                    : 'var(--surface-alt)',
                  border: '2.5px solid var(--border-ink)',
                  borderRadius: '16px',
                  padding: '1.1rem',
                  boxShadow: '4px 4px 0px var(--shadow-ink)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.65rem',
                  alignItems: 'center',
                  marginBottom: '0.65rem'
                }}
              >
                {currentItem.tokens.map((token) => {
                  const isFixed = fixedTokenIds.includes(token.id) || (revealAll && token.needsFix);
                  const isShaking = shakeTokenId === token.id;

                  return (
                    <button
                      key={token.id}
                      onClick={() => handleTokenTap(token)}
                      style={{
                        backgroundColor: isFixed
                          ? isDark
                            ? '#163B23'
                            : '#C7E0CD'
                          : isShaking
                          ? isDark
                            ? '#450A0A'
                            : '#FEE2E2'
                          : 'var(--surface)',
                        border: '2.5px solid var(--border-ink)',
                        boxShadow: isFixed
                          ? isDark
                            ? '3px 3px 0px #22C55E'
                            : '3px 3px 0px #15803D'
                          : '3px 3px 0px var(--shadow-ink)',
                        borderRadius: '12px',
                        padding: '0.55rem 0.95rem',
                        fontSize: '1.3rem',
                        fontWeight: 900,
                        color: isFixed
                          ? isDark
                            ? '#86EFAC'
                            : '#14532D'
                          : 'var(--text-primary)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        transform: isShaking ? 'translateX(-4px)' : isFixed ? 'translateY(-2px)' : 'none'
                      }}
                    >
                      {isFixed ? token.fixed : token.raw}
                      {isFixed && (
                        <span
                          style={{
                            display: 'block',
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            color: isDark ? '#4ADE80' : '#14532D',
                            marginTop: '0.1rem'
                          }}
                        >
                          ✨ {token.fixType}
                        </span>
                      )}
                    </button>
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
                        : isDark
                        ? '#221133'
                        : '#F1DFFE',
                    border: '2px solid var(--border-ink)',
                    borderRadius: '10px',
                    padding: '0.65rem 0.85rem',
                    boxShadow: '2px 2px 0px var(--shadow-ink)',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  <div style={{ fontWeight: 900 }}>{lastFeedback.title}</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{lastFeedback.detail}</div>
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
                }}
                className="retro-btn-outline"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem' }}
              >
                <RotateCcw size={14} /> Reset
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
                <Lightbulb size={14} /> {showClues ? 'Hide Checklist' : `💡 Show ${currentItem.targetCount} Marks Checklist`}
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

          {/* OPTIONAL SIDE CLUE / CHECKLIST PANEL */}
          {showClues && (
            <div
              className="retro-window study-scrollable"
              style={{
                backgroundColor: 'var(--surface-alt)',
                border: '2.5px solid var(--border-ink)',
                borderRadius: '20px',
                boxShadow: '4px 4px 0px var(--shadow-ink)',
                padding: '0.9rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                minHeight: 0,
                overflowY: 'auto'
              }}
            >
              <div style={{ fontWeight: 900, color: isDark ? '#FBBF24' : '#B45309', fontSize: '0.92rem' }}>
                🔍 Hunt for these {currentItem.targetCount} things:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {currentItem.clueList.map((clue, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: 'var(--surface)',
                      border: '1.5px solid var(--border-ink)',
                      borderRadius: '8px',
                      padding: '0.5rem 0.7rem',
                      fontWeight: 700,
                      fontSize: '0.86rem',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {clue}
                  </div>
                ))}
              </div>

              <div
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1.5px solid var(--border-ink)',
                  borderRadius: '10px',
                  padding: '0.75rem',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  marginTop: 'auto',
                  color: 'var(--text-secondary)'
                }}
              >
                <strong style={{ color: 'var(--text-primary)' }}>📌 Reminder:</strong> Speech marks need opening quotes ("), capital letter for speech, and end punctuation (., ?) inside the closing quotes (")!
              </div>
            </div>
          )}
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
