import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, RotateCcw, CheckCircle2, HelpCircle, ArrowRight } from 'lucide-react';

const RIDDLES = [
  { id: 'r1', question: "I have keys but no locks. What am I?", answer: "A piano", color: '#F5C0A1', darkColor: '#351A0C' },
  { id: 'r2', question: "I have a tail, a head, but no body. What am I?", answer: "A coin", color: '#F1DFFE', darkColor: '#261338' },
  { id: 'r3', question: "I am tall when young, and short when old. What am I?", answer: "A pencil", color: '#C7E0CD', darkColor: '#0E2616' },
  { id: 'r4', question: "What has hands but cannot clap?", answer: "A clock", color: '#FCE3A1', darkColor: '#2B1E05' },
  { id: 'r5', question: "What has legs, but doesn’t walk?", answer: "A table", color: '#92C5E3', darkColor: '#0E2138' },
  { id: 'r6', question: "What has to be broken before you can use it?", answer: "An egg", color: '#F9BDD5', darkColor: '#330F20' }
];

export default function RiddleMatch() {
  const { isDark } = useTheme();
  const [questions, setQuestions] = useState(() => [...RIDDLES].sort(() => 0.5 - Math.random()));
  const [answers, setAnswers] = useState(() => [...RIDDLES].sort(() => 0.5 - Math.random()));
  const [matched, setMatched] = useState([]);
  const [selectedRiddleId, setSelectedRiddleId] = useState(null);
  const [shakeId, setShakeId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleReset = () => {
    setQuestions([...RIDDLES].sort(() => 0.5 - Math.random()));
    setAnswers([...RIDDLES].sort(() => 0.5 - Math.random()));
    setMatched([]);
    setSelectedRiddleId(null);
    setShakeId(null);
    setFeedback(null);
  };

  const handleDragStart = (e, questionId) => {
    e.dataTransfer.setData('questionId', questionId);
    setSelectedRiddleId(questionId);
  };

  const handleMatchAttempt = (questionId, targetAnswerObj) => {
    if (questionId === targetAnswerObj.id) {
      // Correct Match!
      const newMatched = [...matched, questionId];
      setMatched(newMatched);
      setSelectedRiddleId(null);
      setFeedback({
        type: 'success',
        text: `🎉 Solved! "${targetAnswerObj.answer}" matches the riddle!`
      });
    } else {
      // Incorrect Match
      setShakeId(questionId);
      setFeedback({
        type: 'error',
        text: `🤔 Not quite! Think carefully about what "${targetAnswerObj.answer}" does.`
      });
      setTimeout(() => setShakeId(null), 500);
    }
  };

  const handleDrop = (e, answerObj) => {
    e.preventDefault();
    const questionId = e.dataTransfer.getData('questionId') || selectedRiddleId;
    if (questionId) {
      handleMatchAttempt(questionId, answerObj);
    }
  };

  const handleRiddleClick = (qId) => {
    if (selectedRiddleId === qId) {
      setSelectedRiddleId(null);
    } else {
      setSelectedRiddleId(qId);
      setFeedback({
        type: 'info',
        text: `👉 Riddle selected! Now tap or drag to its matching answer on the right.`
      });
    }
  };

  const handleAnswerClick = (a) => {
    if (matched.includes(a.id)) return;
    if (selectedRiddleId) {
      handleMatchAttempt(selectedRiddleId, a);
    } else {
      setFeedback({
        type: 'info',
        text: `💡 Tap a riddle on the left first, then tap this answer box to match!`
      });
    }
  };

  const remainingQuestions = questions.filter((q) => !matched.includes(q.id));
  const isAllSolved = matched.length === RIDDLES.length;

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0.5rem 1rem 3rem 1rem', width: '100%' }}>
      {/* Compact Retro Header Strip */}
      <div
        className="retro-window"
        style={{
          backgroundColor: 'var(--surface)',
          padding: '0.85rem 1.25rem',
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="retro-pill-dark" style={{ fontSize: '0.75rem' }}>
              💡 RIDDLE MATCH ARENA
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
              Drag or Tap to Pair Each Clue to its Object
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            Object & Metaphor Detective
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span
            style={{
              backgroundColor: isAllSolved ? 'var(--accent-green)' : 'var(--card-yellow)',
              color: isAllSolved ? '#FFFFFF' : 'var(--text-primary)',
              border: '2px solid var(--border-ink)',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              fontWeight: 900,
              fontSize: '0.92rem',
              boxShadow: '2px 2px 0px var(--shadow-ink)'
            }}
          >
            🎯 Solved: {matched.length} / {RIDDLES.length}
          </span>

          <button
            onClick={handleReset}
            className="retro-btn-outline"
            style={{ padding: '0.35rem 0.85rem', fontSize: '0.84rem' }}
          >
            <RotateCcw size={14} /> Reshuffle
          </button>
        </div>
      </div>

      {/* Interactive Helper Banner */}
      {feedback && (
        <div
          style={{
            backgroundColor:
              feedback.type === 'success'
                ? isDark
                  ? '#0C2314'
                  : '#C7E0CD'
                : feedback.type === 'error'
                ? isDark
                  ? '#450A0A'
                  : '#FEE2E2'
                : 'var(--surface-alt)',
            color: 'var(--text-primary)',
            border: '2px solid var(--border-ink)',
            boxShadow: '3px 3px 0px var(--shadow-ink)',
            borderRadius: '12px',
            padding: '0.55rem 1rem',
            marginBottom: '1rem',
            fontWeight: 800,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 size={18} color="var(--accent-green)" />
          ) : (
            <HelpCircle size={18} color="var(--cobalt)" />
          )}
          {feedback.text}
        </div>
      )}

      {/* 2-Column Split: Riddles & Answers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.25rem',
          alignItems: 'start'
        }}
      >
        {/* Left Column: Riddles */}
        <div
          className="retro-window"
          style={{
            backgroundColor: 'var(--surface)',
            padding: '1rem',
            border: '2.5px solid var(--border-ink)',
            boxShadow: '4px 4px 0px var(--shadow-ink)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--text-primary)' }}>
              📜 Unsolved Riddles ({remainingQuestions.length})
            </h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
              Tap or drag card
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <AnimatePresence>
              {remainingQuestions.map((q) => {
                const isSelected = selectedRiddleId === q.id;
                const isShaking = shakeId === q.id;
                const cardColor = isDark ? q.darkColor : q.color;

                return (
                  <motion.div
                    key={q.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      x: isShaking ? [-8, 8, -6, 6, 0] : 0,
                      scale: isSelected ? 1.02 : 1
                    }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, q.id)}
                    onClick={() => handleRiddleClick(q.id)}
                    style={{
                      backgroundColor: isSelected ? (isDark ? '#423108' : '#FCE3A1') : cardColor,
                      border: isSelected ? '3px solid var(--cobalt)' : '2px solid var(--border-ink)',
                      boxShadow: isSelected
                        ? '4px 4px 0px var(--cobalt)'
                        : '3px 3px 0px var(--shadow-ink)',
                      borderRadius: '14px',
                      padding: '0.85rem 1rem',
                      cursor: 'grab',
                      userSelect: 'none',
                      transition: 'border 0.15s ease, box-shadow 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <span className="retro-pill-dark" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
                        CLUE #{q.id.replace('r', '')}
                      </span>
                      {isSelected && (
                        <span style={{ fontSize: '0.72rem', fontWeight: 900, color: 'var(--cobalt)' }}>
                          👉 ACTIVE (TAP ANSWER TO MATCH)
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                      &ldquo;{q.question}&rdquo;
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {remainingQuestions.length === 0 && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '2rem 1rem',
                  backgroundColor: 'var(--surface-alt)',
                  borderRadius: '14px',
                  border: '2px dashed var(--border-ink)'
                }}
              >
                <Sparkles size={32} color="var(--accent-green)" style={{ margin: '0 auto 0.5rem auto' }} />
                <h4 style={{ fontWeight: 900, fontSize: '1.15rem', color: 'var(--accent-green)' }}>
                  All Riddles Solved!
                </h4>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  Great job detective! Every mystery object was correctly paired.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Answer Drop Targets */}
        <div
          className="retro-window"
          style={{
            backgroundColor: 'var(--surface)',
            padding: '1rem',
            border: '2.5px solid var(--border-ink)',
            boxShadow: '4px 4px 0px var(--shadow-ink)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--text-primary)' }}>
              🎯 Target Objects ({answers.length})
            </h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
              Drop here or tap to match
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {answers.map((a) => {
              const isMatched = matched.includes(a.id);
              const matchedQuestion = RIDDLES.find((r) => r.id === a.id);
              const cardColor = isDark ? a.darkColor : a.color;

              return (
                <div
                  key={a.id}
                  onClick={() => handleAnswerClick(a)}
                  onDragOver={(e) => {
                    if (!isMatched) e.preventDefault();
                  }}
                  onDrop={(e) => {
                    if (!isMatched) handleDrop(e, a);
                  }}
                  style={{
                    backgroundColor: isMatched ? (isDark ? '#0C2314' : '#ECFDF5') : 'var(--surface-alt)',
                    border: isMatched
                      ? '2.5px solid var(--accent-green)'
                      : selectedRiddleId
                      ? '2px dashed var(--cobalt)'
                      : '2px solid var(--border-ink)',
                    boxShadow: isMatched
                      ? '3px 3px 0px var(--accent-green)'
                      : '3px 3px 0px var(--shadow-ink)',
                    borderRadius: '14px',
                    padding: '0.85rem 1rem',
                    cursor: isMatched ? 'default' : 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {isMatched ? (
                        <CheckCircle2 size={18} color="var(--accent-green)" />
                      ) : (
                        <span
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: selectedRiddleId ? 'var(--cobalt)' : 'var(--border-ink)'
                          }}
                        />
                      )}
                      <span
                        style={{
                          fontSize: '1.15rem',
                          fontWeight: 900,
                          color: isMatched ? 'var(--accent-green)' : 'var(--text-primary)'
                        }}
                      >
                        {a.answer}
                      </span>
                    </div>

                    {!isMatched && selectedRiddleId && (
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          backgroundColor: 'var(--cobalt)',
                          color: '#FFFFFF',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px'
                        }}
                      >
                        Tap to Match
                      </span>
                    )}
                  </div>

                  {isMatched && matchedQuestion && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      style={{
                        backgroundColor: cardColor,
                        border: '1.5px solid var(--border-ink)',
                        borderRadius: '8px',
                        padding: '0.45rem 0.75rem',
                        marginTop: '0.45rem',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)'
                      }}
                    >
                      💡 <strong>Riddle:</strong> &ldquo;{matchedQuestion.question}&rdquo;
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
