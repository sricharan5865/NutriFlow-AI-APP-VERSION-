export interface MealOption {
    name: string;
    calories: number; // Estimated
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    dietary: 'veg' | 'non-veg';
    ingredients?: string[];
    instructions?: string[];
}

// Helper to quickly generate items if needed, but we will list many explicitly for variety
const createOption = (name: string, cals: number, type: MealOption['type'], dietary: MealOption['dietary']): MealOption => ({ name, calories: cals, type, dietary });
export const BREAKFAST_OPTIONS: MealOption[] = [
    {
        name: "Oatmeal with Berries",
        calories: 300,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["1/2 cup Rolled Oats", "1 cup Almond Milk or Water", "1/4 cup Blueberries & Strawberries", "1 tsp Chia Seeds", "1 tsp Honey", "Pinch of Cinnamon"],
        instructions: ["Bring the liquid to a boil in a small saucepan.", "Add oats and reduce heat to low; simmer for 5-7 minutes stirring occasionally.", "Stir in cinnamon and honey.", "Pour into a bowl and top with fresh berries and chia seeds."]
    },
    {
        name: "Greek Yogurt Parfait",
        calories: 250,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["1 cup Greek Yogurt (Plain)", "1/2 cup Granola (Low sugar)", "1/2 cup Mixed Berries", "1 tsp Honey"],
        instructions: ["In a glass or bowl, add a layer of Greek yogurt.", "Add a layer of granola.", "Add a layer of mixed berries.", "Repeat the layers and drizzle with honey on top."]
    },
    {
        name: "Avocado Toast with Egg",
        calories: 350,
        type: 'breakfast',
        dietary: 'non-veg',
        ingredients: ["1 Slice Whole Grain Bread", "1/2 Ripe Avocado", "1 Large Egg", "Chili Flakes", "Salt & Pepper", "Lemon Juice"],
        instructions: ["Toast the bread until golden and crisp.", "Mash the avocado with lemon juice, salt, and pepper.", "Poach or fry the egg to your liking.", "Spread avocado on toast, top with the egg, and sprinkle chili flakes."]
    },
    {
        name: "Scrambled Eggs with Spinach",
        calories: 200,
        type: 'breakfast',
        dietary: 'non-veg',
        ingredients: ["2 Large Eggs", "1 cup Fresh Spinach", "1 tsp Olive Oil", "Salt & Pepper", "Garlic Powder"],
        instructions: ["Whisk eggs with salt, pepper, and garlic powder.", "Heat oil in a pan and sauté spinach until wilted.", "Pour in the eggs and cook over medium-low heat, stirring gently until fluffy.", "Serve immediately."]
    },
    {
        name: "Banana Protein Pancake",
        calories: 400,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["1 Ripe Banana", "2 Eggs", "1 scoop Protein Powder", "1/4 tsp Baking Powder", "Butter for frying"],
        instructions: ["Mash the banana in a bowl.", "Whisk in eggs, protein powder, and baking powder until smooth.", "Heat a pan with a little butter.", "Pour batter to form small pancakes; cook 2 mins per side until golden."]
    },
    {
        name: "Smoothie Bowl",
        calories: 350,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["1 Frozen Banana", "1/2 cup Frozen Berries", "1/2 cup Almond Milk", "Toppings: Granola, Coconut flakes, Sliced fruit"],
        instructions: ["Blend frozen banana, berries, and milk until thick and creamy.", "Pour into a bowl.", "Arrange toppings beautifully on top.", "Serve immediately before it melts."]
    },
    {
        name: "Chia Seed Pudding",
        calories: 200,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["3 tbsp Chia Seeds", "1 cup Almond Milk", "1/2 tsp Vanilla Extract", "1 tsp Maple Syrup", "Fresh Fruit"],
        instructions: ["Mix chia seeds, milk, vanilla, and syrup in a jar.", "Stir well to prevent clumping.", "Refrigerate overnight or for at least 4 hours.", "Top with fresh fruit before serving."]
    },
    {
        name: "Whole Wheat Toast with Peanut Butter",
        calories: 300,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["2 Slices Whole Wheat Bread", "2 tbsp Natural Peanut Butter", "1/2 Banana (sliced)", "Chia seeds (optional)"],
        instructions: ["Toast the bread slices.", "Spread peanut butter evenly on both slices.", "Top with sliced bananas and a sprinkle of chia seeds."]
    },
    {
        name: "Vegetable Omelette",
        calories: 350,
        type: 'breakfast',
        dietary: 'non-veg',
        ingredients: ["2 Eggs", "1/4 cup Bell Peppers (diced)", "1/4 cup Onions (diced)", "1/4 cup Mushrooms (sliced)", "Cheese (optional)", "Salt & Pepper"],
        instructions: ["Whisk eggs with salt and pepper.", "Sauté vegetables in a pan until soft.", "Pour eggs over vegetables.", "Cook until edges set, then flip or fold.", "Add cheese if desired and melt."]
    },
    {
        name: "Cottage Cheese with Pineapple",
        calories: 150,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["1 cup Low-fat Cottage Cheese", "1/2 cup Pineapple chunks (fresh or canned in juice)", "Black Pepper"],
        instructions: ["Scoop cottage cheese into a bowl.", "Top with pineapple chunks.", "Sprinkle a little black pepper for a savory twist, or enjoy as is."]
    },
    {
        name: "Quinoa Breakfast Bowl",
        calories: 350,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["1/2 cup Cooked Quinoa", "1/2 cup Almond Milk", "1 tsp Honey", "Nuts & Dried Fruits", "Cinnamon"],
        instructions: ["Warm the quinoa with milk in a saucepan.", "Stir in honey and cinnamon.", "Transfer to a bowl and top with nuts and dried fruits."]
    },
    {
        name: "Hard Boiled Eggs & Fruit",
        calories: 200,
        type: 'breakfast',
        dietary: 'non-veg',
        ingredients: ["2 Large Eggs", "1 Apple or Orange", "Salt & Pepper"],
        instructions: ["Place eggs in a pot of water; bring to boil.", "Remove from heat, cover, and let sit for 10-12 minutes.", "Cool in ice water, peel, and season.", "Serve with fresh fruit on the side."]
    },
    {
        name: "Breakfast Burrito (Whole Wheat)",
        calories: 400,
        type: 'breakfast',
        dietary: 'non-veg',
        ingredients: ["1 Whole Wheat Tortilla", "2 Scrambled Eggs", "2 tbsp Black Beans", "Salsa", "Avocado slices"],
        instructions: ["Scramble the eggs in a pan.", "Warm the tortilla.", "Layer eggs, beans, salsa, and avocado in the center.", "Roll up tightly and serve."]
    },
    {
        name: "Tofu Scramble",
        calories: 250,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["1 block Firm Tofu (crumbled)", "1/2 tsp Turmeric", "1/4 cup Onions", "1/4 cup Spinach", "Nutritional Yeast (optional)"],
        instructions: ["Sauté onions in a pan.", "Add crumbled tofu and spices (turmeric gives the yellow color).", "Cook for 5-7 mins.", "Stir in spinach until wilted and serve."]
    },
    {
        name: "Smoked Salmon Bagel (Half)",
        calories: 300,
        type: 'breakfast',
        dietary: 'non-veg',
        ingredients: ["1/2 Whole Wheat Bagel", "1 tbsp Cream Cheese", "50g Smoked Salmon", "Capers", "Dill", "Lemon"],
        instructions: ["Toast the bagel half.", "Spread generous layer of cream cheese.", "Top with smoked salmon.", "Garnish with capers, fresh dill, and a squeeze of lemon."]
    },
    {
        name: "Egg Muffins",
        calories: 150,
        type: 'breakfast',
        dietary: 'non-veg',
        ingredients: ["2 Eggs", "Spinach", "Diced Tomato", "Cheese", "Salt & Pepper"],
        instructions: ["Preheat oven to 375°F (190°C).", "Whisk eggs with salt and pepper.", "Place veggies in a greased muffin tin.", "Pour eggs over veggies.", "Bake for 15-20 minutes until set."]
    },
    {
        name: "Granola with Almond Milk",
        calories: 300,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["1/2 cup Granola", "1 cup Almond Milk", "Sliced Banana"],
        instructions: ["Pour granola into a bowl.", "Add almond milk.", "Top with banana slices and enjoy."]
    },
    {
        name: "Baked Beans on Toast",
        calories: 350,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["1/2 can Baked Beans", "2 Slices Whole Grain Toast", "Butter (optional)"],
        instructions: ["Heat beans in a saucepan.", "Toast the bread slices.", "Butter the toast lightly if desired.", "Pour hot beans over the toast."]
    },
    {
        name: "Mushroom & Tomato Toast",
        calories: 200,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["1 Slice Sourdough Bread", "1/2 cup Mushrooms (sliced)", "1 Tomato (diced)", "Garlic", "Thyme"],
        instructions: ["Sauté mushrooms and tomatoes with minced garlic and thyme.", "Toast the bread.", "Pile the savory mixture on top of the toast."]
    },
    {
        name: "Berry Protein Shake",
        calories: 250,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["1 scoop Protein Powder (Vanilla)", "1 cup Water or Milk", "1/2 cup Mixed Berries", "Ice"],
        instructions: ["Combine all ingredients in a blender.", "Blend until smooth.", "Enjoy immediately for a post-workout breakfast."]
    },
    {
        name: "Apple & Walnut Salad",
        calories: 200,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["1 Apple (chopped)", "1/4 cup Walnuts", "1 tbsp Raisins", "Yogurt dressing"],
        instructions: ["Combine apples, walnuts, and raisins in a bowl.", "Toss with a spoonful of yogurt or lemon juice.", "Serve crisp."]
    },
    {
        name: "Shakshuka",
        calories: 350,
        type: 'breakfast',
        dietary: 'non-veg',
        ingredients: ["2 Eggs", "1 cup Tomato Sauce (spiced with cumin/paprika)", "1/4 Onion", "Bell Pepper", "Crusty Bread"],
        instructions: ["Sauté onions and peppers.", "Add tomato sauce and spices; simmer.", "Make wells in the sauce and crack eggs into them.", "Cover and cook until egg whites are set but yolks runny.", "Serve with bread."]
    },
    {
        name: "Poha with Peas",
        calories: 250,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["1.5 cups Poha (Flattened rice)", "1/4 cup Green Peas", "1 Onion", "Mustard seeds", "Curry leaves", "Turmeric"],
        instructions: ["Rinse poha and drain.", "Sauté mustard seeds, curry leaves, onions, and peas.", "Add turmeric and salt.", "Mix in poha gently and cook for 2 mins.", "Finish with lemon juice."]
    },
    {
        name: "Upma with Vegetables",
        calories: 250,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["1/2 cup Semolina (Rava)", "Mixed Veggies (Carrot, Peas)", "Mustard seeds", "Ginger", "Water"],
        instructions: ["Roast rava until fragrant; set aside.", "Sauté spices and veggies.", "Add water and bring to boil.", "Slowly stir in roasted rava to avoid lumps.", "Cover and cook until fluffy."]
    },
    {
        name: "Idli with Sambar",
        calories: 200,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["3 Idlis", "1 bowl Sambar (Lentil stew with veggies)", "Coconut Chutney"],
        instructions: ["Steam idli batter in molds for 10-12 mins.", "Warm the sambar.", "Dip idlis in sambar and serve with chutney."]
    },
    {
        name: "Dosa with Chutney",
        calories: 300,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["Dosa Batter", "Oil", "Coconut Chutney", "Sambar"],
        instructions: ["Spread batter thin on a hot griddle.", "Drizzle oil around edges.", "Cook until crisp and golden brown.", "Fold and serve hot with chutney."]
    },
    {
        name: "Besan Chilla",
        calories: 200,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["1 cup Gram Flour (Besan)", "Onion, Tomato, Green Chili (chopped)", "Ajwain (Carom seeds)", "Water"],
        instructions: ["Mix besan, veggies, ajwain, and water to smooth batter.", "Pour ladleful onto hot pan.", "Cook both sides with minimal oil until golden.", "Serve with mint chutney."]
    },
    {
        name: "Methi Thepla",
        calories: 250,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["Whole Wheat Flour", "Fresh Fenugreek (Methi) leaves", "Spices (Chili, Turmeric)", "Yogurt"],
        instructions: ["Knead a soft dough with flour, chopped methi, spices, and yogurt.", "Roll into thin discs.", "Cook on a tawa with a little oil until brown spots appear."]
    },
    {
        name: "Paneer Paratha (Low Oil)",
        calories: 350,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["Whole Wheat Dough", "Grated Paneer", "Green Chili", "Coriander", "Spices"],
        instructions: ["Mix grated paneer with spices.", "Stuff mixture into a dough ball.", "Roll out gently.", "Roast on a tawa until golden brown using minimal oil."]
    },
    {
        name: "Moong Dal Cheela",
        calories: 200,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["Soaked Moong Dal paste", "Ginger-Chili paste", "Cumin", "Hing (Asafoetida)"],
        instructions: ["Blend soaked dal with ginger/chili.", "Add spices.", "Spread batter on hot pan like a crepe.", "Cook until crisp and serve."]
    },
    {
        name: "Ragi Malt",
        calories: 150,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["2 tbsp Ragi Flour (Finger Millet)", "1 cup Milk or Water", "Jaggery", "Cardamom"],
        instructions: ["Mix ragi flour with water to avoid lumps.", "Cook on low heat until mixture thickens and looks glossy.", "Add warm milk, sweetener, and cardamom.", "Drink warm."]
    },
    {
        name: "Sprouted Moong Salad",
        calories: 150,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["1 cup Sprouted Moong Beans", "Cucumber", "Tomato", "Lemon Juice", "Chaat Masala"],
        instructions: ["Steam sprouts lightly if desired, or keep raw.", "Mix with chopped cucumber and tomato.", "Season with chaat masala and lemon juice."]
    },
    {
        name: "Masala Oats",
        calories: 250,
        type: 'breakfast',
        dietary: 'veg',
        ingredients: ["Rolled Oats", "Indian Spices (Maggi Masala style)", "Mixed Veggies", "Water"],
        instructions: ["Sauté veggies with spices.", "Add water and bring to boil.", "Add oats and cook until thick and savory."]
    },
    {
        name: "Egg Bhurji with Roti",
        calories: 350,
        type: 'breakfast',
        dietary: 'non-veg',
        ingredients: ["2 Eggs", "Onion, Tomato, Chili", "Spices", "1 Roti"],
        instructions: ["Sauté onion, tomato, and chili.", "Add whisked eggs and scramble vigorously.", "Season well.", "Serve with a hot roti."]
    },
    { name: "Fruit Salad with Honey", calories: 200, type: 'breakfast', dietary: 'veg', ingredients: ["Mix of Apple, Banana, Pomegranate, Kiwi", "1 tbsp Honey", "Lime juice"], instructions: ["Chop all fruits.", "Toss gently in a bowl.", "Drizzle honey and lime juice just before serving."] },
    { name: "Almond Butter Toast", calories: 300, type: 'breakfast', dietary: 'veg', ingredients: ["2 slices Multigrain Bread", "2 tbsp Almond Butter"], instructions: ["Toast the bread.", "Spread almond butter generously.", "Serve warm."] },
    { name: "Sautéed Mushrooms & Spinach", calories: 150, type: 'breakfast', dietary: 'veg', ingredients: ["Button Mushrooms", "Spinach", "Garlic", "Butter/Oil"], instructions: ["Melt butter in a pan.", "Sauté garlic and mushrooms until browned.", "Add spinach and cook until wilted.", "Season with salt and pepper."] },
    { name: "Greek Yogurt with Honey", calories: 200, type: 'breakfast', dietary: 'veg', ingredients: ["1 cup Greek Yogurt", "1 tbsp Honey", "Walnuts"], instructions: ["Add yogurt to a bowl.", "Swirl in the honey.", "Top with crushed walnuts."] },
    { name: "Papaya Bowl", calories: 100, type: 'breakfast', dietary: 'veg', ingredients: ["Ripe Papaya", "Lime Juice"], instructions: ["Cube the papaya.", "Squeeze lime juice over it.", "Serve chilled."] },
    { name: "Watermelon Wedge", calories: 80, type: 'breakfast', dietary: 'veg', ingredients: ["Fresh Watermelon"], instructions: ["Slice watermelon into wedges.", "Serve fresh."] },
    { name: "Breakfast Quinoa", calories: 300, type: 'breakfast', dietary: 'veg', ingredients: ["Quinoa", "Milk", "Brown Sugar", "Berries"], instructions: ["Cook quinoa in milk like oatmeal.", "Stir in brown sugar.", "Top with berries."] },
    { name: "Sweet Potato Hash", calories: 250, type: 'breakfast', dietary: 'veg', ingredients: ["1 Sweet Potato (diced)", "Onion", "Paprika"], instructions: ["Dice sweet potato small.", "Sauté with onions in oil until tender and crispy.", "Season with paprika."] },
    { name: "Turkey Bacon & Eggs", calories: 300, type: 'breakfast', dietary: 'non-veg', ingredients: ["2 slices Turkey Bacon", "2 Eggs"], instructions: ["Cook turkey bacon in a pan until crisp.", "Fry eggs in the same pan.", "Serve together."] },
    { name: "Ham & Cheese Omelette", calories: 350, type: 'breakfast', dietary: 'non-veg', ingredients: ["2 Eggs", "Diced Ham", "Cheddar Cheese"], instructions: ["Whisk eggs.", "Pour into pan.", "Add ham and cheese to one side.", "Fold and cook until cheese melts."] },
    { name: "Spinach & Feta Wrap", calories: 300, type: 'breakfast', dietary: 'veg', ingredients: ["Tortilla", "Spinach", "Feta Cheese", "Egg White"], instructions: ["Scramble egg whites with spinach.", "Place in tortilla with crumbled feta.", "Roll up and toast lightly."] },
    { name: "Blueberry Muffins (Healthy)", calories: 200, type: 'breakfast', dietary: 'veg', ingredients: ["Oat flour", "Blueberries", "Yogurt", "Honey"], instructions: ["Mix dry and wet ingredients.", "Fold in blueberries.", "Bake at 350°F for 20 mins."] },
    { name: "Zucchini Bread", calories: 200, type: 'breakfast', dietary: 'veg', ingredients: ["Grated Zucchini", "Whole Wheat Flour", "Cinnamon"], instructions: ["Squeeze water from zucchini.", "Mix batter.", "Bake in loaf pan until toothpick comes out clean."] },
    { name: "Carrot Cake Oatmeal", calories: 300, type: 'breakfast', dietary: 'veg', ingredients: ["Oats", "Grated Carrot", "Raisins", "Nutmeg"], instructions: ["Cook oats with grated carrot.", "Add spices and raisins.", "Top with a dollop of yogurt."] },
    { name: "Ricotta Cheese Toast", calories: 250, type: 'breakfast', dietary: 'veg', ingredients: ["Toast", "Ricotta Cheese", "Honey", "Pear slices"], instructions: ["Spread ricotta on warm toast.", "Top with pear slices.", "Drizzle honey."] },
    { name: "Peanut Butter Banana Smoothie", calories: 350, type: 'breakfast', dietary: 'veg', ingredients: ["Banana", "Peanut Butter", "Milk", "Ice"], instructions: ["Blend everything until smooth.", "Serve."] },
    { name: "Green Smoothie", calories: 200, type: 'breakfast', dietary: 'veg', ingredients: ["Spinach", "Apple", "Cucumber", "Water/Coconut Water"], instructions: ["Blend high speed until no leafy chunks remain.", "Drink fresh."] },
    { name: "Acai Bowl", calories: 350, type: 'breakfast', dietary: 'veg', ingredients: ["Acai packet", "Banana", "Berries", "Granola topping"], instructions: ["Blend acai and banana.", "Pour into bowl.", "Top with granola and berries."] },
    { name: "Bircher Muesli", calories: 300, type: 'breakfast', dietary: 'veg', ingredients: ["Oats", "Apple juice", "Yogurt", "Grated Apple"], instructions: ["Soak oats in juice/yogurt overnight.", "Mix in grated apple in the morning."] },
    { name: "French Toast", calories: 350, type: 'breakfast', dietary: 'veg', ingredients: ["Whole Wheat Bread", "Egg", "Milk", "Vanilla"], instructions: ["Dip bread in egg-milk mixture.", "Fry in butter until golden."] },
    { name: "Waffles (Protein)", calories: 300, type: 'breakfast', dietary: 'veg', ingredients: ["Protein Pancake Mix", "Water/Milk"], instructions: ["Mix batter.", "Cook in preheated waffle iron until crisp."] },
    { name: "Breakfast Pizza", calories: 300, type: 'breakfast', dietary: 'non-veg', ingredients: ["Pita bread", "Egg", "Cheese", "Salsa"], instructions: ["Top pita with salsa and cheese.", "Crack egg on top.", "Bake until egg sets."] },
    { name: "Huevos Rancheros", calories: 400, type: 'breakfast', dietary: 'non-veg', ingredients: ["Tortilla", "Fried Egg", "Black Beans", "Salsa"], instructions: ["Warm tortilla.", "Top with beans, egg, and warm salsa."] },
    { name: "Breakfast Tacos", calories: 350, type: 'breakfast', dietary: 'non-veg', ingredients: ["Small Tortillas", "Scrambled Eggs", "Cheese", "Salsa"], instructions: ["Fill tortillas with eggs and cheese.", "Top with salsa."] },
    { name: "Rice Porridge (Congee)", calories: 250, type: 'breakfast', dietary: 'veg', ingredients: ["Rice", "Water/Broth", "Ginger", "Scallions"], instructions: ["Simmer rice in excess liquid for 1 hour until broken down.", "Garnish with ginger and scallions."] },
    { name: "Miso Soup & Rice", calories: 300, type: 'breakfast', dietary: 'veg', ingredients: ["Miso paste", "Dashi/Veg stock", "Tofu", "Seaweed", "Rice"], instructions: ["Dissolve miso in warm stock (don't boil).", "Add tofu and seaweed.", "Serve with steamed rice."] },
    { name: "Tamago Kake Gohan", calories: 350, type: 'breakfast', dietary: 'non-veg', ingredients: ["Hot Rice", "Raw Egg (pasteurized)", "Soy Sauce"], instructions: ["Crack egg into piping hot rice.", "Vigorously stir until egg cooks slightly and becomes creamy.", "Add soy sauce."] },
    { name: "Grilled Tomatoes & Eggs", calories: 200, type: 'breakfast', dietary: 'non-veg', ingredients: ["Tomatoes", "Eggs", "Herbs"], instructions: ["Grill tomato halves.", "Serve alongside fried or poached eggs."] },
    { name: "Baked Avocado Eggs", calories: 300, type: 'breakfast', dietary: 'non-veg', ingredients: ["Avocado", "Egg"], instructions: ["Halve avocado and remove pit.", "Crack egg into the hole.", "Bake until white sets."] },
    { name: "Cloud Eggs", calories: 150, type: 'breakfast', dietary: 'non-veg', ingredients: ["Eggs"], instructions: ["Separate yolks and whites.", "Whip whites to stiff peaks and bake.", "Add yolk back to center and bake briefly."] },
    { name: "Frittata Slice", calories: 250, type: 'breakfast', dietary: 'non-veg', ingredients: ["Eggs", "Potatoes", "Veggies", "Cheese"], instructions: ["Cook potatoes and veggies.", "Pour eggs over.", "Finish cooking oven or stovetop.", "Slice."] },
    { name: "Breakfast Casserole", calories: 350, type: 'breakfast', dietary: 'non-veg', ingredients: ["Eggs", "Sausage", "Bread cubes", "Cheese"], instructions: ["Combine all in baking dish.", "Bake until puffed and golden."] },
    { name: "Yogurt & Granola Bar", calories: 200, type: 'breakfast', dietary: 'veg', ingredients: ["Yogurt", "Granola Bar"], instructions: ["Simple grab-and-go pairing."] },
    { name: "Hash Browns (Baked)", calories: 200, type: 'breakfast', dietary: 'veg', ingredients: ["Potatoes", "Oil", "Salt"], instructions: ["Shred potatoes.", "Bake in oven or air fryer until crisp."] },
    { name: "Corn Flakes & Milk", calories: 250, type: 'breakfast', dietary: 'veg', ingredients: ["Corn Flakes", "Milk"], instructions: ["Pour milk over cereal."] },
    { name: "Bran Flakes", calories: 200, type: 'breakfast', dietary: 'veg', ingredients: ["Bran flakes", "Milk", "Berries"], instructions: ["Pour milk over cereal.", "Add berries."] },
    { name: "Weetabix & Milk", calories: 200, type: 'breakfast', dietary: 'veg', ingredients: ["2 Weetabix", "Milk", "Sugar (opt)"], instructions: ["Serve with milk."] },
    { name: "Bagel with Cream Cheese", calories: 350, type: 'breakfast', dietary: 'veg', ingredients: ["Bagel", "Cream Cheese"], instructions: ["Slice and toast bagel.", "Smear with cream cheese."] },
    { name: "Croissant", calories: 250, type: 'breakfast', dietary: 'veg', ingredients: ["Croissant"], instructions: ["Serve warm with coffee."] },
    { name: "Scones (Fruit)", calories: 300, type: 'breakfast', dietary: 'veg', ingredients: ["Scone", "Butter/Jam"], instructions: ["Warm scone.", "Serve with butter."] },
    { name: "Banana Bread Slice", calories: 250, type: 'breakfast', dietary: 'veg', ingredients: ["Banana Bread"], instructions: ["Slice and serve."] },
    { name: "Pumpkin Bread", calories: 250, type: 'breakfast', dietary: 'veg', ingredients: ["Pumpkin Bread"], instructions: ["Slice and serve."] },
    { name: "Cinnamon Roll", calories: 300, type: 'breakfast', dietary: 'veg', ingredients: ["Cinnamon Roll"], instructions: ["Serve warm."] },
    { name: "Danish Pastry", calories: 350, type: 'breakfast', dietary: 'veg', ingredients: ["Danish"], instructions: ["Serve fresh."] },
    { name: "Breakfast Sandwich", calories: 400, type: 'breakfast', dietary: 'non-veg', ingredients: ["English Muffin", "Egg", "Sausage", "Cheese"], instructions: ["Assemble sandwich.", "Toast/heat until cheese melts."] },
    { name: "Sausage & Egg Muffin", calories: 400, type: 'breakfast', dietary: 'non-veg', ingredients: ["Muffin", "Sausage patty", "Egg"], instructions: ["Toasted muffin with sausage and egg."] },
    { name: "Bacon Sandwich", calories: 400, type: 'breakfast', dietary: 'non-veg', ingredients: ["Bread", "Bacon", "Butter/Sauce"], instructions: ["Fry bacon crisp.", "Sandwich between buttered bread."] },
    { name: "BLT", calories: 400, type: 'breakfast', dietary: 'non-veg', ingredients: ["Bacon", "Lettuce", "Tomato", "Mayo"], instructions: ["Toast bread.", "Layer ingredients.", "Slice."] },
    { name: "Grilled Cheese", calories: 400, type: 'breakfast', dietary: 'veg', ingredients: ["Bread", "Cheese", "Butter"], instructions: ["Butter outside of bread.", "Fill with cheese.", "Fry until golden and melted."] },
    { name: "Cheese Toastie", calories: 350, type: 'breakfast', dietary: 'veg', ingredients: ["Bread", "Cheese"], instructions: ["Toast bread with cheese in sandwich press."] },
    { name: "Beans on Toast with Cheese", calories: 400, type: 'breakfast', dietary: 'veg', ingredients: ["Beans", "Toast", "Grated Cheese"], instructions: ["Make beans on toast.", "Top with cheese while hot."] },
    { name: "Poached Eggs on Toast", calories: 300, type: 'breakfast', dietary: 'non-veg', ingredients: ["Eggs", "Toast", "Butter"], instructions: ["Poach eggs in simmering water.", "Serve on buttered toast."] },
    { name: "Eggs Benedict", calories: 500, type: 'breakfast', dietary: 'non-veg', ingredients: ["English Muffin", "Ham", "Poached Egg", "Hollandaise"], instructions: ["Toast muffin.", "Top with ham and egg.", "Drizzle hollandasie."] },
    { name: "Eggs Florentine", calories: 450, type: 'breakfast', dietary: 'non-veg', ingredients: ["English Muffin", "Spinach", "Poached Egg", "Hollandaise"], instructions: ["Same as Benedict but swap ham for wilted spinach."] },
    { name: "Eggs Royale", calories: 500, type: 'breakfast', dietary: 'non-veg', ingredients: ["English Muffin", "Smoked Salmon", "Poached Egg", "Hollandaise"], instructions: ["Same as Benedict but swap ham for salmon."] },
    { name: "Kippers", calories: 300, type: 'breakfast', dietary: 'non-veg', ingredients: ["Smoked Herring", "Butter", "Lemon"], instructions: ["Grill kippers with butter.", "Serve with lemon."] },
    { name: "Kedgeree", calories: 400, type: 'breakfast', dietary: 'non-veg', ingredients: ["Rice", "Smoked Haddock", "Egg", "Curry Powder"], instructions: ["Cook rice with spices and flaked fish.", "Top with quartered boiled eggs."] },
    { name: "Full English", calories: 600, type: 'breakfast', dietary: 'non-veg', ingredients: ["Eggs", "Bacon", "Sausage", "Beans", "Toast", "Tomato", "Mushroom"], instructions: ["Fry everything.", "Serve together."] },
    { name: "Continental Breakfast", calories: 400, type: 'breakfast', dietary: 'veg', ingredients: ["Rolls", "Jam", "Cheese slice", "Coffee"], instructions: ["Serve cold items with coffee."] },
    { name: "American Pancakes", calories: 500, type: 'breakfast', dietary: 'veg', ingredients: ["Pancakes", "Syrup", "Butter"], instructions: ["Stack pancakes.", "Drizzle syrup and butter."] },
    { name: "Belgian Waffle", calories: 400, type: 'breakfast', dietary: 'veg', ingredients: ["Waffle", "Berries", "Cream"], instructions: ["Serve warm waffle.", "Top with cream and berries."] },
    { name: "Crepes with Lemon", calories: 300, type: 'breakfast', dietary: 'veg', ingredients: ["Crepes", "Sugar", "Lemon"], instructions: ["Sprinkle sugar on crepe.", "Squeeze lemon.", "Fold."] },
    { name: "Galette", calories: 350, type: 'breakfast', dietary: 'veg', ingredients: ["Buckwheat Crepe", "Egg", "Cheese"], instructions: ["Cook galette.", "Fill center with egg/cheese.", "Fold edges."] },
    { name: "Pain au Chocolat", calories: 350, type: 'breakfast', dietary: 'veg', ingredients: ["Pastry"], instructions: ["Serve."] },
    { name: "Brioche Bun", calories: 250, type: 'breakfast', dietary: 'veg', ingredients: ["Brioche"], instructions: ["Serve."] },
    { name: "Choco Pops", calories: 300, type: 'breakfast', dietary: 'veg', ingredients: ["Chocolate cereal", "Milk"], instructions: ["Serve."] }];
