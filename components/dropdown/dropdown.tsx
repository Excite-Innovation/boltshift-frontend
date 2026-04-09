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
import { Plus } from "lucide-react";

type ItemProps = {
  item: {
    title: string;
    isActive?: boolean;
    items?: {
      title: string;
    }[];
  };
};

export function DropDown({ item }: ItemProps) {
  return (
    <Collapsible
      key={item.title}
      defaultOpen={item.isActive}
      asChild
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            <span>{item.title}</span>
            <Plus />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent asChild>
          <SidebarMenuSub>
            {item.items?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton>
                  <span>{subItem.title}</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
