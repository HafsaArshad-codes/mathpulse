import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { convert, conversionUnits, UnitCategory, getUnitAbbreviation } from "@/utils/converter";

interface ConverterKeypadProps {
  onButtonClick: (value: string) => void;
  onClear: () => void;
}

export const ConverterKeypad = ({ onButtonClick, onClear }: ConverterKeypadProps) => {
  const [category, setCategory] = useState<UnitCategory>("length");
  const [fromUnit, setFromUnit] = useState("Meters");
  const [toUnit, setToUnit] = useState("Kilometers");
  const [value, setValue] = useState("");

  const handleConvert = () => {
    if (!value) return;
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    const result = convert(numValue, fromUnit, toUnit, category);
    const fromAbbr = getUnitAbbreviation(fromUnit);
    const toAbbr = getUnitAbbreviation(toUnit);
    
    // Format: RESULT:expression|result
    const expression = `${numValue} ${fromAbbr} = ${result.toFixed(2)} ${toAbbr}`;
    const resultOnly = `${result.toFixed(2)} ${toAbbr}`;
    
    onButtonClick(`RESULT:${expression}|${resultOnly}`);
  };
  
  const handleClear = () => {
    setValue("");
    onClear();
  };

  const units = Object.keys(conversionUnits[category]);

  return (
    <div className="space-y-4">
      <div>
        <Label>Category</Label>
        <Select value={category} onValueChange={(val) => {
          setCategory(val as UnitCategory);
          const newUnits = Object.keys(conversionUnits[val as UnitCategory]);
          setFromUnit(newUnits[0]);
          setToUnit(newUnits[1] || newUnits[0]);
        }}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="length">Length</SelectItem>
            <SelectItem value="weight">Weight</SelectItem>
            <SelectItem value="temperature">Temperature</SelectItem>
            <SelectItem value="volume">Volume</SelectItem>
            <SelectItem value="data">Data</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="value">Value</Label>
        <Input
          id="value"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          className="mt-1"
        />
      </div>

      <div>
        <Label>From</Label>
        <Select value={fromUnit} onValueChange={setFromUnit}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {units.map((unit) => (
              <SelectItem key={unit} value={unit}>{unit}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>To</Label>
        <Select value={toUnit} onValueChange={setToUnit}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {units.map((unit) => (
              <SelectItem key={unit} value={unit}>{unit}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button onClick={handleClear} variant="secondary" className="h-16 text-lg font-medium">
          C
        </Button>
        <Button 
          onClick={handleConvert} 
          className="h-16 text-xl font-bold bg-calc-operator hover:bg-calc-operator-hover text-white"
        >
          =
        </Button>
      </div>
    </div>
  );
};
