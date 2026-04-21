import { CommonModule } from "@angular/common";
import { OrderService } from "../../core/services/order.service";
import { Component, OnInit } from "@angular/core";





@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './MyOrdersComponent.html'
})
export class MyOrdersComponent implements OnInit {

  orders: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getMyOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar pedidos';
        this.loading = false;
      }
    });
  }
}
