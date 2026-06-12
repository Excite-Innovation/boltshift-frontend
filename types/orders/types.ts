export type OrderStatus =
  | "all"
  | "ongoing"
  | "completed"
  | "pending"
  | "cancelled"
  | "returns";

export interface Order {
  id: string;
  items: number;
  cost: number;
  status: OrderStatus;
  createdAt: string;
  deliveryDate: string;
}
