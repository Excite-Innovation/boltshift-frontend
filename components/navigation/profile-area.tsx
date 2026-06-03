"use client";

import { AvatarProfile } from "@/components/avatar/avatar";
import { NotificationDrawer } from "@/components/notification/notification-drawer";
import { ShoppingCart, Heart, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DropdownWrapper } from "@/components/user-profile/dropdown-wrapper";
import { ProfileDropdown } from "@/components/user-profile/user-profile-dropdown";
import { cn } from "@/lib/utils";

const actions = [
  { id: "wishlist", icon: Heart, href: "/wishlist" },
  { id: "cart", icon: ShoppingCart, href: "/cart" },
];

export function Profile() {
  const pathname = usePathname();

  return (
    <div className="w-41 h-10 flex items-center gap-1">
      {actions.map((action) => {
        const Icon = action.icon;
        const isActive =
          pathname === action.href || pathname.startsWith(`${action.href}/`);

        const content = (
          <Icon
            className={cn(
              "size-6 stroke-[1.5]",
              isActive && "fill-primary text-primary",
            )}
            aria-hidden="true"
          />
        );

        return (
          <Button
            key={action.id}
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full"
            aria-label={action.id}
            asChild
          >
            <Link href={action.href}>{content}</Link>
          </Button>
        );
      })}

      <DropdownWrapper
        trigger={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full"
            aria-label="Open notifications"
          >
            <Bell className="size-6 stroke-[1.5]" aria-hidden="true" />
          </Button>
        }
        contentClassName="w-[480px] max-w-[calc(100vw-2rem)] border-0"
      >
        <NotificationDrawer />
      </DropdownWrapper>

      <DropdownWrapper
        trigger={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 rounded-full border-2 p-0"
            aria-label="Open profile menu"
          >
            <AvatarProfile />
          </Button>
        }
      >
        <ProfileDropdown />
      </DropdownWrapper>
    </div>
  );
}
