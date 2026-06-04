"use client";

import type { ComponentProps, ReactNode } from "react";
import Image from "next/image";
import Link, { type LinkProps } from "next/link";
import { ArrowRight, Menu, ShoppingBag, Star } from "lucide-react";
import { ProductCard } from "@/components/product-card/product-card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GetProductItems } from "@/lib/product-items";
import { cn } from "@/lib/utils";

type CatalogLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  closeOnClick?: boolean;
};

type MegaMenuProps = {
  defaultOpen?: boolean;
};

type CatalogGroup = {
  title: string;
  href: string;
  icon: string;
  items: {
    label: string;
    href: string;
  }[];
};

const catalogGroups: CatalogGroup[] = [
  {
    title: "Automotive",
    href: "/catalog/automotive",
    icon: "/catalog/Taxi.png",
    items: [
      {
        label: "Car Care",
        href: "/catalog/automotive/car-care%20%26%20cleaning",
      },
      { label: "Electronics & Accessories", href: "/catalog/electronics" },
      {
        label: "Exterior Accessories",
        href: "/catalog/automotive/car-accessories",
      },
      { label: "Lights & Lighting Accessories", href: "/catalog/automotive" },
      {
        label: "Interior Accessories",
        href: "/catalog/automotive/interior-parts",
      },
      { label: "Motorcycle & Power sports", href: "/catalog/sports" },
      { label: "Oils & Fluids", href: "/catalog/automotive" },
      { label: "Paint & Paint", href: "/catalog/automotive" },
    ],
  },
  {
    title: "Baby",
    href: "/catalog/baby",
    icon: "/catalog/baby.png",
    items: [
      { label: "Activity & Entertainment", href: "/catalog/baby" },
      { label: "Apparel & Accessories", href: "/catalog/baby/baby-clothing" },
      { label: "Baby & Toddler", href: "/catalog/baby" },
      { label: "Toys Baby", href: "/catalog/baby" },
      { label: "Care Baby Stationery", href: "/catalog/baby" },
      { label: "Diapering Feeding Gifts", href: "/catalog/baby/diapers-wipes" },
      { label: "Nursery Potty Training", href: "/catalog/baby" },
      {
        label: "Pregnancy & Maternity Safety",
        href: "/catalog/baby/feeding-essentials",
      },
    ],
  },
  {
    title: "Beauty And Personal Care",
    href: "/catalog/beauty%20and%20personal%20care",
    icon: "/catalog/beauty.png",
    items: [
      {
        label: "Makeup",
        href: "/catalog/beauty%20and%20personal%20care/makeup",
      },
      {
        label: "Skin Care",
        href: "/catalog/beauty%20and%20personal%20care/skincare",
      },
      {
        label: "Hair Care",
        href: "/catalog/beauty%20and%20personal%20care/hair-care",
      },
      { label: "Fragrance", href: "/catalog/beauty%20and%20personal%20care" },
      {
        label: "Foot, Hand & Nail Care",
        href: "/catalog/beauty%20and%20personal%20care",
      },
      { label: "Tools & Accessories", href: "/catalog/accessories" },
      {
        label: "Shave & Hair Removal",
        href: "/catalog/beauty%20and%20personal%20care",
      },
      { label: "Personal Care Oral Care", href: "/catalog/health" },
    ],
  },
  {
    title: "Health & Household",
    href: "/catalog/health",
    icon: "/catalog/health.png",
    items: [
      { label: "Baby & Child Care", href: "/catalog/baby" },
      { label: "Health Care", href: "/catalog/health" },
      { label: "Household Supplies", href: "/catalog/home-living" },
      {
        label: "Medical Supplies & Equipment",
        href: "/catalog/health/medical-devices",
      },
      { label: "Oral Care", href: "/catalog/health" },
      {
        label: "Personal Care",
        href: "/catalog/beauty%20and%20personal%20care",
      },
      { label: "Sexual Wellness", href: "/catalog/health" },
      { label: "Sports Nutrition", href: "/catalog/sports" },
    ],
  },
  {
    title: "Home & Kitchen",
    href: "/catalog/home-living",
    icon: "/catalog/utensils.png",
    items: [
      { label: "Kids' Home Store", href: "/catalog/home-living" },
      { label: "Kitchen & Dining", href: "/catalog/home-living/cookware" },
      { label: "Bedding", href: "/catalog/home-living" },
      { label: "Bath", href: "/catalog/home-living" },
      { label: "Furniture", href: "/catalog/home-living/furniture" },
      { label: "Home Decor", href: "/catalog/home-living/home-storage" },
      { label: "Wall Art", href: "/catalog/home-living" },
      { label: "Lighting & Ceiling Fans", href: "/catalog/home-living" },
    ],
  },
  {
    title: "Luggage",
    href: "/catalog/luggage",
    icon: "/catalog/Luggage.png",
    items: [
      { label: "Carry-ons", href: "/catalog/luggage/suitcases" },
      { label: "Backpacks", href: "/catalog/luggage/travel-backpacks" },
      { label: "Garment bags", href: "/catalog/luggage" },
      { label: "Travel Totes", href: "/catalog/luggage/travel-accessories" },
      { label: "Luggage Sets", href: "/catalog/luggage" },
      { label: "Laptop Bags", href: "/catalog/luggage" },
      { label: "Suitcases", href: "/catalog/luggage/suitcases" },
      { label: "Kids Luggage", href: "/catalog/luggage" },
    ],
  },
  {
    title: "Men's Fashion",
    href: "/catalog/mens-fashion",
    icon: "/catalog/jeans.png",
    items: [
      { label: "Shorts", href: "/catalog/mens-fashion/mens-bottoms" },
      { label: "Shirts", href: "/catalog/mens-fashion/mens-shirts" },
      { label: "Activewear", href: "/catalog/mens-fashion" },
      {
        label: "Hoodies & Sweatshirts",
        href: "/catalog/mens-fashion/mens-shirts",
      },
      { label: "Jeans", href: "/catalog/mens-fashion/mens-bottoms" },
      { label: "Pants", href: "/catalog/mens-fashion/mens-bottoms" },
      { label: "Pajamas & Robes", href: "/catalog/mens-fashion" },
      { label: "Occupational & Workwear", href: "/catalog/mens-fashion" },
    ],
  },
  {
    title: "Women's Fashion",
    href: "/catalog/womens-fashion",
    icon: "/catalog/dress.png",
    items: [
      { label: "Clothing", href: "/catalog/womens-fashion/womens-dresses" },
      { label: "Shoes", href: "/catalog/womens-fashion/womens-shoes" },
      { label: "Jewelry", href: "/catalog/accessories/jewellery" },
      { label: "Watches", href: "/catalog/accessories/watches" },
      { label: "Handbags", href: "/catalog/womens-fashion" },
      { label: "Accessories", href: "/catalog/accessories" },
      { label: "Lingerie", href: "/catalog/womens-fashion" },
      { label: "Filter Label", href: "/catalog/womens-fashion" },
    ],
  },
  {
    title: "Pet Supplies",
    href: "/catalog/pet-supplies",
    icon: "/catalog/pet.png",
    items: [
      { label: "Dogs", href: "/catalog/pet-supplies/dog-food" },
      { label: "Cats", href: "/catalog/pet-supplies/cat-accessories" },
      { label: "Fish & Aquatic Pets", href: "/catalog/pet-supplies" },
      { label: "Birds", href: "/catalog/pet-supplies/pet-toys" },
      { label: "Horses", href: "/catalog/pet-supplies" },
      { label: "Reptiles & Amphibians", href: "/catalog/pet-supplies" },
      { label: "Small Animals", href: "/catalog/pet-supplies" },
      { label: "Filter Label", href: "/catalog/pet-supplies" },
    ],
  },
];

