import type { ReactNode } from "react";

export type SavedPaymentCard = {
  id: string;
  brand: string;
  holder: string;
  expiry: string;
  number: string;
  cvv: string;
  isDefault?: boolean;
  backgroundColor?: string;
  backgroundGradient?: string;
  merchantName?: string;
  merchantIcon?: ReactNode;
  hideNumber?: boolean;
};

export type PaymentCardProps = {
  cards?: SavedPaymentCard[];
  onRemoveCard?: (cardId: string) => void;
  onSetDefaultCard?: (cardId: string) => void;
  onUpdateCard?: (card: SavedPaymentCard) => void;
  defaultSelectedCardId?: string;
  defaultHideCardNumbers?: boolean;
  step?: ReactNode;
  title?: string;
  className?: string;
};
