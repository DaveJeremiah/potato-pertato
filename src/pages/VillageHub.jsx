import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useVillage } from '../context/VillageContext';
import { useTheme } from '../context/ThemeContext';
import {
  Trophy,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  UserPlus,
  Trash2,
  Volume2,
  Dices,
  Flame,
  Award,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function VillageHub() {
  const { isDark } = useTheme();
  const {
    squads,
    totalBerries,
    targetBerries,
    awardBerries,
    resetWeeklyBerries,
    addMember,
    removeMember,
    resetToDefaultRoster,
    captains,
    ancientCode
  } = useVillage();

  const [activeTab, setActiveTab] = useState('squads'); // 'squads' | 'roadmap' | 'code' | 'manage'
  const [editingSquadId, setEditingSquadId] = useState(null);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentRole, setNewStudentRole] = useState('Grammar Scout');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [battleCryAlert, setBattleCryAlert] = useState(false);

  const progressPercent = Math.min(100, Math.round((totalBerries / targetBerries) * 100));

  const triggerBattleCry = () => {
    setBattleCryAlert(true);
    setTimeout(() => setBattleCryAlert(false), 3500);
  };

  const handleAddStudent = (squadId) => {
    if (!newStudentName.trim()) return;
    addMember(squadId, newStudentName.trim(), newStudentRole, '✦ MEMBER');
    setNewStudentName('');
  };

  return (
    <div className="page-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem 1rem 4rem 1rem' }}>
      {/* Hero Header */}
      <div
        className="retro-window"
        style={{
          padding: '1.75rem',
          backgroundColor: isDark ? '#16192B' : '#FFFDF9',
          border: '3px solid var(--border-ink)',
          borderRadius: '24px',
          boxShadow: '8px 8px 0px var(--shadow-ink)',
          marginBottom: '1.75rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
              <span className="retro-pill-dark" style={{ fontSize: '0.75rem', padding: '0.2rem 0.65rem' }}>
                GRADE 4 CAMBRIDGE ENGLISH
              </span>
              <span
                style={{
                  backgroundColor: 'var(--card-purple)',
                  border: '1.5px solid var(--border-ink)',
                  borderRadius: '999px',
                  padding: '0.2rem 0.65rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)'
                }}
              >
                CLASSROOM SQUAD QUEST
              </span>
            </div>

            <h1
              style={{
                fontSize: '2.3rem',
                fontWeight: 900,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                margin: 0,
                lineHeight: 1.15
              }}
            >
              Smurf Village Headquarters
            </h1>
            <p
              style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--text-secondary)',
                margin: '0.4rem 0 0 0'
              }}
            >
              Defeat Gargamel's Weekly Grammar Curse • 4 Squads United in Classroom Practice
            </p>
          </div>

          {/* Battle Cry Action Button */}
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={triggerBattleCry}
              className="retro-btn-primary"
              style={{
                backgroundColor: '#2329D6',
                borderRadius: '999px',
                padding: '0.65rem 1.25rem',
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}
            >
              <Volume2 size={18} />
              <span>Battle Cry: "SMURF IT, DONE!"</span>
            </button>

            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="retro-btn-outline"
              style={{
                borderRadius: '999px',
                padding: '0.65rem 1rem',
                fontSize: '0.85rem'
              }}
              title="Reset weekly berries for a new week"
            >
              <RotateCcw size={15} />
              <span>Reset Week</span>
            </button>
          </div>
        </div>

        {/* Battle Cry Alert Banner */}
        {battleCryAlert && (
          <div
            style={{
              marginTop: '1.25rem',
              backgroundColor: 'var(--card-yellow)',
              border: '2.5px solid var(--border-ink)',
              borderRadius: '16px',
              padding: '0.85rem 1.25rem',
              boxShadow: '4px 4px 0px var(--shadow-ink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              animation: 'popIn 0.3s ease'
            }}
          >
            <Sparkles size={20} color="#2329D6" />
            <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
              📣 CLASS CHANT: "SMURF IT, DONE!" — Break Gargamel’s Curse!
            </span>
            <Sparkles size={20} color="#2329D6" />
          </div>
        )}

        {/* Supreme Village Leaders (Class Captains) */}
        <div
          style={{
            marginTop: '1.5rem',
            paddingTop: '1.25rem',
            borderTop: '2px dashed var(--border-ink)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem'
          }}
        >
          {captains.map((cap) => (
            <div
              key={cap.roleId}
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'var(--surface-alt)',
                border: '2px solid var(--border-ink)',
                borderRadius: '16px',
                padding: '0.85rem 1.1rem',
                display: 'flex',
                gap: '0.85rem',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  fontSize: '1.8rem',
                  backgroundColor: 'var(--surface)',
                  border: '2px solid var(--border-ink)',
                  borderRadius: '12px',
                  width: '46px',
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {cap.roleId === 'papa' ? '🧙‍♂️' : '🌸'}
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--cobalt)' }}>
                  {cap.title}
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  {cap.name}
                </div>
                <div style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                  {cap.traits}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MASTER WALL METER (0 - 20 BERRIES) */}
      <div
        className="retro-window"
        style={{
          padding: '1.5rem',
          backgroundColor: isDark ? '#141724' : '#FFFFFF',
          border: '3px solid var(--border-ink)',
          borderRadius: '24px',
          boxShadow: '7px 7px 0px var(--shadow-ink)',
          marginBottom: '1.75rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '0.85rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="retro-pill-dark" style={{ fontSize: '0.72rem' }}>
                ⚡ THE MASTER WALL METER
              </span>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
                Target: 20 Berries by Thursday
              </span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              {totalBerries >= 20 ? (
                <span style={{ color: '#10B981' }}>🏆 VICTORY! Gargamel’s Curse Shattered!</span>
              ) : totalBerries >= 15 ? (
                <span style={{ color: '#F59E0B' }}>⚡ Power Surging — Final Push!</span>
              ) : totalBerries >= 10 ? (
                <span style={{ color: '#3B82F6' }}>🛡️ Village Defenses Active!</span>
              ) : (
                <span style={{ color: '#EF4444' }}>🧙‍♂️ Gargamel’s Weekly Curse Active</span>
              )}
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--surface)',
              border: '2.5px solid var(--border-ink)',
              borderRadius: '16px',
              padding: '0.5rem 1.25rem',
              textAlign: 'center',
              boxShadow: '3px 3px 0px var(--shadow-ink)'
            }}
          >
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
              VILLAGE SMURFBERRIES
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--cobalt)' }}>
              🫐 {totalBerries} / {targetBerries}
            </div>
          </div>
        </div>

        {/* Visual Slider Peg Bar */}
        <div
          style={{
            position: 'relative',
            height: '24px',
            backgroundColor: isDark ? '#1E293B' : '#E2E8F0',
            borderRadius: '999px',
            border: '2.5px solid var(--border-ink)',
            overflow: 'hidden',
            marginBottom: '1rem'
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              backgroundColor: totalBerries >= 20 ? '#10B981' : totalBerries >= 15 ? '#F59E0B' : '#3B82F6',
              borderRadius: '999px',
              transition: 'width 0.4s ease'
            }}
          />
        </div>

        {/* Milestone Pegs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.5rem',
            textAlign: 'center'
          }}
        >
          {[
            { berries: '0', label: 'Starting Baseline', tag: '🧙‍♂️ Curse Trap' },
            { berries: '10', label: 'Halfway Shield', tag: '🛡️ Defenses Up' },
            { berries: '15', label: 'Power Surging', tag: '⚡ Weakening' },
            { berries: '20', label: 'Curse Broken', tag: '🏆 Friday Party!' }
          ].map((m, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'var(--surface-alt)',
                border: '1.5px solid var(--border-ink)',
                borderRadius: '12px',
                padding: '0.5rem 0.25rem'
              }}
            >
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                {m.berries} Berries
              </div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--cobalt)' }}>
                {m.tag}
              </div>
              <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.6rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap'
        }}
      >
        {[
          { id: 'squads', label: '🛡️ The 4 Squads & Rosters' },
          { id: 'code', label: '📜 The Ancient Village Code' },
          { id: 'roadmap', label: '🗺️ Weekly Language Quests' },
          { id: 'manage', label: '⚙️ Manage Rosters' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="retro-btn-outline"
            style={{
              padding: '0.55rem 1.1rem',
              fontSize: '0.88rem',
              borderRadius: '999px',
              backgroundColor: activeTab === tab.id ? 'var(--cobalt)' : 'var(--surface)',
              color: activeTab === tab.id ? '#FFFFFF' : 'var(--text-primary)',
              borderColor: 'var(--border-ink)',
              boxShadow: activeTab === tab.id ? '3px 3px 0px var(--border-ink)' : '2px 2px 0px var(--shadow-ink)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: THE 4 SQUADS */}
      {activeTab === 'squads' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {squads.map((sq) => (
            <div
              key={sq.id}
              className="retro-card"
              style={{
                backgroundColor: isDark ? sq.bgDark : sq.bgLight,
                border: '3px solid var(--border-ink)',
                borderRadius: '24px',
                padding: '1.25rem',
                boxShadow: '6px 6px 0px var(--shadow-ink)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem'
              }}
            >
              <div>
                {/* Squad Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {sq.image ? (
                      <img
                        src={sq.image}
                        alt={sq.mascot}
                        style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2.5px solid var(--border-ink)'
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '50%',
                          backgroundColor: sq.accentColor,
                          border: '2.5px solid var(--border-ink)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          color: '#FFFFFF'
                        }}
                      >
                        🍀
                      </div>
                    )}
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                        {sq.name}
                      </h3>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          backgroundColor: sq.accentColor,
                          color: '#FFFFFF',
                          padding: '0.12rem 0.5rem',
                          borderRadius: '999px'
                        }}
                      >
                        {sq.mascot}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: 'var(--surface)',
                      border: '2px solid var(--border-ink)',
                      borderRadius: '14px',
                      padding: '0.35rem 0.8rem',
                      textAlign: 'center',
                      boxShadow: '2px 2px 0px var(--shadow-ink)'
                    }}
                  >
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
                      BERRIES
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                      🫐 {sq.berries || 0}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  {sq.title}
                </div>
                <div style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                  {sq.specialty}
                </div>

                {/* Battle Chant Pill */}
                <div
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '1.5px dashed var(--border-ink)',
                    borderRadius: '12px',
                    padding: '0.55rem 0.75rem',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    fontStyle: 'italic',
                    marginBottom: '1rem'
                  }}
                >
                  📣 "{sq.chant}"
                </div>

                {/* Member Roster with Badges */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.74rem', fontWeight: 900, color: 'var(--text-secondary)', marginBottom: '0.45rem', letterSpacing: '0.04em' }}>
                    SQUAD ROSTER & ROLES
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {sq.members.map((m) => (
                      <div
                        key={m.id}
                        style={{
                          backgroundColor: 'var(--surface)',
                          border: '1.5px solid var(--border-ink)',
                          borderRadius: '10px',
                          padding: '0.4rem 0.65rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <span style={{ fontWeight: 800, fontSize: '0.84rem', color: 'var(--text-primary)' }}>
                          {m.name}
                        </span>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                          <span
                            style={{
                              fontSize: '0.68rem',
                              fontWeight: 800,
                              padding: '0.1rem 0.4rem',
                              borderRadius: '999px',
                              backgroundColor: m.badge.includes('CAPTAIN')
                                ? '#FBBF24'
                                : m.badge.includes('ANCHOR')
                                  ? sq.accentColor
                                  : 'var(--surface-alt)',
                              color: m.badge.includes('CAPTAIN') || m.badge.includes('ANCHOR') ? '#000000' : 'var(--text-secondary)'
                            }}
                          >
                            {m.badge}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                            {m.role}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Award Berries Buttons */}
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  SMARTBOARD POINT AWARDS
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => awardBerries(sq.id, 1, 'Quest Solved')}
                    className="retro-btn-outline"
                    style={{
                      flex: 1,
                      padding: '0.45rem',
                      fontSize: '0.78rem',
                      borderRadius: '10px',
                      backgroundColor: 'var(--surface)',
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
                      padding: '0.45rem',
                      fontSize: '0.78rem',
                      borderRadius: '10px',
                      backgroundColor: isDark ? '#3D2A00' : '#FEF3C7',
                      borderColor: '#F59E0B',
                      color: isDark ? '#FDE68A' : '#92400E',
                      justifyContent: 'center'
                    }}
                  >
                    ✨ +1 Oops!
                  </button>
                  <button
                    type="button"
                    onClick={() => awardBerries(sq.id, 2, 'Grammar Evidence & Proof')}
                    className="retro-btn-outline"
                    style={{
                      flex: 1,
                      padding: '0.45rem',
                      fontSize: '0.78rem',
                      borderRadius: '10px',
                      backgroundColor: isDark ? '#064E3B' : '#D1FAE5',
                      borderColor: '#10B981',
                      color: isDark ? '#A7F3D0' : '#065F46',
                      justifyContent: 'center'
                    }}
                  >
                    💡 +2 Proof
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 2: THE ANCIENT VILLAGE CODE */}
      {activeTab === 'code' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {ancientCode.map((law, idx) => (
            <div
              key={idx}
              className="retro-window"
              style={{
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
                border: '3px solid var(--border-ink)',
                borderRadius: '24px',
                padding: '1.5rem',
                boxShadow: '6px 6px 0px var(--shadow-ink)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <span className="retro-pill-dark" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                  {law.law}
                </span>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  {law.title}
                </span>
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--cobalt)' }}>
                {law.subtitle}
              </div>
              <p style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5, margin: 0 }}>
                {law.desc}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 3: WEEKLY LANGUAGE QUEST ROADMAP */}
      {activeTab === 'roadmap' && (
        <div
          className="retro-window"
          style={{
            backgroundColor: isDark ? '#141724' : '#FFFFFF',
            border: '3px solid var(--border-ink)',
            borderRadius: '24px',
            padding: '1.5rem',
            boxShadow: '6px 6px 0px var(--shadow-ink)'
          }}
        >
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '0 0 1rem 0', color: 'var(--text-primary)' }}>
            🗺️ 5-Day Curse-Breaking Campaign
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              {
                day: 'SUNDAY',
                title: 'Gargamel’s Daily Whiteboard Riddle',
                badge: 'IDENTIFY TRAP',
                desc: 'Gargamel places a tricky sentence on the board. Squads investigate during break and spot his disguise (e.g. statement disguised with a fake question mark!).'
              },
              {
                day: 'MONDAY',
                title: 'The Great Debate: Phrase vs Complete Sentence',
                badge: 'DEFEND WITH PROOF',
                desc: 'Phrase or Complete Sentence? Squads decide who is right (Papa Smurf or Gargamel) and cite grammatical evidence (proving a word clump lacks an action verb).'
              },
              {
                day: 'TUESDAY',
                title: 'Punctuation Fix-It (Surgery Day)',
                badge: 'RESTORE ORDER',
                desc: 'Gargamel stole capitals and end marks. Squads put his sentence in prison by restoring true punctuation in the Punctuation Clinic!'
              },
              {
                day: 'WEDNESDAY',
                title: 'Writing Village: 4 Sentence Types',
                badge: 'CREATE & CONQUER',
                desc: 'Each squad writes ONE collaborative report card containing all 4 sentence types (Statement, Question, Command & Exclamation). Every student writes one sentence!'
              },
              {
                day: 'THURSDAY',
                title: 'Curse-Breaker Day & Victory Celebration',
                badge: 'CELEBRATE VICTORY',
                desc: 'Captains count the total berries! If the village hits 20 berries, Gargamel is banished and the entire class celebrates Friday Movie/Story Picnic!'
              }
            ].map((q, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '2px solid var(--border-ink)',
                  borderRadius: '16px',
                  padding: '1rem',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start'
                }}
              >
                <span
                  style={{
                    backgroundColor: 'var(--card-purple)',
                    border: '1.5px solid var(--border-ink)',
                    borderRadius: '10px',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.8rem',
                    fontWeight: 900,
                    color: 'var(--text-primary)',
                    flexShrink: 0
                  }}
                >
                  {q.day}
                </span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 900, fontSize: '1rem', color: 'var(--text-primary)' }}>
                      {q.title}
                    </span>
                    <span className="retro-pill-dark" style={{ fontSize: '0.68rem' }}>
                      {q.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    {q.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: MANAGE ROSTERS */}
      {activeTab === 'manage' && (
        <div
          className="retro-window"
          style={{
            backgroundColor: isDark ? '#141724' : '#FFFFFF',
            border: '3px solid var(--border-ink)',
            borderRadius: '24px',
            padding: '1.5rem',
            boxShadow: '6px 6px 0px var(--shadow-ink)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
                Roster & Table Group Editor
              </h2>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Customize student names, reassign tables, or add new students. Saved locally in your browser.
              </p>
            </div>

            <button
              type="button"
              onClick={resetToDefaultRoster}
              className="retro-btn-outline"
              style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem', borderRadius: '999px' }}
            >
              Reset to Default Smurf Rosters
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {squads.map((sq) => (
              <div
                key={sq.id}
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '2px solid var(--border-ink)',
                  borderRadius: '16px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 900, fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {sq.name} ({sq.members.length})
                  </span>
                  <span style={{ fontSize: '0.74rem', color: sq.accentColor, fontWeight: 800 }}>
                    {sq.mascot}
                  </span>
                </div>

                {/* Member list with delete */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {sq.members.map((m) => (
                    <div
                      key={m.id}
                      style={{
                        backgroundColor: 'var(--surface-alt)',
                        border: '1px solid var(--border-ink)',
                        borderRadius: '8px',
                        padding: '0.3rem 0.6rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                          {m.name}
                        </span>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', marginLeft: '0.4rem' }}>
                          ({m.role})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeMember(sq.id, m.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#EF4444',
                          cursor: 'pointer',
                          padding: '0.2rem',
                          display: 'flex'
                        }}
                        title="Remove student"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add member row */}
                <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.25rem' }}>
                  <input
                    type="text"
                    placeholder="New student name..."
                    value={editingSquadId === sq.id ? newStudentName : ''}
                    onChange={(e) => {
                      setEditingSquadId(sq.id);
                      setNewStudentName(e.target.value);
                    }}
                    style={{
                      flex: 1,
                      padding: '0.35rem 0.6rem',
                      borderRadius: '8px',
                      border: '1.5px solid var(--border-ink)',
                      backgroundColor: 'var(--surface)',
                      color: 'var(--text-primary)',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleAddStudent(sq.id)}
                    className="retro-btn-outline"
                    style={{ padding: '0.35rem 0.65rem', borderRadius: '8px', fontSize: '0.78rem' }}
                  >
                    <UserPlus size={14} /> Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation Modal for Resetting Week */}
      {showResetConfirm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 500,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setShowResetConfirm(false)}
        >
          <div
            className="retro-window"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--surface)',
              border: '3px solid var(--border-ink)',
              borderRadius: '24px',
              padding: '1.75rem',
              maxWidth: '440px',
              width: '100%',
              boxShadow: '8px 8px 0px var(--shadow-ink)',
              textAlign: 'center'
            }}
          >
            <AlertTriangle size={36} color="#EF4444" style={{ margin: '0 auto 0.75rem auto' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
              Reset Weekly Berries?
            </h3>
            <p style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-secondary)', margin: '0 0 1.25rem 0' }}>
              This will reset the Master Wall Meter to 0 and empty all 4 squad baskets for the start of a fresh school week.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="retro-btn-outline"
                style={{ borderRadius: '999px', padding: '0.55rem 1.25rem', fontSize: '0.88rem' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  resetWeeklyBerries();
                  setShowResetConfirm(false);
                }}
                className="retro-btn-primary"
                style={{
                  backgroundColor: '#EF4444',
                  borderRadius: '999px',
                  padding: '0.55rem 1.25rem',
                  fontSize: '0.88rem'
                }}
              >
                Yes, Reset Week
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

