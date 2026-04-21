import { Product } from '../../shared/models/product.model';


/**
 * Representa o pedido enviado ao backend
 * Deve espelhar o DTO do Spring Boot
 */

export interface Order{
 id? : number;
 total: number;
 status: string; // EX: 'PENDING', 'PAID', 'CANCELLED'
}
export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface OrderRequest {
  items: OrderItemRequest[];
}
