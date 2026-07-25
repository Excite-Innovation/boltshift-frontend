export type CatalogGroup = {
  title: string;
  href: string;
  icon: string;
  items: {
    label: string;
    href: string;
  }[];
};

export const catalogGroups: CatalogGroup[] = [
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
