"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [internalValue, setInternalValue] = React.useState<
    DateRange | undefined
  >(value);

  const dateRange = value ?? internalValue;

  const handleChange = (range: DateRange | undefined) => {
    setInternalValue(range);
    onChange?.(range);
  };

  const displayValue = dateRange?.from
    ? dateRange.to
      ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(
          dateRange.to,
          "MMM d, yyyy",
        )}`
      : format(dateRange.from, "MMM d, yyyy")
    : "";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative w-full cursor-pointer">
          <Input
            readOnly
            value={displayValue}
            placeholder="Select date range"
            className="h-11 cursor-pointer pr-10"
          />

          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={handleChange}
          numberOfMonths={2}
          defaultMonth={dateRange?.from}
        />
      </PopoverContent>
    </Popover>
  );
}
