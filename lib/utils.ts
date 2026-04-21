import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ProductVariant } from "../types/type"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function EditNum(num: number): string {
  return num.toLocaleString('en-US')
}

export function GetRatio(variant: ProductVariant) {
  switch (variant) {
    case "wide":
      return 21 / 10;
    case "centered":
      return 9 / 8;
    default:
      return 1 / 1;
  }
}

type FormatOptions = {
  decimals?: number;
};

export function FormatNumber(
  value: number,
  options: FormatOptions = {}
): string {
  const { decimals = 2 } = options;

  const abs = Math.abs(value);

  if (abs < 1000) return value.toString();

  if (abs < 1_000_000) {
    const result = value / 1000;
    return `${parseFloat(result.toFixed(decimals))}k`;
  }

  const result = value / 1_000_000;
  return `${parseFloat(result.toFixed(decimals))}M`;
}

export const clampToPositive = (value: string) => {
  const num = Number(value);
  if (isNaN(num)) return "";
  return Math.max(0, num).toString();
};

export const enforceRangeOrder = (min: string, max: string) => {
  const minNum = Number(min);
  const maxNum = Number(max);

  if (!min || !max) return { min, max };

  if (maxNum < minNum) {
    return { min, max: min }; // snap max to min
  }

  return { min, max };
};
