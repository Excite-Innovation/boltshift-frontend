import { Navbar, NavbarMobile } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer-section";
import { BreadcrumbComponent } from "@/components/breadcrumb/breadcrumb";
import Link from "next/link";

const items = [
    { label: "Catalog" },
]

export default function Catalog() {
  return (
    <div>
      <Link href="/">
        <div className="hidden md:block"><Navbar /></div>
        <div className="block md:hidden"><NavbarMobile /></div>
      </Link>

      <BreadcrumbComponent items={items} />

      <Footer />
    </div>
  );
}
