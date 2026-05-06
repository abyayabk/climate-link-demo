import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from "../context/UserContext";
import { Book, Search, Hash } from 'lucide-react';

export default function Glossary() {
    const { theme } = useUser();
    const [searchTerm, setSearchTerm] = useState("");

    const textPrimary = theme ? "text-slate-900" : "text-white";
    const textSecondary = theme ? "text-slate-600" : "text-slate-400";
    const cardStyle = `rounded-3xl p-6 border transition-all duration-300 ${
        theme ? "bg-white border-slate-200 shadow-sm" : "bg-slate-900/50 border-slate-800 shadow-xl"
    }`;

    const glossaryData = [
        { term: "Area Yield Index Insurance", def: "Focuses on crop losses across an entire region, rather than individual farms. It offers protection if the average yield in your area falls below a certain level." },
        { term: "Basis Risk", def: "The potential mismatch between contract payouts as measured by the index and the actual loss experienced." },
        { term: "Catastrophic Bonds (Cat. Bond)", def: "Financial resources to cover natural disasters. If a disaster strikes, the country receives funds and investors lose their capital." },
        { term: "Climate Disaster Risk Finance and Insurance (CDRFI)", def: "A framework integrating financial tools and insurance to help manage fiscal risks associated with floods, droughts, and hurricanes." },
        { term: "Claim", def: "A demand by an insured for compensation. In index-based insurance, these can be issued automatically upon triggering specific indicators like wind speed or rainfall." },
        { term: "Climate Resilience", def: "The ability of individuals, societies, and ecosystems to withstand and recover from climate change impacts." },
        { term: "Climate Risk Insurance", def: "A financial tool used to transfer economic losses caused by extreme weather from individuals to insurers." },
        { term: "Climate Risks", def: "Includes sudden events like storms and floods (narrow sense) and slow onset events like sea level rise (broad sense)." },
        { term: "Climate Smart Agriculture (CSA)", def: "An approach to transform agri-food systems towards green and resilient practices while increasing productivity." },
        { term: "Contingency Plan", def: "Procedures established in advance to enable timely and effective responses to catastrophes." },
        { term: "Coverage Limit", def: "The maximum amount an insurance company will pay out for a covered loss." },
        { term: "Crop Insurance", def: "Designed to protect farmers and wholesalers from climate risks threatening harvests." },
        { term: "Disaster", def: "An event causing significant harm or loss that disrupts the normal course of life." },
        { term: "Disaster Response", def: "Coordinated actions taken before, during, and after a disaster to save lives and protect property." },
        { term: "Disaster Risk Finance", def: "The use of financial tools to help governments and communities anticipate and recover from disaster impacts." },
        { term: "Disaster Risk Management", def: "Analyzing risk factors to reduce existing risks and strengthen resilience." },
        { term: "Financial Instruments", def: "Contracts designed to transfer, pool, or provision funds for climate-driven disasters." },
        { term: "Financial Protection", def: "Policies and strategies designed to safeguard individuals and governments from economic shocks." },
        { term: "Flood Insurance", def: "Specialized policy providing coverage specifically for damages caused by flooding." },
        { term: "Indemnity", def: "A promise to compensate someone for losses or damages they might suffer." },
        { term: "Insurance Premium", def: "The amount charged to an individual or organization for insurance protection." },
        { term: "Parametric Insurance", def: "Type of insurance where payouts are automatically triggered by predefined parameters like rainfall amount or wind speed." },
        { term: "Risk Pools", def: "Entities that offer parametric insurance for governments, such as the African Risk Capacity (ARC)." },
        { term: "Triggers", def: "The variable or index underlying an insurance mechanism. If a threshold is exceeded, a payout is prompted." },
        { term: "Weather Index Insurance", def: "Compensation based on the realization of a specific weather parameter measured over a specified period." }
    ];

    // Filter logic
    const filteredData = glossaryData.filter(item => 
        item.term.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get unique first letters for the "Jump to" bar
    const alphabets = [...new Set(glossaryData.map(item => item.term[0].toUpperCase()))].sort();

    const scrollToLetter = (letter) => {
        const element = document.getElementById(`letter-${letter}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className={`min-h-screen pb-24 transition-colors duration-300 ${theme ? 'bg-slate-50' : 'bg-slate-950'}`}>
            <div className="max-w-4xl mx-auto px-8 pt-10">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-2xl ${theme ? 'bg-blue-50 text-blue-600' : 'bg-blue-500/10 text-blue-400'}`}>
                            <Book size={24} />
                        </div>
                        <h1 className={`text-3xl font-light ${textPrimary}`}>
                            Climate <span className="font-semibold">Glossary</span>
                        </h1>
                    </div>
                    <p className={`text-sm ${textSecondary} leading-relaxed`}>
                        Your essential dictionary for CDRFI, financial protection, and climate resilience terms.
                    </p>
                </motion.div>

                {/* Search Bar */}
                <div className="relative mb-8">
                    <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${textSecondary}`} />
                    <input 
                        type="text"
                        placeholder="Search for a term (e.g. Parametric)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full pl-11 pr-4 py-4 rounded-2xl border outline-none transition-all ${
                            theme 
                            ? 'bg-white border-slate-200 focus:border-blue-500 shadow-sm' 
                            : 'bg-slate-900 border-slate-800 focus:border-blue-500 text-white'
                        }`}
                    />
                </div>

                {/* Alphabet Jump Bar */}
                {!searchTerm && (
                    <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-slate-200 dark:border-slate-800">
                        {alphabets.map(letter => (
                            <button
                                key={letter}
                                onClick={() => scrollToLetter(letter)}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                                    theme ? 'bg-white hover:bg-blue-50 text-slate-400 hover:text-blue-600 border border-slate-100' : 'bg-slate-900 hover:bg-slate-800 text-slate-500 border border-slate-800'
                                }`}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                )}

                {/* Terms List */}
                <div className="space-y-6">
                    {filteredData.length > 0 ? (
                        filteredData.map((item, index) => {
                            const isNewLetter = index === 0 || filteredData[index-1].term[0].toUpperCase() !== item.term[0].toUpperCase();
                            const currentLetter = item.term[0].toUpperCase();

                            return (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                >
                                    {isNewLetter && !searchTerm && (
                                        <div 
                                            id={`letter-${currentLetter}`}
                                            className={`text-sm font-bold mb-4 flex items-center gap-2 ${theme ? 'text-blue-600' : 'text-blue-400'}`}
                                        >
                                            <Hash size={14} /> {currentLetter}
                                        </div>
                                    )}
                                    <div className={cardStyle}>
                                        <h3 className={`text-lg font-bold mb-2 ${textPrimary}`}>
                                            {item.term}
                                        </h3>
                                        <p className={`text-sm leading-relaxed ${textSecondary}`}>
                                            {item.def}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="text-center py-20">
                            <p className={textSecondary}>No terms found matching "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}