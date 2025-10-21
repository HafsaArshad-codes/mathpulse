import { useState, useEffect, useCallback } from "react";
import { evaluate, format } from "mathjs";
import { CalculatorMode } from "@/components/Calculator";

interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export const useCalculator = (mode: CalculatorMode) => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("calculator-history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("calculator-history", JSON.stringify(history));
  }, [history]);

  const handleInput = useCallback((value: string) => {
    // Handle special commands from Date and Converter modes
    if (value.startsWith("RESULT:")) {
      const resultValue = value.replace("RESULT:", "");
      setResult(resultValue);
      setExpression(prev => prev + " = " + resultValue);
      return;
    }
    
    // Handle base change in Programmer mode
    if (value.startsWith("BASE:")) {
      const base = value.replace("BASE:", "");
      setExpression("BASE:" + base);
      setResult("0");
      return;
    }
    
    setExpression(prev => {
      // Handle special functions
      if (["sin", "cos", "tan", "ln", "log", "sqrt"].includes(value)) {
        return prev + value + "(";
      }
      if (value === "π") {
        return prev + "pi";
      }
      if (value === "e") {
        return prev + "e";
      }
      if (value === "!") {
        return prev + "!";
      }
      return prev + value;
    });
  }, []);

  const calculate = useCallback(() => {
    if (!expression.trim()) return;

    try {
      let evalExpression = expression;
      
      // Skip calculation if result already set by special modes
      if (expression.includes("RESULT:") || expression.includes(" = ")) {
        return;
      }
      
      // Handle Programmer mode
      if (evalExpression.startsWith("BASE:")) {
        // Don't calculate base indicator alone
        return;
      }
      
      // Auto-close unclosed parentheses
      const openParens = (evalExpression.match(/\(/g) || []).length;
      const closeParens = (evalExpression.match(/\)/g) || []).length;
      if (openParens > closeParens) {
        evalExpression += ")".repeat(openParens - closeParens);
      }
      
      // Handle scientific notation
      evalExpression = evalExpression.replace(/\^/g, "^");
      
      const calculatedResult = evaluate(evalExpression);
      const formattedResult = format(calculatedResult, { precision: 14 });
      
      setResult(formattedResult);
      
      // Add to history
      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        expression: evalExpression,
        result: formattedResult,
        timestamp: Date.now(),
      };
      
      setHistory(prev => [...prev, historyItem]);
    } catch (error) {
      setResult("Error");
      console.error("Calculation error:", error);
    }
  }, [expression]);

  const clear = useCallback(() => {
    setExpression("");
    setResult("0");
  }, []);

  const deleteLast = useCallback(() => {
    setExpression(prev => prev.slice(0, -1));
    if (expression.length <= 1) {
      setResult("0");
    }
  }, [expression]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem("calculator-history");
  }, []);

  const loadFromHistory = useCallback((item: HistoryItem) => {
    setExpression(item.expression);
    setResult(item.result);
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleInput(e.key);
      } else if (["+", "-", "*", "/", "(", ")", ".", "%"].includes(e.key)) {
        handleInput(e.key);
      } else if (e.key === "Enter") {
        e.preventDefault();
        calculate();
      } else if (e.key === "Escape") {
        clear();
      } else if (e.key === "Backspace") {
        deleteLast();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleInput, calculate, clear, deleteLast]);

  return {
    expression,
    result,
    history,
    handleInput,
    calculate,
    clear,
    deleteLast,
    clearHistory,
    loadFromHistory,
  };
};
