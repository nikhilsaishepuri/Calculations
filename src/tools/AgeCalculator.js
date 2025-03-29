import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AgeCalculator.css";

function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState(null);
  const navigate = useNavigate();

  const calculateAge = () => {
    if (!birthDate) {
      setAge({ message: "Please select a valid date.", isError: true });
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();
    
    if (birth > today) {
      setAge({ message: "Invalid date! Birth date cannot be in the future.", isError: true });
      return;
    }

    const diff = today - birth;
    const calculatedAge = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    setAge({ message: `You are ${calculatedAge} years old.`, isError: false });
  };

  return (
    <div className="age-calculator-wrapper">
      <div className="age-calculator-container">
        <h2>Age Calculator</h2>
        <input 
          type="date" 
          value={birthDate} 
          onChange={(e) => setBirthDate(e.target.value)} 
        />
        <button onClick={calculateAge}>Calculate Age</button>
        {age && (
          <p className={`age-result ${age.isError ? "error" : ""}`}>
            {age.message}
          </p>
        )}
      </div>
      <button 
        className="calculator-back-button"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}

export default AgeCalculator;