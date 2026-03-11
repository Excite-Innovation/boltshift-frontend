import { Logo } from "../brand/logo";
import { NavbarSearch } from "./navbar-search";
import { NavbarToggle } from "./navbar-toggle";
import { Profile } from "./profile-area";

export function Navbar() {
  return (
    <header
      className="w-full min-w-[1440px] h-[132px] flex items-center gap-4 px-4 py-1 rounded-none bg-white/90 backdrop-blur-lg"
    >
      <div className="flex ">
        <NavbarToggle />
        <Logo />
        <NavbarSearch />
        <Profile />
      </div>
    </header>
  );
}
