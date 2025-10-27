import { useState, useCallback, useEffect } from "react";
import { NumberBase, convertBase, bitwiseOperation } from "@/utils/programmer";

export const useProgrammer = (onDisplayUpdate?: (expression: string, result: string) => void) => {
  const [currentBase, setCurrentBase] = useState<NumberBase>("DEC");
  const [currentValue, setCurrentValue] = useState("0");
  const [expression, setExpression] = useState("");
  const [operation, setOperation] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<string | null>(null);

  // Sync display with parent calculator
  useEffect(() => {
    if (onDisplayUpdate) {
      onDisplayUpdate(expression, currentValue);
    }
  }, [currentValue, expression, onDisplayUpdate]);

  const handleNumberInput = useCallback((digit: string) => {
    setCurrentValue(prev => {
      if (prev === "0") return digit;
      return prev + digit;
    });
  }, []);

  const handleBaseChange = useCallback((newBase: NumberBase) => {
    // Convert current value to new base
    if (currentValue !== "0") {
      const converted = convertBase(currentValue, currentBase, newBase);
      setCurrentValue(converted);
    }
    setCurrentBase(newBase);
  }, [currentValue, currentBase]);

  const handleOperation = useCallback((op: string) => {
    if (["AND", "OR", "XOR", "<<", ">>"].includes(op)) {
      setPreviousValue(currentValue);
      setOperation(op);
      setExpression(`${currentValue} ${op} `);
      setCurrentValue("0");
    }
  }, [currentValue]);

  const handleNOT = useCallback(() => {
    try {
      const decimal = parseInt(currentValue, currentBase === "DEC" ? 10 : currentBase === "HEX" ? 16 : currentBase === "OCT" ? 8 : 2);
      const result = ~decimal;
      const converted = convertBase(Math.abs(result).toString(), "DEC", currentBase);
      setCurrentValue(converted);
      setExpression(`NOT ${currentValue} = ${converted}`);
    } catch {
      setCurrentValue("Error");
    }
  }, [currentValue, currentBase]);

  const handleArithmetic = useCallback((op: string) => {
    setPreviousValue(currentValue);
    setOperation(op);
    setExpression(`${currentValue} ${op} `);
    setCurrentValue("0");
  }, [currentValue]);

  const calculate = useCallback(() => {
    if (!previousValue || !operation) return currentValue;

    try {
      const a = parseInt(previousValue, currentBase === "DEC" ? 10 : currentBase === "HEX" ? 16 : currentBase === "OCT" ? 8 : 2);
      const b = parseInt(currentValue, currentBase === "DEC" ? 10 : currentBase === "HEX" ? 16 : currentBase === "OCT" ? 8 : 2);
      
      let result: number;
      
      if (["AND", "OR", "XOR", "NOT", "<<", ">>"].includes(operation)) {
        result = bitwiseOperation(a, b, operation);
      } else {
        switch (operation) {
          case "+": result = a + b; break;
          case "-": result = a - b; break;
          case "*": result = a * b; break;
          case "/": result = Math.floor(a / b); break;
          default: result = b;
        }
      }

      const converted = convertBase(result.toString(), "DEC", currentBase);
      setExpression(`${previousValue} ${operation} ${currentValue} = ${converted}`);
      setCurrentValue(converted);
      setPreviousValue(null);
      setOperation(null);
      
      return converted;
    } catch (error) {
      setCurrentValue("Error");
      return "Error";
    }
  }, [previousValue, currentValue, operation, currentBase]);

  const clear = useCallback(() => {
    setCurrentValue("0");
    setExpression("");
    setPreviousValue(null);
    setOperation(null);
  }, []);

  return {
    currentBase,
    currentValue,
    expression,
    handleNumberInput,
    handleBaseChange,
    handleOperation,
    handleNOT,
    handleArithmetic,
    calculate,
    clear,
  };
};
