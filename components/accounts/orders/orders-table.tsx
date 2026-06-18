"use client";

import { flexRender, type Table as ReactTable } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import { Order } from "@/types/orders/types";

interface Props {
  table: ReactTable<Order>;
}

export function OrdersTable({ table }: Props) {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-max">
        <TableHeader className="border-0">
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id} className="border-0 bg-muted-foreground/5">
              {group.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className={cn(
                "h-18 border-0",
                row.getIsSelected() && "bg-muted-foreground/5",
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
