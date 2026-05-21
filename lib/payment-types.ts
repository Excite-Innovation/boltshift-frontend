import type { ReactNode } from "react";

export type SavedPaymentCard = {
  id: string;
  brand: string;
  holder: string;
  expiry: string;
  number: string;
  cvv: string;
  isDefault?: boolean;
};

export type PaymentCardProps = {
  cards?: SavedPaymentCard[];
  defaultSelectedCardId?: string;
  step?: ReactNode;
  title?: string;
  className?: string;
};
