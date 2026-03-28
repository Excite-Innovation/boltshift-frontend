import { HeroCarousel } from "@/components/hero/hero-carousel";
import { Navbar, NavbarMobile } from "@/components/navigation/navbar";
import { VendorScroller } from "@/components/vendor-story/vendor-stories";
import { ProductCategory } from "@/components/category-section/product-category"
import { HotDealsCollection } from "@/components/hot-deals-section/hot-deals-collection";
import { FeaturedProducts } from "@/components/featured-products-section/featured-products"
import { FeaturedStoreSection } from "@/components/store-card/store-section";

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
      <HotDealsCollection />
      <FeaturedProducts />

      {/* Featured Store Section */}
      <div>Featured Store</div>
      <FeaturedStoreSection />

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
