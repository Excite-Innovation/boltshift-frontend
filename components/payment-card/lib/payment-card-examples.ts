import type { SavedPaymentCard } from "@/types/payment/payment-types";

export const paymentCardExamples: SavedPaymentCard[] = [
  {
    id: "apple-pay-primary",
    brand: "ApplePay",
    holder: "PAUL MBINGU",
    expiry: "08/26",
    number: "4321 4321 4321 4321",
    cvv: "483",
    isDefault: true,
    backgroundColor: "#3d434e",
    merchantName: "Apple Pay",
  },
  {
    id: "apple-pay-backup",
    brand: "ApplePay",
    holder: "PAUL MBINGU",
    expiry: "08/26",
    number: "4321 4321 4321 4321",
    cvv: "219",
    backgroundColor: "#3d434e",
    merchantName: "Apple Pay",
  },
];
