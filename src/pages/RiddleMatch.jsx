import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RIDDLES = [
  { id: 'r1', question: "I have keys but no locks. What am I?", answer: "A piano" },
  { id: 'r2', question: "I have a tail, a head, but no body. What am I?", answer: "A coin" },
  { id: 'r3', question: "I am tall when young, and short when old. What am I?", answer: "A pencil" },
  { id: 'r4', question: "What has hands but cannot clap?", answer: "A clock" },
  { id: 'r5', question: "What has legs, but doesn’t walk?", answer: "A table" },
  { id: 'r6', question: "What has to be broken before you can use it?", answer: "An egg" }
];

export default function RiddleMatch() {
  const [questions, setQuestions] = useState(() => [...RIDDLES].sort(() => 0.5 - Math.random()));
  const [answers] = useState(() => [...RIDDLES].sort(() => 0.5 - Math.random()));
  const [matched, setMatched] = useState([]);
  const [shakeId, setShakeId] = useState(null);

  const handleDragStart = (e, questionId) => {
    e.dataTransfer.setData('questionId', questionId);
  };

  const handleDrop = (e, answerObj) => {
    e.preventDefault();
    const questionId = e.dataTransfer.getData('questionId');
    
    if (questionId === answerObj.id) {
      // Match!
      setMatched([...matched, questionId]);
    } else {
      // Incorrect
      setShakeId(questionId);
      setTimeout(() => setShakeId(null), 500);
    }
  };

  const remainingQuestions = questions.filter(q => !matched.includes(q.id));

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="text-gradient">Riddle Matcher</h1>
        <p>Drag the riddle to its correct answer!</p>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981', marginTop: '1rem' }}>
          Score: {matched.length} / {RIDDLES.length}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
        
        {/* Draggable Questions */}
        <div>
          <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Riddles</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <AnimatePresence>
              {remainingQuestions.map(q => (
                <motion.div
                  key={q.id}
                  layout
                  initial={{ opacity: 0, x: -50 }}
                  animate={shakeId === q.id ? { x: [-10, 10, -10, 10, 0], backgroundColor: '#ef4444', color: '#fff' } : { opacity: 1, x: 0, backgroundColor: '#f8fafc', color: '#0f172a' }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, q.id)}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    fontWeight: '600',
                    cursor: 'grab',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {q.question}
                </motion.div>
              ))}
            </AnimatePresence>
            {remainingQuestions.length === 0 && (
              <h3 style={{ textAlign: 'center', color: '#10b981', marginTop: '2rem' }}>🎉 All riddles solved!</h3>
            )}
          </div>
        </div>

        {/* Answer Drop Zones */}
        <div>
          <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Answers</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {answers.map(a => {
              const isMatched = matched.includes(a.id);
              const matchedQuestion = RIDDLES.find(r => r.id === a.id);
              
              return (
                <div
                  key={a.id}
                  className="glass-panel"
                  onDragOver={e => { if(!isMatched) e.preventDefault(); }}
                  onDrop={e => { if(!isMatched) handleDrop(e, a); }}
                  style={{
                    padding: '1.5rem',
                    minHeight: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: isMatched ? '2px solid #10b981' : '2px dashed rgba(255,255,255,0.2)',
                    background: isMatched ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)',
                    transition: 'all 0.3s'
                  }}
                >
                  <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: isMatched ? '#10b981' : '#cbd5e1' }}>
                    {a.answer}
                  </span>
                  
                  {isMatched && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ background: '#f8fafc', color: '#0f172a', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.9rem', maxWidth: '60%' }}>
                      {matchedQuestion.question}
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
