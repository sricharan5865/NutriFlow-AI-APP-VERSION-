package com.surya.nutriflow.models

enum class QuantityType(val label: String) {
    PIECES("Pieces"),
    GRAMS("Grams"),
    KILOGRAMS("Kilograms"),
    CUPS("Cups"),
    SLICES("Slices");

    override fun toString(): String = label
}

data class Nutrition(
    val calories: Double,
    val protein: Double,
    val carbs: Double,
    val fat: Double
) {
    // Helper to scale nutrition by a multiplier
    operator fun times(multiplier: Double): Nutrition {
        return Nutrition(
            calories = this.calories * multiplier,
            protein = this.protein * multiplier,
            carbs = this.carbs * multiplier,
            fat = this.fat * multiplier
        )
    }
}

data class FoodItem(
    val name: String,
    val defaultUnit: QuantityType,
    val baseNutrition: Nutrition, // Nutrition per default base unit (e.g., 1 piece)
    val gramsPerPiece: Double? = null,
    val gramsPerCup: Double? = null,
    val gramsPerSlice: Double? = null
)
