import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import RibbonCard from '../components/RibbonCard';
import {
  Sparkles,
  BookOpen,
  Blocks,
  Wrench,
  Lightbulb,
  Target,
  Brain,
  Gamepad2,
  Magnet,
  Train,
  Key,
  Settings,
  ArrowUpRight
} from 'lucide-react';

const SECTION_THEMES = [
  {
    theme: 'orange',
    label: 'Orange World',
    title: 'Paper 1: Non-Fiction Revision',
    subtitle: 'Amazing Animals of the Earth • Chunked P.Q.A., Vocab & Grammar',
    filterTag: 'exam',
    route: '/exam-revision?paper=nonfiction',
    cta: 'Revise Paper 1'
  },
  {
    theme: 'purple',
    label: 'Purple World',
    title: 'Paper 2: Fiction Revision',
    subtitle: 'The Secret of the Mountain Dragon • Story P.Q.A. & Context Clues',
    filterTag: 'exam',
    route: '/exam-revision?paper=fiction',
    cta: 'Revise Paper 2'
  },
  {
    theme: 'green',
    label: 'Green World',
    title: 'Story & Sentence Block Architect',
    subtitle: 'Drag/Tap 4-Paragraph Story Builder, Collector’s Cards & Weak Draft Upgrader',
    filterTag: 'writing',
    route: '/writing-lab',
    cta: 'Open Writing Lab'
  },
  {
    theme: 'yellow',
    label: 'Yellow World',
    title: 'Smartboard Punctuation Surgery',
    subtitle: 'All 10 Exam Punctuation Sentences turned into a hands-on board game',
    filterTag: 'grammar',
    route: '/punctuation-clinic',
    cta: 'Start Surgery'
  },
  {
    theme: 'blue',
    label: 'Blue World',
    title: 'Sentence Train & Structure Lab',
    subtitle: 'Connect word cars in the right order to master sentence structure',
    filterTag: 'poetry',
    route: '/train',
    cta: 'Play Sentence Train'
  },
  {
    theme: 'pink',
    label: 'Pink World',
    title: 'Mind Pictures & Poetry Arcade',
    subtitle: 'Riddles, Kennings, Alliteration Matcher, Memory & Escape Room',
    filterTag: 'poetry',
    route: '/riddle-match',
    cta: 'Enter Arcade'
  }
];

