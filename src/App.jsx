import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from "./context/UserContext";
import { Sun, Moon } from 'lucide-react';

import Welcome from "./pages/Welcome";
import HomePage from "./pages/HomePage";
import Dashboard from "./components/Dashboard";
import Resources from "./components/Resources";
import Profile from "./components/Profile";
import Glossary from './components/Glossary';
import Faq from './components/Faq';
import About from './components/About';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const { theme, setTheme } = useUser();

  const toggleTheme = () => {
    const newTheme = theme === true ? false : true;
    setTheme(newTheme);
  };

  return (
    <Router>
      {/* Global Theme Toggle - Top Right Corner */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 w-11 h-11 rounded-2xl bg-white/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
      >
        {theme === true ? (
          <Sun className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        ) : (
          <Moon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        )}
      </button>

      <Routes>
        {/* Welcome Page */}
        <Route path="/" element={<Welcome />} />

        {/* Main App Layout */}
        <Route path="/home" element={<HomePage />}>
          <Route index element={<Dashboard />} />
          <Route path="resources" element={<Resources />} />
          <Route path="profile" element={<Profile />} />
          <Route path="glossary" element={<Glossary />} />
          <Route path="faq" element={<Faq />} />
          <Route path="about" element={<About />} />
          <Route path="privacypolicy" element={<PrivacyPolicy />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;