import Image from "next/image";
import {
  User,
  ShoppingBag,
  ShieldCheck,
  Ticket,
  LogOut,
  Brush,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
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
    icon: ShieldCheck,
    label: "Payment",
  },
  {
    icon: Ticket,
    label: "Voucher",
  },
];

function MobileProfileDropdown() {
  return (
    <div className="flex h-full min-h-0 w-80 flex-col justify-between overflow-y-auto px-3 pt-12 pb-4 sm:hidden">
      <div className="grid gap-2">
        <div className="relative h-56">
          {/* Background */}
          <div className="relative h-32 rounded-lg bg-[linear-gradient(135deg,#F74FAC_0%,#FCB24F_100%)]">
            <div className="absolute top-1 right-1 z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-white p-2.5">
              <Brush size={40} className="text-primary" />
            </div>
          </div>

          <div className="absolute inset-x-0 top-14 z-20 flex flex-col items-center gap-3 rounded-lg p-2 text-center">
            <Image
              src="https://github.com/denilany.png"
              alt="Profile"
              width={88}
              height={88}
              unoptimized
              className="size-22 rounded-full border-2 border-white object-cover"
            />

            <div className="min-w-0 max-w-full">
              <h3 className="text-lg font-semibold">Denil Anyonyi</h3>
              <p className="truncate text-sm text-muted-foreground">
                denil@excite.company
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <DropdownMenuGroup className="grid gap-1 py-2">
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
      </div>

      <DropdownMenuItem className="w-full cursor-pointer gap-2 rounded-lg p-4 text-sm font-normal focus:bg-accent focus:text-accent-foreground">
        <LogOut className="size-6" />
        <span>Log Out</span>
      </DropdownMenuItem>
    </div>
  );
}

export function ProfileDropdown() {
  return (
    <>
      <MobileProfileDropdown />

      <div className="hidden gap-2 p-3 sm:grid">
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
    </>
  );
}
