export type NumberBase = "DEC" | "HEX" | "OCT" | "BIN";

export const convertBase = (value: string, fromBase: NumberBase, toBase: NumberBase): string => {
  try {
    let decimal: number;
    
    // Convert to decimal first
    switch (fromBase) {
      case "DEC":
        decimal = parseInt(value, 10);
        break;
      case "HEX":
        decimal = parseInt(value, 16);
        break;
      case "OCT":
        decimal = parseInt(value, 8);
        break;
      case "BIN":
        decimal = parseInt(value, 2);
        break;
      default:
        return "0";
    }

    if (isNaN(decimal)) return "0";

    // Convert from decimal to target base
    switch (toBase) {
      case "DEC":
        return decimal.toString(10);
      case "HEX":
        return decimal.toString(16).toUpperCase();
      case "OCT":
        return decimal.toString(8);
      case "BIN":
        return decimal.toString(2);
      default:
        return "0";
    }
  } catch (error) {
    return "Error";
  }
};

export const bitwiseOperation = (a: number, b: number, operation: string): number => {
  switch (operation) {
    case "AND":
      return a & b;
    case "OR":
      return a | b;
    case "XOR":
      return a ^ b;
    case "NOT":
      return ~a;
    case "<<":
      return a << b;
    case ">>":
      return a >> b;
    default:
      return 0;
  }
};
