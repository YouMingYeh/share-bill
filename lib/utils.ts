import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function translateType(type: string) {
  switch (type) {
    case "normal":
      return "一般";
    case "food":
      return "吃飯";
    case "casual":
      return "休閒";
    case "trip":
      return "旅遊";
    case "other":
      return "其他";
    default:
      return "一般";
  }
}

export const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";
