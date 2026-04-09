import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { FilterItems } from "@/lib/filters";
import { SelectList } from "@/components/dropdown/select";
import { CollapsibleItem } from "@/components/dropdown/dropdown";

const selectList = ["Latest", "Oldest", "Popular"];

export function FilterSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props} className="relative">
      <SidebarContent className="bg-background border-0 pt-4 px-4 pb-12 gap-4 scrollbar-hide">
        <div className="flex flex-col gap-1">
          <p>Sort By</p>
          <SelectList list={selectList} />
        </div>

        <SidebarGroup>
          <SidebarMenu>
            {FilterItems.map((item) => (
              <CollapsibleItem key={item.title} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
