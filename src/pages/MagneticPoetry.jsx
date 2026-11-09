import React, { useState } from 'react';
import { motion } from 'framer-motion';

const POETRY_WORDS = [
  "slithering", "snakes", "seven", "slid", "slowly",
  "Peter", "Piper", "picked", "peppers", "pickled",
  "bone", "house", "wave", "traveler", "sky", "candle",
  "the", "a", "of", "and", "is", "was",
  "big", "brown", "bears", "bake", "bread",
  "crazy", "cats", "catch", "crabs"
];

export default function MagneticPoetry() {
  const [words] = useState(() => 
    POETRY_WORDS.map((text, i) => ({
      id: i,
      text,
      x: Math.random() * (window.innerWidth - 300) + 50,
      y: Math.random() * (window.innerHeight - 400) + 150
    }))
  );

  return (
    <div style={{ position: 'relative', height: '80vh', overflow: 'hidden', padding: '1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem', zIndex: 10, position: 'relative' }}>
        <h1 className="text-gradient">Magnetic Poetry</h1>
        <p>Drag the words around to build your own alliteration, riddles, or kennings!</p>
      </div>

      <div className="glass-panel" style={{ 
        position: 'absolute', top: '100px', left: '20px', right: '20px', bottom: '20px', 
        background: 'rgba(255,255,255,0.02)', border: '2px dashed rgba(255,255,255,0.1)' 
      }}>
        {words.map(word => (
          <motion.div
            key={word.id}
            drag
            dragMomentum={false}
            initial={{ x: word.x, y: word.y }}
            whileHover={{ scale: 1.1, zIndex: 100 }}
            whileDrag={{ scale: 1.2, boxShadow: '0 10px 25px rgba(0,0,0,0.5)', zIndex: 100 }}
            style={{
              position: 'absolute',
              padding: '0.5rem 1rem',
              background: '#f8fafc',
              color: '#0f172a',
              borderRadius: '0.25rem',
              fontWeight: 'bold',
              cursor: 'grab',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            {word.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
