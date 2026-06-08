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
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { StartRating } from "@/components/rating/rating";

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

type GuestUserProps = {
  onSignIn?: () => void;
};

export function DesktopGuestUser({ onSignIn }: GuestUserProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onSignIn}
      size="lg"
      className="h-auto w-full justify-start gap-3 rounded-lg p-5 font-semibold text-left"
    >
      <User size={40} />
      <p>Sign In/Create Account</p>
    </Button>
  );
}

export function MobileGuestUser({ onSignIn }: GuestUserProps) {
  return (
    <div className="flex h-full min-h-0 w-80 flex-col justify-between overflow-y-auto px-3 pt-12 pb-4 sm:hidden">
      <div className="rounded-xl overflow-hidden">
        <div className="relative h-97 bg-[linear-gradient(180deg,rgba(0,0,0,0)_51.56%,#DA154D_100%)]">
          <Image
            src="/guest-dropdown/user.png"
            alt="Profile"
            sizes="320px"
            fill
            className="object-cover"
          />
        </div>

        <div className="py-8 px-4 bg-[#DA154D] grid gap-4 border-none">
          <div className="text-accent-foreground text-2xl font-bold">
            🌟 Embark on a Brand Odyssey in Our Exquisite Catalog! 🛍️
          </div>
          <div className="flex flex-col gap-4">
            <AvatarGroup>
              <Avatar>
                <AvatarImage
                  src="/guest-dropdown/Avatar_1.png"
                  alt="user avatar"
                />
                <AvatarFallback>PL</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="/guest-dropdown/Avatar_2.png"
                  alt="user avatar"
                  className="bg-accent-foreground"
                />
                <AvatarFallback>PL</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="/guest-dropdown/Avatar_3.png"
                  alt="user avatar"
                  className="bg-accent-foreground"
                />
                <AvatarFallback>PL</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="/guest-dropdown/Avatar_4.png"
                  alt="user avatar"
                  className="bg-accent-foreground"
                />
                <AvatarFallback>PL</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="/guest-dropdown/Avatar_5.png"
                  alt="user avatar"
                  className="bg-accent-foreground"
                />
                <AvatarFallback>PL</AvatarFallback>
              </Avatar>
            </AvatarGroup>
            <div className="flex flex-col gap-3 justify-between">
              <div className="grid gap-1">
                <div className="flex gap-2 items-center">
                  <StartRating value={5} readonly />
                  <p className="text-accent-foreground text-base font-bold">
                    5.0
                  </p>
                </div>
                <p className="text-accent-foreground text-base font-bold">
                  from Million+ shoppers
                </p>
              </div>

              {/* Pagination */}
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-foreground h-1.5 w-5.5 rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sign in */}
      <Button
        type="button"
        variant="ghost"
        onClick={onSignIn}
        className="h-auto w-full justify-start gap-2 rounded-lg p-4 text-left"
      >
        <User />
        <p>Sign In/Create Account</p>
      </Button>
    </div>
  );
}

export function GuestUserDropdown({ onSignIn }: GuestUserProps) {
  return (
    <>
      <MobileGuestUser onSignIn={onSignIn} />

      <div className="hidden p-3 sm:block">
        <DesktopGuestUser onSignIn={onSignIn} />
      </div>
    </>
  );
}

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
