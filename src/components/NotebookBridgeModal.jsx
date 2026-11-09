import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Pencil, RotateCcw, Play, Pause, X, Sparkles, CheckCircle2 } from 'lucide-react';

export default function NotebookBridgeModal({ isOpen, onClose, promptTitle, promptTask, checklist = [] }) {
  const { isDark } = useTheme();
  const [secondsLeft, setSecondsLeft] = useState(90);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (secondsLeft <= 0) {
      setRunning(false);
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [running, secondsLeft]);

  if (!isOpen) return null;

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 12, 18, 0.82)',
        backdropFilter: 'blur(5px)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <div
        className="retro-window"
        style={{
          maxWidth: '760px',
          width: '100%',
          backgroundColor: isDark ? '#151824' : '#FAF7F0',
          border: `3px solid ${isDark ? '#2F364C' : '#1E1E24'}`,
          borderRadius: '24px',
          boxShadow: `10px 10px 0px ${isDark ? '#000000' : '#1E1E24'}`,
          overflow: 'hidden'
        }}
      >
        {/* Top Retro Folder Bar */}
        <div
          style={{
            backgroundColor: isDark ? '#2D1F08' : '#FCE3A1',
            borderBottom: `3px solid ${isDark ? '#2F364C' : '#1E1E24'}`,
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              style={{
                backgroundColor: isDark ? '#0D0F17' : '#1E1E24',
                color: isDark ? '#FBBF24' : '#FCE3A1',
                padding: '0.35rem 0.85rem',
                borderRadius: '999px',
                fontWeight: 800,
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                border: isDark ? '1.5px solid #4B3810' : 'none'
              }}
            >
              <Pencil size={15} /> PENCILS UP • NOTEBOOK BRIDGE
            </span>
            <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.98rem' }}>
              Idea Sparked on Screen → Practice on Paper!
            </span>
          </div>

          <button
            onClick={onClose}
            className="retro-btn-outline"
            style={{ padding: '0.35rem 0.65rem', borderRadius: '10px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: isDark ? '#221133' : '#F1DFFE',
              border: `2px solid ${isDark ? '#3C1D58' : '#1E1E24'}`,
              color: isDark ? '#C084FC' : '#1E1E24',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              fontWeight: 800,
              marginBottom: '1rem'
            }}
          >
            <Sparkles size={18} color={isDark ? '#C084FC' : '#6D28D9'} />
            {promptTitle || 'Smartboard-to-Notebook Challenge'}
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.3 }}>
            {promptTask || 'Write your complete P.Q.A. sentence or story paragraph neatly in your exercise book!'}
          </h2>

          {checklist.length > 0 && (
            <div
              style={{
                backgroundColor: isDark ? '#1C2030' : '#FFFFFF',
                border: `2.5px solid ${isDark ? '#2F364C' : '#1E1E24'}`,
                borderRadius: '16px',
                padding: '1.25rem',
                margin: '1.25rem auto',
                maxWidth: '580px',
                textAlign: 'left',
                boxShadow: `4px 4px 0px ${isDark ? '#000000' : '#1E1E24'}`
              }}
            >
              <div style={{ fontWeight: 800, marginBottom: '0.6rem', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                ✅ Self-Check Before You Put Your Pencil Down:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {checklist.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <CheckCircle2 size={18} color="#22C55E" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Big Classroom Countdown Timer */}
          <div
            style={{
              margin: '1.5rem auto',
              padding: '1.25rem 2rem',
              backgroundColor: secondsLeft === 0 ? (isDark ? '#0C2314' : '#C7E0CD') : isDark ? '#1C2030' : '#FFFFFF',
              border: `3px solid ${isDark ? '#2F364C' : '#1E1E24'}`,
              borderRadius: '20px',
              display: 'inline-block',
              boxShadow: `5px 5px 0px ${isDark ? '#000000' : '#1E1E24'}`
            }}
          >
            <div style={{ fontSize: '3.4rem', fontWeight: 900, fontFamily: 'monospace', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
              {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              {secondsLeft === 0 ? '🎉 TIME UP! PENCILS DOWN & SHARE!' : 'CLASSROOM WRITING TIMER'}
            </div>
          </div>

          {/* Timer Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <button
              onClick={() => setRunning(!running)}
              className="retro-btn-primary"
              style={{ backgroundColor: running ? '#EA580C' : '#2329D6' }}
            >
              {running ? <Pause size={18} /> : <Play size={18} />}
              {running ? 'Pause Timer' : 'Start Writing Timer'}
            </button>

            <button
              onClick={() => {
                setRunning(false);
                setSecondsLeft(60);
              }}
              className="retro-btn-outline"
            >
              <RotateCcw size={16} /> 1 Min
            </button>

            <button
              onClick={() => {
                setRunning(false);
                setSecondsLeft(120);
              }}
              className="retro-btn-outline"
            >
              <RotateCcw size={16} /> 2 Mins
            </button>

            <button
              onClick={() => {
                setRunning(false);
                setSecondsLeft(180);
              }}
              className="retro-btn-outline"
            >
              <RotateCcw size={16} /> 3 Mins
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
