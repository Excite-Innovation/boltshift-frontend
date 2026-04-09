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

function FilterSection({ section }: { section: any }) {
  switch (section.type) {
    case "range":
      return (
        <div>
          <p className="font-medium mb-2">{section.title}</p>
          <div className="flex gap-2">
            <input placeholder={section.minPlaceholder} className="input" />
            <input placeholder={section.maxPlaceholder} className="input" />
          </div>
        </div>
      );

    case "rating":
      return (
        <div>
          <p className="font-medium mb-2">{section.title}</p>
          {section.options.map((star: any) => (
            <label key={star.id} className="flex items-center gap-2">
              <input type="checkbox" />
              <span>{"⭐".repeat(star.stars)}</span>
            </label>
          ))}
        </div>
      );

    case "checkbox":
      return (
        <div>
          <p className="font-medium mb-2">{section.title}</p>
          {section.options.map((opt: any) => (
            <label key={opt.id} className="flex items-center gap-2">
              <input type="checkbox" />
              {opt.label}
            </label>
          ))}
        </div>
      );

    case "tags":
      return (
        <div>
          <p className="font-medium mb-2">{section.title}</p>
          <div className="flex flex-wrap gap-2">
            {section.options.map((tag: any) => (
              <button
                key={tag.id}
                className="px-2 py-1 text-sm rounded-full border"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      );

    case "toggle":
      return (
        <div className="flex items-center justify-between">
          <span>{section.title}</span>
          <input type="checkbox" />
        </div>
      );

    case "accordion":
      return (
        <div>
          <p className="font-medium mb-2">{section.title}</p>
          {section.options.map((item: string) => (
            <div key={item} className="py-1">
              {item}
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
