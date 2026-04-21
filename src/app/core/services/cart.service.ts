import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {

  // 🧠 Estado interno do carrinho (tipado!)
  private readonly _items = new BehaviorSubject<CartItem[]>([]);

  // 📡 Observable público (somente leitura)
  readonly items$ = this._items.asObservable();

  getCurrentItems(): CartItem[] {
  return this._items.value;
}
  /**
   * ➕ Adiciona item ao carrinho
   */
  addItem(item: CartItem): void {
    const items = this._items.value;
    const existing = items.find(i => i.productId === item.productId);

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      items.push({ ...item });
    }

    this._items.next([...items]);
  }

  /**
   * ❌ Remove item do carrinho
   */
  removeItem(productId: number): void {
    const filtered = this._items.value.filter(
      item => item.productId !== productId
    );

    this._items.next(filtered);
  }

  /**
   * 🧹 Limpa o carrinho
   */
  clear(): void {
    this._items.next([]);
  }

  /**
   * 💰 Total do carrinho
   */
  getTotal(): number {
    return this._items.value.reduce(
      (total: number, item: CartItem) =>
        total + item.price * item.quantity,
      0
    );
  }

  /**
   * 🛒 Quantidade total de itens
   */
  getCount(): number {
    return this._items.value.reduce(
      (total: number, item: CartItem) =>
        total + item.quantity,
      0
    );
  }
  

}
