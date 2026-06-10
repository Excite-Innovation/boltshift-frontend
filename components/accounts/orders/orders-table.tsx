"use client";

import * as React from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { columns } from "./order-table-columns";
import { Order } from "@/types/orders/types";

interface Props {
  data: Order[];
}

export function OrdersTable({
  data,
}: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel:
      getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden">
      <Table>
        <TableHeader>
          {table
            .getHeaderGroups()
            .map((group) => (
              <TableRow key={group.id}>
                {group.headers.map(
                  (header) => (
                    <TableHead
                      key={header.id}
                    >
                      {flexRender(
                        header.column
                          .columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  )
                )}
              </TableRow>
            ))}
        </TableHeader>

        <TableBody>
          {table
            .getRowModel()
            .rows.map((row) => (
              <TableRow key={row.id}>
                {row
                  .getVisibleCells()
                  .map((cell) => (
                    <TableCell
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column
                          .columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}