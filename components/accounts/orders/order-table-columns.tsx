"use client";

import { Eye, ArrowDown } from "lucide-react";
import { ColumnDef, type Column } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

import { Order } from "@/types/orders/types";
import { OrderStatusBadge } from "@/components/accounts/orders/order-status-badge";

function SortHeader({
  column,
  label,
}: {
  column: Column<Order, unknown>;
  label: string;
}) {
  const isSorted = column.getIsSorted();

  return (
    <button
      type="button"
      onClick={() => column.toggleSorting(isSorted === "asc")}
      className="flex items-center gap-2 transition-colors hover:text-foreground"
    >
      <span>{label}</span>
      <ArrowDown
        className={cn(
          "h-4 w-4 transition-transform",
          isSorted === "asc" && "rotate-180",
          isSorted ? "text-foreground" : "text-muted-foreground",
        )}
      />
    </button>
  );
}

function parseDateValue(value: string) {
  const match = value.match(
    /^([A-Za-z]{3,9})\s+(\d+)(?:st|nd|rd|th)?,\s*(\d{4})$/,
  );

  if (!match) {
    const fallback = Date.parse(value);
    return Number.isNaN(fallback) ? 0 : fallback;
  }

  const [, monthName, day, year] = match;
  const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();
  const parsed = new Date(Number(year), monthIndex, Number(day)).getTime();

  return Number.isNaN(parsed) ? 0 : parsed;
}

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    enableSorting: false,

    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },

  {
    accessorKey: "id",

    header: ({ column }) => <SortHeader column={column} label="Order No." />,
  },

  {
    accessorKey: "items",

    header: ({ column }) => <SortHeader column={column} label="Items" />,
  },

  {
    accessorKey: "cost",

    header: ({ column }) => <SortHeader column={column} label="Cost" />,

    cell: ({ row }) => `Ksh. ${row.original.cost.toLocaleString()}`,
  },

  {
    accessorKey: "status",
    enableSorting: false,

    header: "Status",

    cell: () => <OrderStatusBadge />,
  },

  {
    accessorKey: "createdAt",

    header: ({ column }) => (
      <SortHeader column={column} label="Date Created" />
    ),
    sortingFn: (rowA, rowB, columnId) =>
      parseDateValue(rowA.getValue<string>(columnId)) -
      parseDateValue(rowB.getValue<string>(columnId)),
  },

  {
    accessorKey: "deliveryDate",

    header: ({ column }) => (
      <SortHeader column={column} label="Delivery Date" />
    ),
    sortingFn: (rowA, rowB, columnId) =>
      parseDateValue(rowA.getValue<string>(columnId)) -
      parseDateValue(rowB.getValue<string>(columnId)),
  },

  {
    id: "view",
    enableSorting: false,

    header: "View",

    cell: () => <Eye className="h-4 w-4 text-muted-foreground" />,
  },
];
