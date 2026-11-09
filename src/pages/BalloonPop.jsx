import React, { useState, useEffect } from 'react';
import { getCards, getDevices } from '../data/store';
import { motion, AnimatePresence } from 'framer-motion';

export default function BalloonPop() {
  const [balloons, setBalloons] = useState([]);
  const [targetDevice, setTargetDevice] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const devices = getDevices();
    const cards = getCards();
    if (devices.length === 0 || cards.length === 0) return;
    
    // Pick a random category as the target
    const target = devices[Math.floor(Math.random() * devices.length)];
    setTargetDevice(target);

    // Spawn balloons continuously
    const interval = setInterval(() => {
      setBalloons(prev => {
        if (prev.length > 10) return prev; // max 10 balloons on screen
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        return [...prev, { ...randomCard, instanceId: Date.now() + Math.random(), left: Math.random() * 80 }];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const popBalloon = (balloon) => {
    setBalloons(prev => prev.filter(b => b.instanceId !== balloon.instanceId));
    if (balloon.deviceId === targetDevice.id) {
      setScore(s => s + 10);
      if (score + 10 >= 50) setGameOver(true);
    } else {
      setScore(s => Math.max(0, s - 5));
    }
  };

  return (
    <div style={{ position: 'relative', height: '80vh', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="text-gradient">Balloon Pop!</h1>
        <h2 style={{ color: targetDevice?.color || 'white' }}>
          Target: Pop the {targetDevice?.name} balloons!
        </h2>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '1rem' }}>Score: {score}</div>
      </div>

      <div style={{ position: 'relative', height: '100%', width: '100%' }}>
        <AnimatePresence>
          {!gameOver && balloons.map(b => (
            <motion.div
              key={b.instanceId}
              initial={{ y: '100vh', opacity: 0 }}
              animate={{ y: '-20vh', opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 25, ease: 'linear' }}
              onPointerDown={() => popBalloon(b)}
              className="glass-panel"
              style={{
                position: 'absolute', left: `${b.left}%`,
                width: '180px', height: '180px',
                borderRadius: '50%', padding: '1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                cursor: 'crosshair', fontSize: '1rem', fontWeight: 'bold', zIndex: 10,
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), rgba(239, 68, 68, 0.4))'
              }}
            >
              {b.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {gameOver && (
        <div className="glass-panel" style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', padding: '3rem', textAlign: 'center', zIndex: 100 }}>
          <h1 className="text-gradient" style={{ fontSize: '3rem' }}>You Won!</h1>
          <button className="btn" onClick={() => window.location.reload()} style={{ marginTop: '2rem' }}>Play Again</button>
        </div>
      )}
    </div>
  );
}
