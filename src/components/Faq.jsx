import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from "../context/UserContext";
import { 
    HelpCircle, 
    ChevronDown, 
    MessageCircle, 
    ShieldCheck, 
    Zap, 
    Globe, 
    Cpu,
    MapPin,
    User,
    FileText,
    AlertTriangle,
    Book,
    TrendingUp,
    Settings
} from 'lucide-react';

export default function Faq() {
    const { theme } = useUser();
    const [activeIndex, setActiveIndex] = useState(null);

    // Dynamic styles based on your Dashboard theme logic
    const textPrimary = theme ? "text-slate-900" : "text-white";
    const textSecondary = theme ? "text-slate-600" : "text-slate-400";
    const cardStyle = `rounded-3xl p-6 mb-4 border transition-all duration-300 ${
        theme ? "bg-white border-slate-200 shadow-sm" : "bg-slate-900/50 border-slate-800 shadow-xl"
    }`;

    const faqData = [
        {
            q: "What is ClimateLink?",
            a: "ClimateLink is your interactive guide to climate change and Climate Disaster Risk Finance and Insurance (CDRFI). Using a rule-based design, it breaks down complex policies and financial tools into clear, trustworthy answers.",
            icon: <HelpCircle className="w-5 h-5" />
        },
        {
            q: "How does ClimateLink work?",
            a: "It works like a guided conversation. It follows a rule-based system, meaning every response is part of a structured flow from experts, ensuring answers are fact-checked and context-aware.",
            icon: <MessageCircle className="w-5 h-5" />
        },
        {
            q: "Why use a rule-based chatbot instead of AI?",
            a: "Accuracy and sustainability. Unlike AI, rule-based designs use less energy, keeping the carbon footprint low. It also ensures information reflects specific local policies that AI might miss.",
            icon: <Zap className="w-5 h-5" />
        },
        {
            q: "What’s CDRFI and how does it help me?",
            a: "CDRFI stands for Climate and Disaster Risk Finance and Insurance. It acts as a safety net—if floods or droughts damage your assets, you get financial help and mitigation measures so you don't lose everything.",
            icon: <ShieldCheck className="w-5 h-5" />
        },
        {
            q: "How is CDRFI different from Traditional Relief?",
            a: "Traditional relief is reactive and often delayed. CDRFI is pre-arranged and pre-financed, allowing for an immediate response to reduce post-disaster challenges.",
            icon: <Globe className="w-5 h-5" />
        },
        {
            q: "Can CDRFI work for individuals in remote areas?",
            a: "Yes. It perfectly serves remote communities through inclusion in national/regional pools or through microinsurance specifically designed for smallholders.",
            icon: <MapPin className="w-5 h-5" />
        },
        {
            q: "Where can I find CDRFI support?",
            a: "Through ClimateLink, you get weather alerts, finance and insurance options, risk mitigation measures, and risk transfer solutions.",
            icon: <HelpCircle className="w-5 h-5" />
        },
        {
            q: "What am I insured against?",
            a: "You are protected against specific climate-related events like floods that severely impact operations, assets, and livelihoods.",
            icon: <ShieldCheck className="w-5 h-5" />
        },
        {
            q: "Am I eligible for this kind of Insurance?",
            a: "Eligibility depends on the program. Sovereign programs are for countries, Agriculture microinsurance is for cooperatives, and humanitarian programs target specific vulnerable groups.",
            icon: <User className="w-5 h-5" />
        },
        {
            q: "What’s the premium price?",
            a: "The cost varies based on coverage amount and risk level. Payments can be handled by different parties depending on the specific program structure.",
            icon: <Zap className="w-5 h-5" />
        },
        {
            q: "How fast is the payout?",
            a: "For parametric solutions using blockchain, payouts are automatic once a threshold is triggered. You receive payment immediately via mobile.",
            icon: <Zap className="w-5 h-5" />
        },
        {
            q: "Do I need to prove I suffered damage?",
            a: "No. Payouts are based on the occurrence of a predefined event (like rainfall levels) rather than an assessment of your actual physical losses.",
            icon: <FileText className="w-5 h-5" />
        },
        {
            q: "Will CDRFI help me prevent future disasters?",
            a: "While it doesn't stop disasters, some programs link premium discounts to risk reduction actions, like building flood barriers.",
            icon: <AlertTriangle className="w-5 h-5" />
        },
        {
            q: "What if I don’t understand the technical terms?",
            a: "ClimateLink offers visual tools and local language support to explain how CDRFI works using practical scenarios and advice.",
            icon: <Book className="w-5 h-5" />
        },
        {
            q: "How can new technology help?",
            a: "AI and satellites predict disasters early; IoT sensors monitor real-time conditions; and blockchain ensures fast, transparent payouts.",
            icon: <Cpu className="w-5 h-5" />
        },
        {
            q: "Can Farmers benefit from tech-enabled CDRFI?",
            a: "Yes. Mobile-based parametric insurance uses weather data to automatically pay farmers if a drought or flood threshold is triggered.",
            icon: <TrendingUp className="w-5 h-5" />
        },
        {
            q: "What if the network is down during a disaster?",
            a: "Solutions can be accessed through offline compatible tools such as USSD menus when the internet is unavailable.",
            icon: <Settings className="w-5 h-5" />
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className={`min-h-screen pb-20 transition-colors duration-300 ${theme ? 'bg-slate-50' : 'bg-slate-950'}`}>
            <div className="max-w-4xl mx-auto px-8 pt-10">
                
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 text-center"
                >
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-3xl mb-4 ${theme ? 'bg-blue-50 text-blue-600' : 'bg-blue-500/10 text-blue-400'}`}>
                        <HelpCircle size={32} />
                    </div>
                    <h1 className={`text-3xl font-light mb-3 ${textPrimary}`}>
                        Frequently Asked <span className="font-semibold">Questions</span>
                    </h1>
                    <p className={`text-sm leading-relaxed ${textSecondary}`}>
                        Quick answers to common questions about ClimateLink, CDRFI, and how we support a climate-resilient future.
                    </p>
                </motion.div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={cardStyle}
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex items-center justify-between text-left gap-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-xl ${theme ? 'bg-slate-50' : 'bg-slate-800/50'}`}>
                                        {item.icon}
                                    </div>
                                    <span className={`font-medium text-sm sm:text-base ${textPrimary}`}>
                                        {item.q}
                                    </span>
                                </div>
                                <ChevronDown 
                                    className={`w-5 h-5 transition-transform duration-300 ${textSecondary} ${activeIndex === index ? 'rotate-180' : ''}`} 
                                />
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className={`pt-4 mt-4 border-t ${theme ? 'border-slate-100' : 'border-slate-800'} text-sm leading-relaxed ${textSecondary}`}>
                                            {item.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Note */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className={`mt-12 p-6 rounded-3xl border border-dashed text-center ${theme ? 'border-slate-200' : 'border-slate-800'}`}
                >
                    <p className={`text-xs ${textSecondary}`}>
                        Still have questions? Reach out to our team via the Support section in the menu.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}