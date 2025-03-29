import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import Calculator from "./tools/Calculator";
import AgeCalculator from "./tools/AgeCalculator";
import EmiCalculator from "./tools/EmiCalculator";
import InterestCalculator from "./tools/InterestCalculator";
import DiscountCalculator from "./tools/DiscountCalculator";
import BMICalculator from "./tools/BMICalculator";
import "./App.css";

const tools = [
  { name: "Calculator", path: "/calculator", icon: "🧮" },
  { name: "Age Calculator", path: "/age-calculator", icon: "🎂" },
  { name: "EMI Calculator", path: "/emi-calculator", icon: "🏦" },
  { name: "Interest Calculator", path: "/interest-calculator", icon: "💰" },
  { name: "Discount Calculator", path: "/discount-calculator", icon: "🛍️" },
  { name: "BMI Calculator", path: "/bmi-calculator", icon: "🏋️" },
];

function Header({ darkMode, setDarkMode }) {
  const location = useLocation();
  
  // Show header only on the home page ("/")
  if (location.pathname !== "/") return null;

  return (
    <header className={`app-header ${darkMode ? 'dark' : ''}`}>
      <h1>Calculations</h1>
      <button 
        className="dark-mode-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? "🌙" : "☀️"}
      </button>
    </header>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved preference or use system preference
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) return savedMode === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Apply dark mode class to body
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark' : ''}`}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <Routes>
          <Route
            path="/"
            element={
              <div className="tools-grid">
                {tools.map((tool, index) => (
                  <Link 
                    key={index} 
                    to={tool.path} 
                    className={`tool-card ${darkMode ? 'dark' : ''}`}
                  >
                    <span className="tool-icon">{tool.icon}</span>
                    {tool.name}
                  </Link>
                ))}
              </div>
            }
          />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/age-calculator" element={<AgeCalculator />} />
          <Route path="/emi-calculator" element={<EmiCalculator />} />
          <Route path="/interest-calculator" element={<InterestCalculator />} />
          <Route path="/discount-calculator" element={<DiscountCalculator />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;