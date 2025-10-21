import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateDateDifference, addDaysToDate } from "@/utils/dateCalculator";

interface DateKeypadProps {
  onButtonClick: (value: string) => void;
  onClear: () => void;
}

export const DateKeypad = ({ onButtonClick, onClear }: DateKeypadProps) => {
  const [mode, setMode] = useState<"diff" | "add">("diff");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [days, setDays] = useState("");

  const handleCalculate = () => {
    if (mode === "diff" && date1 && date2) {
      const result = calculateDateDifference(date1, date2);
      const expression = `${date1} to ${date2}`;
      onButtonClick(`RESULT:${expression}|${result}`);
    } else if (mode === "add" && date1 && days) {
      const result = addDaysToDate(date1, parseInt(days));
      const expression = `${date1} + ${days} days`;
      onButtonClick(`RESULT:${expression}|${result}`);
    }
  };
  
  const handleClear = () => {
    setDate1("");
    setDate2("");
    setDays("");
    onClear();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => setMode("diff")}
          variant={mode === "diff" ? "default" : "secondary"}
          className="rounded-xl"
        >
          Date Difference
        </Button>
        <Button
          onClick={() => setMode("add")}
          variant={mode === "add" ? "default" : "secondary"}
          className="rounded-xl"
        >
          Add/Subtract Days
        </Button>
      </div>

      {mode === "diff" ? (
        <div className="space-y-4">
          <div>
            <Label htmlFor="date1">From Date</Label>
            <Input
              id="date1"
              type="date"
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="date2">To Date</Label>
            <Input
              id="date2"
              type="date"
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="daysToAdd">Days to Add/Subtract</Label>
            <Input
              id="daysToAdd"
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="Enter number (negative to subtract)"
              className="mt-1"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <Button onClick={handleClear} variant="secondary" className="rounded-xl h-12 text-lg font-medium">
          C
        </Button>
        <Button 
          onClick={handleCalculate} 
          className="rounded-xl h-16 text-xl font-bold bg-calc-operator hover:bg-calc-operator-hover text-white"
        >
          =
        </Button>
      </div>
    </div>
  );
};
