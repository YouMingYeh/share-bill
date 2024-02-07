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

export const defaultUrl = process.env.SITE_URL
  ? `${process.env.SITE_URL}`
  : "http://localhost:3000";

export function isStringDefined(str: string | undefined | null): boolean {
  return (
    str !== undefined && str !== null && str !== "undefined" && str !== "null"
  );
}

export function calculatePayments(members: Member[]): Payment[] {
  let payers: Member[] = members.filter((member) => member.balance < 0);
  let receivers: Member[] = members.filter((member) => member.balance > 0);
  let payments: Payment[] = [];

  payers.forEach((payer) => {
    while (payer.balance < 0) {
      for (let receiver of receivers) {
        if (receiver.balance > 0) {
          const amount = Math.min(-payer.balance, receiver.balance);
          payments.push({ payer: payer, payee: receiver, amount });
          payer.balance += amount;
          receiver.balance -= amount;
          if (payer.balance >= 0) break;
        }
      }
    }
  });

  return payments;
}
