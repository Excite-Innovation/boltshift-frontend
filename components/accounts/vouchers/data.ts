export interface Voucher {
  id: string;
  image: string;
  code: string;
  discount: string;
  minimumSpend: number;
  expiryDate: string;
}

export const vouchers: Voucher[] = [
  {
    id: "delivery-truck",
    image: "/account/voucher/Delivery-truck.png",
    code: "CO-4321-8765",
    discount: "40% off Shipping",
    minimumSpend: 5000,
    expiryDate: "15th Aug, 2023",
  },
  {
    id: "laptop",
    image: "/account/voucher/Laptop.png",
    code: "CO-4321-8765",
    discount: "15% off Laptops",
    minimumSpend: 200000,
    expiryDate: "15th Aug, 2023",
  },
  {
    id: "high-heeled-shoe",
    image: "/account/voucher/High-heeled-shoe.png",
    code: "CO-4321-8765",
    discount: "25% off Ladies Shoes",
    minimumSpend: 12000,
    expiryDate: "17th Oct, 2023",
  },
  {
    id: "watch",
    image: "/account/voucher/Watch.png",
    code: "CO-4321-8765",
    discount: "5% off Watches",
    minimumSpend: 65000,
    expiryDate: "18th Nov, 2023",
  },
  {
    id: "jeans",
    image: "/account/voucher/Jeans.png",
    code: "CO-4321-8765",
    discount: "55% off Denim Jeans",
    minimumSpend: 3000,
    expiryDate: "19th Dec, 2023",
  },
  {
    id: "bikini",
    image: "/account/voucher/Bikini.png",
    code: "CO-4321-8765",
    discount: "65% off Ladies Innerwear",
    minimumSpend: 2000,
    expiryDate: "20th Jan, 2023",
  },
  {
    id: "necktie",
    image: "/account/voucher/Necktie.png",
    code: "CO-4321-8765",
    discount: "40% off Mens Shirts",
    minimumSpend: 8000,
    expiryDate: "21st Feb, 2023",
  },
  {
    id: "purse",
    image: "/account/voucher/Purse.png",
    code: "CO-4321-8765",
    discount: "40% off Ladies Accessories",
    minimumSpend: 8000,
    expiryDate: "21st Feb, 2023",
  },
  {
    id: "running-shoe",
    image: "/account/voucher/Running-shoe.png",
    code: "CO-4321-8765",
    discount: "20% off Sports Apparel",
    minimumSpend: 8000,
    expiryDate: "21st Feb, 2023",
  },
];
