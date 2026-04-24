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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Minus, ChevronDown } from "lucide-react";
import { clampToPositive, enforceRangeOrder } from "@/lib/utils";
import { StartRating } from "@/components/rating/rating";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import type { FilterItem } from "@/lib/filters";
import Link from "next/link";

type ItemProps = {
  item: FilterItem;
};

export function CollapsibleItem({ item }: ItemProps) {
  const [open, setOpen] = useState(!!item.isActive);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(
      (prev) =>
        prev.includes(tag)
          ? prev.filter((t) => t !== tag) // remove
          : [...prev, tag], // add
    );
  };

  const renderRange = () => (
    <SidebarMenuSub>
      <SidebarMenuSubItem className="cursor-pointer border-l-0">
        <div className="flex w-full items-end pl-2 gap-1.5">
          <div className="flex flex-col gap-1 w-full">
            <span className="text-xs font-medium text-muted-foreground">
              Min
            </span>
            <Input
              placeholder="Kshs."
              value={min}
              type="number"
              onChange={(e) => {
                const value = clampToPositive(e.target.value);
                const updated = enforceRangeOrder(value, max);
                setMin(updated.min);
                setMax(updated.max);
              }}
            />
          </div>

          <span className="pb-2 text-muted-foreground">-</span>

          <div className="flex flex-col gap-1 w-full">
            <span className="text-xs font-medium text-muted-foreground">
              Max
            </span>
            <Input
              placeholder="Kshs."
              value={max}
              type="number"
              onChange={(e) => {
                const value = clampToPositive(e.target.value);
                const updated = enforceRangeOrder(min, value);
                setMin(updated.min);
                setMax(updated.max);
              }}
            />
          </div>
        </div>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  );

  const renderRating = () => (
    <SidebarMenuSub>
      {[5, 4, 3, 2, 1].map((rating) => (
        <SidebarMenuSubItem key={rating} className="cursor-pointer border-l-0">
          <div className="w-full flex gap-2 py-1 px-2">
            <Checkbox id={`rating-${rating}`} className="cursor-pointer" />

            <label
              htmlFor={`rating-${rating}`}
              className="flex items-center gap-2 text-sm font-medium cursor-pointer"
            >
              {<StartRating value={rating} readonly />}
              <span className="grow text-sm font-medium text-muted-foreground ml-1">
                {rating} Stars
              </span>
            </label>
          </div>
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  );

  const renderTags = () => (
    <SidebarMenuSub className="p-2 flex flex-row gap-2 flex-wrap">
      {item.items?.map((tag) => {
        const isActive = selectedTags.includes(tag.title);

        return (
          <Badge
            key={tag.title}
            variant={isActive ? "default" : "outline"}
            className={`cursor-pointer transition-colors px-3 py-1 rounded-full
            ${isActive ? "bg-primary text-primary-foreground" : ""}
          `}
            onClick={() => toggleTag(tag.title)}
          >
            {tag.title}
          </Badge>
        );
      })}
    </SidebarMenuSub>
  );

  const renderItems = () => (
    <SidebarMenuSub>
      {item.items?.map((subItem) => {
        const isOpen = openCategory === subItem.slug;

        return (
          <div key={subItem.title}>
            <SidebarMenuSubItem className="cursor-pointer border-l-0">
              {item.type === "checkbox" ? (
                <div className="w-full flex items-center gap-1 p-2">
                  <Checkbox id={subItem.title} className="cursor-pointer" />
                  <label
                    htmlFor={subItem.title}
                    className="grow text-sm font-medium cursor-pointer"
                  >
                    {subItem.title}
                  </label>
                </div>
              ) : (
                <SidebarMenuSubButton
                  onClick={() => {
                    const slug = subItem.slug ?? null;
                    setOpenCategory(isOpen ? null : slug);
                  }}
                  className="flex items-center justify-between w-full cursor-pointer"
                >
                  <span className="text-md font-medium">{subItem.title}</span>

                  <ChevronDown
                    className={`size-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </SidebarMenuSubButton>
              )}
            </SidebarMenuSubItem>

            {isOpen && subItem.subcategories?.length ? (
              <div className="pl-6 py-1 flex flex-col gap-1">
                {subItem.subcategories.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/catalog/${subItem.title}/${sub.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </SidebarMenuSub>
  );

  return (
    <Collapsible
      key={item.title}
      open={open}
      onOpenChange={setOpen}
      defaultOpen={item.isActive}
      asChild
      className="group/collapsible"
    >
      <SidebarMenuItem className="flex flex-col gap-3">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            className="p-2 flex justify-between cursor-pointer"
          >
            <span className="text-xl font-semibold">{item.title}</span>
            {open ? (
              <Minus className="size-4 transition-transform delay-700" />
            ) : (
              <Plus className="size-4 transition-transform delay-700" />
            )}
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent asChild className="m-0 border-none">
          {item.type === "range"
            ? renderRange()
            : item.type === "rating"
              ? renderRating()
              : item.type === "tag"
                ? renderTags()
                : renderItems()}
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
