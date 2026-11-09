import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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
import NotebookBridgeModal from './components/NotebookBridgeModal';
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
  ChevronDown
} from 'lucide-react';
import './index.css';

function MainNavbar({ onOpenNotebook }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="retro-navbar">
      {/* Brand Identity */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <span style={{ width: '7px', height: '24px', backgroundColor: '#EF4444', borderRadius: '4px', border: '1.5px solid #1E1E24' }} />
          <span style={{ width: '7px', height: '28px', backgroundColor: '#2329D6', borderRadius: '4px', border: '1.5px solid #1E1E24' }} />
          <span style={{ width: '7px', height: '20px', backgroundColor: '#F59E0B', borderRadius: '4px', border: '1.5px solid #1E1E24' }} />
        </div>
        <div>
          <span style={{ fontSize: '1.45rem', fontWeight: 900, color: '#1E1E24', letterSpacing: '-0.02em' }}>
            Potato Pertato
          </span>
          <span
            style={{
              marginLeft: '0.5rem',
              backgroundColor: '#F1DFFE',
              border: '1.5px solid #1E1E24',
              padding: '0.12rem 0.5rem',
              borderRadius: '999px',
              fontSize: '0.7rem',
              fontWeight: 800,
              color: '#1E1E24'
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

      {/* Right Action */}
      <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
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

function StudyTopBar({ onOpenNotebook }) {
  const location = useLocation();
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
      case '/exam-revision':
        return { label: 'Exam Revision Studio', color: '#F5C0A1' };
      case '/punctuation-clinic':
        return { label: 'Punctuation Surgery', color: '#FCE3A1' };
      case '/writing-lab':
        return { label: 'Story & Writing Lab', color: '#C7E0CD' };
      case '/riddle-match':
        return { label: 'Riddle Matcher', color: '#F9BDD5' };
      case '/play':
        return { label: 'Category Matcher', color: '#92C5E3' };
      case '/train':
        return { label: 'Sentence Train', color: '#FCE3A1' };
      case '/memory':
        return { label: 'Memory Match', color: '#F1DFFE' };
      case '/balloon':
        return { label: 'Balloon Pop', color: '#F5C0A1' };
      case '/magnetic':
        return { label: 'Magnetic Poetry', color: '#C7E0CD' };
      case '/escape':
        return { label: 'Riddle Escape Room', color: '#92C5E3' };
      case '/editor':
        return { label: 'Content Editor', color: '#FAF7F0' };
      default:
        return { label: 'Smartboard Mode', color: '#F1DFFE' };
    }
  };

  const page = getPageInfo();

  return (
    <div className="study-top-strip">
      {/* Left: Exit to Home */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
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
            gap: '0.35rem',
            backgroundColor: '#FFFFFF'
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
              border: '2px solid #1E1E24',
              borderRadius: '999px',
              padding: '0.35rem 0.85rem',
              fontWeight: 800,
              fontSize: '0.86rem',
              color: '#1E1E24',
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
                backgroundColor: '#FFFFFF',
                border: '2.5px solid #1E1E24',
                borderRadius: '16px',
                boxShadow: '5px 5px 0px #1E1E24',
                padding: '0.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
                minWidth: '210px',
                zIndex: 100
              }}
            >
              {[
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
                    color: '#1E1E24',
                    borderRadius: '8px',
                    backgroundColor: location.pathname === item.path ? '#FCE3A1' : 'transparent'
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Controls: Notebook Timer + Fullscreen */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
          <Pencil size={14} /> Pencils Up (Timer)
        </button>

        <button
          onClick={toggleFullscreen}
          className="retro-btn-outline"
          title="Toggle Fullscreen"
          style={{
            padding: '0.35rem 0.65rem',
            borderRadius: '999px',
            fontSize: '0.82rem',
            backgroundColor: '#FFFFFF'
          }}
        >
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>
      </div>
    </div>
  );
}

function LayoutShell({ children, onOpenNotebook }) {
  const location = useLocation();
  const isStudyMode = location.pathname !== '/';

  return (
    <div className={`app-container ${isStudyMode ? 'study-mode-container' : ''}`}>
      {!isStudyMode ? (
        <MainNavbar onOpenNotebook={onOpenNotebook} />
      ) : (
        <StudyTopBar onOpenNotebook={onOpenNotebook} />
      )}
      <div className={isStudyMode ? 'study-viewport-content' : ''}>{children}</div>
    </div>
  );
}

function App() {
  const [globalNotebookOpen, setGlobalNotebookOpen] = useState(false);

  return (
    <Router>
      <LayoutShell onOpenNotebook={() => setGlobalNotebookOpen(true)}>
        <Routes>
          <Route path="/" element={<Home />} />
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
      </LayoutShell>
    </Router>
  );
}

export default App;
