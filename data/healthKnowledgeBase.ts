export interface KnowledgeEntry {
    keywords: string[];
    answer: string;
    category: 'nutrition' | 'exercise' | 'wellness' | 'weight_loss' | 'general';
}

export const HEALTH_KNOWLEDGE_BASE: KnowledgeEntry[] = [
    // --- NUTRITION FOUNDATIONS ---
    {
        keywords: ['protein', 'muscles', 'muscle gain', 'strength'],
        category: 'nutrition',
        answer: "Protein is essential for muscle repair and growth. Good sources include chicken, fish, eggs, tofu, lentils, and greek yogurt. Aim for 1.6-2.2g of protein per kg of body weight if you're active!"
    },
    {
        keywords: ['carbs', 'carbohydrates', 'energy', 'pasta', 'bread'],
        category: 'nutrition',
        answer: "Carbohydrates are your body's main fuel source. Focus on complex carbs like whole grains, oats, quinoa, and vegetables for sustained energy, rather than sugary snacks which cause crashes."
    },
    {
        keywords: ['fats', 'fatty', 'avocado', 'nuts'],
        category: 'nutrition',
        answer: "Healthy fats are vital for hormone function and brain health. Include sources like avocados, nuts, olive oil, and fatty fish (salmon) in your diet. Avoid trans fats found in processed foods."
    },
    {
        keywords: ['fiber', 'digestion', 'constipation'],
        category: 'nutrition',
        answer: "Fiber aids digestion and keeps you full longer. Women should aim for ~25g and men ~38g daily. Great sources: beans, fruits (with skin), vegetables, and whole grains."
    },
    {
        keywords: ['water', 'hydration', 'drink'],
        category: 'nutrition',
        answer: "Hydration improves energy, skin health, and performance. Aim for at least 2-3 liters (8-10 cups) daily, more if you exercise. Thirst is often mistaken for hunger!"
    },
    {
        keywords: ['sugar', 'sweets', 'candy'],
        category: 'nutrition',
        answer: "Excess added sugar can lead to weight gain and energy crashes. Try satisfying your sweet tooth with whole fruits, which provide fiber and vitamins along with natural sweetness."
    },

    // --- WEIGHT MANAGEMENT ---
    {
        keywords: ['lose weight', 'fat loss', 'cutting', 'dieting'],
        category: 'weight_loss',
        answer: "To lose weight responsibly, aim for a caloric deficit of 300-500 calories below your maintenance level. Focus on high-protein, high-fiber foods to stay full. Consistency beats perfection!"
    },
    {
        keywords: ['gain weight', 'bulking', 'mass'],
        category: 'weight_loss',
        answer: "To gain weight, you need a caloric surplus. Eat calorie-dense healthy foods like nuts, nut butters, avocados, and healthy oils. Combine this with resistance training to build muscle, not just fat."
    },
    {
        keywords: ['plateau', 'stuck', 'not losing'],
        category: 'weight_loss',
        answer: "Weight loss plateaus are normal. Try tracking your intake more precisely for a few days, increasing your daily steps, or taking a 'diet break' at maintenance calories for a week to reset."
    },

    // --- EXERCISE ---
    {
        keywords: ['cardio', 'running', 'walking', 'heart'],
        category: 'exercise',
        answer: "Cardio improves heart health and burns calories. Aim for 150 minutes of moderate activity (like brisk walking) or 75 minutes of vigorous activity (like running) per week."
    },
    {
        keywords: ['weights', 'lifting', 'gym', 'resistance'],
        category: 'exercise',
        answer: "Resistance training increases metabolic rate and bone density. Try to hit each muscle group 2 times per week. Compound movements like squats, deadlifts, and pushups are most effective."
    },
    {
        keywords: ['sore', 'pain', 'recovery'],
        category: 'exercise',
        answer: "Soreness (DOMS) is normal after new exercises. Active recovery like walking, stretching, and staying hydrated helps. Ensure you're getting enough protein and sleep!"
    },

    // --- WELLNESS & SLEEP ---
    {
        keywords: ['sleep', 'tired', 'insomnia'],
        category: 'wellness',
        answer: "Sleep is when your body repairs itself. Lack of sleep increases hunger hormones (ghrelin). specific Aim for 7-9 hours. Tips: Cool room, no screens 1h before bed, and consistent wake-up times."
    },
    {
        keywords: ['stress', 'anxiety', 'cortisol'],
        category: 'wellness',
        answer: "Chronic stress raises cortisol, which can lead to belly fat storage and cravings. combat it with breathing exercises, meditation, walking in nature, or reading."
    },

    // --- GENERAL APP HELP ---
    {
        keywords: ['hello', 'hi', 'hey', 'start'],
        category: 'general',
        answer: "Hello! I'm NutriBot, your personal health assistant. I can answer questions about nutrition, exercise, or check your daily stats. What's on your mind?"
    },
    {
        keywords: ['who are you', 'what are you'],
        category: 'general',
        answer: "I am NutriBot, a specialized health assistant designed to help you reach your fitness goals. I'm built right into this app to keep your data private and secure!"
    },
    {
        keywords: ['thank', 'thanks', 'cool', 'great'],
        category: 'general',
        answer: "You're welcome! Let me know if you have any other questions. Keep crushing your goals!"
    }
];

export const FALLBACK_ANSWERS = [
    "That's a great question. While I don't have a specific answer for that, focusing on whole foods and staying active is usually a good start!",
    "I'm still learning about that topic. Try asking me about protein, calories, sleep, or specific exercises.",
    "I'm not quite sure, but consistency is key to any health goal. How are your hydration and sleep levels lately?",
    "I didn't catch that. Could you ask about nutrition, workouts, or your daily stats?"
];
