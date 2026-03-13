import { Navbar, NavbarMobile } from "@/components/navigation/navbar";

export default function Home() {
  return (
    <div id="landing-page" className="">
      {/* Navigation section */}
      <div>
        <div className="hidden md:block">
          <Navbar />
        </div>
        
        <div className="block md:hidden">
          <NavbarMobile />
        </div>
      </div>

      {/* Vendors section */}
      <div>StoriesTray</div>

      <div>Hero Section</div>

      {/* Popular Categories Section */}
      <div>Popular Categories</div>

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
