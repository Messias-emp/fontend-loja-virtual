import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-status-badge.component.html',
  styleUrls: ['./order-status-badge.component.css']
})
export class OrderStatusBadgeComponent {

  // Status vindo do backend (PENDING, PAID, etc)
  @Input() status!: string;

  get label(): string {
    switch (this.status) {
      case 'PENDING': return 'Pendente';
      case 'PAID': return 'Pago';
      case 'CANCELLED': return 'Cancelado';
      default: return this.status;
    }
  }

  get cssClass(): string {
    switch (this.status) {
      case 'PAID': return 'paid';
      case 'PENDING': return 'pending';
      case 'CANCELLED': return 'cancelled';
      default: return 'pending';
    }
  }
}
