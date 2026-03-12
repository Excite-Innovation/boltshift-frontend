import { Logo } from "../brand/logo";
import { NavbarSearch } from "./navbar-search";
import { Menu, ListFilter } from "lucide-react";
import { Profile } from "./profile-area";
import { Button } from "../ui/button"

// Desktop version
export function Navbar() {
  return (
    <header className="h-24 flex items-center justify-between gap-4 p-1 rounded-none">
        <div className="h-12 w-[210px] flex items-center gap-4 flex-shrink-0">
          <Menu />
          <Logo />
        </div>
        <NavbarSearch />
        <Profile />
    </header>
  );
}

// Mobile version
export function NavbarMobile() {
  return (
    <div className="p-4 h-33 flex flex-col gap-4">
      <div className="h-10 flex flex-row justify-between">
        <div className="flex items-center gap-2">
          <Menu />
          <Logo />
        </div>
        <div>
          <Profile />
        </div>
      </div>

      <div className="flex items-center gap-2 h-11">
        <Button>
          <ListFilter />
        </Button>
        <NavbarSearch />
      </div>
    </div>
  )
}