import { useState } from "react";
import { CalculatorDisplay } from "./calculator/CalculatorDisplay";
import { CalculatorKeypad } from "./calculator/CalculatorKeypad";
import { ModeSidebar } from "./calculator/ModeSidebar";
import { HistorySidebar } from "./calculator/HistorySidebar";
import { useCalculator } from "@/hooks/useCalculator";

export type CalculatorMode = "standard" | "scientific" | "programmer" | "date" | "converter";

const Calculator = () => {
  const [mode, setMode] = useState<CalculatorMode>("standard");
  const calculator = useCalculator(mode);

  return (
    <div className="flex h-screen bg-background">
      <ModeSidebar currentMode={mode} onModeChange={setMode} />
      
      <div className="flex-1 flex flex-col p-6">
        <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col gap-4">
          <CalculatorDisplay 
            expression={calculator.expression}
            result={calculator.result}
            mode={mode}
          />
          <CalculatorKeypad 
            mode={mode}
            onButtonClick={calculator.handleInput}
            onClear={calculator.clear}
            onDelete={calculator.deleteLast}
            onEquals={calculator.calculate}
          />
        </div>
      </div>

      <HistorySidebar 
        history={calculator.history}
        onHistoryClick={calculator.loadFromHistory}
        onClearHistory={calculator.clearHistory}
      />
    </div>
  );
};

export default Calculator;
