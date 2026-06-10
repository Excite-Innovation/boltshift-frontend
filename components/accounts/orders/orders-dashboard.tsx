import { orders } from "@/lib/mock-orders";

import { OrdersFilters } from "./orders-filters";
import { OrdersSummaryTabs } from "./orders-summary-tabs";
import { OrdersTable } from "./orders-table";

export function OrdersDashboard() {
  return (
    <div className="rounded-2xl border bg-background overflow-hidden">
      <OrdersSummaryTabs />

      <OrdersFilters />

      <OrdersTable data={orders} />
    </div>
  );
}
