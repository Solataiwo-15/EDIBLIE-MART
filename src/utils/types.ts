export interface OrderItem {
  type: string;
  quantity: number;
  price: number | null; // added
}


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
  total_price: number; 
};
