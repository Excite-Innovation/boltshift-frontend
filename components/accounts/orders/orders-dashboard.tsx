import { orders } from "@/lib/mock-orders";

import { OrdersFilters } from "@/components/accounts/orders/orders-filters";
import { OrdersSummaryTabs } from "@/components/accounts/orders/orders-summary-tabs";
import { OrdersTable } from "@/components/accounts/orders/orders-table";
import { OrdersTableFooter } from "@/components/accounts/orders/orders-table-footer";
import { EmptyOrderPage } from "@/components/accounts/orders/empty-order-page";

export function OrdersDashboard() {
  const hasOrders = orders && orders.length > 0;

  return (
    <>
      {hasOrders ? (
        <div className="rounded-2xl border bg-background overflow-hidden">
          <OrdersSummaryTabs />

          <OrdersFilters />
          <OrdersTable data={orders} />

          <OrdersTableFooter />
        </div>
      ) : (
        <EmptyOrderPage />
      )}
    </>
  );
}
