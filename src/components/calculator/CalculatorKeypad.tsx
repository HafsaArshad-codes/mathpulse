import { Button } from "@/components/ui/button";
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
}

export const CalculatorKeypad = ({ 
  mode, 
  onButtonClick, 
  onClear, 
  onDelete, 
  onEquals 
}: CalculatorKeypadProps) => {
  
  const CalcButton = ({ value, className = "", operator = false }: { value: string; className?: string; operator?: boolean }) => (
    <Button
      onClick={() => onButtonClick(value)}
      variant={operator ? "default" : "outline"}
      className={`h-16 text-lg font-medium rounded-xl ${className}`}
    >
      {value}
    </Button>
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
        <Button onClick={onClear} variant="secondary" className="h-16 text-lg font-medium rounded-xl">C</Button>
        <Button onClick={onDelete} variant="secondary" className="h-16 text-lg font-medium rounded-xl">⌫</Button>
        <CalcButton value="%" operator />
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
        <Button onClick={onEquals} variant="default" className="h-16 text-lg font-medium rounded-xl bg-calc-operator hover:bg-calc-operator-hover">=</Button>
      </div>
    );
  }

  if (mode === "scientific") {
    return (
      <div className="grid grid-cols-5 gap-2">
        <Button onClick={onClear} variant="secondary" className="h-12 text-sm rounded-xl">C</Button>
        <Button onClick={onDelete} variant="secondary" className="h-12 text-sm rounded-xl">⌫</Button>
        <CalcButton value="(" />
        <CalcButton value=")" />
        <CalcButton value="%" operator />
        
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
        <CalcButton value="." />
        <Button onClick={onEquals} variant="default" className="h-12 text-sm rounded-xl row-span-2 bg-calc-operator hover:bg-calc-operator-hover">=</Button>
        
        <CalcButton value="0" className="col-span-4" />
      </div>
    );
  }

  return null;
};
