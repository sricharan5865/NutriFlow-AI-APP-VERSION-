import React from 'react';
import { Meal, UserProfile } from '../types';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

interface NutrientAnalysisProps {
    meals: Meal[];
    profile: UserProfile;
    onBack: () => void;
}

const NutrientAnalysis: React.FC<NutrientAnalysisProps> = ({ meals, profile, onBack }) => {
    const totals = meals.reduce((acc, m) => ({
        calories: acc.calories + m.nutrition.calories,
        protein: acc.protein + m.nutrition.protein,
        carbs: acc.carbs + m.nutrition.carbs,
        fat: acc.fat + m.nutrition.fat,
        fiber: acc.fiber + m.nutrition.fiber,
    }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });

    const data = [
        { name: 'Protein', value: totals.protein, color: '#10b981' },
        { name: 'Carbs', value: totals.carbs, color: '#3b82f6' },
        { name: 'Fat', value: totals.fat, color: '#f59e0b' },
    ];

    return (
        <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-20">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-100 shadow-sm transition-all text-slate-600 hover:text-slate-900">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Nutrient Analysis</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
                    <h3 className="font-black text-slate-900 text-lg mb-6">Macro Distribution</h3>
                    <div className="h-64 w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center">
                                <p className="text-3xl font-black text-slate-900">{Math.round(totals.calories)}</p>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Kcal</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-6 mt-4">
                        {data.map(d => (
                            <div key={d.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                                <span className="text-sm font-bold text-slate-600">{d.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-500/20">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-indigo-200 font-bold uppercase tracking-widest text-xs">Dietary Fiber</p>
                                <h3 className="text-4xl font-black mt-1">{totals.fiber}g</h3>
                            </div>
                            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                                🌿
                            </div>
                        </div>
                        <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
                            <div className="bg-white h-full rounded-full" style={{ width: `${Math.min((totals.fiber / 30) * 100, 100)}%` }} />
                        </div>
                        <p className="mt-3 text-sm font-medium text-indigo-100">Target: 30g / day</p>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
                        <h3 className="font-black text-slate-900 text-lg mb-4">Top Sources</h3>
                        <div className="space-y-4">
                            {meals.slice(0, 3).map(m => (
                                <div key={m.id} className="flex justify-between items-center">
                                    <span className="font-bold text-slate-700">{m.name}</span>
                                    <span className="font-black text-slate-900">{m.nutrition.calories} kcal</span>
                                </div>
                            ))}
                            {meals.length === 0 && <p className="text-slate-400 text-sm font-medium italic">No meals logged yet.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NutrientAnalysis;
