
import { AppState, UserProfile } from './types';

export const INITIAL_PROFILE: UserProfile = {
  name: "",
  age: 25,
  weight: 70,
  height: 170,
  calorieGoal: 2000, // Default as requested
  goal: 'maintenance',
  activityLevel: 'moderate',
  gender: 'other',
  dietaryPreference: 'veg'
};

export const STORAGE_KEY = 'nutriflow_data_v2';

export const DEFAULT_STATE: AppState = {
  isAuthenticated: false,
  hasCompletedOnboarding: false,
  profile: INITIAL_PROFILE,
  meals: [],
  weightHistory: [],
  waterIntake: [],
  lastUpdated: new Date().toISOString()
};

export const COLORS = {
  primary: '#10b981',
  primaryDark: '#059669',
  accent: '#3b82f6',
  danger: '#ef4444',
  background: '#fcfcfd',
  card: '#ffffff'
};
