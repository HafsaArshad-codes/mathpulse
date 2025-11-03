import { Button } from "@/components/ui/button";
import { NumberBase } from "@/utils/programmer";
import { useProgrammer } from "@/hooks/useProgrammer";

interface ProgrammerKeypadProps {
  onButtonClick: (value: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onEquals: () => void;
}

export const ProgrammerKeypad = ({ onButtonClick, onClear }: ProgrammerKeypadProps) => {
  const programmer = useProgrammer((expression, result) => {
    onButtonClick(`RESULT:${expression}|${result}`);
  });

  const handleNumberClick = (digit: string) => {
    programmer.handleNumberInput(digit);
  };

  const handleBaseChange = (newBase: NumberBase) => {
    programmer.handleBaseChange(newBase);
  };

  const handleOperationClick = (op: string) => {
    if (op === "NOT") {
      programmer.handleNOT();
    } else if (["AND", "OR", "XOR", "<<", ">>"].includes(op)) {
      programmer.handleOperation(op);
    } else {
      programmer.handleArithmetic(op);
    }
  };

  const handleEquals = () => {
    programmer.calculate();
  };

  const handleClear = () => {
    programmer.clear();
    onClear();
  };

  const CalcButton = ({ value, className = "", disabled = false }: { value: string; className?: string; disabled?: boolean }) => {
    const isNumber = /^[0-9A-F]$/.test(value);
    const isOp = ["AND", "OR", "XOR", "NOT", "<<", ">>", "+", "-", "*", "/"].includes(value);
    
    return (
      <Button
        onClick={() => {
          if (isNumber) {
            handleNumberClick(value);
          } else if (isOp) {
            handleOperationClick(value);
          }
        }}
        variant="outline"
        disabled={disabled}
        className={`h-12 text-sm font-medium ${className}`}
      >
        {value}
      </Button>
    );
  };

  const BaseButton = ({ value }: { value: NumberBase }) => (
    <Button
      onClick={() => handleBaseChange(value)}
      variant={programmer.currentBase === value ? "default" : "secondary"}
      className="h-10 text-xs"
    >
      {value}
    </Button>
  );

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2">
        <BaseButton value="DEC" />
        <BaseButton value="HEX" />
        <BaseButton value="OCT" />
        <BaseButton value="BIN" />
      </div>

      <div className="grid grid-cols-5 gap-2">
        <Button onClick={handleClear} variant="secondary" className="h-12 text-lg font-medium col-span-2">C</Button>
        <CalcButton value="AND" />
        <CalcButton value="OR" />
        <CalcButton value="XOR" />

        <CalcButton value="A" disabled={programmer.currentBase === "DEC" || programmer.currentBase === "OCT" || programmer.currentBase === "BIN"} />
        <CalcButton value="B" disabled={programmer.currentBase === "DEC" || programmer.currentBase === "OCT" || programmer.currentBase === "BIN"} />
        <CalcButton value="C" disabled={programmer.currentBase === "DEC" || programmer.currentBase === "OCT" || programmer.currentBase === "BIN"} />
        <CalcButton value="NOT" />
        <CalcButton value="<<" />

        <CalcButton value="D" disabled={programmer.currentBase === "DEC" || programmer.currentBase === "OCT" || programmer.currentBase === "BIN"} />
        <CalcButton value="E" disabled={programmer.currentBase === "DEC" || programmer.currentBase === "OCT" || programmer.currentBase === "BIN"} />
        <CalcButton value="F" disabled={programmer.currentBase === "DEC" || programmer.currentBase === "OCT" || programmer.currentBase === "BIN"} />
        <CalcButton value=">>" />
        <CalcButton value="/" />

        <CalcButton value="7" disabled={programmer.currentBase === "BIN"} />
        <CalcButton value="8" disabled={programmer.currentBase === "BIN" || programmer.currentBase === "OCT"} />
        <CalcButton value="9" disabled={programmer.currentBase === "BIN" || programmer.currentBase === "OCT"} />
        <CalcButton value="*" />
        <CalcButton value="-" />

        <CalcButton value="4" disabled={programmer.currentBase === "BIN"} />
        <CalcButton value="5" disabled={programmer.currentBase === "BIN"} />
        <CalcButton value="6" disabled={programmer.currentBase === "BIN"} />
        <CalcButton value="+" />
        <CalcButton value="1" />

        <CalcButton value="2" disabled={programmer.currentBase === "BIN"} />
        <CalcButton value="3" disabled={programmer.currentBase === "BIN"} />
        <CalcButton value="0" />
        <Button 
          onClick={handleEquals} 
          className="col-span-2 h-12 text-xl font-bold bg-calc-operator hover:bg-calc-operator-hover text-white"
        >
          =
        </Button>
      </div>
    </div>
  );
};
