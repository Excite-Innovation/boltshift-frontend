import { Navbar, NavbarMobile } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer-section";
import { SectionTitle } from "@/components/section-title";
import { BackButton } from "@/components/back/back";

export function CheckoutPageClient() {
  return (
    <div className="w-full">
      <div>
        <div className="hidden md:block">
          <Navbar />
        </div>
        <div className="block md:hidden">
          <NavbarMobile showFilterButton={false} />
        </div>
      </div>

      <main className="mx-auto w-full">
        <div className="py-4">
          <BackButton content="Shopping Cart" href="/cart" />
        </div>
        <SectionTitle
          title="Checkout"
          icon="/section-title-icons/Delivery-truck.svg"
          alt="Delivery Truck icon"
          className="py-4"
        />
      </main>

      <Footer />
    </div>
  );
}