function MenuButton({ className, ...props }: ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label="Browse catalog"
      className={cn("rounded-md", className)}
      {...props}
    >
      <Menu className="size-6" aria-hidden="true" />
    </Button>
  );
}

function CatalogLink({
  children,
  className,
  closeOnClick = false,
  ...props
}: CatalogLinkProps) {
  const link = (
    <Link {...props} className={className}>
      {children}
    </Link>
  );

  if (closeOnClick) {
    return <SheetClose asChild>{link}</SheetClose>;
  }

  return link;
}

function CatalogGroups({ closeOnClick = false }: { closeOnClick?: boolean }) {
  return (
    <div className="pt-2 pb-8 pl-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {catalogGroups.map((group) => (
        <section key={group.title} className="min-w-0">
          <CatalogLink
            href={group.href}
            closeOnClick={closeOnClick}
            className="py-2 pl-8 flex min-w-80 items-center gap-1 text-base font-medium text-foreground hover:text-primary"
          >
            <Image
              src={group.icon}
              alt=""
              width={32}
              height={32}
              className="size-8 shrink-0 object-contain"
              aria-hidden="true"
            />
            <span className="truncate">{group.title}</span>
          </CatalogLink>

          <ul>
            {group.items.map((item) => (
              <li key={`${group.title}-${item.label}`}>
                <CatalogLink
                  href={item.href}
                  closeOnClick={closeOnClick}
                  className="py-1 pl-6 block truncate text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  {item.label}
                </CatalogLink>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function TopProducts({ className }: { className?: string }) {
  const products = GetProductItems().slice(3, 8);

  return (
    <aside className={cn("pt-2 px-4 pb-16 grid content-start gap-4", className)}>
      <div className="py-2 px-4 flex items-center gap-1 text-base font-medium">
        <Star
          className="size-8 fill-amber-400 text-amber-400"
          aria-hidden="true"
        />
        <span>Top 5 Products</span>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="horizontal"
            className="mx-0"
          />
        ))}
      </div>
    </aside>
  );
}

function MegaMenuContent({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={cn("grid gap-6", mobile ? "pb-6" : "")}>
      <Link
        href="/catalog"
        className="flex w-fit pt-8 pb-4 px-10 items-center gap-2 text-2xl font-semibold text-foreground hover:text-primary"
      >
        <Image
          src="/popular-categories-icons/Shopping-bags.svg"
          alt=""
          width={32}
          height={32}
          className="size-8 shrink-0 object-contain"
          aria-hidden="true"
        />
        <span>Browse our Catalog</span>
        <ArrowRight className="size-6" aria-hidden="true" />
      </Link>

      <div
        className={cn("grid gap-8", mobile ? "" : "xl:grid-cols-[1fr_18rem]")}
      >
        <CatalogGroups closeOnClick={mobile} />
        <TopProducts className={mobile ? "" : "hidden xl:grid"} />
      </div>
    </div>
  );
}

export function MegaMenu({ defaultOpen = false }: MegaMenuProps) {
  return (
    <>
      <div className="hidden md:block">
        <Popover defaultOpen={defaultOpen}>
          <PopoverTrigger asChild>
            <MenuButton />
          </PopoverTrigger>
          <PopoverContent
            align="start"
            sideOffset={12}
            className="max-h-[calc(100vh-7rem)] w-[calc(100vw-2rem)] max-w-320 p-0 overflow-y-auto rounded-2xl"
          >
            <MegaMenuContent />
          </PopoverContent>
        </Popover>
      </div>

      <div className="block md:hidden">
        <Sheet defaultOpen={defaultOpen}>
          <SheetTrigger asChild>
            <MenuButton />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[92vw] max-w-none overflow-y-auto p-0"
          >
            <SheetHeader className="border-b px-4 py-4">
              <SheetTitle>Catalog</SheetTitle>
            </SheetHeader>
            <div className="px-4 py-5">
              <MegaMenuContent mobile />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
