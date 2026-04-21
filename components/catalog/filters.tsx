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

const sortBy = ["Latest", "Oldest", "Popular"];

export function FilterSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props} className="relative">
      <SidebarContent className="bg-background border-0 pt-4 px-4 pb-12 gap-4 scrollbar-hide">
        <div className="flex flex-col gap-1">
          <p>Sort By</p>
          <SelectList list={sortBy} />
        </div>

        <SidebarGroup className="p-0">
          <SidebarMenu className="grid gap-4">
            {FilterItems.map((item) => (
              <CollapsibleItem key={item.title} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <FieldGroup>
          <Field orientation="horizontal" className="p-0">
            <FieldLabel
              htmlFor="switch-share"
              className="p-2 border-none cursor-pointer"
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
          className="w-full py-2.5 px-4.5 text-base font-semibold"
        >
          <X />
          Clear All Filters
        </Button>
      </SidebarContent>
    </Sidebar>
  );
}
