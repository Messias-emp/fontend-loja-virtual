import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html'
})
export class MeusPedidosComponent implements OnInit {

  orders: any[] = [];
  loading = true;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders() {
  this.loading = true;

  this.orderService.getMyOrders().subscribe({
    next: (response) => {
      console.log('Pedidos recebidos:', response);

      this.orders = response; // 🔥 AQUI ESTÁ A CORREÇÃO
      this.loading = false;
    },
    error: (err) => {
      console.error("Erro ao carregar pedidos", err);
      this.orders = [];
      this.loading = false;
    }
  });
} }