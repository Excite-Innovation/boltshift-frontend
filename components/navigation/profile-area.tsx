"use client";

import { AvatarProfile } from "@/components/avatar/avatar";
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
  { id: "notifications", icon: Bell },
];

export function Profile() {
  const pathname = usePathname();

  return (
    <div className="w-41 h-10 flex items-center gap-1">
      {actions.map((ActionIcon) => {
        const Icon = ActionIcon.icon;
        const isActive =
          ActionIcon.href &&
          (pathname === ActionIcon.href ||
            pathname.startsWith(`${ActionIcon.href}/`));

        const content = (
          <Icon
            className={cn(
              "size-6 stroke-[1.5]",
              isActive && "fill-primary text-primary",
            )}
            aria-hidden="true"
          />
        );

        return ActionIcon.href ? (
          <Button
            key={ActionIcon.id}
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full"
            aria-label={ActionIcon.id}
            asChild
          >
            <Link href={ActionIcon.href}>{content}</Link>
          </Button>
        ) : (
          <Button
            key={ActionIcon.id}
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full"
            aria-label={ActionIcon.id}
          >
            {content}
          </Button>
        );
      })}

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
