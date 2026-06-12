"use client";

import { Eye, ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { Order } from "@/types/orders/types";
import { OrderStatusBadge } from "@/components/accounts/orders/order-status-badge";

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",

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

    header: "Order No.",
  },

  {
    accessorKey: "items",

    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2"
      >
        Items
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
  },

  {
    accessorKey: "cost",

    header: "Cost",

    cell: ({ row }) => `Ksh. ${row.original.cost.toLocaleString()}`,
  },

  {
    accessorKey: "status",

    header: "Status",

    cell: () => <OrderStatusBadge />,
  },

  {
    accessorKey: "createdAt",

    header: "Date Created",
  },

  {
    accessorKey: "deliveryDate",

    header: "Delivery Date",
  },

  {
    id: "view",

    header: "View",

    cell: () => <Eye className="h-4 w-4 text-muted-foreground" />,
  },
];
