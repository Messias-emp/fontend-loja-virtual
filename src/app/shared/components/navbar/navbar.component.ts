import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { map, Observable } from 'rxjs';
import { HomeBanner } from '../home-banner/home-banner';
import { CartService } from '../../../core/services/cart.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeBanner ],
  templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit {

  isLoggedIn$!: Observable<boolean>;
  userName$!: Observable<string | null>;
  cartCount$!: Observable<number>;

  constructor(
    private auth: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.auth.isLoggedIn$;
    this.userName$ = this.auth.userName$; // 👤 novo, reativo
    this.cartCount$ = this.cartService.items$ .pipe(
    map(items => items.reduce((count, item) => count + item.quantity, 0)));// 🛒 novo, reativo
  }

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
