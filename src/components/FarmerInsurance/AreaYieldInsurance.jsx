import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronDown, CheckCircle2, AlertTriangle, ExternalLink, Phone, Mail, HelpCircle, ArrowRight } from 'lucide-react';
import { useUser } from '../../context/UserContext';

export default function AreaYieldInsurance() {
    const { theme } = useUser(); // true = light, false = dark
    const [isExpanded, setIsExpanded] = useState(false);

    // Consistency Design Token System matching your dashboard look
    const textPrimary = theme ? "text-slate-950" : "text-white";
    const textSecondary = theme ? "text-slate-600" : "text-slate-400";
    const textMuted = theme ? "text-slate-400" : "text-slate-500";
    const borderStyle = theme ? "border-slate-200" : "border-slate-800";
    const cardBg = theme ? "bg-white border-slate-200 shadow-sm" : "bg-slate-900 border-slate-800";

    const highlights = [
        "Fast payout (7–14 days)",
        "No claim assessment needed",
        "Covers entire area equally",
        "Weather station data required"
    ];

    const benefits = [
        "Protects harvest before loss happens",
        "Includes other farmers in area",
        "Works for rain-fed crops",
        "Simple and transparent"
    ];

    const limitations = [
        "Requires accurate weather station data in your region",
        "Doesn't cover disease/pests",
        "Basis risk if your yield differs from area average"
    ];

    const providers = [
        { name: "NAIC (Nigerian Agricultural Insurance Corporation)", phone: "+234 800 NAIC", url: "https://naic.gov.ng", email: "info@naic.gov.ng" },
        { name: "APA (Agricultural Producers Association)", phone: "+234 800 APA", url: "https://www.apa.org.ng", email: "support@apa.org.ng" },
        { name: "ARC (African Risk Capacity)", phone: "+234 800 ARC", url: "https://www.africanriskcapacity.org", email: "info@arcweather.org" }
    ];

    // Framer Motion staggered orchestration variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className={`w-full max-w-4xl mx-auto px-6 py-12 space-y-8 min-h-screen transition-colors duration-300 ${theme ? "bg-slate-50" : "bg-slate-950"}`}
        >
            {/* HERO / HEADER SECTION */}
            <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto pt-6 mb-4">
                <div className={`inline-flex p-3 rounded-2xl ${theme ? 'bg-blue-50' : 'bg-blue-500/10'} text-blue-500 mb-6 border border-blue-500/20 shadow-sm`}>
                    <Shield size={28} />
                </div>
                <h1 className={`text-4xl font-black tracking-tight mb-3 ${textPrimary}`}>
                    Area Yield Index Insurance
                </h1>
                <p className={`text-sm tracking-wide font-medium ${textSecondary}`}>
                    Sovereign-Grade Microinsurance Mechanism
                </p>
                <div className="w-12 h-0.5 bg-blue-500 mx-auto mt-6"></div>
            </motion.div>

            {/* OVERVIEW & WHY RELEVANT BANNER */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`md:col-span-2 border rounded-3xl p-8 flex flex-col justify-between transition-all ${cardBg}`}>
                    <div>
                        <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${textMuted}`}>Functional Overview</div>
                        <p className={`text-sm leading-relaxed font-normal ${textSecondary}`}>
                            A threshold is established that is less than the expected country yield. Payouts are made automatically to all insured farmers within a cluster whenever the realized area's average yield falls short. This macro-system design eliminates individual verification wait times.
                        </p>
                    </div>
                </div>

                <div className={`rounded-3xl border-2 p-8 flex flex-col justify-between transition-all ${theme ? "bg-blue-50/50 border-blue-100" : "bg-blue-950/10 border-blue-900/20"
                    }`}>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-blue-500">Why Relevant</div>
                        <p className={`text-xs leading-relaxed font-medium ${theme ? "text-slate-700" : "text-slate-300"}`}>
                            Minimizes basis risk by utilizing verifiable weather telemetry. Removes the logistical burden of submitting personal farm loss documentation during widespread regional shocks.
                        </p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-blue-500 mt-4">
                        Instant Mitigation <ArrowRight size={10} />
                    </div>
                </div>
            </motion.div>

            {/* HIGH CONTRAST METRICS GRID */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Trigger Mechanism", val: "Yield < Threshold" },
                    { label: "Payout Velocity", val: "7–14 Days" },
                    { label: "Product Class", val: "Index-Based" },
                    { label: "Avg Premium", val: "₦8,500 / ssn" }
                ].map((metric, idx) => (
                    <div key={idx} className={`border rounded-2xl p-5 transition-all text-left ${cardBg}`}>
                        <div className={`text-[9px] font-black uppercase tracking-widest mb-2 ${textMuted}`}>{metric.label}</div>
                        <div className={`text-base font-black tracking-tight ${textPrimary}`}>{metric.val}</div>
                    </div>
                ))}
            </motion.div>

            {/* DYNAMIC RULES / HIGHLIGHTS SECTION */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Benefits */}
                <div className={`border rounded-3xl p-8 transition-all ${cardBg}`}>
                    <div className="flex items-center gap-2 mb-6">
                        <CheckCircle2 size={18} className="text-emerald-500" />
                        <h3 className={`text-xs font-black uppercase tracking-widest ${textPrimary}`}>Strategic Benefits</h3>
                    </div>
                    <ul className="space-y-4">
                        {benefits.map((b, i) => (
                            <li key={i} className="flex items-start gap-3 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0 transition-transform group-hover:scale-125" />
                                <span className={`text-xs font-medium leading-normal ${textSecondary}`}>{b}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Limitations */}
                <div className={`border rounded-3xl p-8 transition-all ${cardBg}`}>
                    <div className="flex items-center gap-2 mb-6">
                        <AlertTriangle size={18} className="text-orange-500" />
                        <h3 className={`text-xs font-black uppercase tracking-widest ${textPrimary}`}>Constraints & Parameters</h3>
                    </div>
                    <ul className="space-y-4">
                        {limitations.map((l, i) => (
                            <li key={i} className="flex items-start gap-3 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0 transition-transform group-hover:scale-125" />
                                <span className={`text-xs font-medium leading-normal ${textSecondary}`}>{l}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>

            {/* EXAMINABLE ACCORDION POLICY */}
            <motion.div variants={itemVariants} className={`border rounded-3xl overflow-hidden transition-all ${borderStyle}`}>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`w-full px-8 py-5 flex items-center justify-between text-left transition-colors border-none ${theme ? "bg-slate-100 hover:bg-slate-200/60" : "bg-slate-900/40 hover:bg-slate-900"
                        }`}
                >
                    <span className={`text-xs font-black uppercase tracking-widest flex items-center gap-2.5 ${textPrimary}`}>
                        <HelpCircle size={16} className="text-blue-500" /> Reference Policy Framework
                    </span>
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ type: "spring", damping: 15 }}>
                        <ChevronDown size={16} className={textMuted} />
                    </motion.div>
                </button>
                <AnimatePresence initial={false}>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className={`p-8 border-t text-xs space-y-6 ${borderStyle} ${theme ? "bg-white" : "bg-slate-950/20"}`}>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                    <div><span className={`block text-[9px] font-black uppercase tracking-wider mb-1 ${textMuted}`}>Sample Crop Scope</span> <p className={`font-bold text-sm ${textPrimary}`}>2 Ha (Millet)</p></div>
                                    <div><span className={`block text-[9px] font-black uppercase tracking-wider mb-1 ${textMuted}`}>Guaranteed Cap</span> <p className={`font-bold text-sm ${textPrimary}`}>₦250,000</p></div>
                                    <div><span className={`block text-[9px] font-black uppercase tracking-wider mb-1 ${textMuted}`}>Trigger Value</span> <p className={`font-bold text-sm ${textPrimary}`}>&lt; 800kg/ha</p></div>
                                    <div><span className={`block text-[9px] font-black uppercase tracking-wider mb-1 ${textMuted}`}>Data Telemetry</span> <p className={`font-bold text-sm ${textPrimary}`}>Station-Verified</p></div>
                                </div>
                                <div className={`pt-5 border-t ${borderStyle}`}>
                                    <span className={`text-[10px] font-black uppercase tracking-widest block mb-3 ${textPrimary}`}>System Validation Benchmarks</span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {highlights.map((h, i) => (
                                            <div key={i} className={`flex items-center gap-2.5 text-xs font-medium ${textSecondary}`}>
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                {h}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* AUTHORIZED CHANNELS (Consistent with global dashboard theme patterns) */}
            <motion.div variants={itemVariants} className={`rounded-[2.5rem] p-8 border transition-all ${theme ? "bg-slate-100 border-slate-200" : "bg-blue-950/10 border-blue-900/20"
                }`}>
                <div className="mb-6">
                    <h3 className={`text-lg font-black tracking-tight ${theme ? "text-slate-950" : "text-blue-400"}`}>Authorized Program Channels</h3>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${textMuted}`}>Regulated CDRFI Networks</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {providers.map((provider, i) => (
                        <div key={i} className={`flex flex-col gap-4 justify-between p-6 rounded-2xl border transition-all ${cardBg}`}>
                            <div>
                                <div className={`text-[11px] font-black tracking-tight mb-3 line-clamp-2 leading-snug ${textPrimary}`}>
                                    {provider.name}
                                </div>
                                <div className="space-y-2">
                                    <a href={`tel:${provider.phone}`} className={`flex items-center gap-2 text-xs hover:text-blue-500 transition-colors ${textSecondary}`}>
                                        <Phone size={12} className="text-blue-500" />
                                        <span className="font-medium tracking-wide">{provider.phone}</span>
                                    </a>
                                    <a href={`mailto:${provider.email}`} className={`flex items-center gap-2 text-xs hover:text-blue-500 transition-colors ${textSecondary}`}>
                                        <Mail size={12} className="text-blue-500" />
                                        <span className="font-medium tracking-wide break-all">{provider.email}</span>
                                    </a>
                                </div>
                            </div>
                            <motion.a
                                href={provider.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className={`mt-2 py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-wider inline-flex items-center justify-center gap-1.5 border transition-all ${theme
                                        ? "bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-sm"
                                        : "bg-slate-950 hover:bg-slate-900 text-slate-200 border-slate-800"
                                    }`}
                            >
                                Launch Terminal <ExternalLink size={10} />
                            </motion.a>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}