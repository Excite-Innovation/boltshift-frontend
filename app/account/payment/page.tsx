import { SectionHeadings } from "@/components/accounts/section-headings";
import { PaymentCard } from "@/components/payment-card/payment-card";
import { paymentCardExamples } from "@/components/payment-card/lib/payment-card-examples";

export function Payment() {
  return (
    <div className="flex min-w-0 flex-col gap-8 py-4">
      <SectionHeadings
        icon="/account/shield-dollar.png"
        title="Payment Method"
        alt="dollar shield icon"
      />

      <PaymentCard
        cards={paymentCardExamples}
        defaultSelectedCardId={paymentCardExamples[1]?.id}
        defaultHideCardNumbers
        step={4}
        title="Payment Method"
        showHeader={false}
      />
    </div>
  );
}

export default Payment;
