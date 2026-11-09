import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LEVELS = [
  { words: ["Seven", "slithering", "snakes", "slid", "slowly"], type: "Alliteration" },
  { words: ["I", "have", "keys", "but", "no", "locks"], type: "Riddle" },
  { words: ["Wave", "traveler", "means", "a", "boat"], type: "Kenning" }
];

export default function SentenceTrain() {
  const [level, setLevel] = useState(0);
  const [shuffled, setShuffled] = useState(() => [...LEVELS[0].words].sort(() => 0.5 - Math.random()));
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState(false);
  const [won, setWon] = useState(false);

  const currentLevel = LEVELS[level];

  const handleSelect = (word) => {
    if (selected.includes(word)) return;
    
    const newSelected = [...selected, word];
    
    // Check if it matches the start of the correct sentence
    let isCorrectSoFar = true;
    for (let i = 0; i < newSelected.length; i++) {
      if (newSelected[i] !== currentLevel.words[i]) {
        isCorrectSoFar = false;
        break;
      }
    }

    if (isCorrectSoFar) {
      setSelected(newSelected);
      if (newSelected.length === currentLevel.words.length) {
        setTimeout(() => {
          if (level + 1 < LEVELS.length) {
            setLevel(l => l + 1);
            setShuffled([...LEVELS[level + 1].words].sort(() => 0.5 - Math.random()));
            setSelected([]);
          } else {
            setWon(true);
          }
        }, 1000);
      }
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  const handleUndo = () => {
    setSelected(selected.slice(0, -1));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1 className="text-gradient">Sentence Train</h1>
      <p style={{ marginBottom: '2rem' }}>Click the words in the correct order to build the {currentLevel?.type} train!</p>

      {won ? (
        <div className="glass-panel" style={{ padding: '3rem', display: 'inline-block' }}>
          <h2>🎉 Train Completed! 🎉</h2>
          <button className="btn" style={{ marginTop: '1rem' }} onClick={() => window.location.reload()}>Play Again</button>
        </div>
      ) : (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '2rem', minHeight: '100px', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '2rem' }}>🚂</span>
            {selected.map((word, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  padding: '0.75rem 1.25rem', borderRadius: '0.5rem', fontWeight: 'bold'
                }}
              >
                {word}
              </motion.div>
            ))}
            {selected.length > 0 && (
              <button onClick={handleUndo} style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', marginLeft: 'auto' }}>Undo</button>
            )}
          </div>

          <motion.div animate={error ? { x: [-10, 10, -10, 10, 0] } : {}} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {shuffled.map((word, i) => {
              if (selected.includes(word)) return <div key={i} style={{ width: '100px' }}/>;
              return (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelect(word)}
                  className="glass-card"
                  style={{
                    padding: '1rem 2rem', fontSize: '1.25rem', border: 'none', color: 'white', cursor: 'pointer'
                  }}
                >
                  {word}
                </motion.button>
              )
            })}
          </motion.div>
          
        </div>
      )}
    </div>
  );
}
