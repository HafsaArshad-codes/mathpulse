import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NumberBase } from "@/utils/programmer";

interface ProgrammerKeypadProps {
  onButtonClick: (value: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onEquals: () => void;
}

export const ProgrammerKeypad = ({ onButtonClick, onClear, onDelete, onEquals }: ProgrammerKeypadProps) => {
  const [base, setBase] = useState<NumberBase>("DEC");

  const CalcButton = ({ value, className = "", disabled = false }: { value: string; className?: string; disabled?: boolean }) => (
    <Button
      onClick={() => onButtonClick(value)}
      variant="outline"
      disabled={disabled}
      className={`h-12 text-sm font-medium rounded-xl ${className}`}
    >
      {value}
    </Button>
  );

  const BaseButton = ({ value }: { value: NumberBase }) => (
    <Button
      onClick={() => {
        setBase(value);
        onButtonClick(`BASE:${value}`);
      }}
      variant={base === value ? "default" : "secondary"}
      className="h-10 text-xs rounded-lg"
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
        <Button onClick={onClear} variant="secondary" className="h-12 text-sm rounded-xl col-span-2">C</Button>
        <Button onClick={onDelete} variant="secondary" className="h-12 text-sm rounded-xl">⌫</Button>
        <CalcButton value="AND" />
        <CalcButton value="OR" />

        <CalcButton value="A" disabled={base === "DEC" || base === "OCT" || base === "BIN"} />
        <CalcButton value="B" disabled={base === "DEC" || base === "OCT" || base === "BIN"} />
        <CalcButton value="C" disabled={base === "DEC" || base === "OCT" || base === "BIN"} />
        <CalcButton value="XOR" />
        <CalcButton value="NOT" />

        <CalcButton value="D" disabled={base === "DEC" || base === "OCT" || base === "BIN"} />
        <CalcButton value="E" disabled={base === "DEC" || base === "OCT" || base === "BIN"} />
        <CalcButton value="F" disabled={base === "DEC" || base === "OCT" || base === "BIN"} />
        <CalcButton value="<<" />
        <CalcButton value=">>" />

        <CalcButton value="7" disabled={base === "BIN"} />
        <CalcButton value="8" disabled={base === "BIN" || base === "OCT"} />
        <CalcButton value="9" disabled={base === "BIN" || base === "OCT"} />
        <CalcButton value="/" />
        <CalcButton value="*" />

        <CalcButton value="4" disabled={base === "BIN"} />
        <CalcButton value="5" disabled={base === "BIN"} />
        <CalcButton value="6" disabled={base === "BIN"} />
        <CalcButton value="-" />
        <CalcButton value="+" />

        <CalcButton value="1" disabled={base === "BIN"} />
        <CalcButton value="2" disabled={base === "BIN"} />
        <CalcButton value="3" disabled={base === "BIN"} />
        <CalcButton value="0" className="col-span-2" />

        <Button onClick={onEquals} variant="default" className="col-span-5 h-12 text-sm rounded-xl bg-calc-operator hover:bg-calc-operator-hover">
          = (Enter)
        </Button>
      </div>
    </div>
  );
};
