import React, { useState } from 'react';
import { WRITING_ARCHITECT_DATA } from '../data/examRevisionData';
import NotebookBridgeModal from '../components/NotebookBridgeModal';
import { useTheme } from '../context/ThemeContext';
import {
  Blocks,
  EyeOff,
  Eye,
  Pencil,
  RotateCcw,
  Wand2,
  CheckCircle2,
  PlusCircle,
  Shuffle,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const DARK_PARA_COLORS = {
  '#F1DFFE': '#261338',
  '#92C5E3': '#0E2138',
  '#FCE3A1': '#2B1E05',
  '#F9BDD5': '#330F20',
  '#C7E0CD': '#0E2616',
  '#F5C0A1': '#351A0C'
};

const DARK_CLINIC_THEMES = ['#330F20', '#2B1E05', '#0E2138', '#261338'];
const LIGHT_CLINIC_THEMES = ['#F9BDD5', '#FCE3A1', '#92C5E3', '#F1DFFE'];

export default function WritingLab() {
  const { isDark } = useTheme();
  const [activeMode, setActiveMode] = useState('fantasyQuest'); // 'fantasyQuest' | 'animalCard' | 'upgrader'
  const [activeParaIdx, setActiveParaIdx] = useState(0);
  const [selectedBlocks, setSelectedBlocks] = useState({});
  const [skeletonMode, setSkeletonMode] = useState(false);
  const [upgraderStages, setUpgraderStages] = useState({ 'up-1': 0, 'up-2': 0, 'up-3': 0 });

  // Live Teacher Custom Student Sentence Clinic
  const [customWeak, setCustomWeak] = useState('the boy go to dark cave he see big dragon');
  const [customFixed, setCustomFixed] = useState('Stepping into the dark cavern, the brave boy discovered a mighty silver dragon!');
  const [customCards, setCustomCards] = useState([]);

  const [notebookModal, setNotebookModal] = useState({ open: false, title: '', task: '', checklist: [] });

  const currentBlueprint =
    activeMode === 'animalCard' ? WRITING_ARCHITECT_DATA.animalCard : WRITING_ARCHITECT_DATA.fantasyQuest;

  const currentPara = currentBlueprint.paragraphs[activeParaIdx] || currentBlueprint.paragraphs[0];

  const getParaColor = (hex) => (isDark ? DARK_PARA_COLORS[hex] || '#1B1F2E' : hex);

  const handleSelectOption = (paraId, slotId, optionText) => {
    setSelectedBlocks((prev) => ({
      ...prev,
      [`${paraId}_${slotId}`]: optionText
    }));
  };

  const handleRandomSpark = () => {
    const next = {};
    currentBlueprint.paragraphs.forEach((p) => {
      p.slots.forEach((s) => {
        const randomOpt = s.options[Math.floor(Math.random() * s.options.length)];
        next[`${p.id}_${s.id}`] = randomOpt;
      });
    });
    setSelectedBlocks(next);
  };

  const handleAddCustomClinic = (e) => {
    e.preventDefault();
    if (!customWeak.trim()) return;
    const newId = `custom-${Date.now()}`;
    setCustomCards([
      ...customCards,
      {
        id: newId,
        title: `Live Student Sentence #${customCards.length + 1}`,
        weakProblem: 'Real classroom sentence spotted in books:',
        stages: [
          { level: 'Lv 1: Original Draft ❌', text: customWeak, notes: 'What is missing (capitals, past tense, adjectives)?' },
          { level: 'Lv 2: Superstar Upgrade 🌟', text: customFixed, notes: 'Upgraded together on the Smartboard!' }
        ]
      }
    ]);
    setUpgraderStages((prev) => ({ ...prev, [newId]: 0 }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, gap: '0.5rem' }}>
      {/* COMPACT SMARTBOARD CONTROL BAR */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.45rem',
          backgroundColor: 'var(--surface)',
          border: '2px solid var(--border-ink)',
          borderRadius: '16px',
          boxShadow: '3px 3px 0px var(--shadow-ink)',
          padding: '0.4rem 0.8rem',
          flexShrink: 0
        }}
      >
        {/* Mode Selector */}
        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
          <button
            onClick={() => {
              setActiveMode('fantasyQuest');
              setActiveParaIdx(0);
              setSkeletonMode(false);
            }}
            style={{
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
              border: '2px solid var(--border-ink)',
              fontWeight: 800,
              fontSize: '0.82rem',
              backgroundColor:
                activeMode === 'fantasyQuest'
                  ? isDark
                    ? '#261338'
                    : '#F1DFFE'
                  : 'var(--surface)',
              color:
                activeMode === 'fantasyQuest'
                  ? isDark
                    ? '#C084FC'
                    : '#1E1E24'
                  : 'var(--text-primary)',
              boxShadow: activeMode === 'fantasyQuest' ? '2px 2px 0px var(--shadow-ink)' : 'none',
              cursor: 'pointer'
            }}
          >
            🐉 Paper 2: 4-Para Story
          </button>
          <button
            onClick={() => {
              setActiveMode('animalCard');
              setActiveParaIdx(0);
              setSkeletonMode(false);
            }}
            style={{
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
              border: '2px solid var(--border-ink)',
              fontWeight: 800,
              fontSize: '0.82rem',
              backgroundColor:
                activeMode === 'animalCard'
                  ? isDark
                    ? '#351A0C'
                    : '#F5C0A1'
                  : 'var(--surface)',
              color:
                activeMode === 'animalCard'
                  ? isDark
                    ? '#FB923C'
                    : '#1E1E24'
                  : 'var(--text-primary)',
              boxShadow: activeMode === 'animalCard' ? '2px 2px 0px var(--shadow-ink)' : 'none',
              cursor: 'pointer'
            }}
          >
            🌍 Paper 1: Collector&rsquo;s Card
          </button>
          <button
            onClick={() => setActiveMode('upgrader')}
            style={{
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
              border: '2px solid var(--border-ink)',
              fontWeight: 800,
              fontSize: '0.82rem',
              backgroundColor:
                activeMode === 'upgrader'
                  ? isDark
                    ? '#2B1E05'
                    : '#FCE3A1'
                  : 'var(--surface)',
              color:
                activeMode === 'upgrader'
                  ? isDark
                    ? '#FBBF24'
                    : '#1E1E24'
                  : 'var(--text-primary)',
              boxShadow: activeMode === 'upgrader' ? '2px 2px 0px var(--shadow-ink)' : 'none',
              cursor: 'pointer'
            }}
          >
            🛠️ Sentence Upgrader Clinic
          </button>
        </div>

        {/* Global Tools */}
        {activeMode !== 'upgrader' && (
          <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
            <button
              onClick={handleRandomSpark}
              className="retro-btn-outline"
              style={{
                padding: '0.25rem 0.65rem',
                fontSize: '0.8rem',
                backgroundColor: isDark ? '#2B1E05' : '#FCE3A1'
              }}
            >
              <Shuffle size={14} /> Spark Story
            </button>
            <button
              onClick={() => setSkeletonMode(!skeletonMode)}
              className="retro-btn-primary"
              style={{
                padding: '0.25rem 0.65rem',
                fontSize: '0.8rem',
                backgroundColor: skeletonMode ? 'var(--accent-green)' : 'var(--border-ink)'
              }}
            >
              {skeletonMode ? <Eye size={14} /> : <EyeOff size={14} />}
              {skeletonMode ? 'Show Full Words' : '🫣 Skeleton Mode (For Books)'}
            </button>
            <button
              onClick={() =>
                setNotebookModal({
                  open: true,
                  title: currentBlueprint.title,
                  task: 'Look at the Smartboard skeleton frame! Write your own original paragraphs in your notebook now.',
                  checklist: [
                    '4 clear paragraphs (Setting, Hero, Problem, Rescue)',
                    'Capital letters & full stops throughout',
                    'At least 1 sentence of dialogue ("...")',
                    'Adjectives & past tense verbs'
                  ]
                })
              }
              className="retro-btn-primary"
              style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', backgroundColor: 'var(--cobalt)' }}
            >
              <Pencil size={14} /> ✏️ Notebook Timer (3 Mins)
            </button>
          </div>
        )}
      </div>

      {/* =========================================================
          MODE 1 & 2: PARAGRAPH-BY-PARAGRAPH SMARTBOARD STEPPER
         ========================================================= */}
      {activeMode !== 'upgrader' && currentPara && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '0.5rem' }}>
          {/* Paragraph Stepper Tabs */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {currentBlueprint.paragraphs.map((para, idx) => {
                const isActive = activeParaIdx === idx;
                const paraColor = getParaColor(para.color);
                return (
                  <button
                    key={para.id}
                    onClick={() => setActiveParaIdx(idx)}
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '8px',
                      border: '2px solid var(--border-ink)',
                      fontWeight: 900,
                      fontSize: '0.84rem',
                      backgroundColor: isActive ? paraColor : 'var(--surface)',
                      color: isActive ? (isDark ? '#F8FAFC' : '#1E1E24') : 'var(--text-primary)',
                      boxShadow: isActive ? '2px 2px 0px var(--shadow-ink)' : 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {para.number}: {para.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <button
                disabled={activeParaIdx === 0}
                onClick={() => setActiveParaIdx((i) => Math.max(0, i - 1))}
                className="retro-btn-outline"
                style={{ padding: '0.25rem 0.6rem', fontSize: '0.82rem', opacity: activeParaIdx === 0 ? 0.45 : 1 }}
              >
                <ChevronLeft size={14} /> Prev Para
              </button>
              <button
                disabled={activeParaIdx === currentBlueprint.paragraphs.length - 1}
                onClick={() => setActiveParaIdx((i) => Math.min(currentBlueprint.paragraphs.length - 1, i + 1))}
                className="retro-btn-outline"
                style={{
                  padding: '0.25rem 0.6rem',
                  fontSize: '0.82rem',
                  opacity: activeParaIdx === currentBlueprint.paragraphs.length - 1 ? 0.45 : 1
                }}
              >
                Next Para <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* MAIN 2-COLUMN SINGLE-VIEWPORT SPLIT */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 1fr',
              gap: '0.75rem',
              flex: 1,
              minHeight: 0
            }}
          >
            {/* LEFT COLUMN: Active Paragraph Block Options */}
            <div
              className="retro-window study-scrollable"
              style={{
                backgroundColor: 'var(--surface)',
                border: '2.5px solid var(--border-ink)',
                borderRadius: '20px',
                boxShadow: '4px 4px 0px var(--shadow-ink)',
                padding: '0.9rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 0,
                overflowY: 'auto'
              }}
            >
              <div>
                <div
                  style={{
                    backgroundColor: getParaColor(currentPara.color),
                    border: '2px solid var(--border-ink)',
                    borderRadius: '10px',
                    padding: '0.45rem 0.75rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.65rem'
                  }}
                >
                  <strong style={{ fontSize: '0.95rem', color: isDark ? '#F8FAFC' : '#1E1E24' }}>
                    {currentPara.number}: {currentPara.name}
                  </strong>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: isDark ? '#E2E8F0' : '#1E1E24' }}>
                    🎯 {currentPara.goal}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {currentPara.slots.map((slot) => {
                    const key = `${currentPara.id}_${slot.id}`;
                    const picked = selectedBlocks[key];

                    return (
                      <div key={slot.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.82rem', fontWeight: 800 }}>
                          <span style={{ color: 'var(--text-primary)' }}>🧩 {slot.label}</span>
                          <span
                            style={{
                              backgroundColor: 'var(--surface-alt)',
                              border: '1px solid var(--border-ink)',
                              padding: '0.1rem 0.4rem',
                              borderRadius: '5px',
                              color: 'var(--text-secondary)'
                            }}
                          >
                            Pattern: {slot.skeletonHint}
                          </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          {slot.options.map((opt, idx) => {
                            const isSelected = picked === opt;
                            const slotColor = getParaColor(currentPara.color);
                            return (
                              <button
                                key={idx}
                                onClick={() => handleSelectOption(currentPara.id, slot.id, opt)}
                                style={{
                                  textAlign: 'left',
                                  backgroundColor: isSelected ? slotColor : 'var(--surface-alt)',
                                  border: isSelected ? '2px solid var(--border-ink)' : '1.5px solid var(--border-ink)',
                                  boxShadow: isSelected ? '2px 2px 0px var(--shadow-ink)' : 'none',
                                  borderRadius: '10px',
                                  padding: '0.5rem 0.75rem',
                                  fontSize: '0.92rem',
                                  fontWeight: isSelected ? 800 : 600,
                                  color: 'var(--text-primary)',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between'
                                }}
                              >
                                <span>{opt}</span>
                                {isSelected && <CheckCircle2 size={16} color="var(--accent-green)" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Quick Jump / Clear */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.65rem' }}>
                <button
                  onClick={() => {
                    const next = { ...selectedBlocks };
                    delete next[`${currentPara.id}_s1`];
                    delete next[`${currentPara.id}_s2`];
                    setSelectedBlocks(next);
                  }}
                  className="retro-btn-outline"
                  style={{ padding: '0.3rem 0.65rem', fontSize: '0.8rem' }}
                >
                  <RotateCcw size={13} /> Clear {currentPara.number}
                </button>

                {activeParaIdx < currentBlueprint.paragraphs.length - 1 && (
                  <button
                    onClick={() => setActiveParaIdx((i) => i + 1)}
                    className="retro-btn-primary"
                    style={{ padding: '0.3rem 0.75rem', fontSize: '0.82rem', backgroundColor: 'var(--cobalt)' }}
                  >
                    Next Paragraph →
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Assembled Live Story Masterpiece Canvas */}
            <div
              className="retro-window study-scrollable"
              style={{
                backgroundColor: 'var(--surface-alt)',
                border: '2.5px solid var(--border-ink)',
                borderRadius: '20px',
                boxShadow: '4px 4px 0px var(--shadow-ink)',
                padding: '0.9rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 0,
                overflowY: 'auto'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="retro-pill-dark" style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem' }}>
                    {skeletonMode ? '🫣 SKELETON PROMPTS (STUDENTS WRITE)' : '📜 ASSEMBLED CLASS MASTERPIECE'}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)' }}>Section B • 10 Marks</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {currentBlueprint.paragraphs.map((para, pIdx) => {
                    const s1 = selectedBlocks[`${para.id}_s1`];
                    const s2 = selectedBlocks[`${para.id}_s2`];
                    const isCurrent = activeParaIdx === pIdx;
                    const paraColor = getParaColor(para.color);

                    return (
                      <div
                        key={para.id}
                        onClick={() => setActiveParaIdx(pIdx)}
                        style={{
                          backgroundColor: paraColor,
                          border: isCurrent ? '2.5px solid var(--cobalt)' : '1.5px solid var(--border-ink)',
                          boxShadow: isCurrent ? '3px 3px 0px var(--shadow-ink)' : 'none',
                          borderRadius: '12px',
                          padding: '0.65rem 0.85rem',
                          cursor: 'pointer',
                          transition: 'transform 0.1s ease'
                        }}
                      >
                        <div style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.2rem', display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: isDark ? '#F8FAFC' : '#1E1E24' }}>{para.number}: {para.name}</span>
                          {isCurrent && <span style={{ color: 'var(--cobalt)', fontWeight: 900 }}>● ACTIVE</span>}
                        </div>

                        {skeletonMode ? (
                          <div style={{ fontSize: '0.94rem', fontWeight: 800, color: isDark ? '#F1F5F9' : '#1E1E24', lineHeight: 1.4 }}>
                            {para.slots.map((s) => s.skeletonHint).join(' ')}
                          </div>
                        ) : s1 || s2 ? (
                          <div style={{ fontSize: '0.96rem', fontWeight: 700, color: isDark ? '#F8FAFC' : '#1E1E24', lineHeight: 1.4 }}>
                            {s1 || '...'} {s2 || '...'}
                          </div>
                        ) : (
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                            Tap options on the left to build this paragraph...
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Quick Notebook Link */}
              <div style={{ marginTop: '0.65rem', paddingTop: '0.45rem', borderTop: '1.5px dashed var(--border-ink)' }}>
                <button
                  onClick={() =>
                    setNotebookModal({
                      open: true,
                      title: currentBlueprint.title,
                      task: 'Use the 4 color-coded paragraph frames on the Smartboard to write your complete story or card in your exercise book!',
                      checklist: [
                        '4 distinct paragraphs',
                        'Capital letter + full stop in each sentence',
                        'Speech marks for spoken words ("...")',
                        'Rich adjectives & descriptive past tense'
                      ]
                    })
                  }
                  className="retro-btn-primary"
                  style={{ width: '100%', justifyContent: 'center', backgroundColor: 'var(--cobalt)', padding: '0.45rem', fontSize: '0.85rem' }}
                >
                  <Pencil size={15} /> ✏️ Notebook Bridge (3 Min Countdown)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODE 3: FIX WEAK STUDENT SENTENCES CLINIC (COMPACT VIEW)
         ========================================================= */}
      {activeMode === 'upgrader' && (
        <div className="study-scrollable" style={{ flex: 1, minHeight: 0, overflowY: 'auto', paddingRight: '0.3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
            {[...WRITING_ARCHITECT_DATA.sentenceUpgrader, ...customCards].map((clinic, idx) => {
              const stageIdx = upgraderStages[clinic.id] || 0;
              const currentStage = clinic.stages[stageIdx] || clinic.stages[0];
              const themes = isDark ? DARK_CLINIC_THEMES : LIGHT_CLINIC_THEMES;

              return (
                <div
                  key={clinic.id}
                  className="retro-window"
                  style={{
                    backgroundColor: themes[idx % themes.length],
                    border: '2.5px solid var(--border-ink)',
                    borderRadius: '20px',
                    boxShadow: '4px 4px 0px var(--shadow-ink)',
                    padding: '0.85rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <span className="retro-pill-dark" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', marginBottom: '0.4rem' }}>
                      🛠️ CLINIC #{idx + 1}
                    </span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 900, marginBottom: '0.3rem', color: 'var(--text-primary)' }}>{clinic.title}</h4>
                    <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.55rem' }}>{clinic.weakProblem}</p>

                    <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '0.55rem', flexWrap: 'wrap' }}>
                      {clinic.stages.map((st, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => setUpgraderStages({ ...upgraderStages, [clinic.id]: sIdx })}
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            padding: '0.2rem 0.5rem',
                            borderRadius: '6px',
                            border: '1.5px solid var(--border-ink)',
                            backgroundColor: stageIdx === sIdx ? 'var(--cobalt)' : 'var(--surface)',
                            color: stageIdx === sIdx ? '#FFFFFF' : 'var(--text-primary)',
                            cursor: 'pointer'
                          }}
                        >
                          {st.level.split(' ')[0]} {st.level.split(' ')[1]}
                        </button>
                      ))}
                    </div>

                    <div
                      style={{
                        backgroundColor: 'var(--surface)',
                        border: '2px solid var(--border-ink)',
                        borderRadius: '10px',
                        padding: '0.75rem',
                        boxShadow: '2px 2px 0px var(--shadow-ink)',
                        marginBottom: '0.5rem'
                      }}
                    >
                      <div
                        style={{
                          fontSize: '1.05rem',
                          fontWeight: 900,
                          color:
                            stageIdx === 0
                              ? isDark
                                ? '#F87171'
                                : '#B91C1C'
                              : stageIdx === 1
                              ? isDark
                                ? '#60A5FA'
                                : '#1E40AF'
                              : isDark
                              ? '#4ADE80'
                              : '#15803D',
                          lineHeight: 1.4,
                          marginBottom: '0.35rem'
                        }}
                      >
                        &ldquo;{currentStage.text}&rdquo;
                      </div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', borderTop: '1px dashed var(--border-ink)', paddingTop: '0.35rem' }}>
                        💡 {currentStage.notes}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setUpgraderStages({
                        ...upgraderStages,
                        [clinic.id]: (stageIdx + 1) % clinic.stages.length
                      })
                    }
                    className="retro-btn-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '0.4rem', fontSize: '0.82rem' }}
                  >
                    <Wand2 size={14} />
                    {stageIdx < clinic.stages.length - 1 ? '✨ Tap to Upgrade Sentence!' : '🔄 Back to Draft'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Live Teacher Custom Input */}
          <div
            className="retro-window"
            style={{
              backgroundColor: 'var(--surface)',
              border: '2.5px solid var(--border-ink)',
              borderRadius: '20px',
              boxShadow: '4px 4px 0px var(--shadow-ink)',
              padding: '1rem'
            }}
          >
            <div style={{ fontWeight: 900, fontSize: '1rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
              👩‍🏫 Add a Real Sentence from a Student&rsquo;s Book to Upgrade Together:
            </div>
            <form onSubmit={handleAddCustomClinic} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.75rem', alignItems: 'end' }}>
              <div>
                <label style={{ fontWeight: 800, fontSize: '0.78rem', display: 'block', marginBottom: '0.2rem', color: 'var(--text-secondary)' }}>
                  1. Weak Student Draft:
                </label>
                <input
                  type="text"
                  value={customWeak}
                  onChange={(e) => setCustomWeak(e.target.value)}
                  style={{ marginBottom: 0, padding: '0.5rem', fontSize: '0.9rem' }}
                />
              </div>
              <div>
                <label style={{ fontWeight: 800, fontSize: '0.78rem', display: 'block', marginBottom: '0.2rem', color: 'var(--text-secondary)' }}>
                  2. Upgraded Superstar Version:
                </label>
                <input
                  type="text"
                  value={customFixed}
                  onChange={(e) => setCustomFixed(e.target.value)}
                  style={{ marginBottom: 0, padding: '0.5rem', fontSize: '0.9rem' }}
                />
              </div>
              <button
                type="submit"
                className="retro-btn-primary"
                style={{ backgroundColor: 'var(--cobalt)', height: '40px', padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
              >
                <PlusCircle size={15} /> Add to Board
              </button>
            </form>
          </div>
        </div>
      )}

      <NotebookBridgeModal
        isOpen={notebookModal.open}
        onClose={() => setNotebookModal({ ...notebookModal, open: false })}
        promptTitle={notebookModal.title}
        promptTask={notebookModal.task}
        checklist={notebookModal.checklist}
      />
    </div>
  );
}
