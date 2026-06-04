import Image from "next/image";
import { User, ShoppingBag, CreditCard, Ticket, LogOut } from "lucide-react";

import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  {
    icon: User,
    label: "Personal Info",
  },
  {
    icon: ShoppingBag,
    label: "Orders",
  },
  {
    icon: CreditCard,
    label: "Payment",
  },
  {
    icon: Ticket,
    label: "Voucher",
  },
];

export function ProfileDropdown() {
  return (
    <div className="grid gap-2 p-3">
      <div className="flex items-center gap-3 rounded-lg p-2">
        <Image
          src="https://github.com/denilany.png"
          alt="Profile"
          width={40}
          height={40}
          unoptimized
          className="size-10 rounded-full object-cover"
        />

        <div className="min-w-0 text-sm">
          <h3 className="font-semibold">Denil Anyonyi</h3>
          <p className="truncate text-muted-foreground">
            denil@excite.company
          </p>
        </div>
      </div>

      <DropdownMenuGroup className="grid gap-1 border-y py-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <DropdownMenuItem
              key={item.label}
              className="w-full cursor-pointer gap-2 rounded-lg p-4 text-sm font-normal focus:bg-accent focus:text-accent-foreground"
            >
              <Icon className="size-6" />
              <span>{item.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuGroup>

      <DropdownMenuItem className="w-full cursor-pointer gap-2 rounded-lg p-4 text-sm font-normal focus:bg-accent focus:text-accent-foreground">
        <LogOut className="size-6" />
        <span>Log Out</span>
      </DropdownMenuItem>
    </div>
  );
}
