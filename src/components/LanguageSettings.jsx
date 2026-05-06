import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useUser } from "../context/UserContext";

const languages = [
    { code: "en", name: "English" },
    { code: "yo", name: "Yoruba" },
    { code: "ig", name: "Igbo" },
    { code: "ha", name: "Hausa" },
];

export default function LanguageStep({ next }) {
    const { user, setUser, theme } = useUser(); // theme: true = light, false = dark

    const selectLanguage = (code) => {
        setUser({ ...user, language: code });
        next();
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl px-8"
        >
            <div className="text-center mb-16">
                <h1 className={`text-5xl font-light mb-3 transition-colors ${theme ? "text-black" : "text-white"
                    }`}>
                    Select Language
                </h1>
                <div className="w-12 h-0.5 bg-blue-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {languages.map((lang) => (
                    <motion.button
                        key={lang.code}
                        onClick={() => selectLanguage(lang.code)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group relative border transition-all rounded-lg p-6 ${theme
                                ? "bg-slate-100 hover:bg-slate-200 border-slate-200 hover:border-blue-400"
                                : "bg-slate-900 hover:bg-slate-800 border-slate-800 hover:border-blue-500/50"
                            }`}
                    >
                        <div className={`text-lg font-light transition-colors ${theme ? "text-slate-800" : "text-white"
                            }`}>
                            {lang.name}
                        </div>

                        {/* ARROW */}
                        <ArrowRight className={`absolute top-6 right-6 w-5 h-5 transition-colors ${theme
                                ? "text-slate-400 group-hover:text-blue-500"
                                : "text-slate-600 group-hover:text-blue-500"
                            }`} />
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
}