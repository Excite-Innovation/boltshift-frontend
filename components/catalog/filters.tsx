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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const sortBy = ["Latest", "Oldest", "Popular"];
const filterKeys = [
  "sort",
  "minPrice",
  "maxPrice",
  "ratings",
  "categories",
  "subcategories",
  "brands",
  "shipping",
  "tags",
  "inStock",
];

export function FilterSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getList = (key: string) =>
    searchParams
      .get(key)
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) ?? [];

  const selectedValues = {
    ratings: getList("ratings"),
    categories: getList("categories"),
    subcategories: getList("subcategories"),
    brands: getList("brands"),
    shipping: getList("shipping"),
    tags: getList("tags"),
  };

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const toggleValue = (
    key: keyof typeof selectedValues,
    value: string,
  ) => {
    const current = selectedValues[key];
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    updateParams({ [key]: next.length ? next.join(",") : null });
  };

  const updateRange = (minPrice: string, maxPrice: string) => {
    updateParams({
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
    });
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    filterKeys.forEach((key) => params.delete(key));
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="relative border-none h-auto md:h-auto"
    >
      <SidebarContent className="bg-background pt-4 px-4 pb-12 gap-4 h-screen overflow-y-auto md:h-auto md:overflow-visible">
        <div className="flex flex-col gap-1">
          <p>Sort By</p>
          <SelectList
            list={sortBy}
            value={searchParams.get("sort") ?? sortBy[0]}
            onValueChange={(sort) => updateParams({ sort })}
          />
        </div>

        <SidebarGroup className="p-0">
          <SidebarMenu className="grid gap-4">
            {FilterItems.map((item) => (
              <CollapsibleItem
                key={item.title}
                item={item}
                selectedValues={selectedValues}
                minPrice={searchParams.get("minPrice") ?? ""}
                maxPrice={searchParams.get("maxPrice") ?? ""}
                onRangeChange={updateRange}
                onToggleValue={toggleValue}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <FieldGroup>
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
              <Switch
                id="switch-share"
                checked={searchParams.get("inStock") === "true"}
                onCheckedChange={(checked) =>
                  updateParams({ inStock: checked ? "true" : null })
                }
              />
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
