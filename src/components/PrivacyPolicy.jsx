import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from "../context/UserContext";
import { ShieldCheck, EyeOff, Lock, Server, HardDrive } from 'lucide-react';

export default function PrivacyPolicy() {
    const { theme } = useUser();

    const textPrimary = theme ? "text-slate-900" : "text-white";
    const textSecondary = theme ? "text-slate-600" : "text-slate-400";
    const cardStyle = `rounded-3xl p-8 border mb-6 transition-all duration-300 ${
        theme ? "bg-white border-slate-200 shadow-sm" : "bg-slate-900/50 border-slate-800 shadow-xl"
    }`;

    const sections = [
        {
            title: "Data Collection",
            icon: <EyeOff className="text-blue-500" />,
            content: "ClimateLink is designed with a 'Privacy-First' approach. We do not collect, store, or track any personal information. There are no user accounts, no sign-up forms, and no database logs of your identity."
        },
        {
            title: "Local Preferences",
            icon: <HardDrive className="text-green-500" />,
            content: "Your preferences (such as Dark Mode or your selected Region) are saved locally on your own browser. This data never leaves your device and is used solely to provide a consistent experience when you return."
        },
        {
            title: "External Weather Data",
            icon: <Server className="text-purple-500" />,
            content: "To provide real-time updates, ClimateLink requests data from public weather APIs. These requests do not contain your personal details, though the providers may see your IP address as part of the standard web request protocol."
        },
        {
            title: "Cookies & Tracking",
            icon: <Lock className="text-orange-500" />,
            content: "We do not use tracking cookies, marketing pixels, or third-party analytics (like Google Analytics) to follow your behavior across the web."
        }
    ];

    return (
        <div className={`min-h-screen pb-24 transition-colors duration-300 ${theme ? 'bg-slate-50' : 'bg-slate-950'}`}>
            <div className="max-w-4xl mx-auto px-8 pt-10">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-3xl mb-4 ${theme ? 'bg-blue-50 text-blue-600' : 'bg-blue-500/10 text-blue-400'}`}>
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className={`text-4xl font-light mb-3 ${textPrimary}`}>
                        Privacy <span className="font-semibold">Policy</span>
                    </h1>
                    <p className={`text-sm ${textSecondary} max-w-lg mx-auto`}>
                        Transparency is at the core of ClimateLink. Here is how we handle (and don't handle) your data.
                    </p>
                </motion.div>

                {/* Policy Sections */}
                <div className="grid grid-cols-1 gap-6">
                    {sections.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={cardStyle}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-2xl ${theme ? 'bg-slate-50' : 'bg-slate-800/50'}`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h2 className={`text-xl font-bold mb-3 ${textPrimary}`}>
                                        {item.title}
                                    </h2>
                                    <p className={`text-sm leading-relaxed ${textSecondary}`}>
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Last Updated */}
                <div className="mt-12 text-center border-t border-slate-200 dark:border-slate-800 pt-8">
                    <p className={`text-xs ${textSecondary} italic`}>
                        Last Updated: May 2026. As our technology evolves, this policy may be updated to reflect new features.
                    </p>
                </div>
            </div>
        </div>
    );
}