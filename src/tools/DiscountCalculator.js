import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DiscountCalculator.css";

function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [finalPrice, setFinalPrice] = useState(null);
  const [savedAmount, setSavedAmount] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const calculateDiscount = () => {
    const OP = parseFloat(originalPrice);
    const DR = parseFloat(discountRate);

    // Validation
    if (!originalPrice || !discountRate) {
      setError("Both fields are required!");
      setFinalPrice(null);
      setSavedAmount(null);
      return;
    }

    if (isNaN(OP) || isNaN(DR)) {
      setError("Please enter valid numbers!");
      setFinalPrice(null);
      setSavedAmount(null);
      return;
    }

    if (OP <= 0) {
      setError("Original Price must be greater than 0!");
      setFinalPrice(null);
      setSavedAmount(null);
      return;
    }

    if (DR < 0 || DR > 100) {
      setError("Discount must be between 0% and 100%!");
      setFinalPrice(null);
      setSavedAmount(null);
      return;
    }

    setError("");
    const discountAmount = (OP * DR) / 100;
    const discountedPrice = OP - discountAmount;

    setFinalPrice(discountedPrice.toFixed(2));
    setSavedAmount(discountAmount.toFixed(2));
  };

  return (
    <div className="discount-calculator-wrapper">
      <div className="discount-calculator-container">
        <h2>Discount Calculator</h2>
        
        <input
          type="number"
          placeholder="Original Price (₹)"
          min="0.01"
          step="0.01"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
        />
        
        <input
          type="number"
          placeholder="Discount Rate (%)"
          min="0"
          max="100"
          step="0.1"
          value={discountRate}
          onChange={(e) => setDiscountRate(e.target.value)}
        />
        
        <button 
          className="calculate-discount-button"
          onClick={calculateDiscount}
        >
          Calculate Discount
        </button>

        {error && <div className="discount-error">{error}</div>}

        {finalPrice !== null && (
          <div className="discount-results">
            <p><strong>Final Price:</strong> ₹{finalPrice}</p>
            <p><strong>You Save:</strong> ₹{savedAmount}</p>
          </div>
        )}
      </div>

      <button 
        className="discount-back-button"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}

export default DiscountCalculator;