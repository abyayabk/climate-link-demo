import { useState } from 'react'; // Added useState
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useUser } from "../context/UserContext";
import { Outlet, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence
import {
    Menu, Settings, Home, FileText, User,
    X, LogOut, Info, HelpCircle, Database, Book, MessageCircle, UserCircle, Shield
} from 'lucide-react';

export default function Homepage() {
    const { theme } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu
    const navigate = useNavigate(); // Initialize navigation

    const getNavClass = ({ isActive }) => {
        const base = "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ";
        if (isActive) return base + "text-blue-600 scale-105 font-medium";
        return base + (theme ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white');
    };

    // Helper to close menu and navigate
    const handleNavigation = (path) => {
        setIsMenuOpen(false);
        navigate(path);
    };

    return (
        <div className={`h-screen w-screen flex flex-col overflow-hidden transition-colors duration-300 ${!theme ? 'dark bg-slate-950' : 'bg-slate-50'}`}>

            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`border-b backdrop-blur-xl z-30 ${theme // Increased z-index for menu priority
                    ? 'bg-white/90 border-slate-200 shadow-sm'
                    : 'bg-slate-950/90 border-slate-800'
                    }`}
            >
                <div className="flex items-center justify-between px-6 py-4">

                    {/* MENU DROPDOWN CONTAINER */}
                    <div className="relative">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors relative z-50 ${theme ? 'hover:bg-slate-100' : 'hover:bg-slate-800'
                                }`}
                        >
                            {isMenuOpen ? <X className="w-5 h-5 text-blue-500" /> : <Menu className="w-5 h-5 text-slate-700 dark:text-slate-400" />}
                        </button>

                        <AnimatePresence>
                            {isMenuOpen && (
                                <>
                                    {/* Backdrop to close when clicking outside */}
                                    <div
                                        className="fixed inset-0 z-40 bg-black/5"
                                        onClick={() => setIsMenuOpen(false)}
                                    />

                                    {/* Dropdown Box */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                        className={`absolute left-0 mt-3 w-64 rounded-2xl border shadow-2xl z-50 p-2 overflow-hidden ${theme ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                                            }`}
                                    >
                                        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 mb-2">
                                            <p className={`text-[10px] font-bold uppercase tracking-widest ${theme ? 'text-slate-400' : 'text-slate-500'}`}>
                                                Menu
                                            </p>
                                        </div>

                                        <nav className="space-y-1">
                                            <MenuLink
                                                icon={<Info size={18} />}
                                                label="About ClimateLink"
                                                theme={theme}
                                                onClick={() => handleNavigation('/home/about')}
                                            />
                                            <MenuLink
                                                icon={<Book size={18} />}
                                                label="Glossary"
                                                theme={theme}
                                                onClick={() => handleNavigation('/home/glossary')}
                                            />
                                            <MenuLink
                                                icon={<MessageCircle size={18} />}
                                                label="FAQ"
                                                theme={theme}
                                                onClick={() => handleNavigation('/home/faq')}
                                            />
                                            <MenuLink
                                                icon={<Shield size={18} />}
                                                label="Privacy Policy"
                                                theme={theme}
                                                onClick={() => handleNavigation('/home/privacypolicy')}
                                            />

                                            <div className={`h-px my-1 ${theme ? 'bg-slate-100' : 'bg-slate-800'}`} />

                                            <MenuLink
                                                icon={<UserCircle size={18} />}
                                                label="Profile"
                                                theme={theme}
                                                onClick={() => handleNavigation('/home/profile')}
                                            />
                                        </nav>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className={`text-2xl tracking-tighter ${theme ? 'text-slate-900' : 'text-white'}`}>
                        <span className="font-extrabold italic">CLIMATE</span>
                        <span className="font-light opacity-80">LINK</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <NavLink to="/home/profile" className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${theme ? 'hover:bg-slate-100' : 'hover:bg-slate-800'}`}>
                            <Settings className="w-5 h-5 text-slate-700 dark:text-slate-400" />
                        </NavLink>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                <Outlet />
            </div>

            {/* Bottom Navigation */}
            <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`border-t backdrop-blur-xl transition-all ${theme
                    ? 'bg-white/90 border-slate-200 shadow-sm'
                    : 'bg-slate-950/90 border-slate-800'
                    }`}
            >
                <div className="flex items-center justify-around px-6 py-3">
                    <NavLink to="/home" end className={getNavClass}>
                        <Home className="w-5 h-5" />
                        <span className="text-xs">Home</span>
                    </NavLink>

                    <NavLink to="/home/resources" className={getNavClass}>
                        <FileText className="w-5 h-5" />
                        <span className="text-xs">Resources</span>
                    </NavLink>

                    <NavLink to="/home/profile" className={getNavClass}>
                        <User className="w-5 h-5" />
                        <span className="text-xs">Profile</span>
                    </NavLink>
                </div>
            </motion.nav>
        </div>
    );
}

// Added 'onClick' to the props list here
function MenuLink({ icon, label, theme, danger, onClick }) {
    return (
        <button
            onClick={onClick} // Added the click handler here
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${theme
                ? 'hover:bg-slate-100 text-slate-700'
                : 'hover:bg-slate-800 text-slate-300'
                } ${danger ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' : ''}`}
        >
            {/* Added a bit of color to the icon to make it pop */}
            <span className={danger ? 'text-red-500' : 'text-blue-500'}>
                {icon}
            </span>
            <span className="font-medium">{label}</span>
        </button>
    );
}