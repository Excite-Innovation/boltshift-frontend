"use client";

import { AvatarProfile } from "@/components/avatar/avatar";
import { NotificationDrawer } from "@/components/notification/notification-drawer";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DropdownWrapper } from "@/components/user-profile/dropdown-wrapper";
import {
  GuestUserDropdown,
  ProfileDropdown,
} from "@/components/user-profile/user-profile-dropdown";
import { useStoredCollectionCounts } from "@/hooks/use-stored-collection-counts";
import { cn } from "@/lib/utils";

const actions = [
  { id: "wishlist", icon: Heart, href: "/wishlist" },
  { id: "cart", icon: ShoppingCart, href: "/cart" },
];

const mockInitialAuthState = false;

export function Profile() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(mockInitialAuthState);
  const { wishlistCount, cartCount } = useStoredCollectionCounts();
  const profileDropdown = isAuthenticated ? (
    <ProfileDropdown onLogout={() => setIsAuthenticated(false)} />
  ) : (
    <GuestUserDropdown onSignIn={() => setIsAuthenticated(true)} />
  );

  const countsByAction = {
    wishlist: wishlistCount,
    cart: cartCount,
  };

  const getCountLabel = (count: number) =>
    count > 99 ? "99+" : count.toString();

  return (
    <div className="flex h-10 w-41 items-center gap-1">
      {actions.map((action) => {
        const Icon = action.icon;
        const count = countsByAction[action.id as keyof typeof countsByAction];
        const isActive =
          pathname === action.href || pathname.startsWith(`${action.href}/`);

        const content = (
          <span className="relative inline-flex">
            <Icon
              className={cn(
                "size-6 stroke-[1.5]",
                isActive && "fill-primary text-primary",
              )}
              aria-hidden="true"
            />

            {count > 0 ? (
              <Badge
                variant="destructive"
                className="absolute -right-2 -top-2 h-5 min-w-5 rounded-full px-1 text-[10px] leading-none shadow-sm"
              >
                {getCountLabel(count)}
              </Badge>
            ) : null}
          </span>
        );

        return (
          <Button
            key={action.id}
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full"
            aria-label={`${action.id}${count > 0 ? `, ${count} items` : ""}`}
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
        contentClassName="h-(--radix-dropdown-menu-content-available-height) max-h-(--radix-dropdown-menu-content-available-height) w-80 sm:h-auto sm:w-64"
      >
        {profileDropdown}
      </DropdownWrapper>
    </div>
  );
}
