import { motion } from "framer-motion";
import { useUser } from "../context/UserContext";

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

export default function RegionStep({ finish }) {
    const { user, setUser, theme } = useUser(); // Added theme

    const toggleRegion = (regionId) => {
        setUser({
            ...user,
            region: user.region === regionId ? "" : regionId,
        });
    };

    const isSelected = (id) => user.region === id;

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl px-8"
        >
            {/* Header */}
            <div className="text-center mb-12">
                <div className={`text-sm mb-2 ${theme ? "text-slate-400" : "text-slate-500"}`}>
                    STEP 3 OF 3
                </div>

                <h1 className={`text-5xl font-light mb-3 transition-colors ${theme ? "text-black" : "text-white"
                    }`}>
                    Select Region
                </h1>

                <div className="w-12 h-0.5 bg-blue-500 mx-auto mb-4"></div>

                <p className={`text-sm transition-colors ${theme ? "text-slate-500" : "text-slate-400"}`}>
                    {user.region ? "1 selected" : "Select your region"}
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-4 gap-3 max-w-3xl mx-auto mb-12">
                {nigeriaRegions.map((region) => (
                    <motion.button
                        key={region.id}
                        onClick={() => toggleRegion(region.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative rounded-lg p-4 transition-all border ${isSelected(region.id)
                                ? "bg-blue-500 border-blue-400 text-white shadow-md"
                                : theme
                                    ? "bg-slate-100 border-slate-200 text-slate-800 hover:border-blue-300"
                                    : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                            }`}
                    >
                        <div className="text-sm font-light">
                            {region.name}
                        </div>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
}