export const LUNCH_OPTIONS: MealOption[] = [
    {
        name: "Grilled Chicken Salad",
        calories: 400,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Grilled Chicken Breast (sliced)", "Mixed Greens", "Cucumber", "Cherry Tomatoes", "Olive Oil", "Lemon Juice"],
        instructions: ["Toss greens, cucumber, and tomatoes in a bowl.", "Top with warm grilled chicken slices.", "Drizzle with olive oil and fresh lemon juice.", "Season with salt and pepper."]
    },
    {
        name: "Quinoa & Black Bean Bowl",
        calories: 450,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["1 cup Cooked Quinoa", "1/2 cup Black Beans", "Corn", "Avocado", "Cilantro Lime Dressing"],
        instructions: ["Layer quinoa, beans, and corn in a bowl.", "Top with sliced avocado.", "Drizzle with cilantro lime dressing and mix well."]
    },
    {
        name: "Turkey & Avocado Wrap",
        calories: 400,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Whole Wheat Tortilla", "Sliced Turkey Breast", "Avocado", "Spinach", "Mustard"],
        instructions: ["Spread mustard involved tortilla.", "Layer spinach, turkey, and avocado slices.", "Roll up tightly and cut in half."]
    },
    {
        name: "Lentil Soup with Roll",
        calories: 350,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["1 cup Brown Lentils (cooked)", "Carrot, Celery, Onion (diced)", "Vegetable Broth", "Whole Grain Roll"],
        instructions: ["Sauté veggies; add broth and lentils.", "Simmer for 20 mins until flavors meld.", "Serve hot with a roll for dipping."]
    },
    {
        name: "Tuna Niçoise Salad",
        calories: 400,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Canned Tuna", "Boiled Egg", "Green Beans (blanched)", "Potatoes (boiled)", "Olives", "Vinaigrette"],
        instructions: ["Arrange lettuce on a plate.", "Top with piles of tuna, quartered eggs, beans, potatoes, and olives.", "Drizzle with vinaigrette."]
    },
    {
        name: "Vegetable Stir Fry",
        calories: 350,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Broccoli, Bell Peppers, Carrots", "Soy Sauce", "Ginger & Garlic", "Sesame Oil", "Tofu or Edamame"],
        instructions: ["Heat oil in a wok.", "Stir fry ginger/garlic, then add hard veggies.", "Add sauce and protein.", "Cook until tender-crisp. Serve over rice or noodles if desired."]
    },
    {
        name: "Chickpea Curry & Rice",
        calories: 450,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Chickpeas (garbanzo beans)", "Onion-Tomato Masala", "Cumin, Coriander Powder", "Basmati Rice"],
        instructions: ["Cook the spice paste until fragrant.", "Add chickpeas and water; simmer.", "Serve hot over steamed basmati rice."]
    },
    {
        name: "Caesar Salad (Light Dressing)",
        calories: 350,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Romaine Lettuce", "Croutons", "Parmesan Cheese", "Yogurt-based Caesar Dressing", "Grilled Chicken (opt)"],
        instructions: ["Chop lettuce.", "Toss with dressing, croutons, and cheese.", "Add chicken for extra protein."]
    },
    {
        name: "Sushi Rolls (6 pcs)",
        calories: 400,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Sushi Rice", "Nori Sheets", "Fresh Salmon or Tuna", "Cucumber/Avocado", "Soy Sauce"],
        instructions: ["Spread rice on nori.", "Place fish and veggies in center.", "Roll tightly using a bamboo mat.", "Slice into 6 pieces."]
    },
    {
        name: "Falafel Pita Pocket",
        calories: 450,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Whole Wheat Pita", "3 Falafel balls", "Hummus", "Lettuce & Tomato", "Tahini Sauce"],
        instructions: ["Warm the pita.", "Spread hummus inside.", "Stuff with falafel and salad.", "Drizzle tahini on top."]
    },
    {
        name: "Caprese Salad",
        calories: 300,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Fresh Mozzarella", "Tomato slices", "Fresh Basil", "Balsamic Glaze", "Olive Oil"],
        instructions: ["Layer tomato and mozzarella slices.", "Tuck basil leaves in between.", "Drizzle with oil and balsamic."]
    },
    {
        name: "Grilled Fish Tacos",
        calories: 450,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Corn Tortillas", "White Fish (grilled)", "Cabbage Slaw", "Lime Crema"],
        instructions: ["Season and grill the fish.", "Warm tortillas.", "Assemble tacos with fish, slaw, and crema.", "Squeeze lime juice over."]
    },
    {
        name: "Spinach & Ricotta Ravioli",
        calories: 500,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Spinach Ravioli", "Marinara Sauce", "Parmesan"],
        instructions: ["Boil ravioli until they float.", "Drain and toss with warm marinara sauce.", "Garnish with parmesan."]
    },
    {
        name: "Minestrone Soup",
        calories: 300,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Vegetable Broth", "Beans", "Pasta", "Zucchini, Carrots, Spinach"],
        instructions: ["Simmer veggies in broth.", "Add beans and pasta.", "Cook until pasta is tender.", "Serve with a sprinkle of herbs."]
    },
    {
        name: "Chicken Pesto Pasta",
        calories: 500,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Penne Pasta", "Basil Pesto", "Grilled Chicken strips", "Cherry Tomatoes"],
        instructions: ["Cook pasta.", "Toss with pesto, chicken, and halved tomatoes.", "Serve warm or cold."]
    },
    {
        name: "Buddha Bowl",
        calories: 450,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Brown Rice", "Roasted Sweet Potato", "Chickpeas", "Kale", "Tahini Dressing"],
        instructions: ["Arrange all components in sections in a bowl.", "Drizzle generously with dressing."]
    },
    {
        name: "Greek Salad",
        calories: 350,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Cucumber", "Tomato", "Red Onion", "Kalamata Olives", "Feta Cheese block", "Oregano"],
        instructions: ["Chop veggies into large chunks.", "Top with a slab of feta and olives.", "Drizzle olive oil and sprinkle oregano."]
    },
    {
        name: "Burrito Bowl",
        calories: 550,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Cilantro Lime Rice", "Black Beans", "Grilled Chicken/Steak", "Salsa", "Guacamole"],
        instructions: ["Start with rice base.", "Top with protein, beans, and toppings.", "Mix and enjoy."]
    },
    {
        name: "Egg Salad Sandwich",
        calories: 400,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["2 Hard Boiled Eggs (chopped)", "Light Mayo/Yogurt", "Mustard", "Chives", "Whole Wheat Bread"],
        instructions: ["Mix eggs with mayo, mustard, and chives.", "Spread onto bread.", "Top with lettuce and close sandwich."]
    },
    {
        name: "Tomato Basil Soup",
        calories: 250,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Roasted Tomatoes", "Garlic", "Vegetable Broth", "Basil"],
        instructions: ["Blend roasted tomatoes with broth and garlic.", "Simmer for 10 mins.", "Stir in fresh basil strips."]
    },
    {
        name: "Rajma Chawal",
        calories: 450,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Red Kidney Beans (Rajma)", "Thick Tomato Gravy", "Spices", "Steamed Rice"],
        instructions: ["Pressure cook beans.", "Simmer in spicy onion-tomato gravy.", "Serve hot over rice."]
    },
    {
        name: "Chole Bhature (Small Portion)",
        calories: 600,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Chickpea Curry (Chole)", "Fried Bread (Bhatura)", "Pickle", "Onion rings"],
        instructions: ["Cook spicy chickpeas.", "Deep fry the dough bread.", "Serve together with sides."]
    },
    {
        name: "Palak Paneer with Roti",
        calories: 500,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Spinach Puree", "Paneer Cubes", "Cream/Yogurt", "Garlic", "Roti"],
        instructions: ["Sauté garlic, add spinach puree.", "Simmer with spices.", "Add paneer cubes.", "Serve with roti."]
    },
    {
        name: "Dal Makhani with Rice",
        calories: 500,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Whole Black Lentils", "Butter/Cream", "Tomato Puree", "Ginger-Garlic", "Rice"],
        instructions: ["Slow cook lentils overnight or for hours.", "Temper with butter and spices.", "Serve rich creamy dal with rice."]
    },
    {
        name: "Aloo Gobi with Roti",
        calories: 400,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Potatoes", "Cauliflower", "Turmeric", "Cumin", "Roti"],
        instructions: ["Stir fry potatoes and cauliflower with spices until tender.", "Garnish with coriander.", "Serve with roti."]
    },
    {
        name: "Bhindi Masala with Roti",
        calories: 350,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Okra (Bhindi)", "Onion", "Amchur (Mango powder)", "Roti"],
        instructions: ["Sauté okra with onions and spices.", "Cook until non-slimy and crisp.", "Serve with roti."]
    },
    {
        name: "Khichdi with Yogurt",
        calories: 350,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Rice", "Moong Dal", "Turmeric", "Ghee", "Yogurt"],
        instructions: ["Pressure cook rice and dal together with turmeric.", "Top with ghee.", "Serve with a side of yogurt."]
    },
    {
        name: "Curd Rice",
        calories: 300,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Soft Cooked Rice", "Yogurt", "Mustard seeds", "Curry leaves", "Pomegranate"],
        instructions: ["Mix rice and yogurt.", "Temper with mustard seeds and curry leaves in oil.", "Mix in.", "Garnish with pomegranate."]
    },
    {
        name: "Lemon Rice",
        calories: 400,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Rice", "Lemon Juice", "Turmeric", "Peanuts", "Curry Leaves"],
        instructions: ["Sauté peanuts and spices.", "Add turmeric and cooked rice.", "Turn off heat and mix in lemon juice."]
    },
    {
        name: "Vegetable Biryani",
        calories: 500,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Basmati Rice", "Mixed Vegetables", "Biryani Masala", "Saffron milk", "Fried Onions"],
        instructions: ["Layer partially cooked rice and spicy vegetable gravy.", "Top with saffron and onions.", "Dum cook (steam) on low heat for 20 mins."]
    },
    {
        name: "Chicken Curry with Rice",
        calories: 500,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Chicken pieces", "Onion-Tomato Gravy", "Garam Masala", "Rice"],
        instructions: ["Brown the chicken.", "Simmer in the gravy until tender.", "Serve with steamed rice."]
    },
    {
        name: "Fish Curry with Rice",
        calories: 450,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Fish fillets", "Coconut Milk/Tamarind Sauce", "Curry leaves", "Rice"],
        instructions: ["Simmer fish gently in the spicy/tangy sauce.", "Serve with rice to soak up the curry."]
    },
    {
        name: "Egg Curry with Roti",
        calories: 450,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Boiled Eggs", "Spicy Tomato Gravy", "Roti"],
        instructions: ["Make shallow cuts in boiled eggs.", "Simmer in thick gravy.", "Serve with roti."]
    },
    {
        name: "Sambar Rice",
        calories: 350,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Rice", "Sambar (Lentil Veg Stew)", "Ghee"],
        instructions: ["Mix hot rice and sambar liberally.", "Top with a drizzle of ghee.", "Serve with papad."]
    },
    {
        name: "Rasam Rice",
        calories: 300,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Rice", "Rasam (Pepper-Tomato broth)"],
        instructions: ["Pour hot rasam over rice.", "Mash slightly and eat comfortingly."]
    },
    {
        name: "Tamarind Rice",
        calories: 400,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Rice", "Tamarind paste", "Peanuts", "Sesame oil"],
        instructions: ["Mix cooked rice with spiced tamarind paste.", "Let sit for an hour for flavors to absorb."]
    },
    {
        name: "Veg Pulao",
        calories: 400,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Basmati Rice", "Peas, Carrots, Beans", "Whole Spices (Cardamom, Clove)"],
        instructions: ["Sauté whole spices and veggies.", "Add washed rice and water.", "Cook until fluffy."]
    },
    {
        name: "Mushroom Masala with Roti",
        calories: 400,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Mushrooms", "Onion-Tomato paste", "Kasuri Methi", "Roti"],
        instructions: ["Cook mushrooms in the masala gravy.", "Finish with dried fenugreek leaves.", "Serve with roti."]
    },
    {
        name: "Mattar Paneer with Rice",
        calories: 500,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Peas (Mattar)", "Paneer", "Tomato gravy", "Rice"],
        instructions: ["Simmer peas and paneer in the gravy.", "Service with cumin rice."]
    },
    {
        name: "Baingan Bharta with Roti",
        calories: 350,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Roasted Eggplant (Baingan)", "Onion, Tomato, Garlic", "Roti"],
        instructions: ["Mash roasted eggplant.", "Cook with sautéed onions and tomatoes.", "Smoky flavor is key. Serve with roti."]
    },
    {
        name: "Club Sandwich",
        calories: 500,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["3 slices Bread", "Chicken/Turkey", "Bacon", "Lettuce, Tomato, Mayo"],
        instructions: ["Toast bread.", "Layer meats and salad between slices.", "Cut into quarters."]
    },
    {
        name: "BLT Sandwich",
        calories: 450,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["See Breakfast"],
        instructions: ["Same as breakfast version."]
    },
    {
        name: "Chicken Mayo Sandwich",
        calories: 400,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Boiled Chicken (shredded)", "Mayonnaise", "Black Pepper", "Bread"],
        instructions: ["Mix chicken with mayo and pepper.", "Sandwich between bread slices."]
    },
    {
        name: "Tuna Melt",
        calories: 450,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Tuna Salad", "Cheese", "Bread"],
        instructions: ["Open faced sandwich with tuna salad.", "Top with cheese.", "Broil until melted."]
    },
    {
        name: "Reuben Sandwich",
        calories: 550,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Rye Bread", "Corned Beef", "Sauerkraut", "Swiss Cheese", "Russian Dressing"],
        instructions: ["Grill sandwich until cheese melts and bread is crispy."]
    },
    {
        name: "Philly Cheesesteak (Half)",
        calories: 500,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Hoagie Roll", "Thinly sliced Ribeye", "Provolone/Cheez Whiz", "Onions"],
        instructions: ["Sauté beef and onions.", "Melt cheese over meat.", "Stuff into roll."]
    },
    {
        name: "Meatball Sub (Half)",
        calories: 500,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Sub Roll", "Meatballs", "Marinara", "Mozzarella"],
        instructions: ["Fill roll with meatballs and sauce.", "Top with cheese.", "Toast until melted."]
    },
    {
        name: "Veggie Burger",
        calories: 450,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Veggie Patty (Bean/Soy)", "Bun", "Lettuce, Tomato, Onion"],
        instructions: ["Grill patty.", "Assemble burger with toppings."]
    },
    {
        name: "Chicken Burger",
        calories: 500,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Chicken Patty", "Bun", "Mayo", "Lettuce"],
        instructions: ["Cook patty.", "Assemble burger."]
    },
    {
        name: "Bean Burger",
        calories: 450,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Black Bean Patty", "Bun", "Avocado"],
        instructions: ["Grill patty.", "Serve on bun with avocado."]
    },
    {
        name: "Hot Dog",
        calories: 400,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Sausage", "Bun", "Mustard/Ketchup", "Onions"],
        instructions: ["Grill sausage.", "Place in bun.", "Add toppings."]
    },
    {
        name: "Slice of Pizza",
        calories: 300,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Pizza Dough", "Tomato Sauce", "Mozzarella", "Basil"],
        instructions: ["Bake pizza.", "Slice.", "Enjoy."]
    },
    {
        name: "Calzone (Small)",
        calories: 500,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Pizza Dough", "Ricotta", "Mozzarella", "Ham"],
        instructions: ["Fold dough over filling.", "Bake until golden."]
    },
    {
        name: "Mac & Cheese (Small)",
        calories: 500,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Macaroni", "Cheese Sauce (Cheddar/Bechamel)"],
        instructions: ["Cook pasta.", "Stir into cheese sauce."]
    },
    {
        name: "Spaghetti Bolognese (Small)",
        calories: 500,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Spaghetti", "Meat Sauce (Minced Beef/Tomato)"],
        instructions: ["Top cooked spaghetti with ragu."]
    },
    {
        name: "Lasagna (Small)",
        calories: 600,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Pasta Sheets", "Ragu", "Bechamel", "Cheese"],
        instructions: ["Layer components.", "Bake."]
    },
    {
        name: "Carbonara (Small)",
        calories: 600,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Spaghetti", "Egg Yolks", "Pecorino", "Guanciale/Bacon", "Pepper"],
        instructions: ["Fry meat.", "Toss hot pasta with egg/cheese mixture off heat to create creamy sauce."]
    },
    {
        name: "Arrabbiata Pasta",
        calories: 400,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Penne", "Tomato Sauce", "Chili Flakes", "Garlic"],
        instructions: ["Simmer sauce with plenty of chili.", "Toss with pasta."]
    },
    {
        name: "Aglio e Olio",
        calories: 450,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Spaghetti", "Olive Oil", "Garlic slices", "Chili flakes", "Parsley"],
        instructions: ["Sauté garlic in oil gently.", "Toss with pasta and pasta water to emulsify."]
    },
    {
        name: "Risotto (Mushroom)",
        calories: 500,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Arborio Rice", "Mushrooms", "Broth", "Parmesan", "Butter"],
        instructions: ["Cook rice slowly, adding broth ladle by ladle.", "Finish with butter and cheese."]
    },
    {
        name: "Gnocchi with Tomato Sauce",
        calories: 450,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Potato Gnocchi", "Tomato Sauce", "Mozzarella"],
        instructions: ["Boil gnocchi.", "Toss with sauce.", "Top with cheese."]
    },
    {
        name: "Pad Thai",
        calories: 500,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Rice Noodles", "Tamarind Sauce", "Peanuts", "Egg", "Shrimp/Chicken", "Bean Sprouts"],
        instructions: ["Stir fry noodles with protein and egg.", "Add sauce.", "Garnish with peanuts and lime."]
    },
    {
        name: "Green Curry with Rice",
        calories: 550,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Green Curry Paste", "Coconut Milk", "Bamboo Shoots", "Chicken", "Thai Basil"],
        instructions: ["Simmer paste and coconut milk.", "Add meat and veg.", "Serve with jasmine rice."]
    },
    {
        name: "Red Curry with Rice",
        calories: 550,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Red Curry Paste", "Coconut Milk", "Meat", "Veg"],
        instructions: ["Similar to Green Curry but with red chilies."]
    },
    {
        name: "Tom Yum Soup with Rice",
        calories: 350,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Lemongrass broth", "Shrimp", "Mushrooms", "Chili Paste"],
        instructions: ["Boil broth with herbs.", "Add shrimp.", "Serve tart and spicy with rice."]
    },
    {
        name: "Pho (Beef)",
        calories: 450,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Beef Bone Broth", "Rice Noodles", "Thin Beef slices", "Herbs"],
        instructions: ["Pour boiling broth over raw beef slices and noodles.", "Add plenty of herbs."]
    },
    {
        name: "Banh Mi",
        calories: 500,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Baguette", "Pâté", "Cold Cuts/Pork", "Pickled Carrots", "Cilantro", "Chili"],
        instructions: ["Slather baguette with pâté and mayo.", "Fill with meat and pickles."]
    },
    {
        name: "Summer Rolls",
        calories: 300,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Rice Paper", "Shrimp", "Vermicelli", "Herbs", "Peanut Dip"],
        instructions: ["Soak rice paper.", "Wrap filling tightly.", "Dip in peanut sauce."]
    },
    {
        name: "Ramen (Shoyu)",
        calories: 500,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Ramen Noodles", "Soy Broth", "Chashu Pork", "Egg", "Scallions"],
        instructions: ["Boil noodles.", "Place in hot broth.", "Top with pork and egg."]
    },
    {
        name: "Miso Ramen",
        calories: 550,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Ramen", "Miso Broth", "Corn", "Butter", "Pork"],
        instructions: ["Rich miso broth with noodles and toppings."]
    },
    {
        name: "Tonkotsu Ramen",
        calories: 600,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Ramen", "Pork Bone Broth (Cloudy)", "Pork Belly"],
        instructions: ["Creamy pork broth with thin noodles."]
    },
    {
        name: "Udon Noodle Soup",
        calories: 450,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Thick Udon Noodles", "Dashi Broth", "Tempura flakes", "Scallions"],
        instructions: ["Serve chewy noodles in clear broth."]
    },
    {
        name: "Soba Noodles",
        calories: 400,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Buckwheat Noodles", "Dipping Sauce (Tsuyu)"],
        instructions: ["Serve cold with dipping sauce or hot in broth."]
    },
    {
        name: "Tempura Don",
        calories: 600,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Rice Bowl", "Mixed Tempura (Shrimp/Veg)", "Sweet Soy Sauce"],
        instructions: ["Place crispy tempura over steaming rice.", "Drizzle sauce."]
    },
    {
        name: "Gyudon (Beef Bowl)",
        calories: 600,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Rice", "Thin Beef & Onions simmered in soy/dashi"],
        instructions: ["Pile simmering beef mixture onto rice."]
    },
    {
        name: "Katsudon",
        calories: 700,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Rice", "Pork Cutlet (Tonkatsu)", "Egg", "Onion broth"],
        instructions: ["Simmer cutlet with egg and onions.", "Slide onto rice."]
    },
    {
        name: "Oyakodon (Chicken & Egg)",
        calories: 550,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Rice", "Chicken", "Egg", "Onions"],
        instructions: ["Similar to Katsudon but with chicken thigh."]
    },
    {
        name: "Bibimbap",
        calories: 550,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Rice", "Assorted Sautéed Veggies (Namul)", "Beef", "Fried Egg", "Gochujang"],
        instructions: ["Arrange veggies colorfully on rice.", "Top with egg.", "Mix with spicy paste before eating."]
    },
    {
        name: "Kimchi Stew with Rice",
        calories: 400,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Aged Kimchi", "Pork belly/Tuna", "Tofu", "Broth"],
        instructions: ["Boil kimchi and meat vigorously.", "Serve with rice."]
    },
    {
        name: "Bulgogi with Rice",
        calories: 500,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Marinated Beef slices", "Onions", "Carrots", "Rice"],
        instructions: ["Stir fry marinated meat.", "Serve sizzling with rice."]
    },
    {
        name: "Japchae",
        calories: 450,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Sweet Potato Starch Noodles", "Spinach", "Mushrooms", "Soy Sesame Sauce"],
        instructions: ["Stir fry shiny glass noodles with veggies."]
    },
    {
        name: "Mandu (Dumplings)",
        calories: 400,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Dumplings (Pork/Veg)", "Dipping sauce"],
        instructions: ["Steam or fry dumplings."]
    },
    {
        name: "Tteokbokki",
        calories: 500,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Rice Cakes", "Fish Cakes", "Spicy Gochujang Sauce"],
        instructions: ["Simmer rice cakes in spicy sauce until chewy and soft."]
    },
    {
        name: "Kimbap",
        calories: 400,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Rice", "Seaweed", "Pickled Radish", "Ham/Egg/Spinach"],
        instructions: ["Roll ingredients in seaweed.", "Slice.", "Sesame oil on top."]
    },
    {
        name: "Fried Rice",
        calories: 500,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Cold Rice", "Egg", "Peas/Carrots", "Soy Sauce"],
        instructions: ["Wok fry rice with ingredients on high heat."]
    },
    {
        name: "Chow Mein",
        calories: 500,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Egg Noodles", "Meat/Veg", "Soy Sauce"],
        instructions: ["Stir fry noodles."]
    },
    {
        name: "Lo Mein",
        calories: 500,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Soft Noodles", "Sauce"],
        instructions: ["Tossed noodles (not fried crispy)."]
    },
    {
        name: "Sweet & Sour Chicken with Rice",
        calories: 600,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Battered Chicken", "Sweet/Sour Sauce", "Pineapple", "Peppers", "Rice"],
        instructions: ["Toss fried chicken in sauce.", "Serve with rice."]
    },
    {
        name: "Kung Pao Chicken with Rice",
        calories: 600,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Chicken", "Peanuts", "Chilies", "Rice"],
        instructions: ["Spicy stir fry with peanuts."]
    },
    {
        name: "Beef & Broccoli with Rice",
        calories: 550,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Beef", "Broccoli", "Oyster Sauce", "Rice"],
        instructions: ["Stir fry beef and broccoli."]
    },
    {
        name: "Mapo Tofu with Rice",
        calories: 500,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Soft Tofu", "Minced Pork", "Sichuan Peppercorns", "Chili Bean Paste", "Rice"],
        instructions: ["Simmer tofu in spicy numbing sauce."]
    },
    {
        name: "Wonton Soup",
        calories: 300,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Wontons", "Clear Broth", "Bok Choy"],
        instructions: ["Serve dumplings in broth."]
    },
    {
        name: "Dim Sum Platter",
        calories: 500,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Dumplings", "Buns"],
        instructions: ["Assortment of steamed snacks."]
    },
    {
        name: "Peking Duck Pancake (2)",
        calories: 400,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Duck skin/meat", "Pancakes", "Hoisin Sauce", "Scallion", "Cucumber"],
        instructions: ["Wrap duck and veggies in pancake with sauce."]
    },
    {
        name: "Spring Rolls (3)",
        calories: 300,
        type: 'lunch',
        dietary: 'veg',
        ingredients: ["Wrapper", "Cabbage/Carrot filling"],
        instructions: ["Deep fry."]
    },
    {
        name: "Egg Foo Young",
        calories: 450,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Omelette with gravy"],
        instructions: ["Fried egg patty with thick gravy."]
    },
    {
        name: "Lemon Chicken with Rice",
        calories: 600,
        type: 'lunch',
        dietary: 'non-veg',
        ingredients: ["Battered Chicken", "Lemon Glaze"],
        instructions: ["Serve with tangy sauce."]
    },
];
export const DINNER_OPTIONS: MealOption[] = [
    {
        name: "Baked Salmon with Asparagus",
        calories: 500,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Salmon Fillet", "Asparagus spears", "Lemon", "Garlic", "Olive Oil", "Dill"],
        instructions: ["Place salmon and asparagus on a baking sheet.", "Drizzle with oil, garlic, and dill.", "Bake at 400°F (200°C) for 12-15 mins.", "Serve with lemon wedges."]
    },
    {
        name: "Roast Chicken with Vegetables",
        calories: 550,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Chicken Thigh/Breast", "Potatoes", "Carrots", "Rosemary", "Olive Oil"],
        instructions: ["Toss chicken and chopped veggies in oil and rosemary.", "Roast in oven at 375°F (190°C) for 45 mins until golden and cooked through."]
    },
    {
        name: "Lean Steak with Sweet Potato",
        calories: 600,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Lean Sirloin Steak", "Sweet Potato", "Broccoli", "Steak Rub"],
        instructions: ["Rub steak with spices and grill to desired doneness.", "Bake or mash sweet potato.", "Serve with steamed broccoli."]
    },
    {
        name: "Tofu Stir Fry",
        calories: 450,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Firm Tofu (pressed)", "Mixed Bell Peppers", "Snap Peas", "Soy Sauce", "Ginger", "Sesame Oil"],
        instructions: ["Cube tofu and pan-fry until golden.", "Remove tofu.", "Stir fry veggies with ginger.", "Return tofu to pan and toss with sauce."]
    },
    {
        name: "Vegetable Lasagna (Light)",
        calories: 500,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Zucchini Slices (as noodles)", "Ricotta Cheese", "Marinara Sauce", "Spinach", "Mozzarella"],
        instructions: ["Layer zucchini strips, cheese mixture, and sauce in a baking dish.", "Top with mozzarella.", "Bake until bubbly and cheese is melted."]
    },
    {
        name: "Grilled Shrimp Skewers",
        calories: 400,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Shrimp (peeled)", "Bell Peppers", "Red Onion", "Lemon Garlic Marinade"],
        instructions: ["Thread shrimp and veggies onto skewers.", "Brush with marinade.", "Grill for 3-4 mins per side until pink."]
    },
    {
        name: "Zucchini Noodles with Pesto",
        calories: 350,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Zocchini (spiralized)", "Basil Pesto", "Cherry Tomatoes", "Pine Nuts"],
        instructions: ["Sauté zoodles briefly in a pan.", "Toss with pesto off heat.", "Top with tomatoes and pine nuts."]
    },
    {
        name: "Stuffed Bell Peppers",
        calories: 450,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Bell Peppers", "Cooked Rice", "Black Beans", "Corn", "Cheese", "Salsa"],
        instructions: ["Cut tops off peppers and remove seeds.", "Mix rice, beans, corn, and salsa.", "Stuff peppers.", "Bake at 375°F for 30 mins. Top with cheese in last 5 mins."]
    },
    {
        name: "Chicken Fajitas",
        calories: 550,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Chicken Breast strips", "Bell Peppers", "Onions", "Tortillas", "Fajita Seasoning"],
        instructions: ["Sauté chicken and veggies with seasoning.", "Serve hot with warm tortillas and salsa."]
    },
    {
        name: "Beef Stew",
        calories: 500,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Beef Chuck (cubed)", "Potatoes", "Carrots", "Beef Broth", "Thyme", "Red Wine (opt)"],
        instructions: ["Brown beef.", "Add veggies and liquid.", "Simmer low and slow for 2-3 hours until meat is tender."]
    },
    {
        name: "Lamb Chops with Salad",
        calories: 600,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Lamb Chops", "Rosemary", "Garlic", "Mixed Green Salad"],
        instructions: ["Marinate chops with rosemary and garlic.", "Pan sear to medium-rare.", "Serve with a fresh crisp salad."]
    },
    {
        name: "Cod with Lemon Butter",
        calories: 450,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Cod Fillet", "Butter", "Lemon Juice", "Parsley", "Green Beans"],
        instructions: ["Pan fry cod in butter.", "Squeeze lemon juice in the pan sauce.", "Spoon over fish.", "Serve with green beans."]
    },
    {
        name: "Mushroom Risotto",
        calories: 550,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Arborio Rice", "Mushrooms", "Vegetable Broth", "Parmesan Cheese", "White Wine (opt)"],
        instructions: ["Sauté mushrooms.", "Cook rice adding broth slowly while stirring.", "Finish with plenty of parmesan."]
    },
    {
        name: "Turkey Meatballs & Zoodles",
        calories: 450,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Ground Turkey", "Breadcrumbs", "Egg", "Zucchini Noodles", "Tomato Sauce"],
        instructions: ["Form meatballs and bake.", "Simmer sauce.", "Toss zoodles in sauce and top with meatballs."]
    },
    {
        name: "Eggplant Parmesan",
        calories: 500,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Eggplant slices", "Breadcrumbs", "Marinara", "Mozzarella", "Parmesan"],
        instructions: ["Bread and bake eggplant slices.", "Layer with sauce and cheese.", "Bake until bubbly."]
    },
    {
        name: "Shepherd's Pie",
        calories: 600,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Ground Lamb/Beef", "Peas & Carrots", "Mashed Potatoes", "Gravy"],
        instructions: ["Cook meat mixture.", "Spread in dish.", "Top with mash.", "Bake until golden."]
    },
    {
        name: "Fish & Chips (Baked)",
        calories: 550,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["White Fish", "Breadcrumbs", "Potatoes (wedges)", "Tartar Sauce"],
        instructions: ["Coat fish in crumbs.", "Cut potatoes into wedges.", "Bake both until crispy."]
    },
    {
        name: "Chili con Carne",
        calories: 500,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Ground Beef", "Kidney Beans", "Tomatoes", "Chili Powder", "Cumin"],
        instructions: ["Brown beef.", "Add spices, beans, and tomatoes.", "Simmer for hour."]
    },
    {
        name: "Veggie Korma",
        calories: 500,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Mixed Veggies", "Coconut Milk", "Cashew Paste", "Mild Curry Spices", "Rice"],
        instructions: ["Simmer veggies in creamy coconut-cashew sauce.", "Serve mild and sweet with rice."]
    },
    {
        name: "Paneer Tikka Masala",
        calories: 550,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Paneer Cubes", "Yogurt Marinade", "Spicy Tomato Cream Sauce", "Naan"],
        instructions: ["Marinate and grill paneer.", "Simmer in masala sauce.", "Serve with naan."]
    },
    {
        name: "Butter Chicken with Naan",
        calories: 700,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Chicken Tandoori", "Butter", "Cream", "Tomato Gravy", "Naan"],
        instructions: ["Cook chicken in rich buttery tomato gravy.", "Serve with hot naan."]
    },
    {
        name: "Chicken Tikka with Salad",
        calories: 450,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Chicken Chunks", "Yogurt Spices", "Lemon", "Salad greens"],
        instructions: ["Marinate chicken in yogurt/spices.", "Grill/Bake.", "Serve with salad and mint chutney."]
    },
    {
        name: "Malai Kofta",
        calories: 600,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Potato-Paneer Balls (Kofta)", "Cashew Cream Gravy"],
        instructions: ["Fry koftas.", "Simmer rich white gravy.", "Add koftas just before serving."]
    },
    {
        name: "Kadai Paneer",
        calories: 550,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Paneer", "Bell Peppers", "Kadai Masala", "Tomatoes"],
        instructions: ["Sauté peppers and tomatoes.", "Add fresh ground spices.", "Toss paneer."]
    },
    {
        name: "Dum Aloo",
        calories: 500,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Baby Potatoes", "Yogurt Gravy", "Fennel Powder"],
        instructions: ["Fry potatoes.", "Simmer in spiced yogurt gravy."]
    },
    {
        name: "Navratan Korma",
        calories: 600,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["9 Jewels (Veggies/Fruits/Nuts)", "Creamy Sauce"],
        instructions: ["Cook veggies and fruits in sweet creamy sauce."]
    },
    {
        name: "Methi Malai Matar",
        calories: 550,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Methi (Fenugreek)", "Peas", "Cream", "Cashews"],
        instructions: ["Creamy curry with bitterness of methi and sweetness of peas."]
    },
    {
        name: "Sarson Ka Saag & Makki Roti",
        calories: 500,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Mustard Greens (Sarson)", "Maize Flour Roti", "Butter"],
        instructions: ["Slow cook greens.", "Serve with cornmeal flatbread and white butter."]
    },
    {
        name: "Fish Curry (Goan)",
        calories: 500,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Fish", "Coconut", "Red Chilies", "Tamarind"],
        instructions: ["Spicy and tangy coconut curry."]
    },
    {
        name: "Prawn Masala",
        calories: 450,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Prawns", "Onion Tomato Masala", "Spices"],
        instructions: ["Quick stir fry of prawns in spicy paste."]
    },
    {
        name: "Crab Curry",
        calories: 500,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Crab", "Spices", "Coconut sauce"],
        instructions: ["Simmer crab in shell in thick curry."]
    },
    {
        name: "Chicken Chettinad",
        calories: 600,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Chicken", "Roast Spices (Black Pepper/Fennel)", "Curry Leaves"],
        instructions: ["Spicy pepper chicken curry."]
    },
    {
        name: "Lamb Rogan Josh",
        calories: 650,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Lamb", "Kashmiri Chili", "Yogurt", "Spices"],
        instructions: ["Slow cooked lamb in red gravy."]
    },
    {
        name: "Vindaloo (Pork/Chicken)",
        calories: 600,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Meat", "Vinegar", "Garlic", "Chili"],
        instructions: ["Very spicy and tangy curry."]
    },
    {
        name: "Hyderabadi Biryani",
        calories: 700,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Basmati Rice", "Marinated Meat", "Saffron", "Fried Onions"],
        instructions: ["Layer raw meat and semi-cooked rice.", "Dum cook sealed."]
    },
    {
        name: "Kashmir Pulao",
        calories: 500,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Rice", "Fruits (Apple/Pomegranate)", "Nuts", "Saffron"],
        instructions: ["Sweet and savory rice dish."]
    },
    {
        name: "Jeera Rice & Dal",
        calories: 450,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Cumin Rice", "Yellow Dal Tadka"],
        instructions: ["Simple comfort food."]
    },
    {
        name: "Chapati & Sabzi",
        calories: 400,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Whole Wheat Roti", "Seasonal Veggie Stir Fry"],
        instructions: ["Daily staple."]
    },
    {
        name: "Bhakri & Pitla",
        calories: 450,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Sorghum/Millet Bread", "Gram Flour Curry (Pitla)", "Thecha (Chili Garlic Paste)"],
        instructions: ["Rustic Maharashtrian meal."]
    },
    {
        name: "Litti Chokha",
        calories: 500,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Wheat balls stuffed with Sattu (Litti)", "Mashed Eggplant/Potato (Chokha)", "Ghee"],
        instructions: ["Roast litti over coals.", "Dip in ghee.", "Serve with mash."]
    },
    {
        name: "Dal Baati Churma (Small)",
        calories: 700,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Hard Wheat Rolls (Baati)", "Panchmel Dal", "Sweet Crumble (Churma)"],
        instructions: ["Crush baati, pour dal and ghee."]
    },
    {
        name: "Dhokla (Light Dinner)",
        calories: 300,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Steamed Gram Flour Cake", "Mustard Tempering"],
        instructions: ["Serve light and fluffy."]
    },
    {
        name: "Handvo",
        calories: 350,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Rice/Lentil Batter", "Bottle Gourd", "Sesame Seeds"],
        instructions: ["Savory baked/pan-fried cake."]
    },
    {
        name: "Thali (Mini)",
        calories: 600,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Roti", "Rice", "Dal", "Sabzi", "Salad", "Sweet"],
        instructions: ["Complete balanced meal on a plate."]
    },
    {
        name: "Grilled Pork Chops",
        calories: 600,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Pork Chops", "Apple Sauce", "Green Beans"],
        instructions: ["Grill chops.", "Serve with sweet apple sauce."]
    },
    {
        name: "BBQ Ribs (Small)",
        calories: 700,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Pork Ribs", "BBQ Sauce", "Coleslaw"],
        instructions: ["Slow roast ribs.", "Slather in sauce."]
    },
    {
        name: "Pulled Pork Sandwich",
        calories: 600,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Slow cooked pork shoulder", "Bun", "BBQ Sauce"],
        instructions: ["Shred meat.", "Serve on bun."]
    },
    {
        name: "Brisket with Slaw",
        calories: 650,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Beef Brisket", "Rub", "Coleslaw"],
        instructions: ["Smoke brisket for hours.", "Slice thin."]
    },
    {
        name: "Fried Chicken (1 pc) & Salad",
        calories: 500,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Chicken piece", "Flour spice mix", "Oil", "Salad"],
        instructions: ["Deep fry chicken.", "Serve with light salad."]
    },
    {
        name: "Chicken Pot Pie",
        calories: 600,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Pastry Crust", "Chicken Cream Filling", "Peas/Carrots"],
        instructions: ["Bake pie until golden."]
    },
    {
        name: "Meatloaf with Mash",
        calories: 600,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Ground Beef mixture", "Mashed Potatoes", "Gravy"],
        instructions: ["Bake loaf.", "Serve with mash."]
    },
    {
        name: "Salisbury Steak",
        calories: 600,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Beef Patties", "Mushroom Gravy", "Mash"],
        instructions: ["Simmer patties in gravy."]
    },
    {
        name: "Stroganoff (Beef)",
        calories: 650,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Beef strips", "Mushroom Cream Sauce", "Egg Noodles"],
        instructions: ["Sauté beef and mushrooms.", "Add sour cream.", "Serve over noodles."]
    },
    {
        name: "Goulash",
        calories: 550,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Beef", "Paprika", "Onions", "Potatoes"],
        instructions: ["Hearty paprika stew."]
    },
    {
        name: "Schnitzel with Salad",
        calories: 600,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Breaded Pork/Chicken Cutlet", "Lemon", "Potato Salad"],
        instructions: ["Shallow fry cutlet.", "Serve with lemon."]
    },
    {
        name: "Bratwurst & Sauerkraut",
        calories: 550,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Sausage", "Fermented Cabbage", "Mustard"],
        instructions: ["Grill brat.", "Serve with kraut."]
    },
    {
        name: "Pierogi (Boiled)",
        calories: 450,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Dumplings (Potato/Cheese)", "Sour Cream", "Onions"],
        instructions: ["Boil dumplings.", "Serve with sautéed onions."]
    },
    {
        name: "Cabbage Rolls",
        calories: 400,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Cabbage Leaves", "Meat Rice Filling", "Tomato Sauce"],
        instructions: ["Roll filling in leaves.", "Bake in sauce."]
    },
    {
        name: "Moussaka",
        calories: 600,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Eggplant", "Meat Sauce", "Bechamel", "Potatoes"],
        instructions: ["Layer and bake like lasagna."]
    },
    {
        name: "Souvlaki Platter",
        calories: 550,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Skewered Meat", "Pita", "Tzatziki", "Salad"],
        instructions: ["Grill skewers.", "Serve with sides."]
    },
    {
        name: "Gyro Plate",
        calories: 600,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Rotisserie Meat", "Pita", "Fries", "Tzatziki"],
        instructions: ["Shave meat.", "Serve."]
    },
    {
        name: "Spanakopita",
        calories: 450,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Phyllo Pastry", "Spinach Feta Filling"],
        instructions: ["Bake spinach pie."]
    },
    {
        name: "Paella (Seafood)",
        calories: 600,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Rice", "Saffron", "Seafood Mix", "Peas"],
        instructions: ["Simmer rice and seafood in pan."]
    },
    {
        name: "Gazpacho & Bread",
        calories: 350,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Cold Tomato Vegetable Soup", "Crusty Bread"],
        instructions: ["Blend raw veggies.", "Chill.", "Serve."]
    },
    {
        name: "Tortilla Española",
        calories: 400,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Eggs", "Potatoes", "Onions", "Olive Oil"],
        instructions: ["Thick potato omelette.", "Serve slice."]
    },
    {
        name: "Tapas Platter",
        calories: 500,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Olives", "Cheese", "Cured Meats"],
        instructions: ["Assortment of small bites."]
    },
    {
        name: "Tagine (Lamb/Chicken)",
        calories: 600,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Meat", "Dried Fruits (Apricots/Prunes)", "Spices", "Couscous"],
        instructions: ["Slow cooked sweet and savory stew."]
    },
    {
        name: "Couscous with Veggies",
        calories: 450,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Couscous", "Roasted Vegetables", "Chickpeas"],
        instructions: ["Fluff couscous.", "Top with veggies."]
    },
    {
        name: "Harira Soup",
        calories: 400,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Lentils", "Chickpeas", "Tomato", "Meat", "Noodles"],
        instructions: ["Hearty soup.", "Serve with dates."]
    },
    {
        name: "Shish Kebab",
        calories: 500,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Marinated Meat cubes", "Rice/Bread"],
        instructions: ["Grill skewers."]
    },
    {
        name: "Kofte with Rice",
        calories: 550,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Spiced Meat Patties", "Rice", "Salad", "Yogurt Sauce"],
        instructions: ["Grill patties."]
    },
    {
        name: "Lahmacun",
        calories: 450,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Thin Flatbread", "Minced Meat Topping", "Lemon"],
        instructions: ["Bake thin pizza.", "Roll up with salad and lemon."]
    },
    {
        name: "Pide (Turkish Pizza)",
        calories: 600,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Boat shaped dough", "Meat/Cheese filling"],
        instructions: ["Bake."]
    },
    {
        name: "Fattoush Salad with Chicken",
        calories: 400,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Greens", "Fried Pita chips", "Sumac dressing", "Chicken"],
        instructions: ["Toss salad with crispy bread."]
    },
    {
        name: "Tabbouleh & Hummus",
        calories: 400,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Bulgur", "Parsley", "Mint", "Tomato", "Hummus", "Pita"],
        instructions: ["Fresh herb salad with dip."]
    },
    {
        name: "Shawarma Plate",
        calories: 600,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Chicken/Beef shavings", "Garlic Sauce", "Pickles", "Fries"],
        instructions: ["Serve meat with garlic sauce."]
    },
    {
        name: "Mansaf",
        calories: 700,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Lamb", "Rice", "Fermented Yogurt Sauce", "Flatbread"],
        instructions: ["Serve lamb on rice with sauce."]
    },
    {
        name: "Kabsa",
        calories: 650,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Spiced Rice", "Chicken/Lamb", "Dried Lime"],
        instructions: ["One pot rice and meat dish."]
    },
    {
        name: "Mandi",
        calories: 650,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Smoked Rice", "Tandoor Meat"],
        instructions: ["Serve smoky rice with tender meat."]
    },
    {
        name: "Borscht with Sour Cream",
        calories: 350,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Beets", "Cabbage", "Potatoes", "Sour Cream", "Dill"],
        instructions: ["Simmer beet soup.", "Serve with dollop of cream."]
    },
    {
        name: "Pelmeni",
        calories: 450,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Meat Dumplings", "Butter/Vinegar/Sour Cream"],
        instructions: ["Boil dumplings.", "Toss in butter."]
    },
    {
        name: "Fondue (Cheese) - Small",
        calories: 700,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Melted Cheese", "Bread cubes"],
        instructions: ["Dip bread in cheese."]
    },
    {
        name: "Raclette - Small",
        calories: 700,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Raclette Cheese", "Potatoes", "Pickles"],
        instructions: ["Melt cheese over boiled potatoes."]
    },
    {
        name: "Rosti with Egg",
        calories: 500,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Grated Potato Cake", "Fried Egg"],
        instructions: ["Fry potato pancake.", "Top with egg."]
    },
    {
        name: "Tartiflette - Small",
        calories: 700,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Potatoes", "Reblochon Cheese", "Lardons", "Onion"],
        instructions: ["Bake cheesy potato gratin."]
    },
    {
        name: "Cassoulet",
        calories: 700,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["White Beans", "Duck Confit", "Sausage"],
        instructions: ["Slow cook bean stew."]
    },
    {
        name: "Coq au Vin",
        calories: 600,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Chicken", "Red Wine", "Mushrooms", "Bacon", "Onions"],
        instructions: ["Braise chicken in wine."]
    },
    {
        name: "Boeuf Bourguignon",
        calories: 600,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Beef", "Red Wine", "Mushrooms", "Onions"],
        instructions: ["Braise beef in wine."]
    },
    {
        name: "Ratatouille",
        calories: 350,
        type: 'dinner',
        dietary: 'veg',
        ingredients: ["Eggplant", "Zucchini", "Peppers", "Tomatoes"],
        instructions: ["Stew summer vegetables."]
    },
    {
        name: "Bouillabaisse",
        calories: 500,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Fish Stew", "Saffron", "Rouille (Sauce)"],
        instructions: ["Simmer various fish.", "Serve with croutons."]
    },
    {
        name: "Quiche Lorraine",
        calories: 550,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Pastry", "Eggs", "Cream", "Bacon"],
        instructions: ["Bake savory tart."]
    },
    {
        name: "Duck Confit",
        calories: 700,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Duck Leg preserved in fat", "Potatoes"],
        instructions: ["Crisp up duck leg skin.", "Serve with potatoes."]
    },
    {
        name: "Steak Frites",
        calories: 800,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Steak", "French Fries", "Bearnaise Sauce"],
        instructions: ["Grill steak.", "Serve with fries."]
    },
    {
        name: "Moules Frites",
        calories: 600,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Mussels", "White Wine", "Fries"],
        instructions: ["Steam mussels.", "Serve with fries."]
    },
    {
        name: "Escargots",
        calories: 300,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Snails", "Garlic Butter", "Parsley"],
        instructions: ["Bake snails in butter."]
    },
    {
        name: "Frog Legs",
        calories: 400,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Frog Legs", "Garlic", "Butter"],
        instructions: ["Sauté until golden."]
    },
    {
        name: "Foie Gras (Small)",
        calories: 500,
        type: 'dinner',
        dietary: 'non-veg',
        ingredients: ["Foie Gras", "Toast", "Fig Jam"],
        instructions: ["Sear briefly.", "Serve on toast."]
    },
];
export const SNACK_OPTIONS: MealOption[] = [
    {
        name: "Apple Slices with Peanut Butter",
        calories: 200,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Apple", "Peanut Butter"],
        instructions: ["Slice apple.", "Dip in peanut butter."]
    },
    {
        name: "Greek Yogurt with Honey",
        calories: 150,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Greek Yogurt", "Honey", "Walnuts (opt)"],
        instructions: ["Drizzle honey over yogurt.", "Top with nuts if desired."]
    },
    {
        name: "Carrot Sticks with Hummus",
        calories: 150,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Carrots", "Hummus"],
        instructions: ["Cut carrots into sticks.", "Dip in hummus."]
    },
    {
        name: "Almonds (Handful)",
        calories: 160,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Raw Almonds"],
        instructions: ["Enjoy straight from the bag."]
    },
    {
        name: "Protein Bar",
        calories: 200,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Protein Bar"],
        instructions: ["Unwrap and eat."]
    },
    {
        name: "Hard Boiled Egg",
        calories: 70,
        type: 'snack',
        dietary: 'non-veg',
        ingredients: ["Egg", "Salt", "Pepper"],
        instructions: ["Boil egg for 10 mins.", "Peel and season."]
    },
    {
        name: "Cottage Cheese with Pineapple",
        calories: 150,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Cottage Cheese", "Pineapple chunks"],
        instructions: ["Mix fruit into cheese."]
    },
    {
        name: "Edamame",
        calories: 120,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Edamame (in pod)", "Sea Salt"],
        instructions: ["Steam pods.", "Sprinkle salt.", "Squeeze beans out to eat."]
    },
    {
        name: "Rice Cake with Avocado",
        calories: 150,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Rice Cake", "Avocado", "Chili Flakes"],
        instructions: ["Mash avocado on rice cake.", "Sprinkle flakes."]
    },
    {
        name: "Dark Chocolate (2 squares)",
        calories: 100,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Dark Chocolate (>70%)"],
        instructions: ["Savor slowly."]
    },
    {
        name: "Trail Mix (Small handful)",
        calories: 200,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Nuts", "Dried Fruit", "Seeds"],
        instructions: ["Mix together."]
    },
    {
        name: "Popcorn (Air popped)",
        calories: 100,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Popcorn kernels"],
        instructions: ["Air pop.", "Sprinkle nutritional yeast or salt."]
    },
    {
        name: "Smoothie (Berry)",
        calories: 250,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Berries", "Banana", "Almond Milk", "Spinach"],
        instructions: ["Blend all ingredients until smooth."]
    },
    {
        name: "Banana with Almond Butter",
        calories: 200,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Banana", "Almond Butter"],
        instructions: ["Peel banana.", "Spread nut butter."]
    },
    {
        name: "Cheese Stick",
        calories: 80,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Mozzarella/Cheddar stick"],
        instructions: ["Unwrap."]
    },
    {
        name: "Fruit Salad",
        calories: 100,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Melon", "Grapes", "Berries"],
        instructions: ["Chop and mix."]
    },
    {
        name: "Chia Pudding",
        calories: 200,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Chia Seeds", "Milk", "Vanilla"],
        instructions: ["Soak seeds in milk overnight."]
    },
    {
        name: "Roasted Chickpeas",
        calories: 150,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Chickpeas", "Olive Oil", "Spices"],
        instructions: ["Toss chickpeas in oil and spices.", "Roast until crunchy."]
    },
    {
        name: "Veggie Chips",
        calories: 150,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Kale/Beet/Sweet Potato slices", "Oil", "Salt"],
        instructions: ["Bake thin slices until crisp."]
    },
    {
        name: "Granola Bar",
        calories: 180,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Oats", "Honey", "Nuts"],
        instructions: ["Bake mixture in a tray.", "Cut into bars."]
    },
    {
        name: "Samosa (1 pc)",
        calories: 250,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Pastry", "Spiced Potato filling"],
        instructions: ["Deep fry."]
    },
    {
        name: "Pakora (3 pcs)",
        calories: 200,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Vegetables", "Chickpea batter"],
        instructions: ["Dip veggies in batter.", "Deep fry."]
    },
    {
        name: "Bhel Puri",
        calories: 250,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Puffed Rice", "Sev", "Chutneys", "Onion"],
        instructions: ["Mix everything quickly.", "Eat immediately before soggy."]
    },
    {
        name: "Pani Puri (6 pcs)",
        calories: 200,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Hollow Puris", "Spiced Water", "Potato filling"],
        instructions: ["Crack puri.", "Fill.", "Dunk in water.", "Eat whole."]
    },
    {
        name: "Vada Pav",
        calories: 300,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Potato Fritter (Vada)", "Bun (Pav)", "Chutney"],
        instructions: ["Sandwich fritter in bun with chutney."]
    },
    {
        name: "Aloo Tikki",
        calories: 250,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Potato Patty", "Chutney", "Yogurt"],
        instructions: ["Pan fry patty.", "Top with sauces."]
    },
    {
        name: "Dhokla (2 pcs)",
        calories: 150,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Steamed Gram Flour cake"],
        instructions: ["Steamed snack."]
    },
    {
        name: "Khandvi",
        calories: 150,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Gram flour rolls", "Mustard seeds", "Coconut"],
        instructions: ["Delicate rolled snack."]
    },
    {
        name: "Medu Vada (1 pc)",
        calories: 200,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Lentil donut", "Sambhar"],
        instructions: ["Deep fried savory donut."]
    },
    {
        name: "Idli (2 pcs)",
        calories: 150,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Steamed Rice Cake", "Chutney"],
        instructions: ["Serve warm with chutney."]
    },
    {
        name: "Banana Chips",
        calories: 150,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Raw Banana slices", "Coconut Oil"],
        instructions: ["Deep fry thin slices."]
    },
    {
        name: "Murukku/Chakli",
        calories: 150,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Rice flour dough", "Spices"],
        instructions: ["Deep fried crunchy snack."]
    },
    {
        name: "Mathri",
        calories: 200,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Flour cracker", "Carom seeds"],
        instructions: ["Savory biscuit."]
    },
    {
        name: "Makhana (Roasted)",
        calories: 100,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Fox Nuts (Makhana)", "Ghee", "Salt"],
        instructions: ["Roast in ghee until crisp."]
    },
    {
        name: "Masala Corn",
        calories: 150,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Sweet Corn", "Butter", "Chaat Masala"],
        instructions: ["Boil corn.", "Mix with butter and spice."]
    },
    {
        name: "Egg Puff",
        calories: 300,
        type: 'snack',
        dietary: 'non-veg',
        ingredients: ["Puff Pastry", "Boiled Egg", "Masala"],
        instructions: ["Bake."]
    },
    {
        name: "Chicken Nuggets (4 pcs)",
        calories: 250,
        type: 'snack',
        dietary: 'non-veg',
        ingredients: ["Chicken", "Breading"],
        instructions: ["Bake/Fry."]
    },
    {
        name: "Fish Fingers (3 pcs)",
        calories: 250,
        type: 'snack',
        dietary: 'non-veg',
        ingredients: ["Fish breaded strips"],
        instructions: ["Bake/Fry."]
    },
    {
        name: "Sausage Roll",
        calories: 300,
        type: 'snack',
        dietary: 'non-veg',
        ingredients: ["Sausage", "Pastry"],
        instructions: ["Bake."]
    },
    {
        name: "Scotch Egg",
        calories: 350,
        type: 'snack',
        dietary: 'non-veg',
        ingredients: ["Boiled Egg", "Sausage meat wrapping", "Breadcrumbs"],
        instructions: ["Deep fry."]
    },
    {
        name: "Nachos with Salsa",
        calories: 300,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Tortilla Chips", "Salsa"],
        instructions: ["Dip."]
    },
    {
        name: "Guacamole & Chips",
        calories: 300,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Avocado mash", "Chips"],
        instructions: ["Dip."]
    },
    {
        name: "Pretzels",
        calories: 150,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Pretzels"],
        instructions: ["Eat."]
    },
    {
        name: "Potato Chips (Small bag)",
        calories: 150,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Potato slices", "Oil", "Salt"],
        instructions: ["Fried snack."]
    },
    {
        name: "Biscuits/Cookies (2)",
        calories: 150,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Flour", "Sugar", "Butter"],
        instructions: ["Baked treat."]
    },
    {
        name: "Donut",
        calories: 250,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Fried Dough", "Glaze"],
        instructions: ["Sweet treat."]
    },
    {
        name: "Muffin",
        calories: 300,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Flour", "Sugar", "Fruit/Choc chip"],
        instructions: ["Baked cake."]
    },
    {
        name: "Cupcake",
        calories: 300,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Cake", "Frosting"],
        instructions: ["Sweet cake."]
    },
    {
        name: "Brownie",
        calories: 300,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Chocolate", "Flour", "Sugar"],
        instructions: ["Dense chocolate cake."]
    },
    {
        name: "Ice Cream (1 scoop)",
        calories: 200,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Cream", "Sugar", "Flavor"],
        instructions: ["Frozen treat."]
    },
    {
        name: "Yogurt Parfait",
        calories: 200,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Yogurt", "Granola", "Fruit"],
        instructions: ["Layer in glass."]
    },
    {
        name: "Energy Bites (2)",
        calories: 150,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Oats", "Dates", "Nut butter"],
        instructions: ["Roll into balls."]
    },
    {
        name: "Beef Jerky",
        calories: 100,
        type: 'snack',
        dietary: 'non-veg',
        ingredients: ["Dried Beef"],
        instructions: ["Chew."]
    },
    {
        name: "Cucumber Sandwiches (2)",
        calories: 150,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Bread", "Cucumber", "Butter"],
        instructions: ["Remove crusts.", "Layer cucumber."]
    },
    {
        name: "Bruschetta (2)",
        calories: 200,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Toast", "Tomato", "Basil", "Garlic"],
        instructions: ["Top toast with tomato mix."]
    },
    {
        name: "Olives (Bowl)",
        calories: 100,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Olives"],
        instructions: ["Salty snack."]
    },
    {
        name: "Spring Rolls (Fresh)",
        calories: 150,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Rice Paper", "Veggie strips"],
        instructions: ["Roll fresh veggies in paper."]
    },
    {
        name: "Tempura Veggies",
        calories: 200,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Veggies", "Batter"],
        instructions: ["Deep fry."]
    },
    {
        name: "Gyoza (3 pcs)",
        calories: 150,
        type: 'snack',
        dietary: 'non-veg',
        ingredients: ["Dumplings"],
        instructions: ["Pan fry."]
    },
    {
        name: "Takoyaki (4 pcs)",
        calories: 200,
        type: 'snack',
        dietary: 'non-veg',
        ingredients: ["Octopus balls"],
        instructions: ["Top with sauce and flakes."]
    },
    {
        name: "Onigiri",
        calories: 200,
        type: 'snack',
        dietary: 'non-veg',
        ingredients: ["Rice Ball", "Filling (Fish/Plum)", "Nori"],
        instructions: ["Triangle rice snack."]
    },
    {
        name: "Mochi",
        calories: 150,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Sweet Rice Cake"],
        instructions: ["Chewy dessert."]
    },
    {
        name: "Bao Bun (1 pc)",
        calories: 250,
        type: 'snack',
        dietary: 'non-veg',
        ingredients: ["Steamed Bun", "Pork Belly"],
        instructions: ["Soft fluffy bun sandwich."]
    },
    {
        name: "Curry Puff",
        calories: 250,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Pastry", "Curry Potato filling"],
        instructions: ["Baked/Fried."]
    },
    {
        name: "Satay sticks (3)",
        calories: 200,
        type: 'snack',
        dietary: 'non-veg',
        ingredients: ["Grilled Meat Skewers", "Peanut Sauce"],
        instructions: ["Dip in sauce."]
    },
    {
        name: "Roti Canai (Small)",
        calories: 300,
        type: 'snack',
        dietary: 'veg',
        ingredients: ["Flatbread", "Curry dip"],
        instructions: ["Dip flaky bread."]
    },
];
