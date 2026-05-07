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

type ItemProps = {
  item: FilterItem;
  selectedValues: {
    ratings: string[];
    categories: string[];
    subcategories: string[];
    brands: string[];
    shipping: string[];
    tags: string[];
  };
  minPrice: string;
  maxPrice: string;
  onRangeChange: (min: string, max: string) => void;
  onToggleValue: (
    key: keyof ItemProps["selectedValues"],
    value: string,
  ) => void;
};

/**
 * A collapsible sidebar filter component that renders different filter UIs
 * (range inputs, star ratings, selectable tags, or nested category lists)
 * based on the `item.type` property. Expands/collapses with a +/- toggle.
 */
export function CollapsibleItem({
  item,
  selectedValues,
  minPrice,
  maxPrice,
  onRangeChange,
  onToggleValue,
}: ItemProps) {
  const [open, setOpen] = useState(!!item.isActive);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const checkboxKey = item.title === "Shipping" ? "shipping" : "brands";

  /**
   * Renders a min/max price range input pair.
   * Values are clamped to positive numbers and automatically
   * re-ordered so that min never exceeds max.
   */
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
              value={minPrice}
              type="number"
              onChange={(e) => {
                const value = clampToPositive(e.target.value);
                const updated = enforceRangeOrder(value, maxPrice);
                onRangeChange(updated.min, updated.max);
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
              value={maxPrice}
              type="number"
              onChange={(e) => {
                const value = clampToPositive(e.target.value);
                const updated = enforceRangeOrder(minPrice, value);
                onRangeChange(updated.min, updated.max);
              }}
            />
          </div>
        </div>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  );

  /**
   * Renders a list of star-rating checkboxes (5 → 1 stars)
   * allowing the user to filter products by review score.
   */
  const renderRating = () => (
    <SidebarMenuSub>
      {[5, 4, 3, 2, 1].map((rating) => (
        <SidebarMenuSubItem key={rating} className="cursor-pointer border-l-0">
          <div className="w-full flex gap-2 py-1 px-2">
            <Checkbox
              id={`rating-${rating}`}
              checked={selectedValues.ratings.includes(String(rating))}
              className="cursor-pointer"
              onCheckedChange={() => onToggleValue("ratings", String(rating))}
            />

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

  /**
   * Renders the filter's sub-items as a horizontally-wrapping set of
   * badge/tag pills. Clicking a tag toggles its selected state.
   */
  const renderTags = () => (
    <SidebarMenuSub className="p-2 flex flex-row gap-2 flex-wrap">
      {item.items?.map((tag) => {
        const isActive = selectedValues.tags.includes(tag.title);

        return (
          <button
            key={tag.title}
            type="button"
            className="rounded-full border-0 bg-transparent p-0"
            onClick={() => onToggleValue("tags", tag.title)}
          >
            <Badge
              variant={isActive ? "default" : "outline"}
              className="cursor-pointer rounded-full px-3 py-1 transition-colors"
            >
              {tag.title}
            </Badge>
          </button>
        );
      })}
    </SidebarMenuSub>
  );

  /**
   * Renders nested category items. Displays checkboxes when
   * `item.type` is "checkbox"; otherwise shows expandable sub-category
   * links with a rotating chevron indicator.
   */
  const renderItems = () => (
    <SidebarMenuSub>
      {item.items?.map((subItem) => {
        const isOpen = openCategory === subItem.slug;

        return (
          <div key={subItem.title}>
            <SidebarMenuSubItem className="cursor-pointer border-l-0">
              {item.type === "checkbox" ? (
                <div className="w-full flex items-center gap-1 p-2">
                  <Checkbox
                    id={subItem.title}
                    checked={selectedValues[checkboxKey].includes(
                      subItem.title,
                    )}
                    className="cursor-pointer"
                    onCheckedChange={() =>
                      onToggleValue(checkboxKey, subItem.title)
                    }
                  />
                  <label
                    htmlFor={subItem.title}
                    className="grow text-sm font-medium cursor-pointer"
                  >
                    {subItem.title}
                  </label>
                </div>
              ) : (
                <SidebarMenuSubButton
                  asChild
                  onClick={() => {
                    const slug = subItem.slug ?? null;
                    setOpenCategory(isOpen ? null : slug);
                  }}
                  className="flex items-center justify-between gap-2 w-full cursor-pointer"
                >
                  <div>
                    <span
                      onClick={(event) => event.stopPropagation()}
                      className="flex items-center gap-2"
                    >
                      <Checkbox
                        id={`category-${subItem.slug}`}
                        checked={selectedValues.categories.includes(
                          subItem.slug ?? subItem.title,
                        )}
                        className="cursor-pointer"
                        onCheckedChange={() =>
                          onToggleValue(
                            "categories",
                            subItem.slug ?? subItem.title,
                          )
                        }
                      />
                      <span className="text-md font-medium">
                        {subItem.title}
                      </span>
                    </span>

                    <ChevronDown
                      className={`size-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                </SidebarMenuSubButton>
              )}
            </SidebarMenuSubItem>

            {isOpen && subItem.subcategories?.length ? (
              <div className="pl-6 py-1 flex flex-col gap-1">
                {subItem.subcategories.map((sub) => (
                  <div key={sub.slug} className="w-full flex items-center gap-2 py-1">
                    <Checkbox
                      id={`${subItem.slug}-${sub.slug}`}
                      checked={selectedValues.subcategories.includes(
                        sub.slug ?? sub.title,
                      )}
                      className="cursor-pointer"
                      onCheckedChange={() =>
                        onToggleValue("subcategories", sub.slug ?? sub.title)
                      }
                    />
                    <label
                      htmlFor={`${subItem.slug}-${sub.slug}`}
                      className="grow text-sm font-medium cursor-pointer"
                    >
                      {sub.title}
                    </label>
                  </div>
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
