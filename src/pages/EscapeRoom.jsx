import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, RotateCcw } from 'lucide-react';
import ScribblePad from '../components/ScribblePad';

const ROOMS = [
  { question: "I have keys but no locks. What am I?", answer: "piano" },
  { question: "I have a tail, a head, but no body. What am I?", answer: "coin" },
  { question: "What is a 'Bone-house' in Kenning poetry?", answer: "body" },
  { question: "What has to be broken before you can use it?", answer: "egg" }
];

export default function EscapeRoom() {
  const [currentRoom, setCurrentRoom] = useState(0);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const checkAnswer = (val) => {
    const clean = (val || '').toLowerCase().trim().replace(/^a\s+|^an\s+/i, '');
    const target = ROOMS[currentRoom].answer.toLowerCase();
    if (clean === target || clean.includes(target)) {
      setInput('');
      setCurrentRoom((r) => r + 1);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkAnswer(input);
  };

  if (currentRoom >= ROOMS.length) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <div
          className="retro-window"
          style={{
            maxWidth: '520px',
            margin: '0 auto',
            padding: '2.5rem',
            backgroundColor: 'var(--surface)'
          }}
        >
          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '0.75rem' }}>🔓 You Escaped!</h1>
          <p style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            You solved all {ROOMS.length} mystery rooms!
          </p>
          <button
            onClick={() => {
              setCurrentRoom(0);
              setInput('');
            }}
            className="retro-btn-primary"
          >
            <RotateCcw size={16} /> Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1rem' }}>
      <motion.div
        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
        className="retro-window"
        style={{
          padding: '2rem',
          maxWidth: '640px',
          width: '100%',
          textAlign: 'center',
          backgroundColor: 'var(--surface)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <span className="retro-pill-dark">🔐 ESCAPE ROOM</span>
          <span style={{ fontWeight: 900, fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Room {currentRoom + 1} of {ROOMS.length}
          </span>
        </div>

        <div
          style={{
            backgroundColor: 'var(--card-yellow)',
            border: '2px solid var(--border-ink)',
            boxShadow: '3px 3px 0px var(--shadow-ink)',
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem'
          }}
        >
          <Key size={32} color="#1E1E24" />
        </div>

        <h2 style={{ fontSize: '1.65rem', fontWeight: 900, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          &ldquo;{ROOMS[currentRoom].question}&rdquo;
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Type or scribble your answer..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ fontSize: '1.1rem', padding: '0.75rem 1rem', marginBottom: 0, flex: 1 }}
            autoFocus
          />
          <ScribblePad
            mode="text"
            buttonLabel="✍️ Scribble"
            placeholder="Handwrite the mystery object..."
            targetHints={[ROOMS[currentRoom].answer]}
            onApply={({ text }) => {
              setInput(text);
              checkAnswer(text);
            }}
          />
          <button type="submit" className="retro-btn-primary" style={{ padding: '0.75rem 1.4rem' }}>
            Unlock
          </button>
        </form>
      </motion.div>
    </div>
  );
}
