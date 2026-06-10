"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stats = [
  { label: "All", value: 100, color: "bg-blue-100 text-blue-600" },
  { label: "Ongoing", value: 20, color: "bg-pink-100 text-pink-600" },
  { label: "Completed", value: 20, color: "bg-green-100 text-green-600" },
  { label: "Pending", value: 20, color: "bg-orange-100 text-orange-600" },
  { label: "Canceled", value: 20, color: "bg-red-100 text-red-600" },
  {
    label: "Returns & Refunds",
    value: 20,
    color: "bg-gray-100 text-gray-600",
  },
];

export function OrdersSummaryTabs() {
  return (
    <Tabs defaultValue="All" className="w-full bg-muted-foreground/5 pr-2.5 pl-6 pt-4">
      <TabsList className="flex flex-wrap gap-5 bg-transparent h-auto p-0">
        {stats.map((stat) => (
          <TabsTrigger
            key={stat.label}
            value={stat.label}
            className={cn(
              "relative flex items-center gap-2 pt-1 text-sm",
              "data-[state=active]:shadow-none data-[state=active]:bg-transparent",
              "after:absolute after:-bottom-4 after:left-0 after:h-1 after:w-full after:bg-[#1570EF]",
              "after:opacity-0 data-[state=active]:after:opacity-100",
            )}
          >
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 p-0 border-0 shadow-none"
            >
              <span
                className={cn(
                  "rounded-md px-2 py-1 text-xs font-medium",
                  stat.color,
                )}
              >
                {stat.value}
              </span>
              {stat.label}
            </Button>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
