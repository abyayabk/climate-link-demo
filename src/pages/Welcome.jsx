import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft } from "lucide-react";
import LanguageSettings from "../components/LanguageSettings";
import RoleSettings from "../components/RoleSettings";
import RegionSettings from "../components/RegionSettings";
import { useUser } from "../context/UserContext";

export default function PreferencesPage({ onComplete }) {
    const [step, setStep] = useState(1);
    const { user, setUser, theme } = useUser(); // theme: true = light, false = dark

    const navigate = useNavigate();

    const handleComplete = () => {
        setUser({
            ...user,
            language: user.language,
            role: user.role,
            region: user.region,
        });
        navigate("/home");
    };

    return (
        <div className={`h-screen w-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 ${theme ? "bg-white" : "bg-slate-950"
            }`}>

            {/* HEADER (STEP INDICATOR) */}
            <div className="absolute top-10 text-center">
                <div className={`text-sm mb-2 font-medium ${theme ? "text-slate-500" : "text-slate-400"
                    }`}>
                    STEP {step} OF 3
                </div>

                <div className="w-20 h-0.5 bg-blue-500 mx-auto"></div>
            </div>

            {/* BACK BUTTON (TOP LEFT) */}
            {step > 1 && (
                <button
                    onClick={() => setStep(step - 1)}
                    className={`absolute top-10 left-10 flex items-center gap-2 transition-colors ${theme ? "text-slate-600 hover:text-black" : "text-slate-400 hover:text-white"
                        }`}
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="text-sm">Back</span>
                </button>
            )}

            {/* STEPS */}
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <LanguageSettings
                        key="language"
                        next={() => setStep(2)}
                        theme={theme} // Pass theme down if these components need it too
                    />
                )}

                {step === 2 && (
                    <RoleSettings
                        key="role"
                        next={() => setStep(3)}
                        theme={theme}
                    />
                )}

                {step === 3 && (
                    <RegionSettings
                        key="regions"
                        finish={handleComplete}
                        theme={theme}
                    />
                )}
            </AnimatePresence>

            {/* GLOBAL COMPLETE BUTTON (ONLY SHOW ON LAST STEP) */}
            {step === 3 && (
                <div className="absolute bottom-10">
                    <button
                        onClick={handleComplete}
                        disabled={!user?.region}
                        className={`px-10 py-3 rounded-lg font-medium transition-all ${user?.region?.length
                                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                                : theme
                                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                    : "bg-slate-800 text-slate-600 cursor-not-allowed"
                            }`}
                    >
                        Complete
                    </button>
                </div>
            )}
        </div>
    );
}