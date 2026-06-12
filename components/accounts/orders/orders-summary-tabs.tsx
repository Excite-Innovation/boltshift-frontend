"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <Tabs
      defaultValue="All"
      className="min-w-0 w-full bg-muted-foreground/5 pl-6 pt-4"
    >
      <div className="min-w-0 w-full overflow-x-auto scroll-smooth scrollbar-hide">
        <TabsList variant="line" className="h-8 gap-5 whitespace-nowrap">
          {stats.map((stat) => (
            <TabsTrigger
              key={stat.label}
              value={stat.label}
              className={cn(
                "flex-none! shrink-0 gap-2 text-sm whitespace-nowrap",
                "data-[state=active]:shadow-none data-[state=active]:bg-transparent",
                "after:bg-[#1570EF]",
              )}
            >
              <span
                className={cn(
                  "rounded-md px-2 py-1 text-xs font-medium",
                  stat.color,
                )}
              >
                {stat.value}
              </span>
              <span>{stat.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  );
}
