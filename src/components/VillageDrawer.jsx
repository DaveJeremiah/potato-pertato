import React, { useState } from 'react';
import { useVillage } from '../context/VillageContext';
import { useTheme } from '../context/ThemeContext';
import {
  X,
  Sparkles,
  Trophy,
  Dices,
  ShieldCheck,
  ChevronRight,
  Flame,
  Award,
  BookOpen,
  Volume2
} from 'lucide-react';

export default function VillageDrawer({ isOpen, onClose }) {
  const { isDark } = useTheme();
  const {
    squads,
    totalBerries,
    targetBerries,
    isCurseBroken,
    awardBerries,
    ancientCode,
    history
  } = useVillage();

  const [activeTab, setActiveTab] = useState('baskets'); // 'baskets' | 'summoner' | 'code' | 'log'
  const [summonMode, setSummonMode] = useState('student'); // 'student' | 'squad'
  const [selectedPick, setSelectedPick] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showChantSquadId, setShowChantSquadId] = useState(null);

  if (!isOpen) return null;

  // Milestone message for Gargamel's curse
  const getCurseStatus = () => {
    if (totalBerries >= 20) {
      return {
        badge: '🏆 CURSE BROKEN!',
        text: 'Gargamel is defeated! Friday Movie / Story Picnic unlocked for the ENTIRE class!',
        color: '#10B981',
        bg: isDark ? '#064E3B' : '#D1FAE5'
      };
    }
    if (totalBerries >= 15) {
      return {
        badge: '⚡ POWER SURGING',
        text: 'Only a few berries left! Gargamel’s curse is breaking down rapidly!',
        color: '#F59E0B',
        bg: isDark ? '#78350F' : '#FEF3C7'
      };
    }
    if (totalBerries >= 10) {
      return {
        badge: '🛡️ HALFWAY SHIELD',
        text: 'Village defenses fully activated! Squads are gaining momentum!',
        color: '#3B82F6',
        bg: isDark ? '#1E3A8A' : '#DBEAFE'
      };
    }
    return {
      badge: '🧙‍♂️ GARGAMEL’S TRAP ACTIVE',
      text: 'Crack daily riddles & fix exam sentences to charge the 20-berry wall meter!',
      color: '#EF4444',
      bg: isDark ? '#7F1D1D' : '#FEE2E2'
    };
  };

  const status = getCurseStatus();
  const progressPercent = Math.min(100, Math.round((totalBerries / targetBerries) * 100));

  // "Who's Up?" Smartboard Randomizer
  const handleSummon = () => {
    setIsSpinning(true);
    setSelectedPick(null);

    let counter = 0;
    const allMembersWithSquad = squads.flatMap((sq) =>
      sq.members.map((m) => ({ ...m, squadName: sq.name, squadColor: sq.accentColor, mascot: sq.mascot }))
    );

    const spinInterval = setInterval(() => {
      counter++;
      if (summonMode === 'squad') {
        const randSq = squads[Math.floor(Math.random() * squads.length)];
        setSelectedPick({ type: 'squad', data: randSq });
      } else {
        const randM = allMembersWithSquad[Math.floor(Math.random() * allMembersWithSquad.length)];
        setSelectedPick({ type: 'student', data: randM });
      }

      if (counter >= 12) {
        clearInterval(spinInterval);
        setIsSpinning(false);
      }
    }, 75);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 400,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(3px)'
      }}
      onClick={onClose}
    >
      {/* Slide-in Drawer Window */}
      <div
        className="retro-window"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '540px',
          maxWidth: '100vw',
          height: '100%',
          backgroundColor: 'var(--surface)',
          borderLeft: '3px solid var(--border-ink)',
          boxShadow: '-8px 0px 0px var(--shadow-ink)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '1rem 1.25rem',
            borderBottom: '2.5px solid var(--border-ink)',
            backgroundColor: isDark ? '#141724' : '#FFFDF9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
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
              🫐
            </span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  Smurf Village Defense HUD
                </span>
                <span className="retro-pill-dark" style={{ fontSize: '0.65rem' }}>
                  GRADE 4
                </span>
              </div>
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                4 Squads United • Defeat Gargamel's Weekly Curse
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '2px solid var(--border-ink)',
              borderRadius: '999px',
              padding: '0.35rem',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              display: 'flex',
              backgroundColor: 'var(--surface-alt)'
            }}
            title="Close Village HUD"
          >
            <X size={18} />
          </button>
        </div>

        {/* Master Wall Meter Banner */}
        <div
          style={{
            padding: '0.85rem 1.25rem',
            borderBottom: '2px solid var(--border-ink)',
            backgroundColor: status.bg
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  color: status.color,
                  letterSpacing: '0.04em'
                }}
              >
                {status.badge}
              </span>
            </div>
            <div style={{ fontSize: '0.86rem', fontWeight: 900, color: 'var(--text-primary)' }}>
              🫐 {totalBerries} / {targetBerries} Berries
            </div>
          </div>

          {/* Meter Bar */}
          <div
            style={{
              height: '14px',
              backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : '#FFFFFF',
              borderRadius: '999px',
              border: '2px solid var(--border-ink)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                backgroundColor: totalBerries >= 20 ? '#10B981' : '#3B82F6',
                borderRadius: '999px',
                transition: 'width 0.4s ease'
              }}
            />
          </div>

          <div
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginTop: '0.35rem'
            }}
          >
            {status.text}
          </div>
        </div>

        {/* Navigation Tabs inside Drawer */}
        <div
          style={{
            display: 'flex',
            borderBottom: '2px solid var(--border-ink)',
            backgroundColor: 'var(--surface-alt)'
          }}
        >
          {[
            { id: 'baskets', label: '🫐 Squad Baskets', icon: Trophy },
            { id: 'summoner', label: '🎲 Who’s Up?', icon: Dices },
            { id: 'code', label: '📜 Village Code', icon: ShieldCheck },
            { id: 'log', label: '⏱️ Berry Log', icon: BookOpen }
          ].map((tab) => {
            const active = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '0.65rem 0.4rem',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  border: 'none',
                  borderBottom: active ? '3px solid var(--cobalt)' : '3px solid transparent',
                  backgroundColor: active ? 'var(--surface)' : 'transparent',
                  color: active ? 'var(--cobalt)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem'
                }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}
        >
          {/* TAB 1: SQUAD BASKETS & POINTS */}
          {activeTab === 'baskets' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
                  TAP TO AWARD BERRIES (LAW 02: NO DEDUCTIONS)
                </span>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--accent-green)' }}>
                  ✨ Mistakes = Oops Berries!
                </span>
              </div>

              {squads.map((sq) => {
                const isChantOpen = showChantSquadId === sq.id;
                return (
                  <div
                    key={sq.id}
                    className="retro-card"
                    style={{
                      padding: '0.85rem',
                      borderRadius: '16px',
                      border: `2px solid var(--border-ink)`,
                      backgroundColor: isDark ? sq.bgDark : sq.bgLight,
                      boxShadow: '4px 4px 0px var(--shadow-ink)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.6rem'
                    }}
                  >
                    {/* Squad Title Bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        {sq.image ? (
                          <img
                            src={sq.image}
                            alt={sq.mascot}
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                              border: '2px solid var(--border-ink)'
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '50%',
                              backgroundColor: sq.accentColor,
                              border: '2px solid var(--border-ink)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.1rem',
                              fontWeight: 900,
                              color: '#FFFFFF'
                            }}
                          >
                            🍀
                          </div>
                        )}

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span style={{ fontWeight: 900, fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                              {sq.name}
                            </span>
                            <span
                              style={{
                                fontSize: '0.66rem',
                                fontWeight: 800,
                                backgroundColor: sq.accentColor,
                                color: '#FFFFFF',
                                padding: '0.1rem 0.4rem',
                                borderRadius: '999px'
                              }}
                            >
                              {sq.mascot}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                            {sq.title}
                          </div>
                        </div>
                      </div>

                      {/* Squad Berries Tally */}
                      <div
                        style={{
                          backgroundColor: 'var(--surface)',
                          border: '2px solid var(--border-ink)',
                          borderRadius: '12px',
                          padding: '0.3rem 0.65rem',
                          textAlign: 'center',
                          boxShadow: '2px 2px 0px var(--shadow-ink)'
                        }}
                      >
                        <div style={{ fontSize: '0.62rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
                          BASKET
                        </div>
                        <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                          🫐 {sq.berries || 0}
                        </div>
                      </div>
                    </div>

                    {/* Member Avatars / Names Bar */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', alignItems: 'center' }}>
                      {sq.members.map((m) => (
                        <span
                          key={m.id}
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            padding: '0.15rem 0.45rem',
                            borderRadius: '999px',
                            backgroundColor: 'var(--surface)',
                            border: '1.5px solid var(--border-ink)',
                            color: 'var(--text-primary)'
                          }}
                        >
                          {m.badge.includes('CAPTAIN') ? '👑 ' : m.badge.includes('ANCHOR') ? '★ ' : ''}
                          {m.name.split(' ')[0]}
                        </span>
                      ))}
                    </div>

                    {/* One-Tap Smartboard Berry Buttons */}
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => awardBerries(sq.id, 1, 'Quest Solved')}
                        className="retro-btn-outline"
                        style={{
                          flex: 1,
                          padding: '0.38rem 0.5rem',
                          fontSize: '0.75rem',
                          borderRadius: '10px',
                          backgroundColor: 'var(--surface)',
                          borderColor: 'var(--border-ink)',
                          justifyContent: 'center'
                        }}
                      >
                        🫐 +1 Solve
                      </button>

                      <button
                        type="button"
                        onClick={() => awardBerries(sq.id, 1, 'Oops Bonus! (Self-Corrected Error)')}
                        className="retro-btn-outline"
                        style={{
                          flex: 1,
                          padding: '0.38rem 0.5rem',
                          fontSize: '0.75rem',
                          borderRadius: '10px',
                          backgroundColor: isDark ? '#3D2A00' : '#FEF3C7',
                          borderColor: '#F59E0B',
                          color: isDark ? '#FDE68A' : '#92400E',
                          justifyContent: 'center'
                        }}
                        title="Awarded when squad makes a mistake and spots how to fix it!"
                      >
                        ✨ +1 Oops!
                      </button>

                      <button
                        type="button"
                        onClick={() => awardBerries(sq.id, 2, 'Grammar Evidence & Proof')}
                        className="retro-btn-outline"
                        style={{
                          flex: 1,
                          padding: '0.38rem 0.5rem',
                          fontSize: '0.75rem',
                          borderRadius: '10px',
                          backgroundColor: isDark ? '#064E3B' : '#D1FAE5',
                          borderColor: '#10B981',
                          color: isDark ? '#A7F3D0' : '#065F46',
                          justifyContent: 'center'
                        }}
                        title="Deep analytical grammar evidence or strong sentence defense!"
                      >
                        💡 +2 Proof
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowChantSquadId(isChantOpen ? null : sq.id)}
                        style={{
                          padding: '0.38rem 0.6rem',
                          borderRadius: '10px',
                          border: '1.5px solid var(--border-ink)',
                          backgroundColor: 'var(--surface-alt)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          color: 'var(--text-secondary)'
                        }}
                        title="Show Squad Battle Chant"
                      >
                        <Volume2 size={14} />
                      </button>
                    </div>

                    {/* Expandable Squad Battle Chant */}
                    {isChantOpen && (
                      <div
                        style={{
                          backgroundColor: 'var(--surface)',
                          border: '1.5px dashed var(--border-ink)',
                          borderRadius: '10px',
                          padding: '0.45rem 0.65rem',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          fontStyle: 'italic'
                        }}
                      >
                        📣 Battle Chant: "{sq.chant}"
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: "WHO'S UP?" SMURF SUMMONER */}
          {activeTab === 'summoner' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', textAlign: 'center' }}>
              <div
                style={{
                  backgroundColor: 'var(--card-purple)',
                  border: '2px solid var(--border-ink)',
                  borderRadius: '16px',
                  padding: '1rem',
                  width: '100%',
                  boxShadow: '4px 4px 0px var(--shadow-ink)'
                }}
              >
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  🎲 Smurf Summoner
                </div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  Fair Smartboard turns • Pick who solves the next question!
                </div>

                {/* Mode Selector */}
                <div
                  style={{
                    display: 'inline-flex',
                    backgroundColor: 'var(--surface)',
                    border: '2px solid var(--border-ink)',
                    borderRadius: '999px',
                    padding: '0.25rem',
                    margin: '0.85rem 0 0.4rem 0',
                    gap: '0.3rem'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setSummonMode('student')}
                    style={{
                      border: 'none',
                      backgroundColor: summonMode === 'student' ? 'var(--cobalt)' : 'transparent',
                      color: summonMode === 'student' ? '#FFFFFF' : 'var(--text-secondary)',
                      fontWeight: 800,
                      fontSize: '0.78rem',
                      padding: '0.3rem 0.85rem',
                      borderRadius: '999px',
                      cursor: 'pointer'
                    }}
                  >
                    👤 Pick Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setSummonMode('squad')}
                    style={{
                      border: 'none',
                      backgroundColor: summonMode === 'squad' ? 'var(--cobalt)' : 'transparent',
                      color: summonMode === 'squad' ? '#FFFFFF' : 'var(--text-secondary)',
                      fontWeight: 800,
                      fontSize: '0.78rem',
                      padding: '0.3rem 0.85rem',
                      borderRadius: '999px',
                      cursor: 'pointer'
                    }}
                  >
                    🛡️ Pick Squad
                  </button>
                </div>
              </div>

              {/* Big Summon Button */}
              <button
                type="button"
                onClick={handleSummon}
                disabled={isSpinning}
                className="retro-btn-primary"
                style={{
                  fontSize: '1.05rem',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '999px',
                  backgroundColor: isSpinning ? '#94A3B8' : '#2329D6',
                  width: '100%',
                  justifyContent: 'center',
                  boxShadow: '4px 4px 0px var(--shadow-ink)'
                }}
              >
                <Dices size={20} />
                <span>{isSpinning ? 'Summoning...' : `Spin & Pick ${summonMode === 'student' ? 'Student' : 'Squad'}!`}</span>
              </button>

              {/* Selected Result Card */}
              {selectedPick && (
                <div
                  className="retro-card"
                  style={{
                    width: '100%',
                    padding: '1.25rem',
                    borderRadius: '20px',
                    border: '3px solid var(--border-ink)',
                    backgroundColor:
                      selectedPick.type === 'student'
                        ? isDark
                          ? '#1E1B4B'
                          : '#EEF2FF'
                        : isDark
                          ? selectedPick.data.bgDark
                          : selectedPick.data.bgLight,
                    boxShadow: '6px 6px 0px var(--shadow-ink)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    animation: isSpinning ? 'none' : 'popIn 0.3s ease'
                  }}
                >
                  <span style={{ fontSize: '0.74rem', fontWeight: 900, color: 'var(--cobalt)', letterSpacing: '0.04em' }}>
                    ✦ SMARTBOARD TURN UNLOCKED ✦
                  </span>

                  {selectedPick.type === 'student' ? (
                    <>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                        {selectedPick.data.name}
                      </div>
                      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            padding: '0.2rem 0.6rem',
                            borderRadius: '999px',
                            backgroundColor: selectedPick.data.squadColor,
                            color: '#FFFFFF'
                          }}
                        >
                          {selectedPick.data.squadName}
                        </span>
                        <span className="retro-pill-dark" style={{ fontSize: '0.72rem' }}>
                          {selectedPick.data.role}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                        Step up to the Smartboard! Your squad is cheering for you!
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                        {selectedPick.data.name}
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
                        {selectedPick.data.title}
                      </div>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          fontStyle: 'italic',
                          marginTop: '0.35rem',
                          padding: '0.4rem 0.8rem',
                          backgroundColor: 'var(--surface)',
                          borderRadius: '10px',
                          border: '1.5px dashed var(--border-ink)'
                        }}
                      >
                        📣 "{selectedPick.data.chant}"
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ANCIENT VILLAGE CODE */}
          {activeTab === 'code' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
                THE 3 SACRED LAWS OF GRADE 4 SMURF VILLAGE
              </div>

              {ancientCode.map((law, idx) => (
                <div
                  key={idx}
                  className="retro-card"
                  style={{
                    padding: '0.95rem',
                    borderRadius: '16px',
                    border: '2px solid var(--border-ink)',
                    backgroundColor:
                      idx === 0
                        ? isDark
                          ? '#3D2A00'
                          : '#FEF3C7'
                        : idx === 1
                          ? isDark
                            ? '#064E3B'
                            : '#D1FAE5'
                          : isDark
                            ? '#1E1B4B'
                            : '#EEF2FF',
                    boxShadow: '3px 3px 0px var(--shadow-ink)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="retro-pill-dark" style={{ fontSize: '0.65rem' }}>
                      {law.law}
                    </span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                      {law.title}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--cobalt)' }}>
                    {law.subtitle}
                  </div>
                  <div style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.45 }}>
                    {law.desc}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: BERRY HISTORY LOG */}
          {activeTab === 'log' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
                RECENT BERRIES EARNED
              </div>

              {history.length === 0 ? (
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', padding: '2rem 1rem', textAlign: 'center' }}>
                  No berries awarded yet this session. Tap a squad to award their first berry!
                </div>
              ) : (
                history.map((h) => (
                  <div
                    key={h.id}
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '12px',
                      backgroundColor: 'var(--surface)',
                      border: '1.5px solid var(--border-ink)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.84rem', color: 'var(--text-primary)' }}>
                        {h.squadName}: <span style={{ fontWeight: 600 }}>{h.reason}</span>
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                        {h.timestamp}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '0.86rem',
                        fontWeight: 900,
                        color: 'var(--cobalt)',
                        backgroundColor: 'var(--card-purple)',
                        border: '1px solid var(--border-ink)',
                        borderRadius: '8px',
                        padding: '0.2rem 0.5rem'
                      }}
                    >
                      +{h.amount} 🫐
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div
          style={{
            padding: '0.75rem 1.25rem',
            borderTop: '2px solid var(--border-ink)',
            backgroundColor: 'var(--surface-alt)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Class Battle Cry: <strong style={{ color: 'var(--text-primary)' }}>"SMURF IT, DONE!"</strong>
          </div>
          <button
            onClick={onClose}
            className="retro-btn-outline"
            style={{
              padding: '0.3rem 0.75rem',
              fontSize: '0.78rem',
              borderRadius: '999px'
            }}
          >
            Resume Lesson
          </button>
        </div>
      </div>
    </div>
  );
}
