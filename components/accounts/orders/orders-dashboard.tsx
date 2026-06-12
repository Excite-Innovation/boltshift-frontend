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
        <div className="min-w-0 w-full max-w-full overflow-hidden rounded-2xl border bg-background">
          <OrdersSummaryTabs />

          <OrdersFilters />

          {/* only the table scrolls horizontally */}
          <div className="w-full overflow-x-auto">
            <OrdersTable data={orders} />
          </div>

          <OrdersTableFooter />
        </div>
      ) : (
        <EmptyOrderPage />
      )}
    </>
  );
}
