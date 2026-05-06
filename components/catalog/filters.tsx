"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { FilterItems } from "@/lib/filters";
import { SelectList } from "@/components/dropdown/select";
import { CollapsibleItem } from "@/components/dropdown/dropdown";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

const sortBy = ["Latest", "Oldest", "Popular"];

export function FilterSidebar(props: React.ComponentProps<typeof Sidebar>) {
  /** Incrementing this key forces all filter components to remount with fresh state. */
  const [resetKey, setResetKey] = useState(0);

  const clearAllFilters = () => setResetKey((prev) => prev + 1);

  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="relative border-none h-auto md:h-auto"
    >
      <SidebarContent className="bg-background pt-4 px-4 pb-12 gap-4 h-screen overflow-y-auto md:h-auto md:overflow-visible">
        <div className="flex flex-col gap-1">
          <p>Sort By</p>
          <SelectList list={sortBy} />
        </div>

        <SidebarGroup className="p-0" key={resetKey}>
          <SidebarMenu className="grid gap-4">
            {FilterItems.map((item) => (
              <CollapsibleItem key={item.title} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <FieldGroup key={`stock-${resetKey}`}>
          <Field orientation="horizontal" className="p-0">
            <FieldLabel
              htmlFor="switch-share"
              className="
                p-2 border-none cursor-pointer
                has-data-[state=checked]:border-none
                has-data-[state=checked]:bg-transparent
                dark:has-data-[state=checked]:bg-transparent
              "
            >
              <FieldContent>
                <FieldTitle className="text-xl font-semibold">
                  Only in Stock
                </FieldTitle>
              </FieldContent>
              <Switch id="switch-share" />
            </FieldLabel>
          </Field>
        </FieldGroup>

        <Button
          variant="destructive"
          className="w-full py-2.5 px-4.5 text-base font-semibold cursor-pointer"
          onClick={clearAllFilters}
        >
          <X />
          Clear All Filters
        </Button>
      </SidebarContent>
    </Sidebar>
  );
}
