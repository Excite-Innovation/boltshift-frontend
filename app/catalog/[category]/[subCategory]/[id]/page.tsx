import { BreadcrumbComponent } from "@/components/breadcrumb/breadcrumb";
import { SpecialOfferCard } from "@/components/special-offer/special-offer-card";
import { PopularCardContent } from "@/components/popular-products/content";
import { FeaturedStoreCard } from "@/components/store-card/store-card";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ category: string; subCategory: string; id: string }>;
}) {
  const format = (text: string) =>
    text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const { category, subCategory, id } = await params;

  const title = format(category);
  const icon = "/popular-categories-icons/Shopping-bags.svg";
  const alt = "Shopping bags icon";

  const items = [
    { label: "Catalog", href: "/catalog" },
    { label: format(category), href: `/catalog/${category}` },
    { label: format(subCategory), href: `/catalog/${category}/${subCategory}` },
    { label: id },
  ];

  return (
    <>
      <BreadcrumbComponent items={items} />
      <SpecialOfferCard />

      <div className="max-w-full py-12 flex flex-col gap-10 justify-around">
        <p className="text-2xl font-semibold">Description</p>
        <div className="max-w-lg text-sm text-muted-foreground">
          <p>
            Since 1881, Movado has been a brand in motion – always changing,
            always innovating, always moving forward. This quest for innovation
            has made us one of the world’s premier watchmakers, with a proud
            heritage of Swiss craftsmanship, design excellence, and
            technological innovation.
          </p>

          <br />

          <ul className="list-disc list-outside">
            <li>
              <span className="font-semibold">Contemporary Chic:</span> Sleek
              ceramic and sparkling crystals define this modern must have
              timepiece.
            </li>
            <li>
              <span className="font-semibold">Modern Designed:</span> Women's
              Movado Bold, stainless steel case with crystals, silver-toned
              metallic Museum dial with crystal set dot, blush ceramic and
              stainless steel link bracelet.
            </li>
            <li>
              <span className="font-semibold">Swiss Quartz Accuracy:</span>{" "}
              Swiss quartz movement provides incredibly precise timekeeping,
              superior craftsmanship and minimal maintenance for a reliable and
              worry-free timepiece.
            </li>
            <li>
              <span className="font-semibold">K1 Mineral Crystal Glass:</span>{" "}
              K1 mineral crystal is the most common crystal used in designer
              watches and more scratch-resistant than regular mineral
              crystal—and is even more shatter-resistant than sapphire crystal.
            </li>
            <li>
              <span className="font-semibold">Caring for Your Timepiece:</span>{" "}
              Like any finely crafted mechanism, your Movado watch requires
              periodic maintenance to ensure optimal performance. A maintenance
              interval of 3 to 5 years is recommended, in addition to any
              required battery replacement. Never open the watch yourself.
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-full py-12 flex flex-col gap-10 justify-around">
        <p className="text-2xl font-semibold">Specifications</p>
        <div className="text-sm text-muted-foreground">
          <ul className="list-disc list-outside">
            <li>
              <span className="font-semibold">Package Dimensions :</span> 6.46 x
              5.47 x 4.06 inches; 11.36 Ounces
            </li>
            <li>
              <span className="font-semibold">Item model number :</span> 3600915
            </li>
            <li>
              <span className="font-semibold">Department :</span> mens
            </li>
            <li>
              <span className="font-semibold">Date First Available :</span> July
              22, 2022
            </li>
            <li>
              <span className="font-semibold">Manufacturer :</span> Movado
            </li>
            <li>
              <span className="font-semibold">ASIN :</span> B0B7CCJFC1
            </li>
            <li>
              <span className="font-semibold">Country of Origin :</span>{" "}
              Switzerland
            </li>
            <li>
              <span className="font-semibold">Best Sellers Rank :</span>{" "}
              #226,443 in Clothing, Shoes & Jewelry
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-full py-12 flex flex-col gap-10 justify-around">
        <p className="text-2xl font-semibold">Related Products</p>
        <PopularCardContent />
      </div>

      <div className="max-w-full py-12 flex flex-col gap-10 justify-around">
        <p className="text-2xl font-semibold">More from this Store</p>
        <FeaturedStoreCard />
      </div>
    </>
  );
}
