import { AvatarProfile } from "@/components/icons/avatar";
import { ShoppingCart, Heart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  { id: "wishlist", icon: Heart },
  { id: "cart", icon: ShoppingCart },
  { id: "notifications", icon: Bell },
];

export function Profile() {
  return (
    <div className="w-41 h-10 flex items-center gap-1">
      {actions.map((ActionIcon) => {
        const Icon = ActionIcon.icon;

        return (
          <Button
            key={ActionIcon.id}
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full"
          >
            <Icon className="size-6 stroke-[1.5]" />
          </Button>
        );
      })}

      <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
        <AvatarProfile />
      </div>
    </div>
  );
}
