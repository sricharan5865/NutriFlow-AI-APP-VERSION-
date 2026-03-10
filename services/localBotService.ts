import { Meal, UserProfile } from '../types';
import { HEALTH_KNOWLEDGE_BASE, FALLBACK_ANSWERS, KnowledgeEntry } from '../data/healthKnowledgeBase';
import { BREAKFAST_OPTIONS, LUNCH_OPTIONS, DINNER_OPTIONS, SNACK_OPTIONS, MealOption } from '../data/mealDatabase';

interface BotResponse {
    text: string;
    source: 'knowledge' | 'stats' | 'fallback' | 'strict_guard';
}

// STRICT MODE: Allowed keywords
const HEALTH_KEYWORDS = [
    'health', 'food', 'diet', 'nutrition', 'exercise', 'workout', 'gym', 'weight', 'fat', 'muscle',
    'protein', 'carb', 'calorie', 'water', 'hydration', 'sleep', 'fasting', 'recipe', 'meal',
    'breakfast', 'lunch', 'dinner', 'snack', 'eating', 'drink', 'body', 'fit', 'run', 'walk',
    'sugar', 'fiber', 'vitamin', 'mineral', 'goals', 'stats', 'profile', 'hello', 'hi', 'hey'
];

const isHealthRelated = (query: string): boolean => {
    const lower = query.toLowerCase();
    return HEALTH_KEYWORDS.some(k => lower.includes(k));
};

