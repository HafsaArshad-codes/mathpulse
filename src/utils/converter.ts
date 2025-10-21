export type UnitCategory = "length" | "weight" | "temperature" | "volume" | "data";

export interface ConversionUnit {
  name: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export const conversionUnits: Record<UnitCategory, Record<string, ConversionUnit>> = {
  length: {
    Meters: {
      name: "Meters",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    Kilometers: {
      name: "Kilometers",
      toBase: (v) => v * 1000,
      fromBase: (v) => v / 1000,
    },
    Centimeters: {
      name: "Centimeters",
      toBase: (v) => v / 100,
      fromBase: (v) => v * 100,
    },
    Miles: {
      name: "Miles",
      toBase: (v) => v * 1609.34,
      fromBase: (v) => v / 1609.34,
    },
    Feet: {
      name: "Feet",
      toBase: (v) => v * 0.3048,
      fromBase: (v) => v / 0.3048,
    },
    Inches: {
      name: "Inches",
      toBase: (v) => v * 0.0254,
      fromBase: (v) => v / 0.0254,
    },
  },
  weight: {
    Kilograms: {
      name: "Kilograms",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    Grams: {
      name: "Grams",
      toBase: (v) => v / 1000,
      fromBase: (v) => v * 1000,
    },
    Pounds: {
      name: "Pounds",
      toBase: (v) => v * 0.453592,
      fromBase: (v) => v / 0.453592,
    },
    Ounces: {
      name: "Ounces",
      toBase: (v) => v * 0.0283495,
      fromBase: (v) => v / 0.0283495,
    },
  },
  temperature: {
    Celsius: {
      name: "Celsius",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    Fahrenheit: {
      name: "Fahrenheit",
      toBase: (v) => (v - 32) * 5 / 9,
      fromBase: (v) => (v * 9 / 5) + 32,
    },
    Kelvin: {
      name: "Kelvin",
      toBase: (v) => v - 273.15,
      fromBase: (v) => v + 273.15,
    },
  },
  volume: {
    Liters: {
      name: "Liters",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    Milliliters: {
      name: "Milliliters",
      toBase: (v) => v / 1000,
      fromBase: (v) => v * 1000,
    },
    Gallons: {
      name: "Gallons",
      toBase: (v) => v * 3.78541,
      fromBase: (v) => v / 3.78541,
    },
  },
  data: {
    Bytes: {
      name: "Bytes",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    Kilobytes: {
      name: "Kilobytes",
      toBase: (v) => v * 1024,
      fromBase: (v) => v / 1024,
    },
    Megabytes: {
      name: "Megabytes",
      toBase: (v) => v * 1024 * 1024,
      fromBase: (v) => v / (1024 * 1024),
    },
    Gigabytes: {
      name: "Gigabytes",
      toBase: (v) => v * 1024 * 1024 * 1024,
      fromBase: (v) => v / (1024 * 1024 * 1024),
    },
  },
};

// Unit abbreviations mapping
export const unitAbbreviations: Record<string, string> = {
  Meters: "m",
  Kilometers: "km",
  Centimeters: "cm",
  Miles: "mi",
  Feet: "ft",
  Inches: "in",
  Kilograms: "kg",
  Grams: "g",
  Pounds: "lb",
  Ounces: "oz",
  Celsius: "°C",
  Fahrenheit: "°F",
  Kelvin: "K",
  Liters: "L",
  Milliliters: "mL",
  Gallons: "gal",
  Bytes: "B",
  Kilobytes: "KB",
  Megabytes: "MB",
  Gigabytes: "GB",
};

export const getUnitAbbreviation = (unitName: string): string => {
  return unitAbbreviations[unitName] || unitName;
};

export const convert = (
  value: number,
  fromUnit: string,
  toUnit: string,
  category: UnitCategory
): number => {
  const units = conversionUnits[category];
  const from = units[fromUnit];
  const to = units[toUnit];
  
  if (!from || !to) return 0;
  
  const baseValue = from.toBase(value);
  return to.fromBase(baseValue);
};
