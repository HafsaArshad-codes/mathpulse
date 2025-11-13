import ThreeDButton from "@/components/ThreeDButton";
import { CalculatorMode } from "../Calculator";
import { ProgrammerKeypad } from "./keypads/ProgrammerKeypad";
import { DateKeypad } from "./keypads/DateKeypad";
import { ConverterKeypad } from "./keypads/ConverterKeypad";

interface CalculatorKeypadProps {
  mode: CalculatorMode;
  onButtonClick: (value: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onEquals: () => void;
  onPaste?: (text: string) => void;
}

export const CalculatorKeypad = ({ 
  mode, 
  onButtonClick, 
  onClear, 
  onDelete, 
  onEquals,
  onPaste 
}: CalculatorKeypadProps) => {
  
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && onPaste) {
        onPaste(text);
      }
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };
  
  const CalcButton = ({ value, className = "", operator = false }: { value: string; className?: string; operator?: boolean }) => (
    <ThreeDButton
      onClick={() => onButtonClick(value)}
      variant={operator ? "operator" : "number"}
      className={`h-16 text-lg ${className}`}
    >
      {value}
    </ThreeDButton>
  );

  if (mode === "programmer") {
    return <ProgrammerKeypad onButtonClick={onButtonClick} onClear={onClear} onDelete={onDelete} onEquals={onEquals} />;
  }

  if (mode === "date") {
    return <DateKeypad onButtonClick={onButtonClick} onClear={onClear} />;
  }

  if (mode === "converter") {
    return <ConverterKeypad onButtonClick={onButtonClick} onClear={onClear} />;
  }

  if (mode === "standard") {
    return (
      <div className="grid grid-cols-4 gap-3">
        <ThreeDButton onClick={onClear} className="h-16 text-lg">C</ThreeDButton>
        <ThreeDButton onClick={handlePaste} className="h-16 text-lg">📋</ThreeDButton>
        <ThreeDButton onClick={onDelete} className="h-16 text-lg">⌫</ThreeDButton>
        <CalcButton value="/" operator />
        
        <CalcButton value="7" />
        <CalcButton value="8" />
        <CalcButton value="9" />
        <CalcButton value="*" operator />
        
        <CalcButton value="4" />
        <CalcButton value="5" />
        <CalcButton value="6" />
        <CalcButton value="-" operator />
        
        <CalcButton value="1" />
        <CalcButton value="2" />
        <CalcButton value="3" />
        <CalcButton value="+" operator />
        
        <CalcButton value="0" className="col-span-2" />
        <CalcButton value="." />
        <ThreeDButton 
          onClick={onEquals}
          variant="operator"
          className="h-16 text-xl font-bold"
        >
          =
        </ThreeDButton>
      </div>
    );
  }

  if (mode === "scientific") {
    return (
      <div className="grid grid-cols-5 gap-2">
        <ThreeDButton onClick={onClear} className="h-12 text-sm">C</ThreeDButton>
        <ThreeDButton onClick={handlePaste} className="h-12 text-sm">📋</ThreeDButton>
        <ThreeDButton onClick={onDelete} className="h-12 text-sm">⌫</ThreeDButton>
        <CalcButton value="(" />
        <CalcButton value=")" />
        
        <CalcButton value="sin" />
        <CalcButton value="cos" />
        <CalcButton value="tan" />
        <CalcButton value="π" />
        <CalcButton value="/" operator />
        
        <CalcButton value="ln" />
        <CalcButton value="log" />
        <CalcButton value="sqrt" />
        <CalcButton value="^" operator />
        <CalcButton value="*" operator />
        
        <CalcButton value="7" />
        <CalcButton value="8" />
        <CalcButton value="9" />
        <CalcButton value="e" />
        <CalcButton value="-" operator />
        
        <CalcButton value="4" />
        <CalcButton value="5" />
        <CalcButton value="6" />
        <CalcButton value="!" />
        <CalcButton value="+" operator />
        
        <CalcButton value="1" />
        <CalcButton value="2" />
        <CalcButton value="3" />
        <CalcButton value="0" />
        <ThreeDButton 
          onClick={onEquals}
          variant="operator"
          className="h-12 text-xl font-bold"
        >
          =
        </ThreeDButton>
        
        <CalcButton value="." className="col-span-4" />
      </div>
    );
  }

  return null;
};