const ALL_MODULES = [
  {
    id: 'm-p1',
    category: 'exam',
    theme: 'orange',
    badge: 'FIRST LESSON • PAPER 1',
    metaLeft: 'Non-Fiction (30m)',
    metaRight: 'P.Q.A. + Support',
    title: 'Paper 1: Amazing Animals Revision',
    desc: 'Chunks up "Welcome to Our Wonderful World" with 1-tap Clue Spotlights for struggling readers, interactive P.Q.A. stem blocks, and Notebook Bridge timers.',
    route: '/exam-revision?paper=nonfiction',
    btnText: 'Launch Paper 1 Studio',
    icon: BookOpen
  },
  {
    id: 'm-p2',
    category: 'exam',
    theme: 'purple',
    badge: 'FIRST LESSON • PAPER 2',
    metaLeft: 'Fiction (30m)',
    metaRight: 'Story + Grammar',
    title: 'Paper 2: Mountain Dragon Revision',
    desc: 'Breaks down Meilin & the Silver Dragon line-by-line with P.Q.A. sentence builders, Vocabulary Detective hints, and was/were verb agreement.',
    route: '/exam-revision?paper=fiction',
    btnText: 'Launch Paper 2 Studio',
    icon: Sparkles
  },
  {
    id: 'm-write',
    category: 'writing',
    theme: 'green',
    badge: 'WRITING INSPIRER',
    metaLeft: '4 Paragraphs',
    metaRight: 'Block Builder',
    title: 'Story & Collector’s Card Architect',
    desc: 'Assemble 4-paragraph fantasy stories and Animal Collector’s Cards with tap-blocks, fix weak student sentences, and flip to Skeleton Mode so students write in their books!',
    route: '/writing-lab',
    btnText: 'Open Writing Architect',
    icon: Blocks
  },
  {
    id: 'm-punct',
    category: 'grammar',
    theme: 'yellow',
    badge: '10 EXAM SENTENCES',
    metaLeft: 'Paper 1 & 2',
    metaRight: 'Tap-to-Fix',
    title: 'Smartboard Punctuation Surgery',
    desc: 'Every single punctuation question from Paper 1 (a–e) and Paper 2 (a–e)! Students tap words on the Smartboard to add capitals, speech marks, commas & apostrophes.',
    route: '/punctuation-clinic',
    btnText: 'Open Punctuation Clinic',
    icon: Wrench
  },
  {
    id: 'm-riddle',
    category: 'poetry',
    theme: 'pink',
    badge: 'POETRY ARCADE',
    metaLeft: 'Drag & Drop',
    metaRight: 'Unit 3 & 4',
    title: 'Riddle Matcher',
    desc: 'Drag clever riddles from the left and drop them onto their matching answers on the Smartboard.',
    route: '/riddle-match',
    btnText: 'Play Riddle Matcher',
    icon: Lightbulb
  },
  {
    id: 'm-matcher',
    category: 'poetry',
    theme: 'blue',
    badge: 'LITERARY DEVICES',
    metaLeft: 'Sorting Game',
    metaRight: 'Alliteration / Kenning',
    title: 'Category Matcher',
    desc: 'Sort poetic lines into Alliteration, Riddles, and Kennings with instant visual feedback.',
    route: '/play',
    btnText: 'Play Category Matcher',
    icon: Target
  },
  {
    id: 'm-train',
    category: 'poetry',
    theme: 'yellow',
    badge: 'SYNTAX BUILDER',
    metaLeft: 'Word Order',
    metaRight: 'Interactive Train',
    title: 'Sentence Train',
    desc: 'Tap scrambled word cars in the right grammatical sequence to couple the train together.',
    route: '/train',
    btnText: 'Play Sentence Train',
    icon: Train
  },
  {
    id: 'm-memory',
    category: 'poetry',
    theme: 'purple',
    badge: 'BRAIN WARM-UP',
    metaLeft: '12 Cards',
    metaRight: 'Pair Flip',
    title: 'Memory Match',
    desc: 'A quick 3-minute Smartboard warm-up: flip cards to match poetic devices and examples.',
    route: '/memory',
    btnText: 'Play Memory Match',
    icon: Brain
  },
  {
    id: 'm-magnetic',
    category: 'writing',
    theme: 'green',
    badge: 'CREATIVE WALL',
    metaLeft: 'Free Drag',
    metaRight: 'Word Magnets',
    title: 'Magnetic Poetry Board',
    desc: 'Drag magnetic word tiles around the board to invent original alliterations, kennings, and descriptive phrases.',
    route: '/magnetic',
    btnText: 'Open Magnetic Board',
    icon: Magnet
  },
  {
    id: 'm-balloon',
    category: 'poetry',
    theme: 'orange',
    badge: 'SPEED CHALLENGE',
    metaLeft: 'Action Game',
    metaRight: 'Smartboard Tap',
    title: 'Balloon Pop',
    desc: 'Pop the floating balloons that match the target category before they float past the top of the Smartboard!',
    route: '/balloon',
    btnText: 'Play Balloon Pop',
    icon: Gamepad2
  },
  {
    id: 'm-escape',
    category: 'poetry',
    theme: 'blue',
    badge: 'TEAM PUZZLE',
    metaLeft: '4 Mystery Doors',
    metaRight: 'Whole Class',
    title: 'Riddle Escape Room',
    desc: 'Work together as a class to solve sequential riddles and kennings to unlock the mystery doors.',
    route: '/escape',
    btnText: 'Enter Escape Room',
    icon: Key
  },
  {
    id: 'm-editor',
    category: 'teacher',
    theme: 'purple',
    badge: 'TEACHER STUDIO',
    metaLeft: 'Custom Cards',
    metaRight: 'CMS',
    title: 'Teacher Content Editor',
    desc: 'Add custom categories, new vocabulary cards, and riddles directly into Potato Pertato.',
    route: '/editor',
    btnText: 'Open Teacher Editor',
    icon: Settings
  }
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('all');
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const filteredModules =
    activeFilter === 'all' ? ALL_MODULES : ALL_MODULES.filter((m) => m.category === activeFilter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.75rem' }}>
      {/* =========================================================
          1. RETRO PLAYFUL HERO WINDOW (Inspired by Magnum + Sesame UI)
         ========================================================= */}
      <div
        className="retro-window"
        style={{
          backgroundColor: 'var(--bg-card)',
          position: 'relative',
          overflow: 'hidden',
          padding: '2.5rem 2.25rem'
        }}
      >
        {/* Decorative Retro 3-Color Stripes on Right Edge */}
        <div
          style={{
            position: 'absolute',
            top: '28px',
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            zIndex: 0
          }}
        >
          <div style={{ width: '70px', height: '16px', backgroundColor: '#EF4444', border: '2px solid var(--border-ink)', borderRight: 'none' }} />
          <div style={{ width: '95px', height: '16px', backgroundColor: '#2329D6', border: '2px solid var(--border-ink)', borderRight: 'none' }} />
          <div style={{ width: '55px', height: '16px', backgroundColor: '#F59E0B', border: '2px solid var(--border-ink)', borderRight: 'none' }} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1
          }}
        >
          {/* Left Hero Copy */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--card-yellow)',
                border: '2px solid var(--border-ink)',
                boxShadow: '3px 3px 0px var(--shadow-ink)',
                padding: '0.35rem 0.9rem',
                borderRadius: '999px',
                fontWeight: 800,
                fontSize: '0.85rem',
                marginBottom: '1.1rem',
                color: 'var(--text-primary)'
              }}
            >
              <span>🥔 POTATO PERTATO • GRADE 4 SMARTBOARD INSPIRER</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.35rem)',
                fontWeight: 900,
                lineHeight: 1.08,
                color: 'var(--text-primary)',
                marginBottom: '1rem',
                letterSpacing: '-0.02em'
              }}
            >
              SPARK THE LIGHTBULB.{' '}
              <span
                style={{
                  backgroundColor: 'var(--card-purple)',
                  padding: '0 0.45rem',
                  border: '2.5px solid var(--border-ink)',
                  borderRadius: '12px',
                  display: 'inline-block',
                  boxShadow: '4px 4px 0px var(--shadow-ink)'
                }}
              >
                INSPIRE
              </span>{' '}
              THE CLASS.
            </h1>

            <p
              style={{
                fontSize: '1.12rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                lineHeight: 1.55,
                marginBottom: '1.6rem',
                maxWidth: '620px'
              }}
            >
              Chunk up complex reading papers, build 4-paragraph stories with visual blocks, and turn grammar into a team sport on the Smartboard — then bridge straight to students&rsquo; notebooks!
            </p>

            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <Link to="/exam-revision?paper=nonfiction" className="retro-btn-primary" style={{ backgroundColor: '#2329D6', textDecoration: 'none', fontSize: '1.05rem', padding: '0.85rem 1.5rem' }}>
                🌍 Lesson 1: Revise Paper 1 (Non-Fiction)
              </Link>
              <Link to="/exam-revision?paper=fiction" className="retro-btn-primary" style={{ backgroundColor: '#EA580C', textDecoration: 'none', fontSize: '1.05rem', padding: '0.85rem 1.5rem' }}>
                🐉 Revise Paper 2 (Fiction)
              </Link>
              <Link to="/writing-lab" className="retro-btn-outline" style={{ backgroundColor: 'var(--card-green)', textDecoration: 'none', fontSize: '1.05rem', padding: '0.85rem 1.4rem' }}>
                <Blocks size={18} /> Story Block Architect
              </Link>
            </div>
          </div>

          {/* Right Hero Featured Showcase Card (Lesson 1 Quick-Launch Box) */}
          <div
            style={{
              backgroundColor: 'var(--card-purple)',
              border: '3px solid var(--border-ink)',
              borderRadius: '24px',
              padding: '1.6rem',
              boxShadow: '7px 7px 0px var(--shadow-ink)',
              position: 'relative',
              color: 'var(--text-primary)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <span className="retro-pill-dark">⭐ LESSON 1 READY • PAPER REVISION</span>
              <span style={{ fontSize: '1.5rem' }}>👀</span>
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.6rem', color: 'var(--text-primary)' }}>
              End-of-Term 1 Exam Revision Kit
            </h3>
            <p style={{ fontSize: '0.96rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '1.15rem', lineHeight: 1.45 }}>
              Designed so even your weakest readers can follow along without feeling overwhelmed:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1.2rem' }}>
              <div style={{ backgroundColor: 'var(--surface)', border: '2px solid var(--border-ink)', borderRadius: '12px', padding: '0.7rem' }}>
                <div style={{ fontWeight: 900, fontSize: '0.88rem', color: '#3B82F6' }}>🔦 1. Clue Spotlight</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Highlights exact exam lines</div>
              </div>
              <div style={{ backgroundColor: 'var(--surface)', border: '2px solid var(--border-ink)', borderRadius: '12px', padding: '0.7rem' }}>
                <div style={{ fontWeight: 900, fontSize: '0.88rem', color: '#22C55E' }}>🧩 2. P.Q.A. Blocks</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Cures 1-word fragment answers</div>
              </div>
              <div style={{ backgroundColor: 'var(--surface)', border: '2px solid var(--border-ink)', borderRadius: '12px', padding: '0.7rem' }}>
                <div style={{ fontWeight: 900, fontSize: '0.88rem', color: '#F59E0B' }}>🔧 3. Punctuation Tap</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>10 exam sentences to fix</div>
              </div>
              <div style={{ backgroundColor: 'var(--surface)', border: '2px solid var(--border-ink)', borderRadius: '12px', padding: '0.7rem' }}>
                <div style={{ fontWeight: 900, fontSize: '0.88rem', color: '#EC4899' }}>✏️ 4. Notebook Bridge</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Built-in timer for paper practice</div>
              </div>
            </div>

            <Link
              to="/punctuation-clinic"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                backgroundColor: '#EA580C',
                color: '#FFFFFF',
                border: '2.5px solid var(--border-ink)',
                boxShadow: '4px 4px 0px var(--shadow-ink)',
                borderRadius: '999px',
                padding: '0.75rem 1.25rem',
                fontWeight: 900,
                textDecoration: 'none'
              }}
            >
              Jump Straight to 10-Sentence Punctuation Surgery <ArrowUpRight size={19} />
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================
          2. THE 6 COLOR RIBBON WORLDS
         ========================================================= */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '1.1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <span className="retro-pill-dark">🎨 6 LEARNING WORLDS</span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 900, marginTop: '0.4rem', color: 'var(--text-primary)' }}>
              Pick a Colour Section to Spark Today&rsquo;s Lesson
            </h2>
          </div>
          <span style={{ fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Tap any colour card to open that station on the Smartboard →
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {SECTION_THEMES.map((sec) => (
            <RibbonCard
              key={sec.theme}
              theme={sec.theme}
              badgeText={sec.label}
              title={sec.title}
              subtitle={sec.subtitle}
              interactive
              onClick={() => navigate(sec.route)}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: 'var(--surface)',
                  color: 'var(--text-primary)',
                  border: '2px solid var(--border-ink)',
                  boxShadow: '3px 3px 0px var(--shadow-ink)',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '999px',
                  fontWeight: 800,
                  fontSize: '0.88rem'
                }}
              >
                {sec.cta} <ArrowUpRight size={16} />
              </div>
            </RibbonCard>
          ))}
        </div>
      </div>

      {/* =========================================================
          3. "EXPLORE MODULES" RETRO FRAMED CONTAINER
         ========================================================= */}
      <div className="retro-window" style={{ backgroundColor: 'var(--bg-card)' }}>
        {/* Lavender Top Header Bar with Centered Dark Tab & Stripes */}
        <div
          style={{
            backgroundColor: isDark ? '#231533' : '#DEC6F3',
            borderBottom: '3px solid var(--border-ink)',
            padding: '0.9rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900 }}>
            <span style={{ fontSize: '1.35rem' }}>🧩</span>
            <span>SMARTBOARD LIBRARY</span>
          </div>

          <div
            style={{
              backgroundColor: isDark ? '#0D0F17' : '#2D2D35',
              color: '#FFFFFF',
              padding: '0.45rem 1.4rem',
              borderRadius: '10px',
              border: '2px solid var(--border-ink)',
              fontWeight: 900,
              letterSpacing: '0.06em',
              fontSize: '0.9rem'
            }}
          >
            EXPLORE MODULES
          </div>

          {/* 3 Vertical Retro Stripes */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <div style={{ width: '14px', height: '32px', backgroundColor: '#EF4444', border: '2px solid var(--border-ink)' }} />
            <div style={{ width: '14px', height: '32px', backgroundColor: '#2329D6', border: '2px solid var(--border-ink)' }} />
            <div style={{ width: '14px', height: '32px', backgroundColor: '#F59E0B', border: '2px solid var(--border-ink)' }} />
          </div>
        </div>

        {/* Inner Body */}
        <div style={{ padding: '2rem 1.75rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 1.75rem auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.45rem', color: 'var(--text-primary)' }}>
              👀 Find the right interactive module to spark your class
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.98rem' }}>
              We believe in the power of the teacher&rsquo;s voice, whole-class energy on the Smartboard, and independent practice in every student&rsquo;s exercise book.
            </p>
          </div>

          {/* Filter Pills */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}
          >
            {[
              { id: 'all', label: 'All Modules (12)' },
              { id: 'exam', label: '🔥 Lesson 1: Exam Revision' },
              { id: 'writing', label: '✍️ Writing & Story Blocks' },
              { id: 'grammar', label: '🔧 Punctuation Surgery' },
              { id: 'poetry', label: '🎮 Poetry & Word Play' },
              { id: 'teacher', label: '⚙️ Teacher Editor' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={activeFilter === tab.id ? 'retro-pill-active' : 'retro-pill-inactive'}
                style={{
                  backgroundColor: activeFilter === tab.id ? '#2329D6' : 'var(--surface)',
                  minWidth: '130px',
                  justifyContent: 'center'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 3-Column Retro Course Card Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {filteredModules.map((mod) => {
              const IconComp = mod.icon;
              return (
                <div
                  key={mod.id}
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '2.5px solid var(--border-ink)',
                    borderRadius: '20px',
                    boxShadow: '6px 6px 0px var(--shadow-ink)',
                    padding: '1.15rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  {/* Top Ribbon Illustration Header inside Card */}
                  <div>
                    <RibbonCard
                      theme={mod.theme}
                      badgeText={mod.badge}
                      style={{
                        padding: '1.1rem',
                        minHeight: '125px',
                        marginBottom: '1rem',
                        boxShadow: 'none',
                        borderRadius: '14px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div
                          style={{
                            backgroundColor: 'var(--surface)',
                            border: '2px solid var(--border-ink)',
                            borderRadius: '12px',
                            padding: '0.5rem',
                            display: 'inline-flex',
                            boxShadow: '2px 2px 0px var(--shadow-ink)'
                          }}
                        >
                          <IconComp size={26} color="var(--text-primary)" />
                        </div>
                      </div>
                    </RibbonCard>

                    <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      {mod.title}
                    </h3>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        color: 'var(--text-secondary)',
                        marginBottom: '0.65rem',
                        paddingBottom: '0.45rem',
                        borderBottom: '1.5px dashed var(--border-ink)'
                      }}
                    >
                      <span>{mod.metaLeft}</span>
                      <span>{mod.metaRight}</span>
                    </div>

                    <p style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1.48, marginBottom: '1.25rem' }}>
                      {mod.desc}
                    </p>
                  </div>

                  <Link
                    to={mod.route}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      width: '100%',
                      backgroundColor: 'var(--surface-alt)',
                      color: 'var(--text-primary)',
                      border: '2.5px solid var(--border-ink)',
                      boxShadow: '4px 4px 0px var(--shadow-ink)',
                      borderRadius: '12px',
                      padding: '0.7rem 1rem',
                      fontWeight: 900,
                      fontSize: '0.95rem',
                      textDecoration: 'none',
                      transition: 'transform 0.12s ease, background-color 0.12s ease'
                    }}
                  >
                    {mod.btnText}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
