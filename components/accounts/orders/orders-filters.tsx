"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Search, CircleX } from "lucide-react";

import { DateRangePicker } from "@/components/accounts/orders/date-range-input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

export function OrdersFilters() {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>();

  return (
    <div className="flex min-w-0 flex-col gap-3 border-b px-6 py-7 md:flex-row md:items-center">
      {/* Search */}
      <div className="min-w-0 flex-1">
        <InputGroup>
          {/* Left icon */}
          <InputGroupAddon>
            <Search className="h-4 w-4 text-muted-foreground" />
          </InputGroupAddon>

          {/* Input */}
          <InputGroupInput
            placeholder="Search orders"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Right clear button */}
          {search && (
            <InputGroupButton onClick={() => setSearch("")} type="button">
              <CircleX className="h-4 w-4 size-4 text-muted-foreground hover:text-foreground" />
            </InputGroupButton>
          )}
        </InputGroup>
      </div>

      {/* Select */}
      <div className="min-w-0 flex-1">
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>
    </div>
  );
}
