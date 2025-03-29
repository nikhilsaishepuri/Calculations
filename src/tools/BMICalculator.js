import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BMICalculator.css";

function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const calculateBMI = () => {
    const weightKg = parseFloat(weight);
    const heightM = parseFloat(height) / 100; // Convert cm to meters

    if (isNaN(weightKg) || isNaN(heightM)) {
      setError("Please enter valid numbers");
      setBmi(null);
      setCategory("");
      return;
    }

    if (weightKg <= 0 || heightM <= 0) {
      setError("Values must be positive");
      setBmi(null);
      setCategory("");
      return;
    }

    setError("");
    const bmiValue = weightKg / (heightM * heightM);
    setBmi(bmiValue.toFixed(1));

    // Determine BMI category
    if (bmiValue < 18.5) {
      setCategory("underweight");
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setCategory("normal");
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setCategory("overweight");
    } else {
      setCategory("obese");
    }
  };

  const getCategoryMessage = () => {
    switch(category) {
      case "underweight":
        return "Underweight (Eat more nutritious foods)";
      case "normal":
        return "Normal weight (Keep it up!)";
      case "overweight":
        return "Overweight (Consider more exercise)";
      case "obese":
        return "Obese (Consult a doctor)";
      default:
        return "";
    }
  };

  return (
    <div className="bmi-calculator-wrapper">
      <div className="bmi-calculator-container">
        <h2>BMI Calculator</h2>
        <input
          type="number"
          placeholder="Weight (kg)"
          min="1"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Height (cm)"
          min="50"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <button 
          className="calculate-bmi-button"
          onClick={calculateBMI}
        >
          Calculate BMI
        </button>
        {error && <div className="bmi-error">{error}</div>}
        {bmi !== null && (
          <div className="bmi-results">
            <div className="bmi-value">Your BMI: {bmi}</div>
            <div className={`bmi-category ${category}`}>
              {getCategoryMessage()}
            </div>
          </div>
        )}
      </div>
      <button 
        className="bmi-back-button"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}

export default BMICalculator;