import { Logo } from "@/components/brand/logo";
import { NavbarSearch } from "@/components/navigation/navbar-search";
import { Menu, ListFilter } from "lucide-react";
import { Profile } from "@/components/navigation/profile-area";
import { Button } from "@/components/ui/button";

// Desktop version
export function Navbar() {
  return (
    <header className="h-24 flex items-center justify-between gap-4 rounded-none">
      <div className="h-12  flex items-center gap-4 shrink-0">
        <Menu />
        <Logo />
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

// Mobile version
export function NavbarMobile() {
  return (
    <header className="h-33 flex flex-col gap-4">
      <div className="h-10 flex flex-row justify-between">
        <div className="flex items-center gap-2">
          <Menu className="size-6" />
          <Logo />
        </div>
        <div>
          <Profile />
        </div>
      </div>

      <div className="flex items-center gap-2 h-11">
        <Button
          variant="outline"
          className="rounded-lg h-11 w-11 p-3 border-2 shrink-0"
        >
          <ListFilter className="size-5" />
        </Button>

        <div className="flex-1 min-w-0">
          <NavbarSearch />
        </div>
      </div>
    </header>
  );
}
