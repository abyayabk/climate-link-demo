import React from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Phone, ExternalLink } from "lucide-react";
import { useUser } from "../context/UserContext";

export default function Resources() {
    const { theme } = useUser(); // theme: true = light, false = dark

    const resourceSections = [
        {
            title: "Weather Agencies",
            items: [
                { name: "NIMET Forecasts", link: "http://www.nimet.gov.ng", desc: "Official Nigerian seasonal climate outlooks" },
                { name: "NIHSA Flood Alerts", link: "https://nihsa.gov.ng", desc: "Real-time river monitoring and flood warnings" }
            ]
        },
        {
            title: "Climate Finance",
            items: [
                { name: "NAIC Insurance", link: "https://naicom.gov.ng", desc: "Subsidized crop insurance for Nigerian farmers" },
                { name: "NIRSAL Finance", link: "https://nirsal.com", desc: "Agric microcredit and credit guarantees[cite: 1]" }
            ]
        }
    ];

    const contacts = [
        { name: "NIMET Forecast", phone: "+23495234000" },
        { name: "NIHSA Flood Line", phone: "+2348037000001" },
        { name: "NAIC Kano Office", phone: "+23464640310" }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto px-8 py-12"
        >
            <div className="text-center mb-16">
                <h1 className={`text-5xl font-light mb-3 transition-colors ${theme ? "text-black" : "text-white"}`}>
                    Resources
                </h1>
                <div className="w-12 h-0.5 bg-blue-500 mx-auto"></div>
            </div>

            {resourceSections.map((section, idx) => (
                <div key={idx} className="mb-12">
                    <h2 className={`text-xl font-medium mb-6 ${theme ? "text-slate-600" : "text-slate-400"}`}>
                        {section.title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.items.map((item, i) => (
                            <motion.a
                                key={i}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className={`group relative border transition-all rounded-lg p-6 flex flex-col justify-between ${theme
                                        ? "bg-slate-100 hover:bg-slate-200 border-slate-200 hover:border-blue-400"
                                        : "bg-slate-900 hover:bg-slate-800 border-slate-800 hover:border-blue-500/50"
                                    }`}
                            >
                                <div>
                                    <div className={`text-lg font-light mb-2 transition-colors ${theme ? "text-slate-800" : "text-white"}`}>
                                        {item.name}
                                    </div>
                                    <p className={`text-sm ${theme ? "text-slate-500" : "text-slate-400"}`}>
                                        {item.desc}
                                    </p>
                                </div>
                                <ExternalLink className={`absolute top-6 right-6 w-5 h-5 transition-colors ${theme ? "text-slate-400 group-hover:text-blue-500" : "text-slate-600 group-hover:text-blue-500"
                                    }`} />
                            </motion.a>
                        ))}
                    </div>
                </div>
            ))}

            {/* EMERGENCY CONTACTS SECTION */}
            <div className={`rounded-xl p-8 border ${theme ? "bg-blue-50 border-blue-100" : "bg-blue-900/10 border-blue-900/30"}`}>
                <h3 className={`text-lg font-medium mb-6 ${theme ? "text-blue-900" : "text-blue-400"}`}>Emergency Support Hotlines</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {contacts.map((contact, i) => (
                        <a key={i} href={`tel:${contact.phone}`} className="flex items-center gap-3 group">
                            <div className={`p-2 rounded-full ${theme ? "bg-blue-100" : "bg-blue-900/40"}`}>
                                <Phone size={16} className="text-blue-500" />
                            </div>
                            <div>
                                <div className={`text-xs uppercase tracking-wider ${theme ? "text-slate-500" : "text-slate-400"}`}>{contact.name}[cite: 1]</div>
                                <div className={`text-sm font-medium ${theme ? "text-slate-800" : "text-white"} group-hover:text-blue-500`}>{contact.phone}[cite: 1]</div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}