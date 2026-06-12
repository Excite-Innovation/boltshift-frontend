"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Download } from "lucide-react";

export function OrdersTableFooter() {
  return (
    <div
      className="
        flex w-full min-w-0 flex-col gap-4 border-t px-6 py-6.5
        md:flex-row md:items-center md:justify-between
      "
    >
      {/* Left: Pagination */}
      <Pagination className="w-full min-w-0 md:w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Right: Download */}
      <Button className="w-full min-w-0 md:w-auto">
        <Download className="h-4 w-4" />
        Download
      </Button>
    </div>
  );
}
