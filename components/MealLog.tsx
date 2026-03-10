import React, { useState, useEffect } from 'react';
import { Meal, NutritionData, MealType } from '../types';
import { analyzeMealPhoto, analyzeMealText, editMealPhoto } from '../services/geminiService';
import { INDIAN_FOOD_DATABASE } from '../data/indianFoods';
import { IconCamera, IconSparkles } from './ui/Icons';

interface MealLogProps {
  onAddMeal: (meal: Omit<Meal, 'id'>) => void;
  editInitialData?: Meal;
}

const MealLog: React.FC<MealLogProps> = ({ onAddMeal, editInitialData }) => {
  const [activeTab, setActiveTab] = useState<'manual' | 'photo'>('manual');
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');

  // Primary Fields
  const [mealName, setMealName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [mealType, setMealType] = useState<MealType>('lunch');
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);

  // Nutritional Distribution
  const [nutrition, setNutrition] = useState<NutritionData>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0
  });

  // For dynamic scaling
  const [baseNutrition, setBaseNutrition] = useState<NutritionData | null>(null);
  const [baseQuantityVal, setBaseQuantityVal] = useState<number>(1);

  useEffect(() => {
    if (editInitialData) {
      // Extract quantity if it follows the pattern "Name (Quantity)"
      const match = editInitialData.name.match(/(.+) \((.+)\)/);
      if (match) {
        setMealName(match[1]);
        setQuantity(match[2]);
      } else {
        setMealName(editInitialData.name);
        setQuantity('');
      }
      setMealType(editInitialData.type);
      setNutrition(editInitialData.nutrition);
      if (editInitialData.photoUrl) {
        setPhotoBase64(editInitialData.photoUrl.split(',')[1]);
        setActiveTab('photo');
      }
    }
  }, [editInitialData]);

  // Dynamic Scaling Effect
  useEffect(() => {
    if (baseNutrition && quantity) {
      const currentQtyMatch = quantity.match(/^([\d.]+)/);
      if (currentQtyMatch) {
        const currentQty = parseFloat(currentQtyMatch[1]);
        if (!isNaN(currentQty) && baseQuantityVal > 0) {
          const ratio = currentQty / baseQuantityVal;
          setNutrition({
            calories: Math.round(baseNutrition.calories * ratio),
            protein: parseFloat((baseNutrition.protein * ratio).toFixed(1)),
            carbs: parseFloat((baseNutrition.carbs * ratio).toFixed(1)),
            fat: parseFloat((baseNutrition.fat * ratio).toFixed(1)),
            fiber: parseFloat((baseNutrition.fiber * ratio).toFixed(1))
          });
        }
      }
    }
  }, [quantity, baseNutrition, baseQuantityVal]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      setPhotoBase64(base64);
      try {
        const result = await analyzeMealPhoto(base64);
        if (result) {
          setMealName(result.name);
          setNutrition(result.nutrition);
          setQuantity('1 serving (estimated)');
        }
      } catch (e) {
        console.error("Photo analysis failed", e);
        alert("Could not analyze photo. Please try again or enter manually.");
      }
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleEditImage = async () => {
    if (!photoBase64 || !editPrompt) return;
    setEditing(true);
    try {
      const result = await editMealPhoto(photoBase64, editPrompt);
      if (result) {
        setPhotoBase64(result.split(',')[1]);
        setEditPrompt('');
      }
    } catch (e) {
      console.error("Image edit failed", e);
    }
    setEditing(false);
  };

  const handleSmartFill = async () => {
    if (!mealName || !quantity) return;
    setLoading(true);
    try {
      const result = await analyzeMealText(mealName, quantity);
      if (result) {
        setMealName(result.name);
        setNutrition(result.nutrition);
      }
    } catch (e) {
      console.error("Smart fill failed", e);
      alert("Could not find nutrition data. Using manual entry.");
    }
    setLoading(false);
  };

  const handleSave = () => {
    onAddMeal({
      name: `${mealName}${quantity ? ` (${quantity})` : ''}`,
      type: mealType,
      time: editInitialData?.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      nutrition,
      date: editInitialData?.date || new Date().toISOString().split('T')[0],
      photoUrl: photoBase64 ? `data:image/jpeg;base64,${photoBase64}` : undefined
    });

    if (!editInitialData) {
      setMealName('');
      setQuantity('');
      setPhotoBase64(null);
      setNutrition({ calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
    }
  };

  const isFormValid = mealName.trim() !== '' && quantity.trim() !== '' && nutrition.calories > 0;

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex p-1.5 bg-slate-100 rounded-3xl w-fit mx-auto shadow-inner border border-slate-200/50">
        <button
          onClick={() => setActiveTab('manual')}
          className={`px-10 py-3.5 rounded-2xl text-sm font-bold tracking-tight transition-all duration-300 ${activeTab === 'manual' ? 'bg-white text-emerald-600 shadow-lg' : 'text-slate-400 hover:text-slate-500'}`}
        >
          Smart Entry
        </button>
        <button
          onClick={() => setActiveTab('photo')}
          className={`px-10 py-3.5 rounded-2xl text-sm font-bold tracking-tight transition-all duration-300 ${activeTab === 'photo' ? 'bg-white text-emerald-600 shadow-lg' : 'text-slate-400 hover:text-slate-500'}`}
        >
          AI Vision
        </button>
      </div>

      <div className="bg-white p-10 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100">
        {activeTab === 'photo' && (
          <div className="mb-8 space-y-4">
            {!photoBase64 ? (
              <label className="block cursor-pointer">
                <div className="p-12 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center hover:bg-emerald-50/20 transition-all group">
                  <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconCamera className="w-8 h-8 text-emerald-500" />
                  </div>
                  <p className="font-bold text-slate-800 text-lg">Snap your meal</p>
                  <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-[0.2em] font-black">Gemini Vision Analysis</p>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} disabled={loading} />
              </label>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 group">
                  <img src={`data:image/jpeg;base64,${photoBase64}`} className="w-full h-72 object-cover" alt="Meal" />
                  <button
                    onClick={() => setPhotoBase64(null)}
                    className="absolute top-6 right-6 bg-black/40 backdrop-blur-md text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black transition-all"
                  >
                    ✕
                  </button>
                </div>

                <div className="bg-amber-50/50 p-6 rounded-[2.5rem] border border-amber-100/50 space-y-3">
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <IconSparkles className="w-4 h-4 text-amber-600" />
                    <h4 className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Nano Banana Photo Lab</h4>
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={editPrompt}
                      onChange={(e) => setEditPrompt(e.target.value)}
                      placeholder="'Add filter', 'Enhance'..."
                      className="flex-1 text-xs p-4 rounded-2xl border border-amber-100 bg-white/80 focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder:text-amber-300/60 font-medium"
                    />
                    <button
                      onClick={handleEditImage}
                      disabled={editing || !editPrompt}
                      className="bg-amber-600 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-amber-600/20 disabled:opacity-30 active:scale-95 transition-all"
                    >
                      {editing ? 'Magic...' : 'Apply'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Meal Name</label>
              <div className="relative">
                <input
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  placeholder="Ex: Grilled Salmon or Roti..."
                  className="w-full p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 font-bold text-slate-900 focus:border-emerald-500 focus:bg-white outline-none transition-all placeholder:text-slate-300"
                />

                {/* Autocomplete Dropdown */}
                {mealName && !editing && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 max-h-60 overflow-y-auto z-20">
                    <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">
                        Estimated Values
                      </p>
                    </div>
                    {INDIAN_FOOD_DATABASE.filter(f => f.name.toLowerCase().includes(mealName.toLowerCase()) && f.name !== mealName).slice(0, 5).map(food => (
                      <button
                        key={food.id}
                        onClick={() => {
                          setMealName(food.name);
                          setQuantity(food.servingSize);
                          setNutrition(food.nutrition);
                          setBaseNutrition(food.nutrition);
                          const quantityMatch = food.servingSize.match(/^([\d.]+)/);
                          setBaseQuantityVal(quantityMatch ? parseFloat(quantityMatch[1]) : 1);
                        }}
                        className="w-full p-4 text-left hover:bg-emerald-50 transition-colors border-b border-slate-50 last:border-none flex justify-between items-center group"
                      >
                        <span className="font-bold text-slate-700 text-sm group-hover:text-emerald-700">{food.name}</span>
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded-lg group-hover:bg-emerald-100 group-hover:text-emerald-600 font-bold">{food.servingSize}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Quantity (Required)</label>
              <div className="relative">
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Ex: 200g, 1 plate"
                  className="w-full p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 font-bold text-slate-900 focus:border-emerald-500 focus:bg-white outline-none transition-all placeholder:text-slate-300 pr-14"
                />
                <button
                  onClick={handleSmartFill}
                  disabled={!mealName || !quantity || loading}
                  className="absolute right-2.5 top-2.5 w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 disabled:opacity-30 active:scale-90 transition-all"
                  title="Smart Fill Macros"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <IconSparkles className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Type</label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value as MealType)}
                className="w-full p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 font-bold text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all cursor-pointer appearance-none"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Calories (kcal)</label>
              <input
                type="number"
                value={nutrition.calories || ''}
                onChange={(e) => setNutrition({ ...nutrition, calories: Number(e.target.value) })}
                className="w-full p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 font-bold text-slate-900 focus:border-emerald-500 focus:bg-white transition-all text-center"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 pt-2">
            {[
              { label: 'PRO', key: 'protein' },
              { label: 'CAR', key: 'carbs' },
              { label: 'FAT', key: 'fat' },
              { label: 'FIB', key: 'fiber' }
            ].map(macro => (
              <div key={macro.label} className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-300 tracking-[0.2em] block text-center">{macro.label}</label>
                <input
                  type="number"
                  step="0.1"
                  value={(nutrition as any)[macro.key] || ''}
                  onChange={(e) => setNutrition({ ...nutrition, [macro.key]: Number(e.target.value) })}
                  className="w-full p-4 bg-slate-50/50 rounded-2xl border border-slate-100 font-black text-xs text-center text-slate-600 focus:border-emerald-500 focus:bg-white outline-none transition-all shadow-sm"
                />
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button
              onClick={handleSave}
              disabled={!isFormValid || loading}
              className={`w-full py-6 rounded-[2rem] font-black text-lg tracking-tight shadow-2xl transition-all active:scale-[0.97] flex items-center justify-center gap-3 ${isFormValid
                ? 'bg-slate-900 text-white shadow-slate-900/20 hover:bg-black'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none'
                }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>AI Calculating...</span>
                </>
              ) : (
                editInitialData ? 'Save Changes' : 'Commit to Daily Log'
              )}
            </button>
            {!isFormValid && !loading && (
              <p className="text-[9px] text-center mt-4 text-slate-400 font-bold uppercase tracking-widest">
                Name + Quantity + Macros required to log
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealLog;
