import { Calculator, FlaskConical, Binary, CalendarDays, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalculatorMode } from "../Calculator";

interface ModeSidebarProps {
  currentMode: CalculatorMode;
  onModeChange: (mode: CalculatorMode) => void;
}

export const ModeSidebar = ({ currentMode, onModeChange }: ModeSidebarProps) => {
  const modes: { id: CalculatorMode; label: string; icon: React.ReactNode }[] = [
    { id: "standard", label: "Standard", icon: <Calculator className="w-5 h-5" /> },
    { id: "scientific", label: "Scientific", icon: <FlaskConical className="w-5 h-5" /> },
    { id: "programmer", label: "Programmer", icon: <Binary className="w-5 h-5" /> },
    { id: "date", label: "Date", icon: <CalendarDays className="w-5 h-5" /> },
    { id: "converter", label: "Converter", icon: <Ruler className="w-5 h-5" /> },
  ];

  return (
    <div className="w-64 border-r border-border bg-card p-4 flex flex-col gap-2">
      <h2 className="text-xl font-bold mb-4 text-foreground">MathPulse</h2>
      <p className="text-sm text-muted-foreground mb-4">MathPulse is a free online multipurpose calculator for students and everyday users. Easily calculate percentages, BMI, grades, and more in one place.</p>
      {modes.map((mode) => (
        <Button
          key={mode.id}
          variant={currentMode === mode.id ? "default" : "ghost"}
          className="justify-start gap-3 h-12 rounded-xl"
          onClick={() => onModeChange(mode.id)}
        >
          {mode.icon}
          <span>{mode.label}</span>
        </Button>
      ))}
    </div>
  );
};
