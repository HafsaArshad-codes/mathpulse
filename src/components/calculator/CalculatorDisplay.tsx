import { CalculatorMode } from "../Calculator";

interface CalculatorDisplayProps {
  expression: string;
  result: string;
  mode: CalculatorMode;
}

export const CalculatorDisplay = ({ expression, result, mode }: CalculatorDisplayProps) => {
  return (
    <div className="bg-calc-display rounded-2xl p-6 shadow-lg">
      <div className="text-sm text-muted-foreground mb-2 capitalize">
        {mode} Calculator
      </div>
      <div className="text-right">
        <div className="text-lg text-muted-foreground min-h-8 break-all">
          {expression || " "}
        </div>
        <div className="text-5xl font-semibold text-foreground min-h-16 flex items-center justify-end break-all">
          {result || "0"}
        </div>
      </div>
    </div>
  );
};
