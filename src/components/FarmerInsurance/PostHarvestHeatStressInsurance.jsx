import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ChevronDown, CheckCircle2, AlertTriangle, ExternalLink, Phone, Mail, HelpCircle, ArrowRight } from 'lucide-react';
import { useUser } from '../../context/UserContext';

export default function PostHarvestHeatStressInsurance() {
    const { theme } = useUser(); // true = light, false = dark
    const [isExpanded, setIsExpanded] = useState(false);

    // Consistency Design Token System matching your dashboard look
    const textPrimary = theme ? "text-slate-950" : "text-white";
    const textSecondary = theme ? "text-slate-600" : "text-slate-400";
    const textMuted = theme ? "text-slate-400" : "text-slate-500";
    const borderStyle = theme ? "border-slate-200" : "border-slate-800";
    const cardBg = theme ? "bg-white border-slate-200 shadow-sm" : "bg-slate-900 border-slate-800";

    const highlights = [
        "Protects stored harvest inventory",
        "Reduces post-harvest supply food waste",
        "Continuous regional weather station monitoring",
        "Covers transit aggregation & transport loops"
    ];

    const benefits = [
        "Protects stored grain assets from thermal degradation",
        "Covers logistics and transportation spoilage gaps",
        "Incentivizes upgrades to better storage conditions",
        "Secures and increases net post-harvest income"
    ];

    const limitations = [
        "Requires compliant local temperature monitoring equipment",
        "May not cover non-standardized/informal storage methods",
        "Basis risk if storage microclimates vary from reference stations"
    ];

    const providers = [
        { name: "NAIC (Nigerian Agricultural Insurance Corporation)", phone: "+234 800 NAIC", url: "https://naic.gov.ng", email: "info@naic.gov.ng" },
        { name: "APA (Agricultural Producers Association)", phone: "+234 800 APA", url: "https://www.apa.org.ng", email: "support@apa.org.ng" }
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
                    <Flame size={28} />
                </div>
                <h1 className={`text-4xl font-black tracking-tight mb-3 ${textPrimary}`}>
                    Post-Harvest Heat Stress Insurance
                </h1>
                <p className={`text-sm tracking-wide font-medium ${textSecondary}`}>
                    Supply Chain & Storage Facility Parametric Risk Layer
                </p>
                <div className="w-12 h-0.5 bg-blue-500 mx-auto mt-6"></div>
            </motion.div>

            {/* OVERVIEW & WHY RELEVANT BANNER */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`md:col-span-2 border rounded-3xl p-8 flex flex-col justify-between transition-all ${cardBg}`}>
                    <div>
                        <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${textMuted}`}>Functional Overview</div>
                        <p className={`text-sm leading-relaxed font-normal ${textSecondary}`}>
                            This architecture expands your protection boundary past the field and into the logistics layer. It shields bundled yield assets from compound heat and humidity thresholds that cause rapid decay during critical storage, sorting, and regional transit operations. Data triggers run autonomously to unlock compensation before spoilage sets in.
                        </p>
                    </div>
                </div>

                <div className={`rounded-3xl border-2 p-8 flex flex-col justify-between transition-all ${
                    theme ? "bg-blue-50/50 border-blue-100" : "bg-blue-950/10 border-blue-900/20"
                }`}>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-blue-500">Why Relevant</div>
                        <p className={`text-xs leading-relaxed font-medium ${theme ? "text-slate-700" : "text-slate-300"}`}>
                            Extends complete fiscal security through the value chain. Vital for producers executing multi-month storage maneuvers to hit premium pricing windows, counterbalancing inventory vulnerabilities with fast-acting capital injections.
                        </p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-blue-500 mt-4">
                        Supply Guard Active <ArrowRight size={10} />
                    </div>
                </div>
            </motion.div>

            {/* HIGH CONTRAST METRICS GRID */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Trigger Metric", val: "Temp >35°C + Hum >75%" },
                    { label: "Payout Velocity", val: "2–5 Days" },
                    { label: "Product Class", val: "Logistics Index" },
                    { label: "Base Premium", val: "₦4,000 / ssn" }
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
                    className={`w-full px-8 py-5 flex items-center justify-between text-left transition-colors border-none ${
                        theme ? "bg-slate-100 hover:bg-slate-200/60" : "bg-slate-900/40 hover:bg-slate-900"
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
                                    <div><span className={`block text-[9px] font-black uppercase tracking-wider mb-1 ${textMuted}`}>Protected Scope</span> <p className={`font-bold text-sm ${textPrimary}`}>5 Tonnes (Shed)</p></div>
                                    <div><span className={`block text-[9px] font-black uppercase tracking-wider mb-1 ${textMuted}`}>Guaranteed Cap</span> <p className={`font-bold text-sm ${textPrimary}`}>₦120,000</p></div>
                                    <div><span className={`block text-[9px] font-black uppercase tracking-wider mb-1 ${textMuted}`}>Trigger Condition</span> <p className={`font-bold text-sm ${textPrimary}`}>Temp &gt; 35°C + Hum &gt; 75%</p></div>
                                    <div><span className={`block text-[9px] font-black uppercase tracking-wider mb-1 ${textMuted}`}>Metric Channel</span> <p className={`font-bold text-sm ${textPrimary}`}>Station Telemetry Array</p></div>
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
            <motion.div variants={itemVariants} className={`rounded-[2.5rem] p-8 border transition-all ${
                theme ? "bg-slate-100 border-slate-200" : "bg-blue-950/10 border-blue-900/20"
            }`}>
                <div className="mb-6">
                    <h3 className={`text-lg font-black tracking-tight ${theme ? "text-slate-950" : "text-blue-400"}`}>Authorized Program Channels</h3>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${textMuted}`}>Regulated CDRFI Networks</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
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
                                className={`mt-2 py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-wider inline-flex items-center justify-center gap-1.5 border transition-all ${
                                    theme 
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