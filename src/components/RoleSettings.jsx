import { motion } from "framer-motion";
import { useUser } from "../context/UserContext";

const roles = [
    { id: "community", name: "Community" },
    { id: "government", name: "Government" },
    { id: "humanitarian", name: "Humanitarian" },
    { id: "business", name: "Business" },
    { id: "insurance", name: "Insurance" },
    { id: "farmer", name: "Farmer" },
    { id: "general", name: "General" },
];

export default function RoleStep({ next }) {
    const { user, setUser, theme } = useUser(); // Destructured theme

    const selectRole = (id) => {
        setUser({ ...user, role: id });
        next();
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-3xl px-8"
        >
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className={`text-5xl font-light mb-3 transition-colors ${theme ? "text-black" : "text-white"
                    }`}>
                    Your Role
                </h1>
                <div className="w-12 h-0.5 bg-blue-500 mx-auto"></div>
            </div>

            {/* Roles Grid */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                {roles.map((role) => (
                    <motion.button
                        key={role.id}
                        onClick={() => selectRole(role.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group relative border transition-all rounded-lg p-6 ${theme
                                ? "bg-slate-100 hover:bg-slate-200 border-slate-200 hover:border-blue-400"
                                : "bg-slate-900 hover:bg-slate-800 border-slate-800 hover:border-blue-500/50"
                            }`}
                    >
                        <div className={`text-base font-light transition-colors ${theme ? "text-slate-800" : "text-white"
                            }`}>
                            {role.name}
                        </div>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
}