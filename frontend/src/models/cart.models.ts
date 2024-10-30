export interface ICartItem {
  id: number;
  product: string;
  price: string;
  quantity: number;
  total_price: number;
}

export interface ICart {
  id: number;
  user_id: number;
  created_at: string;
  total_price: number;
  total_items: number;
  items: ICartItem[];
}
