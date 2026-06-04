"use client";

import { Logo } from "@/components/brand/logo";
import { MegaMenu } from "@/components/navigation/mega-menu";
import { NavbarSearch } from "@/components/navigation/navbar-search";
import { ListFilter } from "lucide-react";
import { Profile } from "@/components/navigation/profile-area";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Desktop version
export function Navbar() {
  return (
    <>
      <header className="scroll-lock-centered-fixed fixed top-0 z-50 flex h-24 w-full max-w-360 -translate-x-1/2 items-center justify-between gap-4 rounded-none bg-background px-4">
        <div className="flex h-12 shrink-0 items-center gap-4">
          <MegaMenu />
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
      <div className="h-24" aria-hidden="true" />
    </>
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
    <>
      <header className="scroll-lock-centered-fixed fixed top-0 z-50 flex h-33 w-full max-w-360 -translate-x-1/2 flex-col gap-4 bg-background px-4 py-4">
        <div className="h-10 flex flex-row justify-between">
          <div className="flex items-center gap-2">
            <MegaMenu />
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <div>
            <Profile />
          </div>
        </div>

        <div className="flex h-11 items-center gap-2">
          {shouldShowFilterButton ? (
            <Button
              variant="outline"
              className="h-11 w-11 shrink-0 rounded-lg p-3"
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
      <div className="h-33" aria-hidden="true" />
    </>
  );
}
