import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key } from 'lucide-react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isCorrect = input.toLowerCase().trim() === ROOMS[currentRoom].answer.toLowerCase();
    
    if (isCorrect) {
      setInput('');
      setCurrentRoom(r => r + 1);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  if (currentRoom >= ROOMS.length) {
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '4rem' }}>You Escaped!</h1>
        <p style={{ fontSize: '1.5rem' }}>You solved all the riddles!</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
      <h1 className="text-gradient">Riddle Escape Room</h1>
      <p style={{ marginBottom: '3rem' }}>Room {currentRoom + 1} of {ROOMS.length}</p>

      <motion.div 
        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
        className="glass-panel" 
        style={{ padding: '3rem', maxWidth: '600px', width: '100%', textAlign: 'center', background: error ? 'rgba(239, 68, 68, 0.2)' : '' }}
      >
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '50%', display: 'inline-block', marginBottom: '2rem' }}>
          <Key size={48} color="#cbd5e1" />
        </div>
        
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>{ROOMS[currentRoom].question}</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Type your answer here..." 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            style={{ fontSize: '1.25rem', padding: '1rem' }}
            autoFocus
          />
          <button type="submit" className="btn" style={{ padding: '0 2rem' }}>Unlock</button>
        </form>
      </motion.div>
    </div>
  );
}
