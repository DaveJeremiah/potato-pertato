import React, { useState, useEffect } from 'react';
import { getDevices, getCards } from '../data/store';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

export default function MatcherGame() {
  const [devices, setDevices] = useState([]);
  const [cards, setCards] = useState([]);
  const [matched, setMatched] = useState([]);
  const [shakeId, setShakeId] = useState(null);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    setDevices(getDevices());
    // Shuffle cards
    setCards(getCards().sort(() => Math.random() - 0.5));
  }, []);

  const handleDragStart = (e, cardId) => {
    e.dataTransfer.setData('cardId', cardId);
  };

  const handleDrop = (e, deviceId) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');
    const card = cards.find(c => c.id === cardId);
    
    if (card && card.deviceId === deviceId) {
      // Match!
      setMatched([...matched, cardId]);
      if (matched.length + 1 === cards.length) {
        setGameWon(true);
      }
    } else {
      // Incorrect
      setShakeId(cardId);
      setTimeout(() => setShakeId(null), 500);
    }
  };

  const remainingCards = cards.filter(c => !matched.includes(c.id));

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="text-gradient">Poetry Devices Matcher</h1>
        <p>Drag the cards into the correct category to cement your knowledge!</p>
        <div className="score-board" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981', marginTop: '1rem' }}>
          Score: {matched.length} / {cards.length}
        </div>
      </div>

      {/* Drop Zones */}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.max(1, Math.min(devices.length, 4))}, 1fr)`, gap: '1.5rem', marginBottom: '4rem' }}>
        {devices.map(device => {
          const IconComponent = Icons[device.icon] || Icons.Hash;
          const zoneCards = cards.filter(c => c.deviceId === device.id && matched.includes(c.id));
          
          return (
            <div 
              key={device.id}
              className="glass-panel"
              style={{ padding: '1.5rem', minHeight: '300px', display: 'flex', flexDirection: 'column', borderTop: `4px solid ${device.color}` }}
              onDragOver={e => e.preventDefault()}
              onDrop={e => handleDrop(e, device.id)}
            >
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <IconComponent size={40} color={device.color} style={{ marginBottom: '0.5rem' }} />
                <h2 style={{ color: device.color }}>{device.name}</h2>
                <p style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>{device.description}</p>
              </div>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <AnimatePresence>
                  {zoneCards.map(c => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="glass-card"
                      style={{ padding: '0.75rem', background: `linear-gradient(135deg, ${device.color}33, transparent)`, border: `1px solid ${device.color}` }}
                    >
                      {c.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )
        })}
      </div>

      {/* Draggable Deck */}
      <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1.5rem', color: '#cbd5e1' }}>Remaining Cards</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', minHeight: '100px' }}>
          <AnimatePresence>
            {remainingCards.map(card => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={shakeId === card.id ? { x: [-10, 10, -10, 10, 0], backgroundColor: '#ef4444' } : { opacity: 1, y: 0, backgroundColor: '#f8fafc' }}
                exit={{ opacity: 0, scale: 0.5 }}
                draggable
                onDragStart={(e) => handleDragStart(e, card.id)}
                style={{
                  padding: '1rem 1.5rem',
                  borderRadius: '1rem',
                  color: '#0f172a',
                  fontWeight: '600',
                  cursor: 'grab',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                  maxWidth: '300px'
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 15px 35px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                {card.text}
              </motion.div>
            ))}
          </AnimatePresence>
          {remainingCards.length === 0 && !gameWon && <p>Loading cards...</p>}
        </div>
      </div>

      {/* Victory Modal */}
      {gameWon && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <motion.div 
            initial={{ scale: 0.5, y: 100 }} animate={{ scale: 1, y: 0 }}
            className="glass-panel" style={{ padding: '4rem', textAlign: 'center', background: 'rgba(255,255,255,0.1)' }}
          >
            <h1 className="text-gradient" style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉 Brilliant! 🎉</h1>
            <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>You've successfully mastered these devices!</p>
            <button className="btn" onClick={() => window.location.reload()}>Play Again</button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
