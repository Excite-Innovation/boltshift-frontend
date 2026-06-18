"use client";

import * as React from "react";
import {
  endOfMonth,
  endOfToday,
  endOfWeek,
  endOfYear,
  format,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYear,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import { ChevronDown } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
}

const presets = [
  "Today",
  "Yesterday",
  "This week",
  "Last week",
  "This month",
  "Last month",
  "This year",
  "Last year",
  "All time",
];

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [internalValue, setInternalValue] = React.useState<
    DateRange | undefined
  >(value);

  React.useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const dateRange = value ?? internalValue;

  const handleChange = (range: DateRange | undefined) => {
    setInternalValue(range);
    onChange?.(range);
  };

  const handlePreset = (preset: string) => {
    const today = startOfToday();
    const currentMonthStart = startOfMonth(today);
    const currentYearStart = startOfYear(today);
    const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
    const currentWeekEnd = endOfWeek(today, { weekStartsOn: 1 });

    switch (preset) {
      case "Today":
        handleChange({ from: today, to: endOfToday() });
        break;
      case "Yesterday": {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        handleChange({ from: yesterday, to: yesterday });
        break;
      }
      case "This week":
        handleChange({ from: currentWeekStart, to: currentWeekEnd });
        break;
      case "Last week":
        handleChange({
          from: subWeeks(currentWeekStart, 1),
          to: subWeeks(currentWeekEnd, 1),
        });
        break;
      case "This month":
        handleChange({ from: currentMonthStart, to: endOfMonth(today) });
        break;
      case "Last month":
        handleChange({
          from: startOfMonth(subMonths(today, 1)),
          to: endOfMonth(subMonths(today, 1)),
        });
        break;
      case "This year":
        handleChange({ from: currentYearStart, to: endOfYear(today) });
        break;
      case "Last year":
        handleChange({
          from: startOfYear(subYears(today, 1)),
          to: endOfYear(subYears(today, 1)),
        });
        break;
      case "All time":
        handleChange(undefined);
        break;
    }
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

      <PopoverContent
        align="end"
        className="w-auto border-0 bg-transparent p-0 shadow-none"
      >
        <Card className="overflow-hidden">
          <CardContent className="flex p-0">
            {/* Presets */}
            <div className="w-44 border-r py-2">
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePreset(preset)}
                  className="w-full px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Calendar */}
            <div className="p-3">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={handleChange}
                numberOfMonths={2}
                defaultMonth={dateRange?.from}
              />
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
