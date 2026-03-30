import React, { useState, useEffect } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { Dialog } from '@capacitor/dialog';
import { AppState, Meal, UserProfile } from './types';
import { storageService } from './services/storage';
import { DEFAULT_STATE } from './constants';
import { IconDashboard, IconCamera, IconChart, IconSparkles } from './components/ui/Icons';
import Dashboard from './components/Dashboard.tsx';
import Assistant from './components/Assistant.tsx';
import MealLog from './components/MealLog.tsx';
import Login from './components/Login.tsx';
import NutrientAnalysis from './components/NutrientAnalysis.tsx';
import { OfflineIndicator } from './components/OfflineIndicator.tsx';

// Error Boundary Component
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-rose-50 p-10">
          <div className="max-w-xl w-full bg-white p-8 rounded-3xl shadow-xl border border-rose-100">
            <h1 className="text-2xl font-black text-rose-600 mb-4">Something went wrong</h1>
            <pre className="bg-rose-50 p-4 rounded-xl text-rose-800 text-xs overflow-auto mb-6 border border-rose-100">
              {this.state.error?.toString()}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition-colors"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ProfileEditor: React.FC<{ profile: UserProfile, onUpdate: (updates: Partial<UserProfile>) => void, onLogout: () => void, onClearData: () => void }> = ({ profile, onUpdate, onLogout, onClearData }) => {
  return (
    <div className="space-y-8 max-w-2xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Stats & Profile</h2>
        <div className="flex gap-3">
          <button
            onClick={onLogout}
            className="px-6 py-2 bg-rose-50 text-rose-600 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-rose-600 hover:text-white transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
          <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight flex items-center gap-2">
            <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
            Daily Targets
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-black uppercase text-slate-600 mb-2 ml-1 tracking-wide">Daily Calorie Goal</label>
              <input
                type="number"
                value={profile.calorieGoal}
                onChange={(e) => onUpdate({ calorieGoal: Number(e.target.value) })}
                className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 font-black focus:border-emerald-600 focus:bg-white outline-none transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase text-slate-600 mb-2 ml-1 tracking-wide">Current Weight (kg)</label>
              <input
                type="number"
                value={profile.weight}
                onChange={(e) => onUpdate({ weight: Number(e.target.value) })}
                className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 font-black focus:border-emerald-600 focus:bg-white outline-none transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
          <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
            Bio Metrics
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-black uppercase text-slate-600 mb-2 ml-1 tracking-wide">Height (cm)</label>
              <input
                type="number"
                value={profile.height}
                onChange={(e) => onUpdate({ height: Number(e.target.value) })}
                className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 font-black focus:border-emerald-600 focus:bg-white outline-none transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase text-slate-600 mb-2 ml-1 tracking-wide">Activity Level</label>
              <select
                value={profile.activityLevel}
                onChange={(e) => onUpdate({ activityLevel: e.target.value as any })}
                className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 font-black outline-none focus:border-emerald-600 appearance-none transition-all shadow-sm"
              >
                <option value="sedentary">Sedentary</option>
                <option value="light">Lightly Active</option>
                <option value="moderate">Moderate</option>
                <option value="active">Active</option>
                <option value="very_active">Very Active</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [isLoading, setIsLoading] = useState(true); // Start with loading to check for saved session
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'log' | 'ria' | 'profile' | 'analysis'>('dashboard');
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [onboardingParams, setOnboardingParams] = useState<{ mode: 'signup', step: number, email: string, minStep: number } | null>(null);
  const lastSavedState = React.useRef<string>("");

  // Check for saved session on app startup (persistent login) and Check Version/Rating
  useEffect(() => {
    const startupChecks = async () => {
      // 1. Version Check & Rating
      try {
        const info = await CapacitorApp.getInfo();
        const currentVersion = info.version;
        // The minimum required version we want users to have
        const requiredVersion = '1.0.4';

        // Simple version comparison logic (assumes format x.y.z)
        if (currentVersion !== requiredVersion) {
          await Dialog.alert({
            title: 'Update Available',
            message: 'A new version of NutriFlow AI is available! Please update for the best experience and bug fixes.'
          });
        } else {
          // Prompt for a rating occasionally if they are on the current version
          const hasRated = localStorage.getItem('nutriflow_has_rated');
          const loginCount = parseInt(localStorage.getItem('nutriflow_login_count') || '0');
          localStorage.setItem('nutriflow_login_count', (loginCount + 1).toString());

          if (!hasRated && loginCount > 3) {
            const { value } = await Dialog.confirm({
              title: 'Enjoying NutriFlow AI?',
              message: 'Would you mind taking a moment to rate the app?',
              okButtonTitle: 'Sure!',
              cancelButtonTitle: 'Maybe Later'
            });
            if (value) {
              localStorage.setItem('nutriflow_has_rated', 'true');
              // In a real app, open store link here
              console.log("User accepted rating prompt!");
            }
          }
        }
      } catch (e) {
        console.log("Running in browser, skipping native app checks");
      }

      // 2. Initialize offline queue
      await storageService.initOfflineQueue().catch(() => { });

      // 3. Check auth
      const savedUserId = storageService.getLastUserId();
      if (savedUserId) {
        // If we have a saved user, trust it and proceed immediately
        // Firebase will sync data in the background via the next useEffect
        setCurrentUserId(savedUserId);
      } else {
        setIsLoading(false);
      }
    };
    startupChecks();
  }, []);

  // Load data when user logs in
  useEffect(() => {
    if (!currentUserId) return;

    const init = async () => {
      setIsLoading(true);
      try {
        // Race data loading against a 3s timeout
        const dataPromise = storageService.loadData(currentUserId);
        const timeoutPromise = new Promise<null>((resolve) =>
          setTimeout(() => resolve(null), 3000)
        );
        const data = await Promise.race([dataPromise, timeoutPromise]);

        setState({
          ...(data || DEFAULT_STATE),
          isAuthenticated: true,
          hasCompletedOnboarding: true
        });
      } catch (e) {
        console.warn('Data load failed, using defaults:', e);
        setState({
          ...DEFAULT_STATE,
          isAuthenticated: true,
          hasCompletedOnboarding: true
        });
      }
      setIsLoading(false);
    };
    init();

    const unsubscribe = storageService.subscribe(currentUserId, (newData) => {
      // Ensure authentication flags are set even if not in Firebase data
      setState({
        ...newData,
        isAuthenticated: true,
        hasCompletedOnboarding: true
      });
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [currentUserId]);

  useEffect(() => {
    if (!isLoading && currentUserId) {
      const stateString = JSON.stringify(state);
      if (stateString !== lastSavedState.current) {
        storageService.saveData(currentUserId, state);
        lastSavedState.current = stateString;
      }
    }
  }, [state, isLoading, currentUserId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  const handleOnboardingComplete = async (newProfile: UserProfile, email: string, mode: 'signup' | 'login', password?: string) => {
    setIsSubmitting(true);
    setLoginError(null);
    const userId = email.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_');

    try {
      // Check if user exists on login (with 8s timeout)
      if (mode === 'login') {
        let exists = false;
        let passwordValid = false;
        let requiresMigration = false;

        // Always check Firebase first if we have connection, to get the requiresMigration flag.
        // Local cache doesn't know about requiresMigration.
        try {
          const authCheckPromise = storageService.verifyCredentials(userId, password || '');
          const timeoutPromise = new Promise<{ exists: boolean, valid: boolean, requiresMigration?: boolean }>((resolve) =>
            setTimeout(() => {
              // On timeout, fail safe by checking local cache as fallback
              const localCheck = storageService.verifyLocalCredentials(userId, password || '');
              if (localCheck !== null) {
                resolve({ exists: true, valid: localCheck, requiresMigration: false });
              } else {
                resolve({ exists: false, valid: false });
              }
            }, 3000)
          );
          const result = await Promise.race([authCheckPromise, timeoutPromise]);
          exists = result.exists;
          passwordValid = result.valid;
          requiresMigration = (result as any).requiresMigration || false;
        } catch (e) {
          console.warn('Firebase check failed:', e);
          // Fallback to local cache if offline/error
          const localCheck = storageService.verifyLocalCredentials(userId, password || '');
          if (localCheck !== null) {
            exists = true;
            passwordValid = localCheck;
          }
        }

        if (!exists) {
          // User doesn't exist locally or in Firebase, start onboarding
          setOnboardingParams({
            mode: 'signup',
            step: 2,
            email: email,
            minStep: 2
          });
          setIsSubmitting(false);
          return;
        }

        if (!passwordValid) {
          setLoginError("Invalid password. Please try again.");
          setIsSubmitting(false);
          return;
        }

        // 3. Migrate old accounts to have a password
        if (requiresMigration && password) {
          try {
            const data = await storageService.loadData(userId);
            data.password = password;
            await storageService.saveData(userId, data);
          } catch (e) {
            console.warn('Failed to migrate password:', e);
          }
        }
      }

      setIsLoading(true);
      setCurrentUserId(userId);
      setOnboardingParams(null);
      storageService.saveLastUserId(userId);
      if (password) {
        storageService.saveLocalCredentials(userId, password);
      }

      if (mode === 'signup') {
        const newState: AppState = {
          isAuthenticated: true,
          hasCompletedOnboarding: true,
          profile: newProfile,
          password: password,
          meals: [],
          waterIntake: [],
          weightHistory: [{ date: new Date().toISOString().split('T')[0], weight: newProfile.weight }],
          lastUpdated: new Date().toISOString()
        };
        await storageService.saveData(userId, newState).catch(() => { });
        setState(newState);
      }
    } catch (err) {
      console.error('Login error:', err);
      // Even on error, let the user in with a local session
      setCurrentUserId(userId);
      storageService.saveLastUserId(userId);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, ...updates },
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleLogout = () => {
    if (confirm("Sign out? Your data will be safely stored.")) {
      setState(DEFAULT_STATE);
      setCurrentUserId(null);
      // Clear saved session for persistent login
      storageService.clearLastUserId();
      lastSavedState.current = "";
    }
  };

  const handleClearData = () => {
    if (currentUserId) {
      storageService.clearData(currentUserId);
      window.location.reload();
    }
  };

  const addMeal = (mealData: Omit<Meal, 'id'>) => {
    if (editingMeal) {
      setState(prev => ({
        ...prev,
        meals: prev.meals.map(m => m.id === editingMeal.id ? { ...mealData, id: editingMeal.id } : m),
        lastUpdated: new Date().toISOString()
      }));
      setEditingMeal(null);
    } else {
      const newMeal: Meal = { ...mealData, id: Math.random().toString(36).substr(2, 9) };
      setState(prev => ({ ...prev, meals: [newMeal, ...prev.meals], lastUpdated: new Date().toISOString() }));
    }
    setActiveTab('dashboard');
  };

  const deleteMeal = (id: string) => {
    if (confirm("Delete this entry?")) {
      setState(prev => ({
        ...prev,
        meals: prev.meals.filter(m => m.id !== id),
        lastUpdated: new Date().toISOString()
      }));
    }
  };

  const startEditMeal = (meal: Meal) => {
    setEditingMeal(meal);
    setActiveTab('log');
  };

  const moveMeal = (id: string, date: string) => {
    setState(prev => ({
      ...prev,
      meals: prev.meals.map(m => m.id === id ? { ...m, date } : m),
      lastUpdated: new Date().toISOString()
    }));
  };

  const copyMeal = (id: string, date: string) => {
    const original = state.meals.find(m => m.id === id);
    if (!original) return;
    const copy: Meal = {
      ...original,
      id: Math.random().toString(36).substr(2, 9),
      date
    };
    setState(prev => ({
      ...prev,
      meals: [copy, ...prev.meals],
      lastUpdated: new Date().toISOString()
    }));
  };

  const logWater = (amount: number) => {
    const today = new Date().toISOString().split('T')[0];
    setState(prev => ({
      ...prev,
      waterIntake: [...prev.waterIntake, { date: today, amount }],
      lastUpdated: new Date().toISOString()
    }));
  };

  // Entry point: First show the login page if not authenticated
  if (!state.isAuthenticated || !state.hasCompletedOnboarding) {
    return (
      <div>
        <Login
          onComplete={handleOnboardingComplete}
          initialMode={onboardingParams?.mode}
          initialStep={onboardingParams?.step}
          initialEmail={onboardingParams?.email}
          minStep={onboardingParams?.minStep}
          isSubmitting={isSubmitting}
          errorMessage={loginError}
        />
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard', icon: <IconDashboard />, label: 'Command' },
    { id: 'log', icon: <IconCamera />, label: 'Log' },
    { id: 'ria', icon: <IconSparkles />, label: 'Assistant' },
    { id: 'profile', icon: <IconChart />, label: 'Stats' },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col md:flex-row">
      <OfflineIndicator />
      <main className="flex-1 p-4 pt-14 md:p-10 md:pt-16 max-w-6xl mx-auto w-full pb-32 overflow-y-auto" style={{ paddingTop: `max(3.5rem, env(safe-area-inset-top, 0px))` }}>
        {activeTab === 'dashboard' && (
          <Dashboard
            state={state}
            onReset={handleLogout}
            onLogWater={logWater}
            onDeleteMeal={deleteMeal}
            onEditMeal={startEditMeal}
            onMoveMeal={moveMeal}
            onCopyMeal={copyMeal}
            onOpenAnalysis={() => setActiveTab('analysis')}
          />
        )}
        {activeTab === 'analysis' && (
          <NutrientAnalysis
            meals={state.meals.filter(m => m.date === new Date().toISOString().split('T')[0])}
            profile={state.profile}
            onBack={() => setActiveTab('dashboard')}
          />
        )}
        {activeTab === 'log' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900 text-center mb-10 tracking-tight">
              {editingMeal ? 'Modify Logged Meal' : 'Track Your Macros'}
            </h2>
            <MealLog onAddMeal={addMeal} editInitialData={editingMeal || undefined} />
          </div>
        )}
        {activeTab === 'ria' && <Assistant state={state} />}
        {activeTab === 'profile' && <ProfileEditor profile={state.profile} onUpdate={updateProfile} onLogout={handleLogout} onClearData={handleClearData} />}
      </main>

      {/* Persistent Bottom Nav - Mobile Optimized */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-4 py-3 pb-safe flex justify-around items-center z-50 shadow-lg">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id !== 'log') setEditingMeal(null);
              setActiveTab(item.id as any);
            }}
            className={`flex flex-col items-center space-y-0.5 min-w-[64px] min-h-[56px] px-3 py-2 rounded-2xl transition-all active:scale-95 ${activeTab === item.id
              ? 'text-emerald-700 bg-emerald-50 scale-105'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
          >
            <div className={`${activeTab === item.id ? 'scale-110' : 'scale-100'} transition-transform`}>
              {item.icon}
            </div>
            <span className={`text-[10px] font-extrabold uppercase tracking-wide ${activeTab === item.id ? 'text-emerald-700' : 'text-slate-500'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

// Main App Component (Wrapper)
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
};

export default App;