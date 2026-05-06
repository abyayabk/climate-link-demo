import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Info } from 'lucide-react';
import { seasonalData } from '../data/seasonalData';

export default function SeasonalCalendar({ region, theme }) {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    
    // Check if the current region is in the Northern list
    const isNorthern = ["kano", "kaduna", "abuja", "plateau"].includes(region?.toLowerCase());
    const data = isNorthern ? seasonalData.northern : seasonalData.southern;

    // Consistency helpers
    const textPrimary = theme ? "text-slate-950" : "text-white";
    const textMuted = theme ? "text-slate-400" : "text-slate-500";
    const barBg = theme ? "bg-slate-200/50" : "bg-slate-800/40";

    const getStatusColor = (type) => {
        switch(type) {
            case 'climate': return 'bg-blue-500';
            case 'risk': return 'bg-orange-500';
            default: return 'bg-emerald-500';
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-8 rounded-[2rem] border transition-all duration-500 ${
                theme ? "bg-white border-slate-200 shadow-sm" : "bg-slate-900 border-slate-800"
            }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${theme ? 'bg-blue-50' : 'bg-blue-500/10'}`}>
                        <Calendar className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <h2 className={`text-xl font-black tracking-tight ${textPrimary}`}>Seasonal Outlook</h2>
                        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${textMuted}`}>
                            {isNorthern ? "Northern Region Cycles" : "Southern Region Cycles"}
                        </p>
                    </div>
                </div>
                <Info className={`w-4 h-4 ${textMuted} cursor-help`} />
            </div>

            <div className="relative">
                {/* Month Labels */}
                <div className="grid grid-cols-12 mb-6 border-b border-slate-500/10 pb-2">
                    {months.map((m, i) => (
                        <div key={i} className={`text-[9px] text-center font-black tracking-widest ${textMuted}`}>{m}</div>
                    ))}
                </div>

                {/* Activity Rows */}
                <div className="space-y-8">
                    {data.map((item, idx) => (
                        <div key={idx} className="relative group">
                            {/* Label and Info */}
                            <div className="flex justify-between items-center mb-2 px-1">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${textPrimary}`}>
                                    {item.activity}
                                </span>
                                <span className={`text-[9px] font-medium ${textMuted} opacity-0 group-hover:opacity-100 transition-opacity`}>
                                    Active: {months[item.start - 1]} - {months[item.end - 1]}
                                </span>
                            </div>

                            {/* The Timeline Track */}
                            <div className={`grid grid-cols-12 h-2.5 w-full gap-1 rounded-full overflow-hidden ${barBg}`}>
                                {Array.from({ length: 12 }).map((_, i) => {
                                    const isActive = i + 1 >= item.start && i + 1 <= item.end;
                                    return (
                                        <div key={i} className="relative h-full w-full">
                                            {isActive && (
                                                <motion.div 
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    transition={{ delay: 0.1 * idx, duration: 0.5 }}
                                                    className={`absolute inset-0 z-10 ${getStatusColor(item.type)} ${
                                                        i + 1 === item.start ? 'rounded-l-full' : ''
                                                    } ${
                                                        i + 1 === item.end ? 'rounded-r-full' : ''
                                                    }`}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Legend */}
            <div className="mt-10 pt-6 border-t border-slate-500/10 flex items-center justify-between">
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className={`text-[9px] font-bold uppercase tracking-tighter ${textMuted}`}>Agric</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className={`text-[9px] font-bold uppercase tracking-tighter ${textMuted}`}>Climate</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        <span className={`text-[9px] font-bold uppercase tracking-tighter ${textMuted}`}>Risk</span>
                    </div>
                </div>
                <p className={`text-[9px] font-medium italic ${textMuted}`}>
                    Source: FEWS NET Nigeria
                </p>
            </div>
        </motion.div>
    );
}