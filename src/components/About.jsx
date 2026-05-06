import React from 'react';
import { Link } from 'react-router-dom'; // Use Link instead of useNavigate
import { motion } from 'framer-motion';
import { useUser } from "../context/UserContext";
import {
    Info,
    Globe2,
    Zap,
    ShieldCheck,
    Users,
    ArrowRight,
    XIcon,
    GitBranchIcon,
    Mail
} from 'lucide-react';

export default function About() {
    const { theme } = useUser();

    const textPrimary = theme ? "text-slate-900" : "text-white";
    const textSecondary = theme ? "text-slate-600" : "text-slate-400";
    const cardStyle = `rounded-3xl p-8 border transition-all duration-300 ${theme ? "bg-white border-slate-200 shadow-sm" : "bg-slate-900/50 border-slate-800 shadow-xl"
        }`;

    const values = [
        {
            title: "Localized Knowledge",
            desc: "Information tailored to specific regional policies and disaster risk profiles.",
            icon: <Globe2 />
        },
        {
            title: "Rule-Based Trust",
            desc: "No AI hallucinations. Every answer is structured by climate finance experts.",
            icon: <ShieldCheck />
        },
        {
            title: "Eco-Friendly Tech",
            desc: "Low-compute design that minimizes energy consumption and carbon footprint.",
            icon: <Zap />
        },
        {
            title: "Universal Access",
            desc: "Multi-language support and offline-ready tools for remote communities.",
            icon: <Users />
        }
    ];

    return (
        <div className={`min-h-screen pb-24 transition-colors duration-300 ${theme ? 'bg-slate-50' : 'bg-slate-950'}`}>
            <div className="max-w-4xl mx-auto px-8 pt-10">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-6 ${theme ? 'bg-blue-50 text-blue-600' : 'bg-blue-500/10 text-blue-400'}`}>
                        <Info size={14} />
                        <span>MISSION DRIVEN</span>
                    </div>
                    <h1 className={`text-4xl md:text-5xl font-light mb-6 leading-tight ${textPrimary}`}>
                        Connecting People to <br />
                        <span className="font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            Climate Finance
                        </span>
                    </h1>
                    <p className={`text-lg ${textSecondary} max-w-2xl mx-auto leading-relaxed`}>
                        ClimateLink is your interactive guide to Climate Disaster Risk Finance and Insurance (CDRFI).
                        We break down complex global policies into practical local actions.
                    </p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {values.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={cardStyle}
                        >
                            <div className={`w-12 h-12 rounded-2xl mb-6 flex items-center justify-center ${theme ? 'bg-slate-50' : 'bg-slate-800'}`}>
                                {item.icon}
                            </div>
                            <h3 className={`text-xl font-bold mb-2 ${textPrimary}`}>{item.title}</h3>
                            <p className={`text-sm leading-relaxed ${textSecondary}`}>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* The "Why ClimateLink" Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className={`rounded-[2rem] p-10 mb-16 border overflow-hidden relative ${theme ? 'bg-blue-600 text-white border-blue-700' : 'bg-blue-600/10 text-white border-blue-500/20'
                        }`}
                >
                    <div className="relative z-10 max-w-xl">
                        <h2 className="text-2xl font-bold mb-4">Empowering Smarter Decisions</h2>
                        <p className="text-blue-100 mb-6 leading-relaxed">
                            Climate disasters aren't just weather events—they are financial shocks. We empower advocates,
                            practitioners, and learners to navigate the tools that protect livelihoods.
                        </p>
                        <button className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
                            <Link
                                to="/home/faq"
                                className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors"
                            >
                                View our FAQ <ArrowRight size={16} />
                            </Link>
                        </button>
                    </div>
                    {/* Decorative abstract shape */}
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
                </motion.section>

                {/* Social & Contact */}
                <footer className="text-center">
                    <h4 className={`text-sm font-bold uppercase tracking-widest mb-8 ${textSecondary}`}>
                        Work with us & Socials
                    </h4>
                    <div className="flex justify-center gap-4">
                        <SocialIcon icon={<XIcon size={20} />} theme={theme} />
                        <SocialIcon icon={<GitBranchIcon size={20} />} theme={theme} />
                        <SocialIcon icon={<Mail size={20} />} theme={theme} />
                    </div>
                </footer>
            </div>
        </div>
    );
}

function SocialIcon({ icon, theme }) {
    return (
        <button className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${theme
                ? 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800'
            }`}>
            {icon}
        </button>
    );
}