// Helper: Get random items from array
const getRandomItems = (arr: any[], count: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// Helper: Generate Diet Plan
const generateDietPlan = (calories: number) => {
    const b = getRandomItems(BREAKFAST_OPTIONS, 1)[0];
    const l = getRandomItems(LUNCH_OPTIONS, 1)[0];
    const d = getRandomItems(DINNER_OPTIONS, 1)[0];
    const s1 = getRandomItems(SNACK_OPTIONS, 1)[0];
    const s2 = getRandomItems(SNACK_OPTIONS, 1)[0];

    const total = b.calories + l.calories + d.calories + s1.calories + s2.calories;

    return `Here is a custom diet plan for today (Approx. ${total} kcal):

🍳 Breakfast: ${b.name} (${b.calories} cal)
🍱 Lunch: ${l.name} (${l.calories} cal)
🍽️ Dinner: ${d.name} (${d.calories} cal)
🍎 Snacks: ${s1.name} (${s1.calories} cal) & ${s2.name} (${s2.calories} cal)

Remember to drink water! 💧`;
};

// Simple keyword matching helper
const findBestMatch = (query: string): KnowledgeEntry | null => {
    const normalizedQuery = query.toLowerCase();

    // 1. Direct match
    const directMatch = HEALTH_KNOWLEDGE_BASE.find(entry =>
        entry.keywords.some(keyword => normalizedQuery.includes(keyword.toLowerCase()))
    );
    if (directMatch) return directMatch;

    return null;
};

// Generate personalized response based on user data
const getPersonalizedStatsParams = (query: string, profile: UserProfile, todayMeals: Meal[]): string | null => {
    const normalizedQuery = query.toLowerCase();
    const totalCalories = todayMeals.reduce((sum, m) => sum + m.nutrition.calories, 0);
    const totalProtein = todayMeals.reduce((sum, m) => sum + (m.nutrition.protein || 0), 0);

    if (normalizedQuery.includes('calories') && normalizedQuery.includes('left')) {
        const remaining = profile.calorieGoal - totalCalories;
        return `You have ${remaining > 0 ? remaining : 0} calories left to reach your goal of ${profile.calorieGoal}.`;
    }

    if (normalizedQuery.includes('calories') || normalizedQuery.includes('eat')) {
        const remaining = profile.calorieGoal - totalCalories;
        return `You've consumed ${totalCalories} calories today. You have ${remaining > 0 ? remaining : 0} calories left to reach your goal of ${profile.calorieGoal}.`;
    }

    if (normalizedQuery.includes('protein')) {
        return `You've had ${totalProtein}g of protein today. Keep it up for muscle recovery!`;
    }

    if (normalizedQuery.includes('weight')) {
        return `Your current weight is ${profile.weight}kg.`;
    }

    return null;
};

export const getLocalBotResponse = async (query: string, profile: UserProfile, todayMeals: Meal[]): Promise<BotResponse> => {
    // Simulate "thinking" delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const lowerQuery = query.toLowerCase();

    // 0. STRICT GUARDRAIL
    if (!isHealthRelated(query)) {
        return {
            text: "I am NutriBot, a specialized health assistant. Please ask me only about nutrition, diet, exercise, or your health goals.",
            source: 'strict_guard'
        };
    }

    // 1. Diet Plans
    if (lowerQuery.includes('diet plan') || lowerQuery.includes('meal plan')) {
        return { text: generateDietPlan(profile.calorieGoal), source: 'knowledge' };
    }

    // 2. Meal Suggestions
    if (lowerQuery.includes('suggest') || lowerQuery.includes('ideas') || lowerQuery.includes('options')) {
        let options: MealOption[] = [];
        let type = '';

        if (lowerQuery.includes('breakfast')) { options = BREAKFAST_OPTIONS; type = 'Breakfast'; }
        else if (lowerQuery.includes('lunch')) { options = LUNCH_OPTIONS; type = 'Lunch'; }
        else if (lowerQuery.includes('dinner')) { options = DINNER_OPTIONS; type = 'Dinner'; }
        else if (lowerQuery.includes('snack')) { options = SNACK_OPTIONS; type = 'Snack'; }
        else {
            // Default to mix if no specific time mentioned
            options = [...BREAKFAST_OPTIONS, ...LUNCH_OPTIONS, ...DINNER_OPTIONS];
            type = 'Meal';
        }

        // Apply Dietary Filter
        let dietLabel = '';
        if (lowerQuery.includes('non-veg') || lowerQuery.includes('non veg') || lowerQuery.includes('meat') || lowerQuery.includes('chicken') || lowerQuery.includes('fish')) {
            options = options.filter(o => o.dietary === 'non-veg');
            dietLabel = 'Non-Veg ';
        } else if (lowerQuery.includes('veg') || lowerQuery.includes('vegetarian')) {
            options = options.filter(o => o.dietary === 'veg');
            dietLabel = 'Vegetarian ';
        }

        if (options.length > 0) {
            const suggestions = getRandomItems(options, 5);
            const list = suggestions.map(s => `• ${s.name} (${s.calories} cal)`).join('\n');
            return {
                text: `Here are 5 healthy ${dietLabel}${type} options for you:\n\n${list}\n\nWould you like more?`,
                source: 'knowledge'
            };
        } else {
            return {
                text: `I couldn't find any specific ${dietLabel}${type.toLowerCase()} options. Try asking for "healthy snacks" or "veg dinner".`,
                source: 'knowledge'
            };
        }
    }

    // 3. Check for personal stats questions
    const statsResponse = getPersonalizedStatsParams(query, profile, todayMeals);
    if (statsResponse) {
        return { text: statsResponse, source: 'stats' };
    }

    // 4. Check Knowledge Base
    const match = findBestMatch(query);
    if (match) {
        return { text: match.answer, source: 'knowledge' };
    }

    // 5. Fallback
    const randomFallback = FALLBACK_ANSWERS[Math.floor(Math.random() * FALLBACK_ANSWERS.length)];
    return { text: randomFallback, source: 'fallback' };
};

export const getCoachTip = async (profile: UserProfile, todayMeals: Meal[]): Promise<string> => {
    const calories = todayMeals.reduce((sum, m) => sum + m.nutrition.calories, 0);
    const remaining = profile.calorieGoal - calories;

    if (remaining < 0) {
        return "You've hit your calorie goal today! Focus on hydration and rest now.";
    } else if (remaining < 300) {
        return "You're close to your goal. A small snack or light dinner would be perfect.";
    } else {
        return "Great start! Keep fueling your body with nutrient-dense foods.";
    }
};

// Export for Dashboard to use
export const getRecommendedRecipes = (preference: 'all' | 'veg' | 'non-veg' = 'all'): MealOption[] => {
    let all = [...BREAKFAST_OPTIONS, ...LUNCH_OPTIONS, ...DINNER_OPTIONS];

    if (preference !== 'all') {
        all = all.filter(m => m.dietary === preference);
    }

    return getRandomItems(all, 3);
};

export interface RecipeDetails {
    ingredients: string[];
    steps: string[];
}

export const getRecipeDetails = (mealName: string): RecipeDetails => {
    const lower = mealName.toLowerCase();

    // Default / Generic
    let ingredients = ["Fresh seasonal ingredients", "Salt & Pepper", "Olive Oil", "Herbs for garnish"];
    let steps = [
        "Prepare all your ingredients by washing and chopping them.",
        "Cook the main ingredients in a pan over medium heat.",
        "Season well with salt, pepper, and herbs.",
        "Serve hot and enjoy your healthy meal!"
    ];

    if (lower.includes("salad")) {
        ingredients = ["Mixed greens (spinach, arugula)", "Cucumber & Cherry Tomatoes", "Olive Oil & Lemon juice", "Salt & Pepper", "Choice of Protein (Chicken/Beans)"];
        steps = [
            "Wash and chop all vegetables into bite-sized pieces.",
            "In a large bowl, toss the greens and vegetables together.",
            "Add your protein source.",
            "Drizzle with olive oil and lemon juice, then season.",
            "Toss gently and serve fresh."
        ];
    } else if (lower.includes("sandwich") || lower.includes("toast") || lower.includes("burger")) {
        ingredients = ["Whole grain bread/bun", "Fresh lettuce & tomato", "Protein filling", "Low-fat spread", "Pickles (optional)"];
        steps = [
            "Toast the bread or bun lightly.",
            "Spread a thin layer of condiment on one side.",
            "Layer the lettuce, tomato, and your main filling.",
            "Close the sandwich and slice in half.",
            "Serve immediatey."
        ];
    } else if (lower.includes("smoothie") || lower.includes("shake")) {
        ingredients = ["Fresh fruit (banana/berries)", "Greek Yogurt or Protein Powder", "Almond Milk", "Ice cubes", "Honey (optional)"];
        steps = [
            "Add all ingredients into a blender.",
            "Blend on high speed until smooth and creamy.",
            "Pour into a tall glass.",
            "Garnish with a slice of fruit or mint leaf."
        ];
    } else if (lower.includes("curry") || lower.includes("masala") || lower.includes("stew")) {
        ingredients = ["Onion, Garlic, Ginger", "Spices (Turmeric, Cumin, Coriander)", "Main Vegetable/Protein", "Tomatoes or Coconut Milk", "Fresh Coriander"];
        steps = [
            "Sauté onion, garlic, and ginger in a pot.",
            "Add spices and cook for a minute until fragrant.",
            "Add the main vegetable or protein and brown slightly.",
            "Pour in tomatoes or coconut milk and simmer until tender.",
            "Garnish with fresh coriander and serve with rice/roti."
        ];
    } else if (lower.includes("oatmeal") || lower.includes("porridge")) {
        ingredients = ["Rolled Oats", "Milk or Water", "Honey or Maple Syrup", "Fresh Fruits", "Nuts & Seeds"];
        steps = [
            "Boil milk or water in a small saucepan.",
            "Add oats and reduce heat to low.",
            "Simmer for 5-10 minutes until creamy.",
            "Top with honey, fruits, and nuts before serving."
        ];
    } else if (lower.includes("pasta") || lower.includes("spaghetti") || lower.includes("mac")) {
        ingredients = ["Whole wheat pasta", "Olive oil", "Garlic", "Vegetables/Sauce", "Parmesan cheese"];
        steps = [
            "Boil pasta in salted water until al dente.",
            "Meanwhile, prepare the sauce in a separate pan.",
            "Drain pasta and toss with the sauce.",
            "Garnish with cheese and fresh herbs."
        ];
    }

    return { ingredients, steps };
};
