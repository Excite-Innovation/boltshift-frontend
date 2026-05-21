import { PaymentCard } from "@/components/payment-card/payment-card";
import { paymentCardExamples } from "@/components/payment-card/lib/payment-card-examples";

export function PaymentMethodCard() {
  return (
    <PaymentCard
      cards={paymentCardExamples}
      defaultSelectedCardId={paymentCardExamples[1]?.id}
      defaultHideCardNumbers
      step={4}
      title="Payment Method"
    />
  );
}
