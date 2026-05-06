import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from "../context/UserContext";
import {
    RefreshCw,
    MapPin,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Briefcase,
    ShieldCheck,
    ArrowRight
} from 'lucide-react';
import MapSection from './MapSection';
import { useTranslation } from 'react-i18next';
import { roleGuidance } from '../data/roleContent'; // The logic file we created
import SeasonalCalendar from './SeasonalCalendar';

// Updated with coordinates for accurate API fetching[cite: 3]
const nigeriaRegions = [
    { id: "lagos", name: "Lagos", lat: 6.5244, lon: 3.3792 },
    { id: "kano", name: "Kano", lat: 12.0022, lon: 8.5920 },
    { id: "abuja", name: "Abuja", lat: 9.0765, lon: 7.3986 },
    { id: "rivers", name: "Rivers", lat: 4.8156, lon: 7.0498 },
    { id: "kaduna", name: "Kaduna", lat: 10.5105, lon: 7.4165 },
    { id: "oyo", name: "Oyo", lat: 7.3775, lon: 3.9470 },
    { id: "edo", name: "Edo", lat: 6.3350, lon: 5.6037 },
    { id: "delta", name: "Delta", lat: 5.8904, lon: 5.6832 },
    { id: "enugu", name: "Enugu", lat: 6.4584, lon: 7.5032 },
    { id: "plateau", name: "Plateau", lat: 9.8965, lon: 8.8583 },
    { id: "benue", name: "Benue", lat: 7.3333, lon: 8.7500 },
    { id: "ondo", name: "Ondo", lat: 7.1000, lon: 4.8417 },
];

