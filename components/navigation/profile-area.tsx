import { AvatarProfile } from "@/components/icons/avatar";
import { ShoppingCart, Heart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [{ icon: Heart }, { icon: ShoppingCart }, { icon: Bell }];

export function Profile() {
  return (
    <div className="w-[164px] h-10 flex items-center gap-1">
      {actions.map((ActionIcon, index) => {
        const Icon = ActionIcon.icon;

        return (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full"
          >
            <Icon size={40}/>
          </Button>
        );
      })}

      <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
        <AvatarProfile />
      </div>
    </div>
  );
}
