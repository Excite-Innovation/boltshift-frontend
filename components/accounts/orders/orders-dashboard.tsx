"use client";

import * as React from "react";

import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { orders } from "@/lib/mock-orders";

import { OrdersFilters } from "@/components/accounts/orders/orders-filters";
import { columns } from "@/components/accounts/orders/order-table-columns";
import { OrdersSummaryTabs } from "@/components/accounts/orders/orders-summary-tabs";
import { OrdersTable } from "@/components/accounts/orders/orders-table";
import { OrdersTableFooter } from "@/components/accounts/orders/orders-table-footer";
import { EmptyOrderPage } from "@/components/accounts/orders/empty-order-page";

export function OrdersDashboard() {
  const hasOrders = orders && orders.length > 0;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 100,
  });

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
  });

  return (
    <>
      {hasOrders ? (
        <div className="min-w-0 w-full max-w-full overflow-hidden rounded-2xl border bg-background">
          <OrdersSummaryTabs />

          <OrdersFilters />

          {/* only the table scrolls horizontally */}
          <div className="w-full overflow-x-auto">
            <OrdersTable table={table} />
          </div>

          <OrdersTableFooter table={table} />
        </div>
      ) : (
        <EmptyOrderPage />
      )}
    </>
  );
}