export default function Dashboard() {
    const { t, i18n } = useTranslation();
    const { user, theme } = useUser();
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. SELECT ROLE CONTENT
    // Ensure case-insensitivity and default to 'farmer'
    const userRoleKey = user.role?.toLowerCase() || 'farmer';
    const content = roleGuidance[userRoleKey] || roleGuidance.farmer;

    // const API_KEY = "9ab0c37f3c6af9d88fc8e276e96ca85b"; // Your provided key[cite: 3]
    const API_KEY = "9ab0c"; // Your provided key[cite: 3]

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true);
            const region = nigeriaRegions.find(r => r.id === user.region) || nigeriaRegions[0];

            // 1. HARDCODED FALLBACK DATA (The Demo "Safety Net")
            const mockWeatherData = {
                current: {
                    temperature: 28,
                    feelsLike: 30,
                    rainfall: 0,
                    humidity: 65,
                    windSpeed: 12,
                    condition: "partly cloudy (demo mode)",
                    visibility: 10,
                    pressure: 1012,
                    aqi: 2,
                    aqiText: "Fair",
                    aqiColor: "text-yellow-500"
                },
                hourly: Array(8).fill(0).map((_, i) => ({
                    time: `${(new Date().getHours() + i) % 24}:00`,
                    temp: 25 + Math.floor(Math.random() * 5),
                    condition: "Cloudy"
                })),
                daily: ["Mon", "Tue", "Wed", "Thu", "Fri"].map(day => ({
                    day,
                    high: 31,
                    low: 24,
                    condition: "Rain",
                    rainfall: 2.5
                }))
            };

            try {
                // 2. ATTEMPT REAL API CALLS
                const [currentRes, airRes, forecastRes] = await Promise.all([
                    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${region.lat}&lon=${region.lon}&appid=${API_KEY}&units=metric`),
                    fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${region.lat}&lon=${region.lon}&appid=${API_KEY}`),
                    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${region.lat}&lon=${region.lon}&appid=${API_KEY}&units=metric`)
                ]);

                // Check if any response failed (e.g., 401 Unauthorized or 429 Too Many Requests)
                if (!currentRes.ok || !airRes.ok || !forecastRes.ok) {
                    throw new Error("API Limit reached or Network Error");
                }

                const currentData = await currentRes.json();
                const airData = await airRes.json();
                const forecastData = await forecastRes.json();

                const aqiMap = {
                    1: { label: "Good", color: "text-green-500" },
                    2: { label: "Fair", color: "text-yellow-500" },
                    3: { label: "Moderate", color: "text-orange-500" },
                    4: { label: "Poor", color: "text-red-500" },
                    5: { label: "Very Poor", color: "text-purple-500" }
                };

                const rawAqi = airData.list[0].main.aqi;

                setWeather({
                    current: {
                        temperature: Math.round(currentData.main.temp),
                        feelsLike: Math.round(currentData.main.feels_like),
                        rainfall: currentData.rain ? currentData.rain['1h'] || 0 : 0,
                        humidity: currentData.main.humidity,
                        windSpeed: currentData.wind.speed,
                        condition: currentData.weather[0].description,
                        visibility: currentData.visibility / 1000,
                        pressure: currentData.main.pressure,
                        aqi: rawAqi,
                        aqiText: aqiMap[rawAqi].label,
                        aqiColor: aqiMap[rawAqi].color
                    },
                    hourly: forecastData.list.slice(0, 8).map(item => ({
                        time: new Date(item.dt * 1000).getHours() + ":00",
                        temp: Math.round(item.main.temp),
                        condition: item.weather[0].main
                    })),
                    daily: forecastData.list.filter((_, index) => index % 8 === 0).map(item => ({
                        day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
                        high: Math.round(item.main.temp_max),
                        low: Math.round(item.main.temp_min),
                        condition: item.weather[0].main,
                        rainfall: item.rain ? item.rain['3h'] || 0 : 0
                    }))
                });
            } catch (error) {
                console.warn("Using Fallback Weather Data:", error.message);
                // 3. APPLY HARDCODED DATA ON FAILURE
                setWeather(mockWeatherData);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [user.region]);

    if (loading) return (
        <div className={`flex-1 flex items-center justify-center ${theme ? "bg-white" : "bg-slate-950"}`}>
            <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
        </div>
    );

    const cardStyle = `transition-colors duration-300 border rounded-xl p-6 ${theme ? "bg-slate-100 border-slate-200 shadow-sm" : "bg-slate-900 border-slate-800"}`;
    const textPrimary = theme ? "text-slate-900" : "text-white";
    const textSecondary = theme ? "text-slate-600" : "text-slate-400";
    const textMuted = theme ? "text-slate-500" : "text-slate-500";

    return (
        <div className={`flex-1 overflow-y-auto transition-colors duration-300 ${theme ? "bg-white" : "bg-slate-950"}`}>
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`relative overflow-hidden rounded-2xl p-8 shadow-lg transition-all duration-500 ${theme
                        ? "bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-500"
                        : "bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700"}`}
                >
                    <div className="relative z-10 text-white">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <div className="text-white/80 text-sm mb-2 font-medium">{user.role?.toUpperCase() || t('RESEARCHER')}</div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm font-light">{user.region ? user.region.charAt(0).toUpperCase() + user.region.slice(1) : 'Lagos, Nigeria'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <div className="text-white/70 text-xs mb-1">Temperature</div>
                                <div className="text-4xl font-light">{weather.current.temperature}°</div>
                                <div className="text-white/60 text-xs mt-1">Feels like {weather.current.feelsLike}°</div>
                            </div>
                            <div>
                                <div className="text-white/70 text-xs mb-1">Rainfall</div>
                                <div className="text-4xl font-light">{weather.current.rainfall}</div>
                                <div className="text-white/60 text-xs mt-1">mm (last hr)</div>
                            </div>
                            <div>
                                <div className="text-white/70 text-xs mb-1">Humidity</div>
                                <div className="text-4xl font-light">{weather.current.humidity}</div>
                                <div className="text-white/60 text-xs mt-1">percent</div>
                            </div>
                            <div>
                                <div className="text-white/70 text-xs mb-1">Wind Speed</div>
                                <div className="text-4xl font-light">{weather.current.windSpeed}</div>
                                <div className="text-white/60 text-xs mt-1">km/h</div>
                            </div>
                        </div>
                        <div className="mt-6 p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
                            <div className="text-sm italic font-light capitalize">{weather.current.condition}</div>
                        </div>
                    </div>
                </motion.div>

                {/* ROLE-SPECIFIC GUIDANCE (The Decision Engine) */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className={`text-2xl font-black tracking-tight ${textPrimary}`}>{content.title}</h2>
                            <p className={`text-sm ${textSecondary}`}>{content.description}</p>
                        </div>
                        <div className={`p-3 rounded-2xl ${theme ? 'bg-white' : 'bg-slate-900'} border border-blue-500/20`}>
                            <Briefcase className="text-blue-500" size={24} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {content.actions.map((action, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -4 }}
                                className={cardStyle}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-2 rounded-xl ${theme ? 'bg-slate-50' : 'bg-slate-800'}`}>
                                        <ShieldCheck size={18} className="text-blue-500" />
                                    </div>
                                    <ArrowRight size={14} className={textMuted} />
                                </div>
                                <h3 className={`font-bold text-base mb-1 ${textPrimary}`}>{action.label}</h3>
                                <p className={`text-xs leading-relaxed ${textSecondary}`}>{action.info}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ACTIONABLE CLIMATE INTELLIGENCE */}
                <motion.section className={cardStyle}>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-orange-500" />
                            <h2 className={`text-lg font-bold ${textPrimary}`}>Live Risk Assessment</h2>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${theme ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-400'
                            }`}>
                            Role: {user.role || 'User'}
                        </span>
                    </div>

                    <div className="space-y-4">
                        {/* Dynamic Alert Box */}
                        <div className={`rounded-2xl border-2 p-6 transition-all ${weather.current.rainfall > 5
                            ? "border-orange-500/50 bg-orange-500/5"
                            : "border-emerald-500/20 bg-emerald-500/5"
                            }`}>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className={`font-black text-sm uppercase tracking-tight ${textPrimary}`}>
                                        {weather.current.rainfall > 5 ? 'High Moisture Warning' : 'Stable Conditions'}
                                    </h3>
                                    <p className={`text-xs ${textSecondary} mt-1`}>
                                        Current Rainfall: <span className="font-bold text-blue-500">{weather.current.rainfall}mm/hr</span>
                                    </p>
                                </div>
                                <div className={`px-2 py-1 rounded text-[10px] font-bold ${weather.current.rainfall > 5 ? 'bg-orange-500 text-white' : 'bg-emerald-500 text-white'
                                    }`}>
                                    {weather.current.rainfall > 5 ? 'ACTION REQUIRED' : 'NORMAL'}
                                </div>
                            </div>

                            {/* RULE-BASED ADVICE (The Demo "Brain") */}
                            <div className={`p-4 rounded-xl ${theme ? 'bg-white/50' : 'bg-slate-900/50'} border border-black/5`}>
                                <p className={`text-sm leading-relaxed ${textPrimary}`}>
                                    <span className="font-bold">Advice for {user.role}: </span>
                                    {weather.current.rainfall > 5 ? (
                                        // If it's raining heavily
                                        user.role === 'Farmer'
                                            ? "Check Area Yield Index thresholds; heavy rain may trigger a moisture index payout if sustained."
                                            : user.role === 'Government'
                                                ? "Activate local flood contingency plans and monitor river levels in high-risk zones."
                                                : "Alert community leaders to potential flash flooding and verify emergency communication lines."
                                    ) : (
                                        // If it's NOT raining heavily
                                        user.role === 'Farmer'
                                            ? "Ideal conditions for routine maintenance. Review your NAIC policy terms for the upcoming season."
                                            : user.role === 'Government'
                                                ? "Continue data collection for risk modeling. No immediate fiscal shocks detected."
                                                : "Great time for community literacy workshops on Climate Risk Insurance (CRI) benefits."
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Priority Tags from roleContent.js */}
                        <div className="pt-2">
                            <p className={`text-[10px] font-bold uppercase tracking-widest ${textMuted} mb-3 ml-1`}>
                                Persistent Vulnerabilities
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {content.risks.map((risk, i) => (
                                    <span key={i} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border ${theme
                                        ? "bg-white border-slate-200 text-slate-700"
                                        : "bg-slate-800 border-slate-700 text-slate-300"
                                        }`}>
                                        {risk}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* DIVIDER LINE */}
                <div className={`h-px w-full ${theme ? 'bg-slate-200' : 'bg-slate-800'}`} />

                {/* <MapSection /> */}

                {/* Quick Stats Grid */}
                <h2 className={`text-[10px] font-black uppercase tracking-[0.3em] ${textMuted}`}>Meteorological Overview</h2>
                <motion.div className="grid grid-cols-2 lg:grid-cols-2 gap-4">

                    <div className={cardStyle}>
                        <div className={`text-xs mb-2 ${textMuted}`}>Visibility</div>
                        <div className={`text-3xl font-light mb-1 ${textPrimary}`}>{weather.current.visibility}</div>
                        <div className={`text-xs ${textMuted}`}>km</div>
                    </div>
                    <div className={cardStyle}>
                        <div className={`text-xs mb-2 ${textMuted}`}>Pressure</div>
                        <div className={`text-3xl font-light mb-1 ${textPrimary}`}>{weather.current.pressure}</div>
                        <div className={`text-xs ${textMuted}`}>hPa</div>
                    </div>
                    <div className={cardStyle}>
                        <div className={`text-xs mb-2 ${textMuted}`}>Air Quality</div>
                        <div className={`text-3xl font-light mb-1 ${textPrimary}`}>{weather.current.aqi}</div>
                        <div className={`text-xs font-medium ${weather.current.aqiColor}`}>{weather.current.aqiText}</div>
                    </div>
                </motion.div>

                {/* Hourly Forecast */}
                <motion.section className={cardStyle}>
                    <h2 className={`text-lg font-light mb-6 ${textPrimary}`}>24-Hour Forecast</h2>
                    <div className="relative h-32 mb-4 flex items-end justify-between px-2">
                        {weather.hourly.map((hour, i) => (
                            <div key={i} className="flex flex-col items-center flex-1">
                                <div className={`text-xs font-medium mb-1 ${textPrimary}`}>{hour.temp}°</div>
                                <div className="w-2 bg-blue-500 rounded-full" style={{ height: `${(hour.temp / 50) * 100}px` }}></div>
                            </div>
                        ))}
                    </div>
                    <div className={`flex justify-between border-t pt-4 ${theme ? "border-slate-200" : "border-slate-800"}`}>
                        {weather.hourly.map((hour, i) => (
                            <div key={i} className="text-center flex-1">
                                <div className={`text-xs mb-2 ${textMuted}`}>{hour.time}</div>
                                <div className={`text-xs ${textSecondary}`}>{hour.condition}</div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* 5-Day Forecast */}
                <motion.section className={cardStyle}>
                    <h2 className={`text-lg font-light mb-6 ${textPrimary}`}>5-Day Forecast</h2>
                    <div className="space-y-3">
                        {weather.daily.map((day, i) => (
                            <div key={i} className={`flex items-center gap-4 p-4 rounded-lg ${theme ? "bg-white" : "bg-slate-800/50"}`}>
                                <div className={`w-12 text-sm font-medium ${textPrimary}`}>{day.day}</div>
                                <div className="flex-1">
                                    <div className={`text-sm mb-2 ${textSecondary}`}>{day.condition}</div>
                                    <div className={`relative h-2 rounded-full overflow-hidden ${theme ? "bg-slate-200" : "bg-slate-700"}`}>
                                        <div className="absolute left-0 top-0 h-full bg-blue-500" style={{ width: `${Math.min(day.rainfall * 5, 100)}%` }}></div>
                                    </div>
                                    <div className={`text-xs mt-1 ${textMuted}`}>{day.rainfall}mm rain</div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-lg font-light ${textPrimary}`}>{day.high}°</div>
                                    <div className={`text-xs ${textMuted}`}>{day.low}°</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                <motion.section>
                    <SeasonalCalendar region={user.region} theme={theme} />
                </motion.section>

                <div className="h-20"></div>
            </div>
        </div>
    );
}