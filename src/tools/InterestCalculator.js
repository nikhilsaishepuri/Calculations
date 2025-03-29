import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InterestCalculator.css";

function InterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [simpleInterest, setSimpleInterest] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const calculateInterest = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / 100;
    const T = parseFloat(time) / 1; // Convert months to years

    if (isNaN(P) || isNaN(R) || isNaN(T)) {
      setError("Please enter valid numbers");
      setSimpleInterest(null);
      setTotalAmount(null);
      return;
    }

    if (P <= 0 || R <= 0 || T <= 0) {
      setError("Values must be positive");
      setSimpleInterest(null);
      setTotalAmount(null);
      return;
    }

    setError("");
    const SI = P * R * T; // Simple Interest formula
    const total = P + SI; // Total Amount
    
    setSimpleInterest(SI.toFixed(2));
    setTotalAmount(total.toFixed(2));
  };

  return (
    <div className="interest-calculator-wrapper">
      <div className="interest-calculator-container">
        <h2>Simple Interest Calculator</h2>
        <input
          type="number"
          placeholder="Principal Amount (₹)"
          min="1"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
        />
        <input
          type="number"
          placeholder="Interest Rate (%)"
          min="0.1"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Time (Months)"
          min="1"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button 
          className="calculate-interest-button"
          onClick={calculateInterest}
        >
          Calculate Interest
        </button>
        {error && <div className="interest-error">{error}</div>}
        {simpleInterest !== null && (
          <div className="interest-results">
            <h3><strong>Interest:</strong> ₹{simpleInterest}</h3>
            <h3><strong>Total Amount:</strong> ₹{totalAmount}</h3>
          </div>
        )}
      </div>
      <button 
        className="interest-back-button"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}

export default InterestCalculator;