// src/types.ts

export type OrderItem = {
  type: string;
  quantity: number;
};

export type Order = {
  id: number;
  orderId?: string;
  name: string;
  phone: string;
  deliveryMethod: "pickup" | "delivery";
  address?: string;
  notes?: string;
  created_at?: string;
  items: OrderItem[];
};
