import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../shared/models/order.model';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  // Aqui será armazenado o pedido recebido da API
order: Order | null = null;

  // controla estado de carregamento da tela
  loading = true;

  constructor(
    private route: ActivatedRoute, // lê parâmetros da URL
    private orderService: OrderService, // chama
    private cdr: ChangeDetectorRef // para forçar atualização da tela
  ) {}
  
ngOnInit(): void {

  /**
   * Escuta mudanças na URL
   * Sempre que o usuário navegar para outro pedido,
   * o componente recarrega os dados.
   */
  this.route.paramMap.subscribe(params => {

    const id = Number(params.get('id'));

    console.log("Carregando pedido:", id);

    this.loadOrder(id);

  });

}


/**
 * Função responsável por buscar o pedido na API
 */
loadOrder(id: number) {

  this.loading = true;

  this.orderService.getOrderById(id).subscribe({

    next: (data: Order) => {

      console.log("Pedido recebido:", data);

      this.order = data;

      this.loading = false;
      //🔥 FORÇA O ANGULAR ATUALIZAR A TELA
      this.cdr.detectChanges();

    },

    error: (err) => {

      console.error("Erro ao carregar pedido", err);

      this.loading = false;

    }

  });

}

}