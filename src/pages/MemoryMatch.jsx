import React, { useState, useEffect } from 'react';
import { getCards } from '../data/store';
import { motion, AnimatePresence } from 'framer-motion';

export default function MemoryMatch() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  
  useEffect(() => {
    const dbCards = getCards();
    // We need pairs. Let's create pairs by duplicating the card objects with a unique instance ID.
    // We'll pick 6 random cards to make a 12-card grid.
    const selected = dbCards.sort(() => 0.5 - Math.random()).slice(0, 6);
    const pairs = [...selected, ...selected]
      .sort(() => 0.5 - Math.random())
      .map((c, i) => ({ ...c, instanceId: i }));
      
    setCards(pairs);
  }, []);

  const handleFlip = (instanceId) => {
    if (flipped.length === 2 || flipped.includes(instanceId) || matched.includes(instanceId)) return;
    
    const newFlipped = [...flipped, instanceId];
    setFlipped(newFlipped);
    
    if (newFlipped.length === 2) {
      const card1 = cards.find(c => c.instanceId === newFlipped[0]);
      const card2 = cards.find(c => c.instanceId === newFlipped[1]);
      
      if (card1.id === card2.id) {
        setTimeout(() => {
          setMatched([...matched, newFlipped[0], newFlipped[1]]);
          setFlipped([]);
        }, 800);
      } else {
        setTimeout(() => setFlipped([]), 1200);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className="text-gradient" style={{ marginBottom: '1rem' }}>Memory Match</h1>
      <p style={{ marginBottom: '3rem' }}>Flip the cards to find matching pairs!</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', maxWidth: '900px', margin: '0 auto' }}>
        {cards.map(card => {
          const isFlipped = flipped.includes(card.instanceId) || matched.includes(card.instanceId);
          return (
            <motion.div
              key={card.instanceId}
              onClick={() => handleFlip(card.instanceId)}
              style={{
                height: '150px',
                perspective: '1000px',
                cursor: 'pointer'
              }}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Back of Card (Hidden) */}
                <div className="glass-panel" style={{
                  position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem'
                }}>
                  ❓
                </div>
                {/* Front of Card (Revealed) */}
                <div className="glass-panel" style={{
                  position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)', background: matched.includes(card.instanceId) ? 'linear-gradient(135deg, #10b981, #34d399)' : 'rgba(255,255,255,0.1)',
                  padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', fontWeight: 'bold'
                }}>
                  {card.text}
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
      
      {matched.length === cards.length && cards.length > 0 && (
        <h2 style={{ marginTop: '3rem', color: '#10b981' }}>🎉 All matched! Great job!</h2>
      )}
    </div>
  );
}
