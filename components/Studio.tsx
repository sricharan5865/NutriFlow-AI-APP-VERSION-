import React, { useState, useMemo } from 'react';
import { AppState, Meal, WaterEntry } from '../types';
import { IconDatabase } from './ui/Icons';

interface StudioProps {
  state: AppState;
  onUpdateState: (newState: AppState) => void;
  onReset: () => void;
}

const Studio: React.FC<StudioProps> = ({ state, onUpdateState, onReset }) => {
  const [activeView, setActiveView] = useState<'console' | 'explorer'>('console');
  const [copyFeedback, setCopyFeedback] = useState(false);

  const stats = useMemo(() => {
    const size = new Blob([JSON.stringify(state)]).size;
    return {
      totalMeals: state.meals.length,
      totalWater: state.waterIntake.length,
      totalWeight: state.weightHistory.length,
      storageSize: (size / 1024).toFixed(2) + ' KB',
      lastUpdated: state.lastUpdated ? new Date(state.lastUpdated).toLocaleString() : 'N/A'
    };
  }, [state]);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(state, null, 2));
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `nutriflow_db_export_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const seedMockData = () => {
    if (!confirm("This will add 30 days of mock meals and hydration. Continue?")) return;

    const seededMeals: Meal[] = [];
    const seededWater: WaterEntry[] = [];
    const now = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      // Seed 3 meals per day
      const types: ('breakfast' | 'lunch' | 'dinner')[] = ['breakfast', 'lunch', 'dinner'];
      types.forEach(type => {
        seededMeals.push({
          id: Math.random().toString(36).substr(2, 9),
          name: `Mock ${type.charAt(0).toUpperCase() + type.slice(1)}`,
          type,
          time: '12:00 PM',
          date: dateStr,
          nutrition: {
            calories: 400 + Math.floor(Math.random() * 200),
            protein: 20 + Math.floor(Math.random() * 10),
            carbs: 40 + Math.floor(Math.random() * 20),
            fat: 10 + Math.floor(Math.random() * 5),
            fiber: 5 + Math.floor(Math.random() * 5)
          }
        });
      });

      // Seed water
      seededWater.push({
        date: dateStr,
        amount: 1500 + Math.floor(Math.random() * 1000)
      });
    }

    onUpdateState({
      ...state,
      meals: [...seededMeals, ...state.meals],
      waterIntake: [...seededWater, ...state.waterIntake]
    });
    alert("Database seeded with 30 days of activity.");
  };

  return (
    <div className="min-h-[70vh] bg-[#0f172a] rounded-[2.5rem] overflow-hidden text-slate-300 shadow-2xl border border-slate-800 animate-in zoom-in-95 duration-500">
      {/* Studio Header */}
      <div className="bg-[#1e293b] p-6 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
            <IconDatabase className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
              NutriFlow Studio
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">Live</span>
            </h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Local Instance Console</p>
          </div>
        </div>
        <div className="flex bg-[#0f172a] p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveView('console')}
            className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeView === 'console' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Console
          </button>
          <button
            onClick={() => setActiveView('explorer')}
            className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeView === 'explorer' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Explorer
          </button>
        </div>
      </div>

      <div className="p-8">
        {activeView === 'console' ? (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Meals', val: stats.totalMeals, color: 'text-emerald-400' },
                { label: 'Hydration', val: stats.totalWater, color: 'text-blue-400' },
                { label: 'Weight Entries', val: stats.totalWeight, color: 'text-purple-400' },
                { label: 'Storage', val: stats.storageSize, color: 'text-orange-400' },
              ].map((stat, i) => (
                <div key={i} className="bg-[#1e293b] p-4 rounded-2xl border border-slate-800">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className={`text-2xl font-black ${stat.color}`}>{stat.val}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={seedMockData}
                  className="p-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-600"
                >
                  🌱 Seed Details
                </button>
                <button
                  onClick={handleExport}
                  className="p-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-600"
                >
                  📥 Export JSON
                </button>
                <button
                  onClick={onReset}
                  className="p-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border border-red-500/20 hover:border-red-500/30"
                >
                  ⚠️ Reset Database
                </button>
              </div>
            </div>

            <div className="text-center text-xs text-slate-600 font-medium">
              Last Synced: {stats.lastUpdated}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Raw State Explorer</p>
              <button
                onClick={handleCopy}
                className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg font-bold"
              >
                {copyFeedback ? 'Copied!' : 'Copy JSON'}
              </button>
            </div>
            <div className="bg-[#0b1120] p-4 rounded-xl border border-slate-800 overflow-auto max-h-[500px]">
              <pre className="text-xs font-mono text-blue-300/80">
                {JSON.stringify(state, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Studio;