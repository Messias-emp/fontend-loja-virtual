import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../shared/models/order.model';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders: Order[] = [];
  loading = true;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("Componente MeusPedidos iniciado");
    this.loadOrders();
  }

  private loadOrders(): void {
    console.log("Chamando loadOrders()");
    this.loading = true;

    this.orderService.getMyOrders().subscribe({
      next: (response: Order[]) => {
        console.log("Pedidos recebidos:", response);
        this.orders = response;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erro ao carregar pedidos', err);
        this.orders = [];
        this.loading = false;
      }
    });
  }

  verDetalhes(id: number) {
    this.router.navigate(['/meus-pedidos', id]);
  }
}