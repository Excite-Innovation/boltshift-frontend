"use client";

import { Logo } from "@/components/brand/logo";
import { NavbarSearch } from "@/components/navigation/navbar-search";
import { Menu, ListFilter } from "lucide-react";
import { Profile } from "@/components/navigation/profile-area";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Desktop version
export function Navbar() {
  return (
    <header className="h-24 flex items-center justify-between gap-4 rounded-none">
      <div className="h-12  flex items-center gap-4 shrink-0">
        <Menu aria-hidden="true" />
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <div className="flex-1 min-w-0">
        <NavbarSearch />
      </div>

      <div className="shrink-0">
        <Profile />
      </div>
    </header>
  );
}

type NavbarMobileProps = {
  showFilterButton?: boolean;
};

// Mobile version
export function NavbarMobile({ showFilterButton }: NavbarMobileProps) {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const isProductPage =
    pathSegments[0] === "catalog" && pathSegments.length >= 4;
  const shouldShowFilterButton = showFilterButton ?? !isProductPage;

  return (
    <header className="h-33 flex flex-col gap-4">
      <div className="h-10 flex flex-row justify-between">
        <div className="flex items-center gap-2">
          <Menu className="size-6" aria-hidden="true" />
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div>
          <Profile />
        </div>
      </div>

      <div className="flex items-center gap-2 h-11">
        {shouldShowFilterButton ? (
          <Button
            variant="outline"
            className="rounded-lg h-11 w-11 p-3 shrink-0"
            aria-label="Filter button"
            onClick={toggleSidebar}
          >
            <ListFilter className="size-5" aria-hidden="true" />
          </Button>
        ) : null}

        <div className="flex-1 min-w-0">
          <NavbarSearch />
        </div>
      </div>
    </header>
  );
}
