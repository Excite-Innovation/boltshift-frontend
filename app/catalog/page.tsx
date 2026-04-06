import { Navbar, NavbarMobile } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer-section";

export default function Catalog() {
  return (
    <div>
      <div>
        <div className="hidden md:block"><Navbar /></div>
        <div className="block md:hidden"><NavbarMobile /></div>
      </div>

      <Footer />
    </div>
  );
}
