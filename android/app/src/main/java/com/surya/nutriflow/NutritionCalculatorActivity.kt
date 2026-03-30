package com.surya.nutriflow

import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.EditText
import android.widget.Spinner
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.surya.nutriflow.models.FoodItem
import com.surya.nutriflow.models.Nutrition
import com.surya.nutriflow.models.QuantityType
import com.surya.nutriflow.utils.NutritionCalculator
import java.util.Locale

class NutritionCalculatorActivity : AppCompatActivity() {

    private lateinit var etQuantity: EditText
    private lateinit var spinnerUnit: Spinner
    private lateinit var tvCalories: TextView
    private lateinit var tvProtein: TextView
    private lateinit var tvCarbs: TextView
    private lateinit var tvFat: TextView
    private lateinit var tvError: TextView

    // Example Static Database Entry
    private val apple = FoodItem(
        name = "Apple",
        defaultUnit = QuantityType.PIECES,
        baseNutrition = Nutrition(calories = 80.0, protein = 0.5, carbs = 21.0, fat = 0.2),
        gramsPerPiece = 182.0 // 1 Piece = 182 grams
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_nutrition_calculator)

        initViews()
        setupSpinner()
        setupListeners()
        
        // Initial Calculation attempt
        updateNutrition()
    }

    private fun initViews() {
        etQuantity = findViewById(R.id.etQuantity)
        spinnerUnit = findViewById(R.id.spinnerUnit)
        tvCalories = findViewById(R.id.tvCalories)
        tvProtein = findViewById(R.id.tvProtein)
        tvCarbs = findViewById(R.id.tvCarbs)
        tvFat = findViewById(R.id.tvFat)
        tvError = findViewById(R.id.tvError)
    }

    private fun setupSpinner() {
        val adapter = ArrayAdapter(
            this,
            android.R.layout.simple_spinner_item,
            QuantityType.values()
        )
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        spinnerUnit.adapter = adapter
    }

    private fun setupListeners() {
        // Listen for typing events to update instantly
        etQuantity.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                updateNutrition()
            }
            override fun afterTextChanged(s: Editable?) {}
        })

        // Listen for Unit Dropdown changes
        spinnerUnit.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                updateNutrition()
            }
            override fun onNothingSelected(parent: AdapterView<*>?) {}
        }
    }

    private fun updateNutrition() {
        val quantityStr = etQuantity.text.toString()
        
        // Validation: Empty String
        if (quantityStr.isEmpty()) {
            clearOutputs()
            tvError.visibility = View.GONE
            return
        }

        val quantity = quantityStr.toDoubleOrNull()

        // Validation: Invalid Number
        if (quantity == null) {
            tvError.text = "Please enter a valid number"
            tvError.visibility = View.VISIBLE
            clearOutputs()
            return
        }

        // Validation: Negative Number
        if (quantity < 0) {
            tvError.text = "Quantity cannot be negative"
            tvError.visibility = View.VISIBLE
            clearOutputs()
            return
        }

        // Valid Input - Hide Error and Calculate
        tvError.visibility = View.GONE
        val selectedUnit = spinnerUnit.selectedItem as QuantityType

        val resultNutrition = NutritionCalculator.calculateTotalNutrition(apple, quantity, selectedUnit)
        displayResults(resultNutrition)
    }

    private fun displayResults(nutrition: Nutrition) {
        tvCalories.text = String.format(Locale.getDefault(), "Calories: %.1f kcal", nutrition.calories)
        tvProtein.text = String.format(Locale.getDefault(), "Protein: %.1f g", nutrition.protein)
        tvCarbs.text = String.format(Locale.getDefault(), "Carbs: %.1f g", nutrition.carbs)
        tvFat.text = String.format(Locale.getDefault(), "Fat: %.1f g", nutrition.fat)
    }

    private fun clearOutputs() {
        tvCalories.text = "Calories: 0.0 kcal"
        tvProtein.text = "Protein: 0.0 g"
        tvCarbs.text = "Carbs: 0.0 g"
        tvFat.text = "Fat: 0.0 g"
    }
}
