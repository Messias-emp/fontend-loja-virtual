import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../core/services/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../core/models/cart-item.model';
import { RouterLink } from '@angular/router';


@Component({
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html'
  
})
export class CartComponent {


  // 📡 Stream reativo do carrinho
  items$: Observable<CartItem[]>;

  constructor(private cartService: CartService) {
    // 🎯 Sem parênteses: é observable, não método
    this.items$ = this.cartService.items$;
  }

  /**
   * ❌ Remove item do carrinho
   */
  remove(productId: number): void {
    this.cartService.removeItem(productId);
  }
  clear() {
  this.cartService.clear();
}

  /**
   * 💰 Total do carrinho
   */
  getTotal(): number {
    return this.cartService.getTotal();
  }
}
