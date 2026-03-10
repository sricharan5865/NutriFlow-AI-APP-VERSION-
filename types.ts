
export interface UserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  calorieGoal: number; // Added for user-defined targets
  goal: 'loss' | 'maintenance' | 'gain';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  gender: 'male' | 'female' | 'other';
  dietaryPreference: 'veg' | 'non-veg';
}

export interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface Meal {
  id: string;
  name: string;
  time: string;
  type: MealType;
  nutrition: NutritionData;
  photoUrl?: string;
  date: string;
}

export interface WeightEntry {
  date: string;
  weight: number;
}

export interface WaterEntry {
  date: string;
  amount: number; // in ml
}

export interface AppState {
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  profile: UserProfile;
  password?: string;
  meals: Meal[];
  weightHistory: WeightEntry[];
  waterIntake: WaterEntry[];
  lastUpdated: string;
}
