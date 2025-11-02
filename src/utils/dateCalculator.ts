import { addDays, differenceInDays, format, parse } from "date-fns";

export const calculateDateDifference = (date1: string, date2: string): string => {
  try {
    const d1 = parse(date1, "yyyy-MM-dd", new Date());
    const d2 = parse(date2, "yyyy-MM-dd", new Date());
    const days = Math.abs(differenceInDays(d2, d1));
    const years = Math.floor(days / 365);
    const remainingDays = days % 365;
    const months = Math.floor(remainingDays / 30);
    const finalDays = remainingDays % 30;
    
    return `${years}y ${months}m ${finalDays}d (${days} total days)`;
  } catch (error) {
    return "Invalid date";
  }
};

export const addDaysToDate = (dateStr: string, days: number): string => {
  try {
    const date = parse(dateStr, "yyyy-MM-dd", new Date());
    const newDate = addDays(date, days);
    return format(newDate, "yyyy-MM-dd");
  } catch (error) {
    return "Invalid date";
  }
};
