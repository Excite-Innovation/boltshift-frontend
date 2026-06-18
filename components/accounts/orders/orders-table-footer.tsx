"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
} from "lucide-react";
import { type Table as ReactTable } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order } from "@/types/orders/types";

interface Props {
  table: ReactTable<Order>;
}

function getRowRange(table: ReactTable<Order>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  if (pageSize <= 0) {
    return "0-0 of 0";
  }

  const start = pageIndex * pageSize + 1;
  const end = (pageIndex + 1) * pageSize;

  return `${start}-${end} of ${end}`;
}

export function OrdersTableFooter({ table }: Props) {
  const pageSize = table.getState().pagination.pageSize;

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t px-6 py-6.5 md:flex-row">
      <div className="flex items-center justify-start gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>

          <Select
            value={String(pageSize)}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
              table.setPageIndex(0);
            }}
          >
            <SelectTrigger className="h-auto min-w-0 border-0 bg-transparent p-0 font-medium text-foreground shadow-none hover:bg-transparent focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="font-medium text-foreground">{getRowRange(table)}</div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button className="w-full min-w-0 md:w-auto">
        <Download className="h-4 w-4" />
        Download
      </Button>
    </div>
  );
}
