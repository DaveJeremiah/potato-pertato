import React, { useState } from 'react';
import { WRITING_ARCHITECT_DATA } from '../data/examRevisionData';
import NotebookBridgeModal from '../components/NotebookBridgeModal';
import ScribblePad from '../components/ScribblePad';
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
  ChevronLeft,
  X
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
  const [showAddCustom, setShowAddCustom] = useState(false);

  // Live Teacher Custom Student Sentence Clinic
  const [customWeak, setCustomWeak] = useState('');
  const [customFixed, setCustomFixed] = useState('');
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

  // Handle handwritten scribble input into active paragraph or sentence clinic
  const handleScribbleStoryInput = ({ text }) => {
    if (!text || !text.trim()) return;
    const clean = text.trim();

    if (activeMode === 'upgrader') {
      const newId = `custom-${Date.now()}`;
      setCustomCards((prev) => [
        ...prev,
        {
          id: newId,
          title: `Handwritten Sentence #${prev.length + 1}`,
          weakProblem: 'Written live on the Smartboard Scribble Pad:',
          stages: [
            { level: 'Lv 1: Handwritten ✍️', text: clean, notes: 'Written on the Smartboard!' },
            { level: 'Lv 2: Polished 🌟', text: clean.charAt(0).toUpperCase() + clean.slice(1) + (/[.!?]$/.test(clean) ? '' : '!'), notes: 'Checked capitals and end punctuation!' }
          ]
        }
      ]);
      setUpgraderStages((prev) => ({ ...prev, [newId]: 0 }));
      return;
    }

    if (currentPara) {
      const s1Key = `${currentPara.id}_s1`;
      const s2Key = `${currentPara.id}_s2`;
      const targetSlot = !selectedBlocks[s1Key] ? 's1' : 's2';
      handleSelectOption(currentPara.id, targetSlot, clean);
    }
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
        title: `Classroom Sentence #${customCards.length + 1}`,
        weakProblem: 'Real sentence spotted in books:',
        stages: [
          { level: 'Lv 1: Original ❌', text: customWeak, notes: 'What needs improving?' },
          { level: 'Lv 2: Superstar 🌟', text: customFixed || customWeak, notes: 'Upgraded version!' }
        ]
      }
    ]);
    setUpgraderStages((prev) => ({ ...prev, [newId]: 0 }));
    setCustomWeak('');
    setCustomFixed('');
    setShowAddCustom(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, gap: '0.65rem' }}>
      {/* =========================================================
          1. UNIFIED SMARTBOARD CONTROLLER (TUCKED NAVIGATION)
         ========================================================= */}
      <div
        className="retro-window"
        style={{
          backgroundColor: 'var(--surface)',
          padding: '0.45rem 0.85rem',
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          flexShrink: 0
        }}
      >
        {/* Left: Mode Segmented Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'inline-flex',
              backgroundColor: 'var(--surface-alt)',
              padding: '2px',
              borderRadius: '999px',
              border: '1.5px solid var(--border-ink)'
            }}
          >
            {[
              { id: 'fantasyQuest', label: '🐉 4-Para Story' },
              { id: 'animalCard', label: '🌍 Animal Card' },
              { id: 'upgrader', label: '🛠️ Sentence Upgrader' }
            ].map((m) => {
              const active = activeMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveMode(m.id);
                    setActiveParaIdx(0);
                    setSkeletonMode(false);
                  }}
                  style={{
                    padding: '0.22rem 0.65rem',
                    borderRadius: '999px',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    backgroundColor: active ? (isDark ? '#423108' : '#FCE3A1') : 'transparent',
                    color: active ? (isDark ? '#FBBF24' : '#1E1E24') : 'var(--text-secondary)'
                  }}
                >
                  {m.label}
                </button>
              );
            })}
          </div>

          {/* If in Story or Animal Card mode: Sleek Paragraph Stepper */}
          {activeMode !== 'upgrader' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <button
                disabled={activeParaIdx === 0}
                onClick={() => setActiveParaIdx((i) => Math.max(0, i - 1))}
                className="retro-btn-outline"
                style={{ padding: '0.2rem 0.45rem', borderRadius: '8px', opacity: activeParaIdx === 0 ? 0.35 : 1 }}
                title="Previous Paragraph"
              >
                <ChevronLeft size={16} />
              </button>

              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {currentBlueprint.paragraphs.map((para, idx) => {
                  const isActive = activeParaIdx === idx;
                  const pColor = getParaColor(para.color);
                  return (
                    <button
                      key={para.id}
                      onClick={() => setActiveParaIdx(idx)}
                      style={{
                        padding: '0.2rem 0.55rem',
                        borderRadius: '7px',
                        border: isActive ? '2px solid var(--border-ink)' : '1px solid var(--border-ink)',
                        fontWeight: 900,
                        fontSize: '0.78rem',
                        backgroundColor: isActive ? pColor : 'var(--surface-alt)',
                        color: isActive ? (isDark ? '#F8FAFC' : '#1E1E24') : 'var(--text-secondary)',
                        cursor: 'pointer'
                      }}
                    >
                      P{idx + 1}
                    </button>
                  );
                })}
              </div>

              <button
                disabled={activeParaIdx === currentBlueprint.paragraphs.length - 1}
                onClick={() => setActiveParaIdx((i) => Math.min(currentBlueprint.paragraphs.length - 1, i + 1))}
                className="retro-btn-outline"
                style={{
                  padding: '0.2rem 0.45rem',
                  borderRadius: '8px',
                  opacity: activeParaIdx === currentBlueprint.paragraphs.length - 1 ? 0.35 : 1
                }}
                title="Next Paragraph"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Right: Quick Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <ScribblePad
            mode="text"
            buttonLabel="✍️ Scribble"
            placeholder="Handwrite a phrase or sentence for the story..."
            onApply={handleScribbleStoryInput}
          />
          {activeMode !== 'upgrader' ? (
            <>
              <button
                onClick={handleRandomSpark}
                className="retro-btn-outline"
                style={{
                  padding: '0.25rem 0.65rem',
                  fontSize: '0.8rem',
                  backgroundColor: isDark ? '#2B1E05' : '#FCE3A1'
                }}
              >
                <Shuffle size={13} /> Spark
              </button>

              <button
                onClick={() => setSkeletonMode(!skeletonMode)}
                className="retro-btn-outline"
                style={{
                  padding: '0.25rem 0.65rem',
                  fontSize: '0.8rem',
                  backgroundColor: skeletonMode ? (isDark ? '#0C2314' : '#C7E0CD') : 'var(--surface)'
                }}
              >
                {skeletonMode ? <Eye size={13} /> : <EyeOff size={13} />}
                {skeletonMode ? 'Full Story' : '🫣 Skeleton'}
              </button>

              <button
                onClick={() =>
                  setNotebookModal({
                    open: true,
                    title: currentBlueprint.title,
                    task: 'Write your 4-paragraph story in your exercise book using the sentence frames on the Smartboard!',
                    checklist: [
                      '4 distinct paragraphs (Setting, Hero, Problem, Rescue)',
                      'Capital letters and full stops in every sentence',
                      'At least 1 line of dialogue ("...")',
                      'Rich descriptive adjectives'
                    ]
                  })
                }
                className="retro-btn-primary"
                style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', backgroundColor: 'var(--cobalt)' }}
              >
                <Pencil size={13} /> ✏️ Notebook (3m)
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAddCustom(!showAddCustom)}
              className="retro-btn-primary"
              style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', backgroundColor: 'var(--cobalt)' }}
            >
              <PlusCircle size={14} /> {showAddCustom ? 'Close Form' : '+ Add Class Sentence'}
            </button>
          )}
        </div>
      </div>

      {/* =========================================================
          2. MAIN STAGE: STORY ARCHITECT OR UPGRADER CLINIC
         ========================================================= */}
      {activeMode !== 'upgrader' && currentPara && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(340px, 1.15fr) 1fr',
            gap: '0.75rem',
            flex: 1,
            minHeight: 0
          }}
        >
          {/* Left Column: Active Paragraph Blocks */}
          <div
            className="retro-window study-scrollable"
            style={{
              backgroundColor: 'var(--surface)',
              border: '2.5px solid var(--border-ink)',
              borderRadius: '20px',
              boxShadow: '4px 4px 0px var(--shadow-ink)',
              padding: '1rem',
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
                  borderRadius: '12px',
                  padding: '0.5rem 0.85rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.75rem'
                }}
              >
                <strong style={{ fontSize: '0.96rem', color: isDark ? '#F8FAFC' : '#1E1E24' }}>
                  {currentPara.number}: {currentPara.name}
                </strong>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: isDark ? '#CBD5E1' : '#1E1E24' }}>
                  🎯 {currentPara.goal}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {currentPara.slots.map((slot) => {
                  const key = `${currentPara.id}_${slot.id}`;
                  const picked = selectedBlocks[key];

                  return (
                    <div key={slot.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.8rem', fontWeight: 800 }}>
                        <span style={{ color: 'var(--text-primary)' }}>🧩 {slot.label}</span>
                        <span
                          style={{
                            backgroundColor: 'var(--surface-alt)',
                            border: '1px solid var(--border-ink)',
                            padding: '0.1rem 0.4rem',
                            borderRadius: '5px',
                            color: 'var(--text-secondary)',
                            fontSize: '0.74rem'
                          }}
                        >
                          {slot.skeletonHint}
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
                                padding: '0.55rem 0.8rem',
                                fontSize: '0.92rem',
                                fontWeight: isSelected ? 800 : 600,
                                color: 'var(--text-primary)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                transition: 'all 0.1s ease'
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

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-ink)' }}>
              <button
                onClick={() => {
                  const next = { ...selectedBlocks };
                  delete next[`${currentPara.id}_s1`];
                  delete next[`${currentPara.id}_s2`];
                  setSelectedBlocks(next);
                }}
                className="retro-btn-outline"
                style={{ padding: '0.25rem 0.6rem', fontSize: '0.78rem' }}
              >
                <RotateCcw size={12} /> Clear {currentPara.number}
              </button>

              {activeParaIdx < currentBlueprint.paragraphs.length - 1 && (
                <button
                  onClick={() => setActiveParaIdx((i) => i + 1)}
                  className="retro-btn-primary"
                  style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', backgroundColor: 'var(--cobalt)' }}
                >
                  Next Paragraph →
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Story Canvas */}
          <div
            className="retro-window study-scrollable"
            style={{
              backgroundColor: 'var(--surface-alt)',
              border: '2.5px solid var(--border-ink)',
              borderRadius: '20px',
              boxShadow: '4px 4px 0px var(--shadow-ink)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <span className="retro-pill-dark" style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem' }}>
                {skeletonMode ? '🫣 SKELETON PROMPTS' : '📜 CLASS MASTERPIECE'}
              </span>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
                Section B • 10 Marks
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', flex: 1 }}>
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
                    <div style={{ fontSize: '0.68rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.2rem', display: 'flex', justifyContent: 'space-between' }}>
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
                      <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                        Tap options on the left to build this paragraph...
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODE 3: FIX WEAK STUDENT SENTENCES CLINIC (COMPACT VIEW)
         ========================================================= */}
      {activeMode === 'upgrader' && (
        <div className="study-scrollable" style={{ flex: 1, minHeight: 0, overflowY: 'auto', paddingRight: '0.3rem' }}>
          {/* Tucked Teacher Add Form */}
          {showAddCustom && (
            <div
              className="retro-window"
              style={{
                backgroundColor: 'var(--surface)',
                padding: '0.85rem 1rem',
                border: '2px solid var(--border-ink)',
                borderRadius: '16px',
                marginBottom: '0.85rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 900, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  👩‍🏫 Add Student Sentence to Upgrade Together on Smartboard:
                </span>
                <button
                  onClick={() => setShowAddCustom(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleAddCustomClinic} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.65rem', alignItems: 'end' }}>
                <div>
                  <label style={{ fontWeight: 800, fontSize: '0.74rem', display: 'block', marginBottom: '0.2rem', color: 'var(--text-secondary)' }}>
                    Original Draft from Book:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. the boy go to cave"
                    value={customWeak}
                    onChange={(e) => setCustomWeak(e.target.value)}
                    style={{ marginBottom: 0, padding: '0.45rem', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 800, fontSize: '0.74rem', display: 'block', marginBottom: '0.2rem', color: 'var(--text-secondary)' }}>
                    Upgraded Version:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bravely, the boy crept into the cave."
                    value={customFixed}
                    onChange={(e) => setCustomFixed(e.target.value)}
                    style={{ marginBottom: 0, padding: '0.45rem', fontSize: '0.85rem' }}
                  />
                </div>
                <button
                  type="submit"
                  className="retro-btn-primary"
                  style={{ backgroundColor: 'var(--cobalt)', height: '38px', padding: '0.35rem 0.75rem', fontSize: '0.82rem' }}
                >
                  Add to Board
                </button>
              </form>
            </div>
          )}

          {/* Upgrader Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '0.75rem' }}>
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
                    <span className="retro-pill-dark" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', marginBottom: '0.4rem' }}>
                      🛠️ CLINIC #{idx + 1}
                    </span>
                    <h4 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{clinic.title}</h4>
                    <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{clinic.weakProblem}</p>

                    <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                      {clinic.stages.map((st, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => setUpgraderStages({ ...upgraderStages, [clinic.id]: sIdx })}
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            padding: '0.2rem 0.45rem',
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
                          fontSize: '1rem',
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
                          marginBottom: '0.3rem'
                        }}
                      >
                        &ldquo;{currentStage.text}&rdquo;
                      </div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', borderTop: '1px dashed var(--border-ink)', paddingTop: '0.3rem' }}>
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
                    style={{ width: '100%', justifyContent: 'center', padding: '0.35rem', fontSize: '0.8rem' }}
                  >
                    <Wand2 size={13} />
                    {stageIdx < clinic.stages.length - 1 ? '✨ Tap to Upgrade Sentence!' : '🔄 Back to Draft'}
                  </button>
                </div>
              );
            })}
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
