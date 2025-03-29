import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EmiCalculator.css";

function EmiCalculator() {
  const [principal, setPrincipal] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [rate, setRate] = useState("");
  const [timeMonths, setTimeMonths] = useState("");
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const roundToNearest = (value) => Math.round(value);

  const calculateEMI = () => {
    // Validation
    if (!principal || !timeMonths) {
      setError("Principal and tenure are required!");
      setEmi(null);
      setTotalInterest(null);
      setTotalPayment(null);
      return;
    }

    const P = Math.max(0, parseFloat(principal) - parseFloat(downPayment || 0));
    const R = parseFloat(rate || 0) / 100 / 12;
    const N = parseFloat(timeMonths);

    if (P <= 0) {
      setError("Loan amount after downpayment must be positive!");
      setEmi(null);
      setTotalInterest(null);
      setTotalPayment(null);
      return;
    }

    if (N <= 0) {
      setError("Tenure must be positive!");
      setEmi(null);
      setTotalInterest(null);
      setTotalPayment(null);
      return;
    }

    setError("");

    // EMI Calculation (Handles zero-interest case)
    let emiValue = R === 0 ? P / N : (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);

    const total = emiValue * N;
    const interest = total - P;

    setEmi(roundToNearest(emiValue).toLocaleString("en-IN"));
    setTotalInterest(roundToNearest(interest).toLocaleString("en-IN"));
    setTotalPayment(roundToNearest(total).toLocaleString("en-IN"));
  };

  return (
    <div className="emi-calculator-wrapper">
      <div className="emi-calculator-container">
        <h2>EMI Calculator</h2>

        <input
          type="number"
          placeholder="Principal Amount (₹)"
          min="1"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
        />

        <input
          type="number"
          placeholder="Down Payment (₹)"
          min="0"
          value={downPayment}
          onChange={(e) => setDownPayment(e.target.value)}
        />

        <input
          type="number"
          placeholder="Annual Interest Rate (%)"
          min="0"
          step="0.01"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />

        <input
          type="number"
          placeholder="Loan Tenure (Months)"
          min="1"
          value={timeMonths}
          onChange={(e) => setTimeMonths(e.target.value)}
        />

        <button 
          className="calculate-emi-button"
          onClick={calculateEMI}
        >
          Calculate EMI
        </button>

        {error && <div className="emi-error">{error}</div>}

        {emi !== null && (
          <div className="emi-results">
            <p><strong>Monthly EMI:</strong> ₹{emi}</p>
            <p><strong>Total Interest:</strong> ₹{totalInterest}</p>
            <p><strong>Total Payment:</strong> ₹{totalPayment}</p>
          </div>
        )}
      </div>

      <button 
        className="emi-back-button"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}

export default EmiCalculator;