export interface CheckoutItemRequest {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface CheckoutRequest {
  userId: number;
  userEmail: string;
  items: CheckoutItemRequest[];
}
