package com.surya.nutriflow.utils

import com.surya.nutriflow.models.FoodItem
import com.surya.nutriflow.models.Nutrition
import com.surya.nutriflow.models.QuantityType

object NutritionCalculator {

    fun calculateTotalNutrition(
        food: FoodItem,
        inputQuantity: Double,
        inputUnit: QuantityType
    ): Nutrition {
        // Prevent negative calculations
        if (inputQuantity <= 0) return Nutrition(0.0, 0.0, 0.0, 0.0)

        val multiplier = getMultiplier(food, inputQuantity, inputUnit)
        return food.baseNutrition * multiplier
    }

    private fun getMultiplier(
        food: FoodItem,
        inputQuantity: Double,
        inputUnit: QuantityType
    ): Double {
        // If the user inputs the exact same unit as the base unit, the multiplier is just the quantity
        if (inputUnit == food.defaultUnit) return inputQuantity

        // Approach: Convert everything to Grams first, then calculate the ratio against the base unit's gram equivalent.
        val inputInGrams = convertToGrams(inputQuantity, inputUnit, food)
        val baseUnitInGrams = convertToGrams(1.0, food.defaultUnit, food)

        if (baseUnitInGrams == 0.0) return 0.0 // Avoid division by zero if conversion is missing

        return inputInGrams / baseUnitInGrams
    }

    private fun convertToGrams(quantity: Double, unit: QuantityType, food: FoodItem): Double {
        return when (unit) {
            QuantityType.GRAMS -> quantity
            QuantityType.KILOGRAMS -> quantity * 1000.0
            QuantityType.PIECES -> quantity * (food.gramsPerPiece ?: 0.0)
            QuantityType.CUPS -> quantity * (food.gramsPerCup ?: 0.0)
            QuantityType.SLICES -> quantity * (food.gramsPerSlice ?: 0.0)
        }
    }
}
