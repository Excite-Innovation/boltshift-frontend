import { SectionHeadings } from "@/components/accounts/section-headings";
import { PaymentMethodCard } from "@/components/checkout/payment-method";

export function Payment() {
  return (
    <div className="flex min-w-0 flex-col gap-8 py-4">
      <SectionHeadings
        icon="/account/shield-dollar.png"
        title="Payment Method"
        alt="dollar shield icon"
      />

      <PaymentMethodCard />
    </div>
  );
}

export default Payment;
