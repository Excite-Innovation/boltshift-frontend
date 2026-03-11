import { Logo } from "../brand/logo";
import { NavbarSearch } from "./navbar-search";
import { NavbarToggle } from "./navbar-toggle";
import { Profile } from "./profile-area";

export function Navbar() {
  return (
    <header className="w-full max-w-[1440px] h-24 flex items-center justify-between gap-4 p-1 m-auto rounded-none">
        <div className="h-12 w-[210px] flex items-center gap-4 flex-shrink-0">
          <NavbarToggle />
          <Logo />
        </div>
        <NavbarSearch />
        <Profile />
    </header>
  );
}
