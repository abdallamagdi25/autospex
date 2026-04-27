import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Auth
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AICopilotSidebar from './components/layout/AICopilotSidebar';
import ScrollToTop from './components/layout/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import JourneyPage from './pages/JourneyPage';
import DigitalTwinPage from './pages/DigitalTwinPage';
import StudentHubPage from './pages/StudentHubPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import RegisterPage from './pages/RegisterPage';

// Data
import resources from './data/translations';

const AUTH_ROUTES = ['/login', '/register'];

// ── Cinematic Preloader Component ─────────────────────────────
const Preloader = ({ isExiting }) => (
  <div
    className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50 transition-all duration-700 ${isExiting ? 'animate-slide-up-fade' : ''
      }`}
  >
    <div className="relative flex items-center justify-center">
      <div className="absolute w-56 h-56 bg-autospex-primary/10 rounded-full blur-[60px] animate-pulse"></div>
      <img
        src="/autospex-logo.png"
        alt="AutoSpex Logo"
        className="w-48 h-auto relative z-10 animate-float drop-shadow-xl"
      />
    </div>
    <div className="mt-8 flex flex-col items-center">
      <div className="overflow-hidden">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-[0.2em] font-tech animate-fade-in-up">
          AUTOSPEX
        </h1>
      </div>
      <div className="overflow-hidden mt-2">
        <p
          className="text-xs font-bold text-autospex-primary tracking-[0.3em] font-tech animate-fade-in-up uppercase"
          style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
        >
          Industrial Training Kit
        </p>
      </div>
    </div>
  </div>
);

// ── Protected Routes ──────────────────────────────────────────
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  return user ? children : <Navigate to="/login" replace />;
};

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  return !user ? children : <Navigate to="/hub" replace />;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  if (!user || user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
};

// ── Spinner ───────────────────────────────────────────────────
const Spinner = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-autospex-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// ── App Shell ─────────────────────────────────────────────────
const AppShell = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const t = resources['ar'] || resources['en'];
  const isAuthPage = AUTH_ROUTES.includes(location.pathname);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      const unmountTimer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(unmountTimer);
    }, 2500);
    return () => clearTimeout(exitTimer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-autospex-primary/20 flex flex-col font-sans relative overflow-hidden">

      {isLoading && <Preloader isExiting={isExiting} />}
      {!isAuthPage && <Navbar t={t} lang="ar" />}

      <main className="flex-grow">
        <Routes>
          {/* Public (Anyone can view these) */}
          <Route path="/" element={<HomePage t={t} />} />
          <Route path="/team" element={<TeamPage t={t} />} />
          <Route path="/journey" element={<JourneyPage t={t} />} />
          <Route path="/digital-twin" element={<DigitalTwinPage t={t} />} />
          <Route path="/courses" element={<CoursesPage t={t} />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />

          {/* Guest only (Must NOT be logged in to view) */}
          <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />

          {/* Protected (MUST be logged in to view) */}
          <Route path="/hub" element={<ProtectedRoute><StudentHubPage t={t} /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />

          {/* 404 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer t={t} />}

      {user && !isAuthPage && (
        <AICopilotSidebar isOpen={isCopilotOpen} setIsOpen={setIsCopilotOpen} t={t} isRTL={true} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <AppShell />
      </AuthProvider>
    </Router>
  );
}