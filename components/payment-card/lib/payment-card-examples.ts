import type { SavedPaymentCard } from "@/types/payment/payment-types";

export const paymentCardExamples: SavedPaymentCard[] = [
  {
    id: "apple-pay-primary",
    brand: "ApplePay",
    holder: "DENIL ANYONYI",
    expiry: "08/26",
    number: "4321 4321 4321 4321",
    cvv: "483",
    isDefault: true,
    backgroundColor: "#3d434e",
    merchantName: "Apple Pay",
  },
  {
    id: "absa-pay",
    brand: "Absa Bank",
    holder: "DENIL ANYONYI",
    expiry: "08/26",
    number: "4321 4321 4321 4321",
    cvv: "219",
    backgroundColor: "#AC113D",
    merchantName: "Apple Pay",
  },
  {
    id: "mpesa-global-pay",
    brand: "Standard Chartered",
    holder: "DENIL ANYONYI",
    expiry: "08/26",
    number: "4321 4321 4321 4321",
    cvv: "617",
    backgroundColor: "#1F5DF3",
    merchantName: "Apple Pay",
  },
];
