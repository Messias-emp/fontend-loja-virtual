import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    RouterLink
  ],
  template: `
  
   <button (click)="goToLogin()">Voltar para Login</button>
    <mat-sidenav-container class="admin-container">
    
      <!-- MENU LATERAL -->
      <mat-sidenav mode="side" opened class="w-64">

        <mat-toolbar color="primary">
          Admin
        </mat-toolbar>

        <mat-nav-list>

          <!-- DASHBOARD -->
           <a mat-list-item routerLink="dashboard">
          
            <mat-icon>dashboard</mat-icon>
            <span class="ml-2">Dashboard</span>
          </a>

          <!-- PRODUTOS -->
           <a mat-list-item routerLink="products">
          
            <mat-icon>inventory</mat-icon>
            <span class="ml-2">Produtos</span>
          </a>

        </mat-nav-list>

      </mat-sidenav>

      <!-- CONTEÚDO -->
      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>

    </mat-sidenav-container>
  `
})
export class AdminLayoutComponent {
  constructor(
    private router: Router,
    public auth: AuthService
  ) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}