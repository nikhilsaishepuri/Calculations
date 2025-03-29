import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { evaluate } from "mathjs";  // Import math.js
import "../styles/Calculator.css";

function Calculator() {
  const [expression, setExpression] = useState("");
  const navigate = useNavigate();

  const calculateResult = () => {
    try {
      setExpression(evaluate(expression).toString());  // Use mathjs evaluate
    } catch {
      setExpression("Error");
    }
  };

  const handleButtonClick = (btn) => {
    if (btn === "C") return setExpression("");
    if (btn === "⌫") return setExpression(expression.slice(0, -1));
    if (btn === "%") return setExpression((parseFloat(expression) / 100).toString());
    if (btn === "=") return calculateResult();
    setExpression(expression + btn);
  };

  return (
    <div className="calculator-wrapper">
      <div className="calculator-container">
        <input 
          type="text" 
          className="calculator-display"
          value={expression} 
          readOnly 
        />
        
        <div className="buttons">
          <button className="clear" onClick={() => handleButtonClick("C")}>C</button>
          <button onClick={() => handleButtonClick("⌫")}>⌫</button>
          <button onClick={() => handleButtonClick("%")}>%</button>
          <button className="operator" onClick={() => handleButtonClick("/")}>/</button>
          <button onClick={() => handleButtonClick("7")}>7</button>
          <button onClick={() => handleButtonClick("8")}>8</button>
          <button onClick={() => handleButtonClick("9")}>9</button>
          <button className="operator" onClick={() => handleButtonClick("*")}>*</button>
          <button onClick={() => handleButtonClick("4")}>4</button>
          <button onClick={() => handleButtonClick("5")}>5</button>
          <button onClick={() => handleButtonClick("6")}>6</button>
          <button className="operator" onClick={() => handleButtonClick("-")}>-</button>
          <button onClick={() => handleButtonClick("1")}>1</button>
          <button onClick={() => handleButtonClick("2")}>2</button>
          <button onClick={() => handleButtonClick("3")}>3</button>
          <button className="operator" onClick={() => handleButtonClick("+")}>+</button>
          <button className="double-zero" onClick={() => handleButtonClick("00")}>00</button>
          <button onClick={() => handleButtonClick("0")}>0</button>
          <button onClick={() => handleButtonClick(".")}>.</button>
          <button className="equals" onClick={() => handleButtonClick("=")}>=</button>
        </div>
      </div>
      <button 
        className="back-button"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}

export default Calculator;
