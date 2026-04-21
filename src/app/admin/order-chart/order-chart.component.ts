import { Component, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-order-chart',
  standalone: true,
  imports: [CommonModule, MatCardModule, BaseChartDirective],
  template: `
    <mat-card class="mt-8 p-4">
      <h3 class="text-lg font-semibold mb-4">
        Pedidos por Status
      </h3>

      <canvas baseChart [data]="chartData" [type]="chartType"></canvas>
    </mat-card>
  `
})
export class OrderChartComponent {

  @Input() orders: any[] = [];

  chartType: ChartType = 'pie';

  get chartData(): ChartConfiguration<'pie'>['data'] {

    const statusMap: any = {
      PENDING: 0,
      PAID: 0,
      CANCELLED: 0
    };

    this.orders.forEach(o => statusMap[o.status]++);

    return {
      labels: ['Pendente', 'Pago', 'Cancelado'],
      datasets: [
        {
          data: [
            statusMap.PENDING,
            statusMap.PAID,
            statusMap.CANCELLED
          ],
          backgroundColor: ['#facc15', '#22c55e', '#ef4444']
        }
      ]
    };
  }
}