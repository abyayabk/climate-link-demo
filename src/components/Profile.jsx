import { motion } from 'framer-motion';
import { useUser } from "../context/UserContext";

const languages = [
    { code: "en", name: "English" },
    { code: "yo", name: "Yoruba" },
    { code: "ig", name: "Igbo" },
    { code: "ha", name: "Hausa" },
];

const nigeriaRegions = [
    { id: "lagos", name: "Lagos" },
    { id: "kano", name: "Kano" },
    { id: "abuja", name: "Abuja" },
    { id: "rivers", name: "Rivers" },
    { id: "kaduna", name: "Kaduna" },
    { id: "oyo", name: "Oyo" },
    { id: "edo", name: "Edo" },
    { id: "delta", name: "Delta" },
    { id: "enugu", name: "Enugu" },
    { id: "plateau", name: "Plateau" },
    { id: "benue", name: "Benue" },
    { id: "ondo", name: "Ondo" },
];

const roles = [
    { id: "community", name: "Community" },
    { id: "government", name: "Government" },
    { id: "humanitarian", name: "Humanitarian" },
    { id: "business", name: "Business" },
    { id: "insurance", name: "Insurance" },
    { id: "farmer", name: "Farmer" },
    { id: "general", name: "General" },
];

export default function Profile() {
    const { user, setUser, theme } = useUser();

    // --- HANDLER LOGIC ---
    const selectLanguage = (code) => {
        setUser({ ...user, language: code });
    };

    const selectRole = (id) => {
        setUser({ ...user, role: id });
    };

    const toggleRegion = (regionId) => {
        setUser({
            ...user,
            region: user.region === regionId ? "" : regionId,
        });
    };

    const isSelected = (id) => user.region === id;

    // --- REUSABLE WRAPPER ---
    const SectionWrapper = ({ children }) => (
        <section className="mb-20 last:mb-0">
            <div className="flex flex-col items-center">
                {children}
            </div>
            <div className={`w-full h-px mt-20 max-w-2xl mx-auto ${
                theme ? "bg-slate-200" : "bg-slate-800"
            }`} />
        </section>
    );

    return (
        <div className={`min-h-screen w-full transition-colors duration-300 overflow-y-auto ${
            theme ? "bg-white" : "bg-slate-950"
        }`}>
            <div className="max-w-5xl mx-auto px-6 py-24">
                
                {/* Profile Header */}
                <header className="text-center mb-24">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-4xl font-light mb-4 ${theme ? "text-slate-900" : "text-white"}`}
                    >
                        Account Preferences
                    </motion.h1>
                    <p className={`text-sm ${theme ? "text-slate-500" : "text-slate-400"}`}>
                        Update your language, role, and regional settings below.
                    </p>
                </header>

                <div className="space-y-12">
                    
                    {/* 1. Language Section */}
                    <SectionWrapper>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="w-full max-w-2xl px-8"
                        >
                            <div className="text-center mb-16">
                                <h2 className={`text-3xl font-light mb-3 ${theme ? "text-black" : "text-white"}`}>
                                    Select Language
                                </h2>
                                <div className="w-12 h-0.5 bg-blue-500 mx-auto"></div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                                {languages.map((lang) => (
                                    <motion.button
                                        key={lang.code}
                                        onClick={() => selectLanguage(lang.code)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`group relative border transition-all rounded-lg p-6 ${
                                            user.language === lang.code
                                            ? "bg-blue-600 border-blue-500 text-white"
                                            : theme
                                                ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800"
                                                : "bg-slate-900 hover:bg-slate-800 border-slate-800 text-white"
                                        }`}
                                    >
                                        <div className="text-lg font-light">{lang.name}</div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </SectionWrapper>

                    {/* 2. Role Section */}
                    <SectionWrapper>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="w-full max-w-3xl px-8"
                        >
                            <div className="text-center mb-16">
                                <h2 className={`text-3xl font-light mb-3 ${theme ? "text-black" : "text-white"}`}>
                                    Your Role
                                </h2>
                                <div className="w-12 h-0.5 bg-blue-500 mx-auto"></div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                                {roles.map((role) => (
                                    <motion.button
                                        key={role.id}
                                        onClick={() => selectRole(role.id)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`group border transition-all rounded-lg p-6 ${
                                            user.role === role.id
                                            ? "bg-blue-600 border-blue-500 text-white"
                                            : theme
                                                ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800"
                                                : "bg-slate-900 hover:bg-slate-800 border-slate-800 text-white"
                                        }`}
                                    >
                                        <div className="text-base font-light">{role.name}</div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </SectionWrapper>

                    {/* 3. Region Section */}
                    <SectionWrapper>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="w-full max-w-4xl px-8"
                        >
                            <div className="text-center mb-12">
                                <h2 className={`text-3xl font-light mb-3 ${theme ? "text-black" : "text-white"}`}>
                                    Select Region
                                </h2>
                                <div className="w-12 h-0.5 bg-blue-500 mx-auto mb-4"></div>
                                <p className={`text-sm ${theme ? "text-slate-500" : "text-slate-400"}`}>
                                    {user.region ? "Region updated" : "Select your region"}
                                </p>
                            </div>

                            <div className="grid grid-cols-4 gap-3 max-w-3xl mx-auto mb-12">
                                {nigeriaRegions.map((region) => (
                                    <motion.button
                                        key={region.id}
                                        onClick={() => toggleRegion(region.id)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`relative rounded-lg p-4 transition-all border ${
                                            isSelected(region.id)
                                            ? "bg-blue-600 border-blue-500 text-white shadow-md"
                                            : theme
                                                ? "bg-slate-100 border-slate-200 text-slate-800 hover:border-blue-300"
                                                : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                                        }`}
                                    >
                                        <div className="text-sm font-light">{region.name}</div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </SectionWrapper>
                </div>

                <div className="h-32" />
            </div>
        </div>
    );
}