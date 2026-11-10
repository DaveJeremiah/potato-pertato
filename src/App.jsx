import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { VillageProvider, useVillage } from './context/VillageContext';
import Home from './pages/Home';
import ExamRevisionStudio from './pages/ExamRevisionStudio';
import PunctuationClinic from './pages/PunctuationClinic';
import WritingLab from './pages/WritingLab';
import MatcherGame from './pages/MatcherGame';
import Editor from './pages/Editor';
import MemoryMatch from './pages/MemoryMatch';
import BalloonPop from './pages/BalloonPop';
import MagneticPoetry from './pages/MagneticPoetry';
import SentenceTrain from './pages/SentenceTrain';
import EscapeRoom from './pages/EscapeRoom';
import RiddleMatch from './pages/RiddleMatch';
import VillageHub from './pages/VillageHub';
import NotebookBridgeModal from './components/NotebookBridgeModal';
import VillageDrawer from './components/VillageDrawer';
import {
  LayoutDashboard,
  BookOpen,
  Blocks,
  Wrench,
  Settings,
  Pencil,
  ArrowLeft,
  Maximize2,
  Minimize2,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react';
import './index.css';

function MainNavbar({ onOpenNotebook, onOpenVillage }) {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { totalBerries } = useVillage();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="retro-navbar">
      {/* Brand Identity */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <span style={{ width: '7px', height: '24px', backgroundColor: '#EF4444', borderRadius: '4px', border: '1.5px solid var(--border-ink)' }} />
          <span style={{ width: '7px', height: '28px', backgroundColor: '#2329D6', borderRadius: '4px', border: '1.5px solid var(--border-ink)' }} />
          <span style={{ width: '7px', height: '20px', backgroundColor: '#F59E0B', borderRadius: '4px', border: '1.5px solid var(--border-ink)' }} />
        </div>
        <div>
          <span style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Potato Pertato
          </span>
          <span
            style={{
              marginLeft: '0.5rem',
              backgroundColor: 'var(--card-purple)',
              border: '1.5px solid var(--border-ink)',
              padding: '0.12rem 0.5rem',
              borderRadius: '999px',
              fontSize: '0.7rem',
              fontWeight: 800,
              color: 'var(--text-primary)'
            }}
          >
            GRADE 4 INSPIRER
          </span>
        </div>
      </Link>

      {/* Center Links */}
      <div className="nav-links" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Link to="/" className={`retro-nav-link ${isActive('/') ? 'active' : ''}`}>
          <LayoutDashboard size={17} /> Dashboard
        </Link>
        <Link to="/village" className={`retro-nav-link ${isActive('/village') ? 'active' : ''}`}>
          🫐 Smurf Village
        </Link>
        <Link to="/exam-revision" className={`retro-nav-link ${isActive('/exam-revision') ? 'active' : ''}`}>
          <BookOpen size={17} /> Exam Revision
        </Link>
        <Link to="/writing-lab" className={`retro-nav-link ${isActive('/writing-lab') ? 'active' : ''}`}>
          <Blocks size={17} /> Writing Lab
        </Link>
        <Link to="/punctuation-clinic" className={`retro-nav-link ${isActive('/punctuation-clinic') ? 'active' : ''}`}>
          <Wrench size={17} /> Punctuation Surgery
        </Link>
        <Link to="/editor" className={`retro-nav-link ${isActive('/editor') ? 'active' : ''}`}>
          <Settings size={17} /> Editor
        </Link>
      </div>

      {/* Right Action Bar: Village HUD + Theme Toggle + Notebook Timer */}
      <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
        <button
          onClick={onOpenVillage}
          className="retro-btn-outline"
          style={{
            borderRadius: '999px',
            padding: '0.45rem 0.85rem',
            fontSize: '0.84rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
          title="Open Smurf Village Defense HUD & Squad Points"
        >
          <span>🫐 Village HUD</span>
          <span style={{ fontWeight: 900, color: 'var(--cobalt)' }}>({totalBerries}/20)</span>
        </button>

        <button
          onClick={toggleTheme}
          className="retro-theme-toggle"
          title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
        >
          {isDark ? <Sun size={16} color="#FBBF24" /> : <Moon size={16} color="#6366F1" />}
          <span>{isDark ? 'Light' : 'Dark'}</span>
        </button>

        <button
          onClick={onOpenNotebook}
          className="retro-btn-primary"
          style={{
            backgroundColor: '#2329D6',
            borderRadius: '999px',
            padding: '0.55rem 1.1rem',
            fontSize: '0.88rem'
          }}
        >
          <Pencil size={15} /> Notebook Timer
        </button>
      </div>
    </nav>
  );
}

function StudyTopBar({ onOpenNotebook, onOpenVillage }) {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { totalBerries } = useVillage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const getPageInfo = () => {
    switch (location.pathname) {
      case '/village':
        return { label: 'Smurf Village HQ', color: 'var(--card-purple)' };
      case '/exam-revision':
        return { label: 'Exam Revision Studio', color: 'var(--card-orange)' };
      case '/punctuation-clinic':
        return { label: 'Punctuation Surgery', color: 'var(--card-yellow)' };
      case '/writing-lab':
        return { label: 'Story & Writing Lab', color: 'var(--card-green)' };
      case '/riddle-match':
        return { label: 'Riddle Matcher', color: 'var(--card-pink)' };
      case '/play':
        return { label: 'Category Matcher', color: 'var(--card-blue)' };
      case '/train':
        return { label: 'Sentence Train', color: 'var(--card-yellow)' };
      case '/memory':
        return { label: 'Memory Match', color: 'var(--card-purple)' };
      case '/balloon':
        return { label: 'Balloon Pop', color: 'var(--card-orange)' };
      case '/magnetic':
        return { label: 'Magnetic Poetry', color: 'var(--card-green)' };
      case '/escape':
        return { label: 'Riddle Escape Room', color: 'var(--card-blue)' };
      case '/editor':
        return { label: 'Content Editor', color: 'var(--surface)' };
      default:
        return { label: 'Smartboard Mode', color: 'var(--card-purple)' };
    }
  };

  const page = getPageInfo();

  return (
    <div className="study-top-strip">
      {/* Left: Exit to Home */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Link
          to="/"
          className="retro-btn-outline"
          style={{
            padding: '0.35rem 0.75rem',
            borderRadius: '999px',
            fontSize: '0.85rem',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <ArrowLeft size={15} /> Dashboard
        </Link>

        {/* Current Active Mode Badge */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: page.color,
              border: '2px solid var(--border-ink)',
              borderRadius: '999px',
              padding: '0.35rem 0.85rem',
              fontWeight: 800,
              fontSize: '0.86rem',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            <span>{page.label}</span>
            <ChevronDown size={14} />
          </button>

          {/* Quick-switch dropdown */}
          {menuOpen && (
            <div
              style={{
                position: 'absolute',
                top: '115%',
                left: 0,
                backgroundColor: 'var(--surface)',
                border: '2.5px solid var(--border-ink)',
                borderRadius: '16px',
                boxShadow: '5px 5px 0px var(--shadow-ink)',
                padding: '0.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
                minWidth: '210px',
                zIndex: 100
              }}
            >
              {[
                { path: '/village', label: '🫐 Smurf Village HQ' },
                { path: '/exam-revision', label: '📖 Exam Revision Studio' },
                { path: '/punctuation-clinic', label: '🔧 Punctuation Surgery' },
                { path: '/writing-lab', label: '✍️ Writing Lab' },
                { path: '/train', label: '🚂 Sentence Train' },
                { path: '/riddle-match', label: '💡 Riddle Matcher' },
                { path: '/editor', label: '⚙️ Content Editor' }
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    padding: '0.45rem 0.75rem',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    color: 'var(--text-primary)',
                    borderRadius: '8px',
                    backgroundColor: location.pathname === item.path ? 'var(--card-yellow)' : 'transparent'
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Controls: Village HUD + Dark Mode Toggle + Notebook Timer + Fullscreen */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
        <button
          onClick={onOpenVillage}
          className="retro-btn-outline"
          style={{
            padding: '0.35rem 0.75rem',
            borderRadius: '999px',
            fontSize: '0.8rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            backgroundColor: 'var(--surface)'
          }}
          title="Open Smurf Village Defense HUD & Squad Points"
        >
          <span>🫐 HUD</span>
          <span style={{ fontWeight: 900, color: 'var(--cobalt)' }}>({totalBerries}/20)</span>
        </button>

        <button
          onClick={toggleTheme}
          className="retro-theme-toggle"
          title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
        >
          {isDark ? <Sun size={15} color="#FBBF24" /> : <Moon size={15} color="#6366F1" />}
          <span>{isDark ? 'Light' : 'Dark'}</span>
        </button>

        <button
          onClick={onOpenNotebook}
          className="retro-btn-primary"
          style={{
            padding: '0.35rem 0.85rem',
            borderRadius: '999px',
            fontSize: '0.82rem',
            backgroundColor: '#2329D6'
          }}
        >
          <Pencil size={14} /> Pencils Up
        </button>

        <button
          onClick={toggleFullscreen}
          className="retro-btn-outline"
          title="Toggle Fullscreen"
          style={{
            padding: '0.35rem 0.65rem',
            borderRadius: '999px',
            fontSize: '0.82rem'
          }}
        >
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>
      </div>
    </div>
  );
}

function LayoutShell({ children, onOpenNotebook, onOpenVillage }) {
  const location = useLocation();
  const isStudyMode = location.pathname !== '/';

  return (
    <div className={`app-container ${isStudyMode ? 'study-mode-container' : ''}`}>
      {!isStudyMode ? (
        <MainNavbar onOpenNotebook={onOpenNotebook} onOpenVillage={onOpenVillage} />
      ) : (
        <StudyTopBar onOpenNotebook={onOpenNotebook} onOpenVillage={onOpenVillage} />
      )}
      <div className={isStudyMode ? 'study-viewport-content' : ''}>{children}</div>
    </div>
  );
}

function AppContent() {
  const [globalNotebookOpen, setGlobalNotebookOpen] = useState(false);
  const [villageDrawerOpen, setVillageDrawerOpen] = useState(false);

  return (
    <Router>
      <LayoutShell
        onOpenNotebook={() => setGlobalNotebookOpen(true)}
        onOpenVillage={() => setVillageDrawerOpen(true)}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/village" element={<VillageHub />} />
          <Route path="/exam-revision" element={<ExamRevisionStudio />} />
          <Route path="/punctuation-clinic" element={<PunctuationClinic />} />
          <Route path="/writing-lab" element={<WritingLab />} />
          <Route path="/play" element={<MatcherGame />} />
          <Route path="/memory" element={<MemoryMatch />} />
          <Route path="/balloon" element={<BalloonPop />} />
          <Route path="/magnetic" element={<MagneticPoetry />} />
          <Route path="/train" element={<SentenceTrain />} />
          <Route path="/escape" element={<EscapeRoom />} />
          <Route path="/riddle-match" element={<RiddleMatch />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>

        <NotebookBridgeModal
          isOpen={globalNotebookOpen}
          onClose={() => setGlobalNotebookOpen(false)}
          promptTitle="Smartboard-to-Notebook Practice Time"
          promptTask="Eyes on your exercise book! Write down what we just sparked on the Smartboard using your neatest handwriting and complete sentences."
          checklist={[
            'Capital letter at the start of every sentence',
            'Complete sentence (no 1-word fragments!)',
            'Checked spelling of key words on the board',
            'Full stop, question mark, or exclamation mark at the end'
          ]}
        />

        <VillageDrawer
          isOpen={villageDrawerOpen}
          onClose={() => setVillageDrawerOpen(false)}
        />
      </LayoutShell>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <VillageProvider>
        <AppContent />
      </VillageProvider>
    </ThemeProvider>
  );
}

export default App;
