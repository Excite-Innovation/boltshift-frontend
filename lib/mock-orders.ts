import { Order } from "@/types/orders/types";

export const orders: Order[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `ODR-0000000${i + 1}`,
  items: 100,
  cost: 9999999,
  status: "all",
  createdAt: "Nov 26th, 2023",
  deliveryDate: "Nov 31st, 2023",
}));