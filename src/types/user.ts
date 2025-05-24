export type User = {
  id: string;
  name: string;
  email: string;
  address?: string;
};

export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shippingAddress: string;
};

export type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
};