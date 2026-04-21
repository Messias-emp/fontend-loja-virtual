import { Product } from '../../shared/models/product.model';


/**
 * Item do carrinho
 * Relaciona produto + quantidade
 */
export interface CartItem {
  productId: number;
  name: string;      // 👈 ESTE é o nome correto
  quantity: number;
  price: number;
}

