import { AvatarProfile } from "../icons/avatar";
import { Cart } from "../icons/cart";
import { Heart } from "lucide-react";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";

export function Profile() {
  return (
    <div className="w-[164px] h-10 flex items-center gap-1">
      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
        <Heart className="h-6 w-6" />
      </Button>
      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
        <Cart />
      </Button>
      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
        <Bell className="h-6 w-6" />
      </Button>
      <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
        <AvatarProfile />
      </div>
    </div>
  );
}
