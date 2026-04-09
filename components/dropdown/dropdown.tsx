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

export function CollapsibleItem({ item }: ItemProps) {
  return (
    <Collapsible
      key={item.title}
      defaultOpen={item.isActive}
      asChild
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title} className="p-2 flex justify-between">
            <span className="text-xl font-semibold">{item.title}</span>
            <Plus />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent asChild>
          <SidebarMenuSub>
            {item.items?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton>
                  <span className="text-md font-medium">{subItem.title}</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
