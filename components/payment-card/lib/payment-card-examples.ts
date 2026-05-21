import type { SavedPaymentCard } from "@/lib/payment-types";

export const paymentCardExamples: SavedPaymentCard[] = [
  {
    id: "apple-pay-primary",
    brand: "ApplePay",
    holder: "PAUL MBINGU",
    expiry: "08/26",
    number: "4321 4321 4321 4321",
    cvv: "483",
    isDefault: true,
  },
  {
    id: "apple-pay-backup",
    brand: "ApplePay",
    holder: "PAUL MBINGU",
    expiry: "08/26",
    number: "4321 4321 4321 4321",
    cvv: "219",
  },
];
