"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Minus, ChevronDown } from "lucide-react";
import { useState } from "react";

type ItemProps = {
  item: {
    title: string;
    type?: "list" | "checkbox";
    isActive?: boolean;
    items?: {
      title: string;
    }[];
  };
};

export function CollapsibleItem({ item }: ItemProps) {
  const [open, setOpen] = useState(!!item.isActive);

  return (
    <Collapsible
      key={item.title}
      open={open}
      onOpenChange={setOpen}
      defaultOpen={item.isActive}
      asChild
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            className="p-2 flex justify-between"
          >
            <span className="text-xl font-semibold">{item.title}</span>
            {open ? (
              <Minus className="size-4 transition-transform delay-700" />
            ) : (
              <Plus className="size-4 transition-transform delay-700" />
            )}
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent asChild>
          <SidebarMenuSub>
            {item.items?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                {item.type === "checkbox" ? (
                  // Checkbox version (Brands)
                  <div className="flex items-center gap-1 p-2">
                    <Checkbox id={subItem.title} />
                    <label
                      htmlFor={subItem.title}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {subItem.title}
                    </label>
                  </div>
                ) : (
                  <SidebarMenuSubButton className="flex items-center justify-between w-full">
                    <span className="text-md font-medium">{subItem.title}</span>
                    <ChevronDown
                      className={`size-4 transition-transform duration-200 ${
                        open ? "rotate-0" : "rotate-180"
                      }`}
                    />
                  </SidebarMenuSubButton>
                )}
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
