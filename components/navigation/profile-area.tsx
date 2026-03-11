import { AvatarProfile } from "../icons/avatar";
import { Cart } from "../icons/cart";
import { Heart } from "lucide-react";
import { Bell } from "lucide-react";

export function Profile() {
  return (
    <div className="w-[152px] h-8 flex items-center justify-center gap-2">
      <Heart />
      <Cart />
      <div
        className="w-[17.48px] h-[19px] border-[#101828]"
      >
        <Bell />
      </div>
      <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
        <AvatarProfile />
      </div>
    </div>
  );
}
