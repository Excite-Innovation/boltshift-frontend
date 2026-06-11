"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { Brush, ShieldCheck, ShoppingBag, Ticket, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GradientSelectorModal } from "@/components/color-picker/color-picker";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    icon: User,
    label: "Personal Info",
    href: "/account/profile",
  },
  {
    icon: ShoppingBag,
    label: "Orders",
    href: "/account/orders",
  },
  {
    icon: ShieldCheck,
    label: "Payment",
    href: "/account/payment",
  },
  {
    icon: Ticket,
    label: "Voucher",
    href: "/account/vouchers",
  },
];

const DEFAULT_BACKGROUND = "linear-gradient(135deg,#F74FAC_0%,#FCB24F_100%)";

export function AccountSidenav() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [backgroundStyle, setBackgroundStyle] = useState<string>(
    "linear-gradient(135deg,#F74FAC_0%,#FCB24F_100%)",
  );

  return (
    <aside className="w-full lg:w-auto">
      <Card className="min-h-0 w-full lg:w-84 gap-4 rounded-xl border bg-transparent pt-0 pb-8 shadow-none">
        <div className="grid gap-2">
          <div className="relative h-56">
            {/* Background */}
            <div
              className={cn(
                "relative h-32 rounded-t-xl",
                `bg-[${backgroundStyle}]`,
              )}
            >
              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={() => setIsOpen(true)}
                className="absolute top-2 right-2 z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-white p-2.5 hover:bg-muted transition-colors cursor-pointer"
                aria-label="Personalize background"
              >
                <Brush className="size-5 text-primary" />
              </Button>
            </div>

            <div className="absolute inset-x-0 top-14 z-20 flex flex-col items-center gap-3 rounded-lg p-2 text-center">
              <Avatar className="size-22 border-2 border-white">
                <AvatarImage
                  src="https://github.com/denilany.png"
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback>DA</AvatarFallback>
              </Avatar>

              <div className="min-w-0 max-w-full">
                <h3 className="text-lg font-semibold">Denil Anyonyi</h3>
                <p className="truncate text-sm text-muted-foreground">
                  denil@excite.company
                </p>
              </div>
            </div>
          </div>

          <nav
            className="flex overflow-x-auto scrollbar-hide gap-2 px-4 lg:flex-col"
            aria-label="Account navigation"
          >
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Button
                  key={item.label}
                  asChild
                  variant="ghost"
                  className={cn(
                    "h-auto justify-start gap-4 rounded-lg p-2 text-base font-medium",
                    isActive && "bg-muted/60",
                  )}
                >
                  <Link href={item.href}>
                    <Icon className="size-8 text-muted-foreground" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </nav>
        </div>
      </Card>

      <GradientSelectorModal
        open={isOpen}
        onOpenChange={setIsOpen}
        initialColor={
          backgroundStyle.startsWith("linear-gradient")
            ? "#F74FAC"
            : backgroundStyle
        }
        onSave={setBackgroundStyle}
      />
    </aside>
  );
}
