import React, { useMemo, useState, useEffect, useRef } from 'react';
import { AppState, Meal } from '../types';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { IconSparkles, IconWater, IconPieChart, IconClock } from './ui/Icons';
import { getCoachTip, getRecommendedRecipes, getRecipeDetails, RecipeDetails } from '../services/localBotService';
import { MealOption } from '../data/mealDatabase';

interface DashboardProps {
  state: AppState;
  onReset: () => void;
  onLogWater: (amount: number) => void;
  onDeleteMeal?: (id: string) => void;
  onEditMeal?: (meal: Meal) => void;
  onMoveMeal?: (id: string, date: string) => void;
  onCopyMeal?: (id: string, date: string) => void;
  onOpenAnalysis?: () => void;
}

const MealActionMenu: React.FC<{
  meal: Meal;
  onDelete: () => void;
  onEdit: () => void;
  onMove: (date: string) => void;
  onCopy: (date: string) => void;
  onClose: () => void
}> = ({ meal, onDelete, onEdit, onMove, onCopy, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [showMoveOptions, setShowMoveOptions] = useState(false);
  const [showCopyOptions, setShowCopyOptions] = useState(false);

  const getYesterday = () => { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().split('T')[0]; };
  const getTomorrow = () => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const MenuItem = ({ label, onClick, className = "" }: { label: string, onClick: () => void, className?: string }) => (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`w-full px-6 py-3.5 text-left text-[15px] font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between ${className}`}
    >
      {label}
    </button>
  );

  return (
    <div ref={menuRef} className="absolute right-0 top-10 w-52 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 z-[100] py-2 animate-in zoom-in-95 duration-200 origin-top-right overflow-hidden">
      {!showMoveOptions && !showCopyOptions ? (
        <>
          <MenuItem label="Edit" onClick={onEdit} />
          <MenuItem label="Delete" onClick={onDelete} className="text-rose-600 hover:bg-rose-50" />
          <div className="h-[1px] bg-slate-100/60 my-1 mx-4"></div>
          <MenuItem label="Move into" onClick={() => setShowMoveOptions(true)} />
          <MenuItem label="Copy to" onClick={() => setShowCopyOptions(true)} />
        </>
      ) : showMoveOptions ? (
        <div className="animate-in slide-in-from-right-4 duration-300">
          <div className="px-6 py-2 border-b border-slate-50 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Move Entry</span>
            <button onClick={() => setShowMoveOptions(false)} className="text-slate-400 hover:text-slate-900">←</button>
          </div>
          <MenuItem label="Yesterday" onClick={() => onMove(getYesterday())} />
          <MenuItem label="Tomorrow" onClick={() => onMove(getTomorrow())} />
        </div>
      ) : (
        <div className="animate-in slide-in-from-right-4 duration-300">
          <div className="px-6 py-2 border-b border-slate-50 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Copy Entry</span>
            <button onClick={() => setShowCopyOptions(false)} className="text-slate-400 hover:text-slate-900">←</button>
          </div>
          <MenuItem label="Yesterday" onClick={() => onCopy(getYesterday())} />
          <MenuItem label="Tomorrow" onClick={() => onCopy(getTomorrow())} />
        </div>
      )}
    </div>
  );
};

// --- FASTING WIDGET ---
interface FastingLog {
  date: string;
  hours: number;
}

