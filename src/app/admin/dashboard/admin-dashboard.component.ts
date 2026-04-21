import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/services/order.model';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models/product.model';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
  CommonModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatIconModule,
  BaseChartDirective //  ESSENCIAL PRO GRÁFICO

],
 
templateUrl: './admin-dashboard.component.html',
styleUrls: ['./admin-dashboard.component.css']

})
export class AdminDashboardComponent implements OnInit {

  // 👤 Usuário (depois você pode puxar do AuthService)
  userName = 'Admin';

  // 📊 Métricas
  totalProducts = 0;
  activeProducts = 0;
  inactiveProducts = 0;
  totalOrders = 0;
  totalRevenue = 0;
  averageTicket = 0;

  // 🔄 Controle de estado (UX)
  loading = true;

constructor(
  private productService: ProductService,
  private router: Router,
  private orderService: OrderService // ✅ ADICIONE ISSO
) {}

goToLogin() {
  this.router.navigate(['/login']);
}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  // 🔥 MÉTODO PRINCIPAL (centraliza tudo)
private loadDashboardData(): void {

  // 🔹 PRODUTOS
  this.productService.findAll().subscribe({
    next: (products: Product[]) => {

      this.calculateMetrics(products);
      this.updateChart();

    },
    error: (err) => console.error(err)
  });

  // 🔹 PEDIDOS
  this.orderService.findAll().subscribe({
    next: (orders: Order[]) => {

      this.totalOrders = orders.length;

      this.totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

      this.averageTicket = this.totalOrders > 0
        ? this.totalRevenue / this.totalOrders
        : 0;

      this.loading = false;
    },
    error: (err) => {
      console.error(err);
      this.loading = false;
    }
  });
}
  // 🧠 RESPONSABILIDADE 1: calcular métricas
  private calculateMetrics(products: Product[]): void {
    this.totalProducts = products.length;

    this.activeProducts = products.filter(p => p.active).length;

    this.inactiveProducts = products.filter(p => !p.active).length;
  }

  // 📊 RESPONSABILIDADE 2: atualizar gráfico
  private updateChart(): void {
    this.pieChartData.datasets[0].data = [
      this.activeProducts,
      this.inactiveProducts
    ];
  }
  


  // 🎯 CONFIG DO GRÁFICO
  public pieChartType: ChartType = 'pie';

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Ativos', 'Inativos'],
    datasets: [
      {
        data: [0, 0] // começa zerado (boa prática)
      }
    ]
  };
}