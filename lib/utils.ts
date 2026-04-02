import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ProductVariant } from "./type"

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