const FastingWidget = () => {
  const [isFasting, setIsFasting] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<FastingLog[]>([]);

  useEffect(() => {
    const savedStart = localStorage.getItem('fastingStart');
    const savedHistory = localStorage.getItem('fastingHistory');

    if (savedStart) {
      setStartTime(parseInt(savedStart));
      setIsFasting(true);
    }
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    let timer: any;
    if (isFasting && startTime) {
      timer = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      setElapsed(0);
    }
    return () => clearInterval(timer);
  }, [isFasting, startTime]);

  const toggleFasting = () => {
    if (isFasting) {
      // End Fast logic
      const endTime = Date.now();
      if (startTime) {
        const durationHours = (endTime - startTime) / (1000 * 60 * 60);
        const today = new Date().toISOString().split('T')[0];

        // Update History
        const newHistory = [...history];
        const existingIndex = newHistory.findIndex(h => h.date === today);

        if (existingIndex >= 0) {
          newHistory[existingIndex].hours += durationHours;
        } else {
          newHistory.push({ date: today, hours: durationHours });
        }

        // Keep last 30 days
        const trimmedHistory = newHistory.slice(-30);

        setHistory(trimmedHistory);
        localStorage.setItem('fastingHistory', JSON.stringify(trimmedHistory));
      }

      localStorage.removeItem('fastingStart');
      setIsFasting(false);
      setStartTime(null);
    } else {
      const now = Date.now();
      localStorage.setItem('fastingStart', now.toString());
      setStartTime(now);
      setIsFasting(true);
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const chartData = useMemo(() => {
    // Create last 14 days data, filling missing days with 0
    const data = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const log = history.find(h => h.date === dateStr);
      data.push({
        day: d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
        hours: log ? parseFloat(log.hours.toFixed(1)) : 0
      });
    }
    return data;
  }, [history]);

  return (
    <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-xl shadow-slate-900/10 flex flex-col justify-between h-full min-h-[300px] relative overflow-hidden group">
      {!showHistory ? (
        <>
          <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-700"></div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <IconClock className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Intermittent Fasting</h3>
              </div>
              <button onClick={() => setShowHistory(true)} className="text-[10px] font-bold bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-full text-emerald-400 transition-colors">
                History
              </button>
            </div>
            <div className="text-4xl font-black tracking-tight font-mono">
              {isFasting ? formatTime(elapsed) : 'Ready?'}
            </div>
            <p className="text-sm text-slate-400 font-medium mt-1">
              {isFasting ? 'Since you started' : 'Start your fast to track progress'}
            </p>
          </div>
          <button
            onClick={toggleFasting}
            className={`mt-6 w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all active:scale-95 ${isFasting ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/30' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-900 shadow-lg shadow-emerald-500/30'}`}
          >
            {isFasting ? 'End Fast' : 'Start Fasting'}
          </button>
        </>
      ) : (
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-200">Last 14 Days</h3>
            <button onClick={() => setShowHistory(false)} className="text-xs font-bold text-slate-400 hover:text-white">Close</button>
          </div>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <Bar dataKey="hours" fill="#10b981" radius={[4, 4, 0, 0]} />
                <XAxis dataKey="day" hide />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

// --- RECIPE MODAL ---
const RecipeModal = ({ recipe, onClose }: { recipe: MealOption, onClose: () => void }) => {
  const [details, setDetails] = useState<RecipeDetails | null>(null);

  useEffect(() => {
    setDetails(getRecipeDetails(recipe.name));
  }, [recipe]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative">
        <div className="absolute top-0 right-0 p-4">
          <button onClick={onClose} className="bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors">
            <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-8 pb-4 bg-orange-50">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-4">
            {recipe.type === 'breakfast' ? '🥣' : recipe.type === 'lunch' ? '🍱' : recipe.type === 'dinner' ? '🍽️' : '🍎'}
          </div>
          <h2 className="text-2xl font-black text-slate-900 leading-tight">{recipe.name}</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-slate-500 shadow-sm uppercase tracking-wider">{recipe.calories} kcal</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm uppercase tracking-wider ${recipe.dietary === 'veg' ? 'bg-emerald-500' : 'bg-rose-500'}`}>{recipe.dietary}</span>
            <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-slate-500 shadow-sm uppercase tracking-wider">{recipe.type}</span>
          </div>
        </div>

        <div className="p-8 max-h-[60vh] overflow-y-auto">
          {details ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-3">Ingredients</h3>
                <ul className="space-y-2">
                  {details.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></span>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-3">Instructions</h3>
                <ol className="space-y-4">
                  {details.steps.map((step, i) => (
                    <li key={i} className="flex gap-4 text-sm text-slate-600 leading-relaxed">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">{i + 1}</span>
                      <span className="mt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ) : (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-50 bg-slate-50/50 text-center">
          <p className="text-xs text-slate-400 font-medium">Recipe generated by NutriFlow AI</p>
        </div>
      </div>
    </div>
  );
};

// --- RECIPE WIDGET ---
const RecipeWidget = () => {
  const [recipes, setRecipes] = useState<MealOption[]>([]);
  const [filter, setFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [selectedRecipe, setSelectedRecipe] = useState<MealOption | null>(null);

  useEffect(() => {
    // Load recipes when filter changes
    setRecipes(getRecommendedRecipes(filter));
  }, [filter]);

  return (
    <>
      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-100/50 h-full min-h-[300px] flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
              <IconSparkles className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Recipe Ideas</h3>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-slate-50 p-1 rounded-xl mb-3">
          {(['all', 'veg', 'non-veg'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${filter === f ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {f === 'non-veg' ? 'Non-Veg' : f}
            </button>
          ))}
        </div>

        <div className="space-y-3 flex-1 overflow-y-auto pr-1">
          {recipes.map((r, i) => (
            <div key={i} onClick={() => setSelectedRecipe(r)} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-orange-50 group transition-colors cursor-pointer border border-transparent hover:border-orange-100 active:scale-[0.98]">
              <div>
                <p className="font-bold text-slate-800 text-sm group-hover:text-orange-700 leading-tight mb-1">{r.name}</p>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${r.dietary === 'veg' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{r.calories} kcal • {r.type}</p>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-slate-300 group-hover:text-orange-500 shadow-sm text-xs font-bold">→</div>
            </div>
          ))}
          {recipes.length === 0 && (
            <div className="text-center py-6 text-slate-400 text-xs font-bold">No recipes found.</div>
          )}
        </div>
      </div>

      {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
    </>
  );
};


const Dashboard: React.FC<DashboardProps> = ({ state, onReset, onLogWater, onDeleteMeal, onEditMeal, onMoveMeal, onCopyMeal }) => {
  const { profile, meals, waterIntake } = state;
  const [coachTip, setCoachTip] = useState<string>("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'daily' | 'monthly'>('daily');

  const today = new Date().toISOString().split('T')[0];
  const currentMonth = today.substring(0, 7);
  const daysInMonth = useMemo(() => new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(), []);

  const todayMeals = useMemo(() => meals.filter(m => m.date === today), [meals, today]);
  const monthlyMeals = useMemo(() => meals.filter(m => m.date.startsWith(currentMonth)), [meals, currentMonth]);
  const activeMeals = viewMode === 'daily' ? todayMeals : monthlyMeals;

  const totals = useMemo(() => activeMeals.reduce((acc, m) => ({
    calories: acc.calories + (m.nutrition.calories || 0),
    protein: acc.protein + (m.nutrition.protein || 0),
    carbs: acc.carbs + (m.nutrition.carbs || 0),
    fat: acc.fat + (m.nutrition.fat || 0),
    fiber: acc.fiber + (m.nutrition.fiber || 0),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }), [activeMeals]);

  const targets = useMemo(() => {
    const multiplier = viewMode === 'daily' ? 1 : daysInMonth;
    const baseCal = profile.calorieGoal || 2000;
    return {
      calories: baseCal * multiplier,
      protein: Math.round((baseCal * 0.3) / 4) * multiplier,
      carbs: Math.round((baseCal * 0.4) / 4) * multiplier,
      fat: Math.round((baseCal * 0.3) / 9) * multiplier,
      fiber: (25 + (profile.gender === 'male' ? 10 : 0)) * multiplier
    };
  }, [profile.calorieGoal, profile.gender, viewMode, daysInMonth]);

  const monthlyChartData = useMemo(() => {
    if (viewMode !== 'monthly') return [];
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = (i + 1).toString().padStart(2, '0');
      const dateStr = `${currentMonth}-${day}`;
      const dayMeals = meals.filter(m => m.date === dateStr);
      return { day: i + 1, calories: dayMeals.reduce((sum, m) => sum + (m.nutrition.calories || 0), 0) };
    });
  }, [meals, currentMonth, daysInMonth, viewMode]);

  const todayWater = useMemo(() => waterIntake.filter(w => w.date === today).reduce((sum, w) => sum + w.amount, 0), [waterIntake, today]);

  useEffect(() => {
    const fetchData = async () => {
      try { const tip = await getCoachTip(profile, todayMeals); setCoachTip(tip); } catch (e) { console.error(e); }
    };
    fetchData();
  }, [profile.goal, todayMeals.length]);

  const bmiValue = profile.weight / Math.pow(profile.height / 100, 2);
  const bmiCategory = useMemo(() => {
    if (bmiValue < 18.5) return { label: 'Underweight', color: 'text-blue-600', bg: 'bg-blue-50/50', border: 'border-blue-100', accent: 'bg-blue-600' };
    if (bmiValue < 25) return { label: 'Optimal', color: 'text-emerald-600', bg: 'bg-emerald-50/50', border: 'border-emerald-100', accent: 'bg-emerald-600' };
    if (bmiValue < 30) return { label: 'Overweight', color: 'text-orange-600', bg: 'bg-orange-50/50', border: 'border-orange-100', accent: 'bg-orange-600' };
    return { label: 'Obese', color: 'text-rose-600', bg: 'bg-rose-50/50', border: 'border-rose-100', accent: 'bg-rose-600' };
  }, [bmiValue]);

  return (
    <div className="space-y-8 animate-in fade-in duration-1000 pb-20 pt-6">
      <header className="flex justify-between items-center gap-4">
        <div>
          <p className="text-emerald-700 font-black uppercase tracking-[0.15em] text-[10px] mb-1.5">NutriFlow Dashboard</p>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Hi, <span className="text-emerald-600">{profile.name || 'Friend'}</span>
          </h1>
          <p className="text-slate-600 font-semibold mt-0.5 text-sm sm:text-base">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button onClick={onReset} className="min-h-[44px] px-6 py-3 bg-rose-50 text-rose-600 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95">Sign Out</button>
      </header>

      {/* Energy Balance + Hydration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-5 sm:p-8 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/40">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Energy Balance</h3>
              <p className="text-slate-500 text-sm font-semibold">{viewMode === 'daily' ? 'Today\'s' : 'This Month\'s'} progress</p>
            </div>
            <div className="flex p-1 bg-slate-100 rounded-2xl shadow-inner w-full sm:w-auto">
              <button onClick={() => setViewMode('daily')} className={`flex-1 sm:flex-initial min-h-[44px] px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${viewMode === 'daily' ? 'bg-white text-emerald-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>Daily</button>
              <button onClick={() => setViewMode('monthly')} className={`flex-1 sm:flex-initial min-h-[44px] px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${viewMode === 'monthly' ? 'bg-white text-emerald-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>Monthly</button>
            </div>
          </div>

          {viewMode === 'daily' ? (
            <>
              <div className="flex justify-between items-end mb-4">
                <div className="text-right flex items-baseline gap-2">
                  <span className="text-4xl font-black text-emerald-600 tracking-tighter">{Math.round(totals.calories).toLocaleString()}</span>
                  <span className="text-slate-400 font-black mx-1">/</span>
                  <span className="text-xl font-black text-slate-500 tracking-tight">{targets.calories.toLocaleString()} kcal</span>
                </div>
              </div>
              <div className="relative pt-2 pb-12">
                <div className="h-4 bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                  <div className={`h-full transition-all duration-1000 ease-out rounded-full ${totals.calories > targets.calories ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min((totals.calories / Math.max(targets.calories, totals.calories)) * 100, 100)}%` }} />
                </div>
              </div>
            </>
          ) : (
            <div className="h-[200px] w-full mb-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyChartData}>
                  <defs>
                    <linearGradient id="colorCals" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold' }} />
                  <Area type="monotone" dataKey="calories" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCals)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {[{ label: 'Protein', val: totals.protein, color: 'emerald', target: targets.protein }, { label: 'Carbs', val: totals.carbs, color: 'blue', target: targets.carbs }, { label: 'Fat', val: totals.fat, color: 'orange', target: targets.fat }, { label: 'Fiber', val: totals.fiber, color: 'indigo', target: targets.fiber }].map((m) => (
              <div key={m.label}>
                <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1">{m.label}</p>
                <p className="text-sm font-black text-slate-900 mb-2">{Math.round(m.val).toLocaleString()} <span className="text-slate-400 text-xs font-bold">/ {Math.round(m.target).toLocaleString()}g</span></p>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full bg-${m.color}-500 transition-all duration-700`} style={{ width: `${Math.min((m.val / m.target) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 bg-blue-600 p-6 sm:p-8 rounded-3xl text-white flex flex-col justify-between group relative overflow-hidden shadow-xl shadow-blue-500/20">
          <div className="z-10">
            <div className="flex items-center space-x-3 mb-4">
              <IconWater className="w-6 h-6 text-white" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-100">Hydration</span>
            </div>
            <p className="text-4xl sm:text-5xl font-black tracking-tighter">{todayWater} <span className="text-lg sm:text-xl font-medium opacity-60">ml</span></p>
          </div>
          <div className="flex gap-2 z-10 mt-6 overflow-x-auto pb-1">
            <button onClick={() => onLogWater(-250)} className="flex-none min-h-[48px] px-4 py-3 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-2xl font-bold text-sm transition-all active:scale-95" title="Remove 250ml">-</button>
            <button onClick={() => onLogWater(250)} className="flex-1 min-h-[48px] py-3 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-2xl font-bold text-sm transition-all active:scale-95 text-nowrap">+250 ml</button>
            <button onClick={() => onLogWater(500)} className="flex-1 min-h-[48px] py-3 bg-white text-blue-600 rounded-2xl font-black text-sm shadow-lg transition-all active:scale-95 text-nowrap">+500 ml</button>
          </div>
        </div>
      </div>

      {/* Fasting + Recipes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:h-80">
        <FastingWidget />
        <RecipeWidget />
      </div>

      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight px-1">Meal Activity</h3>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-visible">
          {todayMeals.length > 0 ? (
            <div className="divide-y divide-slate-50">
              {todayMeals.map((meal) => (
                <div key={meal.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group relative">
                  <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-slate-100 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl shadow-sm flex-shrink-0">
                      {meal.type === 'breakfast' ? '🥣' : meal.type === 'lunch' ? '🍱' : meal.type === 'dinner' ? '🍽️' : '🍎'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-slate-900 text-base sm:text-lg truncate">{meal.name}</h4>
                      <p className="text-xs text-slate-500 uppercase font-black tracking-wider mt-0.5">{meal.type} • {meal.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-6 flex-shrink-0">
                    <div className="text-right">
                      <p className="font-black text-emerald-700 text-base sm:text-lg">{meal.nutrition.calories} kcal</p>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 font-bold">P: {meal.nutrition.protein}g • C: {meal.nutrition.carbs}g</p>
                    </div>
                    <div className="relative">
                      <button onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === meal.id ? null : meal.id); }} className="min-w-[44px] min-h-[44px] p-2 sm:p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-200/50 rounded-xl transition-all active:scale-90">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5h.01M12 12h.01M12 19h.01" /></svg>
                      </button>
                      {openMenuId === meal.id && <MealActionMenu meal={meal} onDelete={() => onDeleteMeal?.(meal.id)} onEdit={() => onEditMeal?.(meal)} onMove={(date) => { onMoveMeal?.(meal.id, date); setOpenMenuId(null); }} onCopy={(date) => { onCopyMeal?.(meal.id, date); setOpenMenuId(null); }} onClose={() => setOpenMenuId(null)} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 sm:p-16 text-center text-slate-400 font-bold">Your log is empty for today.</div>
          )}
        </div>
      </section>

      <div className={`p-10 rounded-[2.5rem] border ${bmiCategory.border} ${bmiCategory.bg} flex flex-col md:flex-row items-center justify-between shadow-xl transition-all hover:scale-[1.01]`}>
        <div className="z-10 text-center md:text-left">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">BMI Assessment</span>
          <h3 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Result: {bmiValue.toFixed(1)}</h3>
          <p className="text-slate-500 font-medium">Status: <span className={`${bmiCategory.color} font-bold`}>{bmiCategory.label}</span></p>
        </div>
        <div className="mt-6 md:mt-0">
          <span className={`px-8 py-2.5 rounded-full text-sm font-black text-white uppercase tracking-[0.2em] shadow-lg ${bmiCategory.accent}`}>{bmiCategory.label}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;