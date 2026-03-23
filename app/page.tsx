import { HeroCarousel } from "@/components/hero/hero-carousel";
import { Navbar, NavbarMobile } from "@/components/navigation/navbar";
import { VendorScroller } from "@/components/vendor-story/vendor-stories";
import { ProductCategory } from "@/components/category-card/product-category"

export default function Home() {
  return (
    <div id="landing-page" className="">
      <div>
        <div className="hidden md:block"> <Navbar /> </div>
        <div className="block md:hidden"> <NavbarMobile /> </div>
      </div>

      <VendorScroller />

      <HeroCarousel />

      <ProductCategory />

      {/* Hot Deal Today Section */}
      <div>Hot Deal Today</div>

      {/* Featured Products Section */}
      <div>Featured Products</div>

      {/* Featured Store Section */}
      <div>Featured Store</div>

      {/* Special Offer Section */}
      <div>Special Offer</div>

      {/* Popular Products Section */}
      <div>Popular Products</div>

      {/* Trending Products Section */}
      <div>Trending Products</div>

      {/* Reviews Section */}
      <div>Recent Reviews</div>

      <div>Footer</div>
    </div>
  );
}
