import { SectionHeadings } from "@/components/accounts/section-headings";
import { OrdersDashboard } from "@/components/accounts/orders/orders-dashboard";

export function Orders() {
  return (
    <div className="flex min-w-0 flex-col gap-8 py-4">
      <SectionHeadings
        icon="/account/shopping-bag-02.png"
        title="Orders"
        alt="Shopping bag icon"
      />

      {/* Data Grid */}
      <OrdersDashboard />
    </div>
  );
}

export default Orders;
