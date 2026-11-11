import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useVillage } from '../context/VillageContext';
import ScribblePad from '../components/ScribblePad';
import {
  BOOK_ANATOMY,
  STORY_VOCABULARY_QUESTIONS,
  PLOT_MOUNTAIN_STAGES
} from '../data/unit4Week1Data';
import {
  BookOpen,
  Sparkles,
  Trophy,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Volume2,
  ChevronRight,
  ArrowRight,
  Layers,
  Award,
  Zap,
  Bookmark,
  BookMarked
} from 'lucide-react';

export default function StoryDetective() {
  const { isDark } = useTheme();
  const { squads, awardBerries } = useVillage();

  // Active top-level mode
  const [activeTab, setActiveTab] = useState('arcade'); // 'book' | 'arcade' | 'mountain' | 'scale'

  // Interactive Book State
  const [bookSide, setBookSide] = useState('back'); // 'front' | 'spine' | 'back'
  const [activeHotspot, setActiveHotspot] = useState('bc-blurb');

  // Continuous Arcade Engine State
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all' | 'definitions' | 'genres' | 'plot' | 'glossary'
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selectedSquadId, setSelectedSquadId] = useState(squads[0]?.id || 'brainy');
  const [comboAlert, setComboAlert] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  // Story Mountain State
  const [selectedMountainStage, setSelectedMountainStage] = useState(1);

  // Funny Scale State
  const [scaleLevel, setScaleLevel] = useState(2); // 1 = Amusing, 2 = Hilarious, 3 = Hysterical

  // Filtered arcade questions
  const filteredQuestions = STORY_VOCABULARY_QUESTIONS.filter((q) => {
    if (categoryFilter === 'all') return true;
    return q.category === categoryFilter;
  });

  const activeQuestion = filteredQuestions[currentIdx % filteredQuestions.length];

  // Shuffle options whenever the active question changes
  useEffect(() => {
    if (activeQuestion?.options) {
      const arr = [...activeQuestion.options];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      setShuffledOptions(arr);
    }
  }, [activeQuestion]);

  // Synthesize sound
  const playSound = (isCorrect) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      if (isCorrect) {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(311.13, now);
        osc.frequency.setValueAtTime(261.63, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      }
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.38);
    } catch {
      // Audio not supported
    }
  };

  // Handle option selection
  const handleSelectOption = (opt) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = opt === activeQuestion.correct;
    playSound(isCorrect);

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setScore((prev) => prev + 10 * Math.min(newStreak, 4));
      if (newStreak > bestStreak) setBestStreak(newStreak);

      if (newStreak >= 3) {
        setComboAlert(true);
        setTimeout(() => setComboAlert(false), 2000);
      }

      // Automatically award berries if streak milestone hit
      if (newStreak % 3 === 0) {
        awardBerries(selectedSquadId, 1, `Story Detective: ${newStreak}x Streak Combo!`);
      }
    } else {
      setStreak(0);
    }
  };

  // Advance to next question
  const handleNext = () => {
    setIsAnswered(false);
    setSelectedOption(null);
    setCurrentIdx((prev) => (prev + 1) % filteredQuestions.length);
  };

  const handleResetArcade = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
  };

  return (
    <div style={{ padding: '0.85rem 1rem', maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {/* Top Controller Bar */}
      <div
        className="retro-window"
        style={{
          padding: '0.75rem 1.15rem',
          backgroundColor: isDark ? '#141724' : '#FFFFFF',
          border: '2.5px solid var(--border-ink)',
          borderRadius: '18px',
          boxShadow: '4px 4px 0px var(--shadow-ink)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.65rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '1.4rem',
              backgroundColor: 'var(--card-purple)',
              border: '2px solid var(--border-ink)',
              borderRadius: '12px',
              padding: '0.2rem 0.5rem',
              display: 'inline-flex'
            }}
          >
            🕵️
          </span>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                Story Detective: Book Anatomy & Plot Arcade
              </span>
              <span className="retro-pill-dark" style={{ fontSize: '0.66rem' }}>
                UNIT 4 • WEEK 1
              </span>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  backgroundColor: 'var(--card-yellow)',
                  border: '1.5px solid var(--border-ink)',
                  padding: '0.1rem 0.45rem',
                  borderRadius: '999px',
                  color: 'var(--text-primary)'
                }}
              >
                HARRY'S MAD
              </span>
            </div>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
              Master Genre, Plot, Blurbs, Characters & The 5-Stage Story Recipe (LB pp. 95–108)
            </div>
          </div>
        </div>

        {/* Squad Selection & Scribble Tool */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexWrap: 'wrap' }}>
          {/* Active Board Squad Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
              At Board:
            </span>
            <select
              value={selectedSquadId}
              onChange={(e) => setSelectedSquadId(e.target.value)}
              style={{
                backgroundColor: 'var(--surface)',
                border: '2px solid var(--border-ink)',
                borderRadius: '999px',
                padding: '0.3rem 0.6rem',
                fontSize: '0.78rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              {squads.map((sq) => (
                <option key={sq.id} value={sq.id}>
                  {sq.name} ({sq.mascot})
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => awardBerries(selectedSquadId, 1, 'Story Detective Smartboard Solve')}
            className="retro-btn-outline"
            style={{
              padding: '0.32rem 0.65rem',
              fontSize: '0.78rem',
              borderRadius: '999px',
              backgroundColor: 'var(--card-purple)'
            }}
            title="Award 1 Smurfberry to the active squad!"
          >
            🫐 +1 Berry
          </button>

          <ScribblePad
            mode="text"
            buttonLabel="✍️ Scribble"
            placeholder="Write words, genre notes, or spelling here..."
          />
        </div>
      </div>

      {/* Main Mode Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
        {[
          { id: 'arcade', label: '⚡ Continuous Story Arcade', icon: Zap, color: 'var(--card-purple)' },
          { id: 'book', label: '📖 3D Book Anatomy (Blurb Inspector)', icon: BookOpen, color: 'var(--card-orange)' },
          { id: 'mountain', label: '⛰️ 5-Stage Story Mountain', icon: Layers, color: 'var(--card-green)' },
          { id: 'scale', label: '🎭 Funny Scale & Vocabulary', icon: Flame, color: 'var(--card-yellow)' }
        ].map((tab) => {
          const active = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="retro-btn-outline"
              style={{
                flex: 1,
                minWidth: '200px',
                padding: '0.55rem 0.85rem',
                fontSize: '0.84rem',
                borderRadius: '14px',
                backgroundColor: active ? 'var(--cobalt)' : 'var(--surface)',
                color: active ? '#FFFFFF' : 'var(--text-primary)',
                borderColor: 'var(--border-ink)',
                boxShadow: active ? '3px 3px 0px var(--border-ink)' : '2px 2px 0px var(--shadow-ink)',
                justifyContent: 'center'
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================
          TAB 1: CONTINUOUS STORY ARCADE ENGINE
         ========================================================= */}
      {activeTab === 'arcade' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '0.85rem' }}>
          {/* Left: Interactive Arcade Stage */}
          <div
            className="retro-window"
            style={{
              padding: '1.25rem',
              backgroundColor: isDark ? '#16192B' : '#FFFFFF',
              border: '2.5px solid var(--border-ink)',
              borderRadius: '20px',
              boxShadow: '6px 6px 0px var(--shadow-ink)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            {/* Category Filter Pills & Progress */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'all', label: 'All Quests' },
                  { id: 'definitions', label: '📚 Book Anatomy' },
                  { id: 'genres', label: '🔍 Genre Detective' },
                  { id: 'plot', label: '⛰️ Plot Mountain' },
                  { id: 'glossary', label: '🪄 Glossary & Traps' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setCategoryFilter(cat.id);
                      setCurrentIdx(0);
                      setIsAnswered(false);
                      setSelectedOption(null);
                    }}
                    style={{
                      border: '1.5px solid var(--border-ink)',
                      borderRadius: '999px',
                      padding: '0.2rem 0.65rem',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      backgroundColor: categoryFilter === cat.id ? 'var(--cobalt)' : 'var(--surface-alt)',
                      color: categoryFilter === cat.id ? '#FFFFFF' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
                Card {((currentIdx % filteredQuestions.length) + 1)} of {filteredQuestions.length}
              </span>
            </div>

            {/* Question Card Box */}
            <div
              style={{
                backgroundColor: isDark ? '#1F2438' : '#FAF8F5',
                border: '2.5px solid var(--border-ink)',
                borderRadius: '16px',
                padding: '1.25rem',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="retro-pill-dark" style={{ fontSize: '0.68rem', padding: '0.15rem 0.55rem' }}>
                  {activeQuestion.lbRef}
                </span>
                {streak > 0 && (
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 900,
                      color: '#EF4444',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <Flame size={15} /> {streak}x Streak!
                  </span>
                )}
              </div>

              <h2
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  color: 'var(--text-primary)',
                  lineHeight: 1.4,
                  margin: 0
                }}
              >
                {activeQuestion.question}
              </h2>
            </div>

            {/* Options Grid (Large Smartboard Touch Targets) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.65rem' }}>
              {shuffledOptions.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt === activeQuestion.correct;

                let btnBg = 'var(--surface)';
                let btnBorder = 'var(--border-ink)';
                let btnColor = 'var(--text-primary)';

                if (isAnswered) {
                  if (isCorrect) {
                    btnBg = isDark ? '#064E3B' : '#D1FAE5';
                    btnBorder = '#10B981';
                    btnColor = isDark ? '#A7F3D0' : '#065F46';
                  } else if (isSelected && !isCorrect) {
                    btnBg = isDark ? '#7F1D1D' : '#FEE2E2';
                    btnBorder = '#EF4444';
                    btnColor = isDark ? '#FCA5A5' : '#991B1B';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(opt)}
                    disabled={isAnswered}
                    style={{
                      padding: '0.9rem 1.1rem',
                      fontSize: '0.92rem',
                      fontWeight: 800,
                      borderRadius: '14px',
                      border: `2.5px solid ${btnBorder}`,
                      backgroundColor: btnBg,
                      color: btnColor,
                      cursor: isAnswered ? 'default' : 'pointer',
                      boxShadow: isSelected ? 'inset 0 2px 4px rgba(0,0,0,0.1)' : '3px 3px 0px var(--shadow-ink)',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.65rem',
                      transition: 'transform 0.1s ease'
                    }}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <CheckCircle2 size={18} color="#10B981" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle size={18} color="#EF4444" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Action Bar */}
            {isAnswered && (
              <div
                style={{
                  backgroundColor: selectedOption === activeQuestion.correct
                    ? isDark ? '#064E3B' : '#D1FAE5'
                    : isDark ? '#3D2A00' : '#FEF3C7',
                  border: '2px solid var(--border-ink)',
                  borderRadius: '14px',
                  padding: '0.85rem 1.15rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  animation: 'popIn 0.25s ease'
                }}
              >
                <div>
                  <div style={{ fontWeight: 900, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    {selectedOption === activeQuestion.correct ? '🎉 Correct!' : '💡 Teaching Lightbulb:'}
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                    {activeQuestion.explanation}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="retro-btn-primary"
                  style={{
                    backgroundColor: '#2329D6',
                    borderRadius: '999px',
                    padding: '0.55rem 1.25rem',
                    fontSize: '0.88rem'
                  }}
                >
                  <span>Next Quest</span>
                  <ChevronRight size={17} />
                </button>
              </div>
            )}
          </div>

          {/* Right: Arcade Stats & Smurf Squad Podium */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {/* Score & Combo HUD */}
            <div
              className="retro-card"
              style={{
                padding: '1.15rem',
                backgroundColor: 'var(--surface)',
                border: '2.5px solid var(--border-ink)',
                borderRadius: '18px',
                boxShadow: '4px 4px 0px var(--shadow-ink)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                textAlign: 'center'
              }}
            >
              <span className="retro-pill-dark" style={{ fontSize: '0.68rem', margin: '0 auto' }}>
                SMARTBOARD ARCADE HUD
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div style={{ backgroundColor: 'var(--surface-alt)', border: '1.5px solid var(--border-ink)', borderRadius: '12px', padding: '0.6rem 0.3rem' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-secondary)' }}>SCORE</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--cobalt)' }}>{score}</div>
                </div>
                <div style={{ backgroundColor: 'var(--surface-alt)', border: '1.5px solid var(--border-ink)', borderRadius: '12px', padding: '0.6rem 0.3rem' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-secondary)' }}>BEST STREAK</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#EF4444' }}>{bestStreak}x</div>
                </div>
              </div>

              {/* Combo Alert Banner */}
              {comboAlert && (
                <div
                  style={{
                    backgroundColor: 'var(--card-yellow)',
                    border: '2px solid var(--border-ink)',
                    borderRadius: '10px',
                    padding: '0.4rem',
                    fontSize: '0.82rem',
                    fontWeight: 900,
                    color: 'var(--text-primary)',
                    animation: 'popIn 0.2s ease'
                  }}
                >
                  🔥 COMBO POWER! +1 🫐 Awarded!
                </div>
              )}

              <button
                type="button"
                onClick={handleResetArcade}
                className="retro-btn-outline"
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.75rem',
                  borderRadius: '999px',
                  justifyContent: 'center'
                }}
              >
                <RotateCcw size={13} /> Reset Round
              </button>
            </div>

            {/* Quick Word Glossary Box */}
            <div
              className="retro-card"
              style={{
                padding: '1rem',
                backgroundColor: 'var(--card-purple)',
                border: '2.5px solid var(--border-ink)',
                borderRadius: '18px',
                boxShadow: '4px 4px 0px var(--shadow-ink)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.55rem'
              }}
            >
              <div style={{ fontSize: '0.76rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                📖 5 Core Terms Every Student Must Know:
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.15rem', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                <li><strong>Genre:</strong> The style/category (e.g. funny).</li>
                <li><strong>Plot:</strong> The story sequence/recipe.</li>
                <li><strong>Blurb:</strong> Back cover summary.</li>
                <li><strong>Characters:</strong> People & talking animals.</li>
                <li><strong>Setting:</strong> Time & place of the story.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: INTERACTIVE BOOK ANATOMY (BLURB INSPECTOR)
         ========================================================= */}
      {activeTab === 'book' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)', gap: '1rem' }}>
          {/* Left: The Virtual Book (Front, Spine, Back Cover) */}
          <div
            className="retro-window"
            style={{
              padding: '1.25rem',
              backgroundColor: isDark ? '#141724' : '#FFFFFF',
              border: '2.5px solid var(--border-ink)',
              borderRadius: '20px',
              boxShadow: '6px 6px 0px var(--shadow-ink)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            {/* View Selector (Front Cover vs Back Cover Blurb) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span className="retro-pill-dark" style={{ fontSize: '0.72rem' }}>
                INTERACTIVE BOOK INSPECTOR
              </span>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    setBookSide('front');
                    setActiveHotspot('fc-title');
                  }}
                  className="retro-btn-outline"
                  style={{
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.78rem',
                    borderRadius: '999px',
                    backgroundColor: bookSide === 'front' ? 'var(--cobalt)' : 'var(--surface)',
                    color: bookSide === 'front' ? '#FFFFFF' : 'var(--text-primary)'
                  }}
                >
                  📕 Front Cover
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBookSide('back');
                    setActiveHotspot('bc-blurb');
                  }}
                  className="retro-btn-outline"
                  style={{
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.78rem',
                    borderRadius: '999px',
                    backgroundColor: bookSide === 'back' ? 'var(--cobalt)' : 'var(--surface)',
                    color: bookSide === 'back' ? '#FFFFFF' : 'var(--text-primary)'
                  }}
                >
                  📗 Back Cover (Blurb)
                </button>
              </div>
            </div>

            {/* Virtual Book Simulation Rendering */}
            <div
              style={{
                backgroundColor: isDark ? '#1F2438' : '#FAF8F5',
                border: '3px solid var(--border-ink)',
                borderRadius: '16px',
                padding: '1.5rem',
                minHeight: '380px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.06)'
              }}
            >
              {bookSide === 'front' ? (
                <>
                  <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <button
                      type="button"
                      onClick={() => setActiveHotspot('fc-title')}
                      style={{
                        background: 'none',
                        border: activeHotspot === 'fc-title' ? '2.5px solid var(--cobalt)' : '2px dashed var(--border-ink)',
                        borderRadius: '12px',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer',
                        backgroundColor: activeHotspot === 'fc-title' ? 'var(--card-yellow)' : 'transparent'
                      }}
                    >
                      <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
                        {BOOK_ANATOMY.title}
                      </h1>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
                        ★ Tap Title Hotspot
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveHotspot('fc-author')}
                      style={{
                        background: 'none',
                        border: activeHotspot === 'fc-author' ? '2.5px solid var(--cobalt)' : '2px dashed var(--border-ink)',
                        borderRadius: '12px',
                        padding: '0.4rem 0.8rem',
                        cursor: 'pointer',
                        backgroundColor: activeHotspot === 'fc-author' ? 'var(--card-purple)' : 'transparent',
                        alignSelf: 'center'
                      }}
                    >
                      <div style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                        By {BOOK_ANATOMY.author}
                      </div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                        {BOOK_ANATOMY.frontCover.authorTag}
                      </div>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveHotspot('fc-art')}
                    style={{
                      marginTop: '1.25rem',
                      padding: '1.25rem',
                      borderRadius: '14px',
                      border: activeHotspot === 'fc-art' ? '2.5px solid var(--cobalt)' : '2px dashed var(--border-ink)',
                      backgroundColor: activeHotspot === 'fc-art' ? 'var(--card-green)' : 'var(--surface)',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.35rem' }}>🦜 🎲 🧩</div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {BOOK_ANATOMY.frontCover.illustrationDesc}
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                      ★ Tap Cover Artwork Hotspot
                    </span>
                  </button>
                </>
              ) : (
                /* BACK COVER (THE BLURB) */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <button
                    type="button"
                    onClick={() => setActiveHotspot('bc-quote')}
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '12px',
                      border: activeHotspot === 'bc-quote' ? '2.5px solid var(--cobalt)' : '2px dashed var(--border-ink)',
                      backgroundColor: activeHotspot === 'bc-quote' ? 'var(--card-yellow)' : 'var(--surface)',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontStyle: 'italic', fontWeight: 800, fontSize: '0.86rem', color: 'var(--text-primary)' }}>
                      {BOOK_ANATOMY.backCover.reviewQuote}
                    </div>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                      ★ Tap Reviewer Quote Hotspot
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveHotspot('bc-blurb')}
                    style={{
                      padding: '1rem',
                      borderRadius: '14px',
                      border: activeHotspot === 'bc-blurb' ? '2.5px solid var(--cobalt)' : '2px solid var(--border-ink)',
                      backgroundColor: activeHotspot === 'bc-blurb' ? (isDark ? '#261338' : '#F3E8FF') : 'var(--surface)',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                      <span className="retro-pill-dark" style={{ fontSize: '0.68rem' }}>
                        THE OFFICIAL BLURB (LB p. 97)
                      </span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--cobalt)' }}>
                        ★ Tap Blurb Hotspot
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.55 }}>
                      {BOOK_ANATOMY.backCover.blurb}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveHotspot('bc-barcode')}
                    style={{
                      padding: '0.5rem 0.85rem',
                      borderRadius: '10px',
                      border: activeHotspot === 'bc-barcode' ? '2.5px solid var(--cobalt)' : '2px dashed var(--border-ink)',
                      backgroundColor: activeHotspot === 'bc-barcode' ? 'var(--card-green)' : 'var(--surface)',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {BOOK_ANATOMY.backCover.barcodeInfo}
                    </span>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                      ★ Tap Barcode / ISBN
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: The Classroom Lightbulb Explainer */}
          <div
            className="retro-window"
            style={{
              padding: '1.25rem',
              backgroundColor: isDark ? '#16192B' : '#FFFDF9',
              border: '2.5px solid var(--border-ink)',
              borderRadius: '20px',
              boxShadow: '6px 6px 0px var(--shadow-ink)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.65rem' }}>
                <span className="retro-pill-dark" style={{ fontSize: '0.72rem' }}>
                  TEACHING SPOTLIGHT
                </span>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--cobalt)' }}>
                  How to Choose a Book (LB p. 95)
                </span>
              </div>

              {/* Dynamic hotspot explanation */}
              {activeHotspot === 'bc-blurb' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                    What is a Blurb?
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    The <strong>blurb</strong> is the short piece of writing printed on the back cover. It describes the main situation and introduces the characters, but <em>never</em> spoils the ending!
                  </p>
                  <div style={{ backgroundColor: 'var(--surface)', border: '2px solid var(--border-ink)', borderRadius: '12px', padding: '0.75rem' }}>
                    <div style={{ fontWeight: 900, fontSize: '0.82rem', color: '#3B82F6', marginBottom: '0.25rem' }}>
                      🔍 Evidence in Harry's Mad Blurb:
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.45 }}>
                      <li>Uncle George leaves a mysterious legacy.</li>
                      <li>Harry expects a fortune, but receives a talking parrot.</li>
                      <li>Leaves us with a cliffhanger: <em>"Can Harry protect his feathered friend from a cat burglar?"</em></li>
                    </ul>
                  </div>
                </div>
              )}

              {activeHotspot === 'fc-title' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                    The Title & The Word-Play Pun
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    Look closely at the title: <strong>Harry's Mad</strong>! The author uses a double meaning:
                  </p>
                  <div style={{ backgroundColor: 'var(--surface)', border: '2px solid var(--border-ink)', borderRadius: '12px', padding: '0.75rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      1. <strong>"Mad"</strong> is short for the parrot's name: <em>Madison</em>!
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      2. <strong>"Mad"</strong> means crazy or ridiculous — because a talking parrot playing Monopoly is completely bonkers!
                    </div>
                  </div>
                </div>
              )}

              {activeHotspot === 'fc-author' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                    The Author: Dick King-Smith
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    Readers often choose books because they trust the author. Dick King-Smith was a British farmer and teacher who wrote <em>The Sheep-Pig</em> (which became the famous movie <em>Babe</em>).
                  </p>
                </div>
              )}

              {activeHotspot === 'bc-quote' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                    Reviewer Quotes & Star Ratings
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    Publishers print quotes from respected newspapers (like <em>The Times</em>) to prove to parents and teachers that the book is high quality and fun to read.
                  </p>
                </div>
              )}

              {activeHotspot === 'fc-art' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                    Front Cover Illustration
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    Illustrations give instant visual clues about the <strong>Genre</strong>. A parrot with a Monopoly board instantly tells you this is a comedic, light-hearted story!
                  </p>
                </div>
              )}

              {activeHotspot === 'bc-barcode' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                    ISBN, Barcode & Reading Age
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    Every published book has an ISBN (International Standard Book Number) to catalog it globally in school libraries and bookshops.
                  </p>
                </div>
              )}
            </div>

            {/* Notebook Challenge Prompt */}
            <div
              style={{
                backgroundColor: 'var(--card-green)',
                border: '2px solid var(--border-ink)',
                borderRadius: '14px',
                padding: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <Award size={24} color="#166534" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                <strong>LB p. 98 Reading Log Task:</strong> Look at the blurb above. Write 2 sentences in your exercise book explaining why you would (or wouldn't) enjoy reading this book!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: THE 5-STAGE STORY MOUNTAIN (SESSION 4.3)
         ========================================================= */}
      {activeTab === 'mountain' && (
        <div
          className="retro-window"
          style={{
            padding: '1.5rem',
            backgroundColor: isDark ? '#141724' : '#FFFFFF',
            border: '2.5px solid var(--border-ink)',
            borderRadius: '20px',
            boxShadow: '6px 6px 0px var(--shadow-ink)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="retro-pill-dark" style={{ fontSize: '0.72rem' }}>
                SESSION 4.3 • THE STORY RECIPE
              </span>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
                Learner's Book pp. 101–105
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '0.25rem 0', color: 'var(--text-primary)' }}>
              The 5-Stage Story Mountain
            </h2>
            <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Every fiction story follows a sequence. Tap the stages below to climb the plot mountain!
            </p>
          </div>

          {/* Visual Mountain Steps */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '0.5rem',
              alignItems: 'end',
              minHeight: '160px',
              padding: '1rem 0'
            }}
          >
            {PLOT_MOUNTAIN_STAGES.map((stg) => {
              const heights = ['50px', '90px', '140px', '100px', '60px'];
              const isSelected = selectedMountainStage === stg.stage;

              return (
                <button
                  key={stg.stage}
                  type="button"
                  onClick={() => setSelectedMountainStage(stg.stage)}
                  style={{
                    height: heights[stg.stage - 1],
                    backgroundColor: isSelected ? stg.color : 'var(--surface-alt)',
                    color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                    border: '2.5px solid var(--border-ink)',
                    borderRadius: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '4px 4px 0px var(--shadow-ink)' : '2px 2px 0px var(--border-ink)',
                    padding: '0.35rem',
                    textAlign: 'center',
                    transition: 'transform 0.15s ease'
                  }}
                >
                  <span style={{ fontSize: '0.85rem', fontWeight: 900 }}>
                    Stage {stg.stage}
                  </span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800 }}>
                    {stg.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Stage Detail Card */}
          {(() => {
            const currentStage = PLOT_MOUNTAIN_STAGES.find((s) => s.stage === selectedMountainStage);
            if (!currentStage) return null;

            return (
              <div
                className="retro-card"
                style={{
                  padding: '1.25rem',
                  borderRadius: '16px',
                  border: '2.5px solid var(--border-ink)',
                  backgroundColor: isDark ? '#1F2438' : '#FAF8F5',
                  boxShadow: '4px 4px 0px var(--shadow-ink)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      backgroundColor: currentStage.color,
                      color: '#FFFFFF',
                      fontSize: '0.76rem',
                      fontWeight: 900,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px'
                    }}
                  >
                    STAGE {currentStage.stage}
                  </span>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                    {currentStage.name}
                  </h3>
                </div>

                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--cobalt)' }}>
                  📖 Definition: {currentStage.definition}
                </div>

                <div style={{ backgroundColor: 'var(--surface)', border: '1.5px solid var(--border-ink)', borderRadius: '12px', padding: '0.85rem' }}>
                  <div style={{ fontSize: '0.76rem', fontWeight: 900, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    🦜 WHAT HAPPENS IN HARRY'S MAD (LB p. 103):
                  </div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                    {currentStage.harrysMadEvent}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* =========================================================
          TAB 4: FUNNY SCALE & VOCABULARY TRAPS (SESSIONS 4.2 & 4.4)
         ========================================================= */}
      {activeTab === 'scale' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {/* Left: The "Funny Scale" (Shades of Meaning • LB p. 99) */}
          <div
            className="retro-window"
            style={{
              padding: '1.25rem',
              backgroundColor: isDark ? '#141724' : '#FFFFFF',
              border: '2.5px solid var(--border-ink)',
              borderRadius: '20px',
              boxShadow: '6px 6px 0px var(--shadow-ink)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <div>
              <span className="retro-pill-dark" style={{ fontSize: '0.72rem' }}>
                SHADES OF MEANING (LB p. 99)
              </span>
              <h3 style={{ margin: '0.35rem 0 0 0', fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                The "Funny" Intensity Scale
              </h3>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Not all funny words have the same strength! Tap a level to test the intensity:
              </p>
            </div>

            {/* 3-Level Selector */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[
                { level: 1, word: 'Amusing', sub: 'Level 1: Mild', color: '#3B82F6', emoji: '🙂' },
                { level: 2, word: 'Hilarious', sub: 'Level 2: Very Funny', color: '#F59E0B', emoji: '😄' },
                { level: 3, word: 'Hysterical', sub: 'Level 3: Wildly Funny', color: '#EF4444', emoji: '🤣' }
              ].map((lvl) => (
                <button
                  key={lvl.level}
                  type="button"
                  onClick={() => setScaleLevel(lvl.level)}
                  style={{
                    flex: 1,
                    padding: '0.75rem 0.5rem',
                    borderRadius: '12px',
                    border: '2px solid var(--border-ink)',
                    backgroundColor: scaleLevel === lvl.level ? lvl.color : 'var(--surface-alt)',
                    color: scaleLevel === lvl.level ? '#FFFFFF' : 'var(--text-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: scaleLevel === lvl.level ? '3px 3px 0px var(--shadow-ink)' : 'none'
                  }}
                >
                  <span style={{ fontSize: '1.4rem' }}>{lvl.emoji}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 900 }}>{lvl.word}</span>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, opacity: 0.9 }}>{lvl.sub}</span>
                </button>
              ))}
            </div>

            {/* Explanation Box */}
            <div style={{ backgroundColor: 'var(--surface)', border: '2px solid var(--border-ink)', borderRadius: '14px', padding: '1rem' }}>
              {scaleLevel === 1 && (
                <div>
                  <div style={{ fontWeight: 900, fontSize: '0.95rem', color: '#3B82F6' }}>
                    🙂 Amusing = Gently entertaining
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.35rem' }}>
                    Makes you smile quietly or chuckle. Example: <em>"Harry found the parrot's little head tilts rather amusing."</em>
                  </div>
                </div>
              )}
              {scaleLevel === 2 && (
                <div>
                  <div style={{ fontWeight: 900, fontSize: '0.95rem', color: '#F59E0B' }}>
                    😄 Hilarious = Extremely funny / laughing out loud
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.35rem' }}>
                    Causes laughter and excitement! Example: <em>"The Times called the book a hilarious family adventure!"</em>
                  </div>
                </div>
              )}
              {scaleLevel === 3 && (
                <div>
                  <div style={{ fontWeight: 900, fontSize: '0.95rem', color: '#EF4444' }}>
                    🤣 Hysterical = Uncontrollably funny / crying with laughter
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.35rem' }}>
                    So funny you cannot breathe or stop laughing! Example: <em>"When Madison impersonated the postman, Harry was in hysterical fits of laughter."</em>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Homophones & American Slang (LB p. 106) */}
          <div
            className="retro-window"
            style={{
              padding: '1.25rem',
              backgroundColor: isDark ? '#141724' : '#FFFFFF',
              border: '2.5px solid var(--border-ink)',
              borderRadius: '20px',
              boxShadow: '6px 6px 0px var(--shadow-ink)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <div>
              <span className="retro-pill-dark" style={{ fontSize: '0.72rem' }}>
                WRITING TIP & SLANG (LB p. 106)
              </span>
              <h3 style={{ margin: '0.35rem 0 0 0', fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                Homophone Trap: Hoarse vs. Horse
              </h3>
            </div>

            {/* Homophone Comparison */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div style={{ backgroundColor: 'var(--card-green)', border: '2px solid var(--border-ink)', borderRadius: '12px', padding: '0.75rem' }}>
                <div style={{ fontWeight: 900, fontSize: '0.92rem', color: '#166534' }}>
                  🗣️ HOARSE (oa)
                </div>
                <div style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  A rough, raspy, strained voice (like a sore throat).
                </div>
              </div>
              <div style={{ backgroundColor: 'var(--card-orange)', border: '2px solid var(--border-ink)', borderRadius: '12px', padding: '0.75rem' }}>
                <div style={{ fontWeight: 900, fontSize: '0.92rem', color: '#9A3412' }}>
                  🐎 HORSE (or)
                </div>
                <div style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  The large 4-legged mammal you ride on a farm!
                </div>
              </div>
            </div>

            {/* American vs British Slang Table (LB p. 106) */}
            <div>
              <div style={{ fontSize: '0.76rem', fontWeight: 900, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                MADISON'S AMERICAN SLANG (LB p. 106):
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {[
                  { us: 'Buddy', uk: 'Friend / Pal / Mate' },
                  { us: 'Candy', uk: 'Sweets' },
                  { us: 'Vacation', uk: 'Holiday' },
                  { us: 'Fortune', uk: 'A lot of money' }
                ].map((s, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      backgroundColor: 'var(--surface)',
                      border: '1.5px solid var(--border-ink)',
                      borderRadius: '8px',
                      padding: '0.35rem 0.65rem',
                      fontSize: '0.78rem',
                      fontWeight: 800
                    }}
                  >
                    <span style={{ color: 'var(--cobalt)' }}>🇺🇸 "{s.us}"</span>
                    <span style={{ color: 'var(--text-primary)' }}>🇬🇧 {s.uk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

