import { Logo } from "../brand/logo";
import { NavbarSearch } from "./navbar-search";
import { Menu } from "lucide-react";
import { Profile } from "./profile-area";

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
