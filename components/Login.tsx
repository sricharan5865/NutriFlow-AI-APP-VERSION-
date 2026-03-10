import React, { useState, useEffect } from 'react';
import { IconSparkles } from './ui/Icons';
import { UserProfile } from '../types';

interface LoginProps {
  onComplete: (profile: UserProfile, email: string, mode: 'signup' | 'login', password?: string) => void;
  initialMode?: 'signup' | 'login';
  initialStep?: number;
  initialEmail?: string;
  minStep?: number;
  isSubmitting?: boolean;
  errorMessage?: string | null;
}

const Login: React.FC<LoginProps> = ({ onComplete, initialMode = 'login', initialStep = 1, initialEmail = '', minStep = 1, isSubmitting = false, errorMessage = null }) => {
  const [mode, setMode] = useState<'signup' | 'login'>(initialMode);
  const [step, setStep] = useState(initialStep);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: 25,
    weight: 70,
    height: 170,
    calorieGoal: 2000,
    goal: 'maintenance',
    activityLevel: 'moderate',
    gender: 'other',
    dietaryPreference: 'veg'
  });

  useEffect(() => {
    setMode(initialMode);
    setStep(initialStep);
    if (initialEmail) setEmail(initialEmail);
  }, [initialMode, initialStep, initialEmail]);



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(profile, email, mode, password);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(p => ({ ...p, ...updates }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 6));
  const prevStep = () => setStep(s => Math.max(s - 1, minStep));

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 font-sans">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 bg-[#10b981] rounded-full items-center justify-center text-white shadow-lg mb-4">
            <IconSparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-[#111827] tracking-tight text-center">NutriFlow AI</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Personalized nutrition, simplified.</p>

          {mode === 'signup' && (
            <div className="flex justify-center mt-6 space-x-1.5">
              {[1, 2, 3, 4, 5, 6].map(s => (
                <div key={s} className={`h-1.5 w-6 rounded-full transition-all duration-300 ${step >= s ? 'bg-[#10b981]' : 'bg-slate-200'}`} />
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100/50 flex flex-col relative overflow-hidden">
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col z-10">
            {mode === 'login' ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h2 className="text-2xl font-black text-[#111827]">Welcome Back</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 ml-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full p-4 bg-[#f8fafc] border border-slate-100 rounded-2xl text-black font-semibold focus:border-[#88ccb4] focus:bg-white outline-none transition-all placeholder:text-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 ml-1">Password</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-4 bg-[#f8fafc] border border-slate-100 rounded-2xl text-black font-semibold focus:border-[#88ccb4] focus:bg-white outline-none transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>
                {errorMessage && (
                  <p className="text-rose-500 text-sm font-semibold text-center bg-rose-50 rounded-2xl px-4 py-3">
                    {errorMessage}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#88ccb4] text-white font-black py-4 rounded-2xl hover:bg-[#7bbfa7] transition-all shadow-lg shadow-[#88ccb4]/20 text-lg active:scale-[0.98] mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Signing in...
                    </>
                  ) : 'Log In'}
                </button>
              </div>
            ) : (
              <>
                {step === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                    <h2 className="text-2xl font-black text-[#111827]">Secure Your Account</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 ml-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="hello@example.com"
                          className="w-full p-4 bg-[#f8fafc] border border-slate-100 rounded-2xl text-black font-semibold focus:border-[#88ccb4] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 ml-1">Password</label>
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full p-4 bg-[#f8fafc] border border-slate-100 rounded-2xl text-black font-semibold focus:border-[#88ccb4] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 ml-1">Confirm Password</label>
                        <input
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className={`w-full p-4 bg-[#f8fafc] border ${confirmPassword && password !== confirmPassword ? 'border-rose-300 focus:border-rose-500' : 'border-slate-100 focus:border-[#88ccb4]'} rounded-2xl text-black font-semibold outline-none transition-all`}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                    <h2 className="text-2xl font-black text-[#111827]">What's your name?</h2>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 ml-1">Full Name</label>
                      <input
                        type="text"
                        required
                        autoFocus
                        value={profile.name}
                        onChange={(e) => updateProfile({ name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full p-4 bg-[#f8fafc] border border-slate-100 rounded-2xl text-black font-semibold outline-none focus:border-[#88ccb4]"
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                    <h2 className="text-2xl font-black text-[#111827]">Bio Metrics</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 ml-1">Age</label>
                        <input
                          type="number"
                          value={profile.age}
                          onChange={(e) => updateProfile({ age: Number(e.target.value) })}
                          className="w-full p-4 bg-[#f8fafc] border border-slate-100 rounded-2xl text-black font-semibold outline-none focus:border-[#88ccb4]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 ml-1">Gender</label>
                        <select
                          value={profile.gender}
                          onChange={(e) => updateProfile({ gender: e.target.value as any })}
                          className="w-full p-4 bg-[#f8fafc] border border-slate-100 rounded-2xl text-black font-semibold outline-none focus:border-[#88ccb4] appearance-none"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 ml-1">Activity Level</label>
                      <select
                        value={profile.activityLevel}
                        onChange={(e) => updateProfile({ activityLevel: e.target.value as any })}
                        className="w-full p-4 bg-[#f8fafc] border border-slate-100 rounded-2xl text-black font-semibold outline-none focus:border-[#88ccb4] appearance-none"
                      >
                        <option value="sedentary">Sedentary (No Exercise)</option>
                        <option value="light">Lightly Active (1-2 days)</option>
                        <option value="moderate">Moderate (3-5 days)</option>
                        <option value="active">Active (Daily)</option>
                        <option value="very_active">Very Active (Athlete)</option>
                      </select>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                    <h2 className="text-2xl font-black text-[#111827]">Vital Statistics</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 ml-1">Height (cm)</label>
                        <input
                          type="number"
                          value={profile.height}
                          onChange={(e) => updateProfile({ height: Number(e.target.value) })}
                          className="w-full p-4 bg-[#f8fafc] border border-slate-100 rounded-2xl text-black font-semibold outline-none focus:border-[#88ccb4]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 ml-1">Weight (kg)</label>
                        <input
                          type="number"
                          value={profile.weight}
                          onChange={(e) => updateProfile({ weight: Number(e.target.value) })}
                          className="w-full p-4 bg-[#f8fafc] border border-slate-100 rounded-2xl text-black font-semibold outline-none focus:border-[#88ccb4]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                    <h2 className="text-2xl font-black text-[#111827]">Your Health Goal</h2>
                    <div className="space-y-3">
                      {['loss', 'maintenance', 'gain'].map(g => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => updateProfile({ goal: g as any })}
                          className={`w-full p-4 rounded-2xl border-2 font-black text-left flex justify-between items-center transition-all ${profile.goal === g
                            ? 'border-[#88ccb4] bg-[#f0f9f6] text-[#2c5345] shadow-sm translate-x-1'
                            : 'border-slate-100 text-slate-900 hover:border-slate-200'
                            }`}
                        >
                          <span className="capitalize">{g === 'loss' ? 'Lose Weight' : g === 'gain' ? 'Gain Muscle' : 'Maintenance'}</span>
                          {profile.goal === g && <div className="w-6 h-6 bg-[#10b981] rounded-full flex items-center justify-center text-white text-[12px]">✓</div>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 text-center">
                    <h2 className="text-2xl font-black text-[#111827]">Dietary Choice</h2>
                    <p className="text-sm text-slate-500 font-bold mb-4">Ria will tailor all your suggestions based on this selection.</p>
                    <div className="grid grid-cols-2 gap-4">
                      {['veg', 'non-veg'].map(pref => (
                        <button
                          key={pref}
                          type="button"
                          onClick={() => updateProfile({ dietaryPreference: pref as any })}
                          className={`p-6 rounded-[2rem] border-2 flex flex-col items-center justify-center transition-all space-y-3 ${profile.dietaryPreference === pref
                            ? 'border-[#88ccb4] bg-[#f0f9f6] text-[#2c5345] shadow-md scale-105'
                            : 'border-slate-100 text-slate-400 hover:border-slate-200'
                            }`}
                        >
                          <span className="text-3xl">{pref === 'veg' ? '🥦' : '🍖'}</span>
                          <span className="font-black uppercase tracking-widest text-[10px]">{pref === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-8 flex space-x-3">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 bg-white text-slate-900 font-bold py-4 rounded-2xl hover:bg-slate-50 transition-all border border-slate-200 active:scale-95"
                    >
                      Back
                    </button>
                  )}
                  {step < 6 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={(step === 1 && (!email || !password || !confirmPassword || password !== confirmPassword)) || (step === 2 && !profile.name)}
                      className="flex-[2] bg-[#88ccb4] text-white font-black py-4 rounded-2xl hover:bg-[#7bbfa7] transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex-[2] bg-[#88ccb4] text-white font-black py-4 rounded-2xl hover:bg-[#7bbfa7] transition-all shadow-md active:scale-95"
                    >
                      Start My Journey
                    </button>
                  )}
                </div>
              </>
            )}
          </form>

          <div className="mt-8 pt-6 border-t border-slate-50 text-center relative z-10">
            {mode === 'signup' ? (
              <p className="text-sm font-medium text-slate-400">
                Already have an account?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-[#10b981] font-bold hover:underline"
                >
                  Log In
                </button>
              </p>
            ) : (
              <p className="text-sm font-medium text-slate-400">
                Don't have an account?{' '}
                <button
                  onClick={() => { setMode('signup'); setStep(1); }}
                  className="text-[#10b981] font-bold hover:underline"
                >
                  Sign Up
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
