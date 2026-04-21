import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models/product.model';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-products-admin',
  standalone: true,
  imports: [CommonModule, MatAnchor],
    template: `
    <h2>Painel Admin - Produtos</h2>
    <button mat-raised-button color="primary" (click)="create()">Novo Produto</button>
    <div *ngFor="let p of products" class="row">
      <div>{{ p.name }} - R$ {{ p.price }}</div>
      <div>
        <button (click)="edit(p.id!)">Editar</button>
        <button (click)="remove(p.id!)">Remover</button>
      </div>
    </div>
  `,
  styles: [`.row { display:flex; justify-content:space-between; padding:0.6rem 0; border-bottom:1px solid #eee; }`]
})
export class ProductsAdminComponent implements OnInit {

  products: Product[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // 🔄 Carregar produtos
  loadProducts(): void {
    this.productService.findAll().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.loading = false;
      },
      error: (err: unknown) => {
        console.error(err);
        this.error = 'Erro ao carregar produtos';
        this.loading = false;
      }
    });
  }

  // ➕ Novo produto
  create(): void {
    this.router.navigate(['/admin/products/new']);
  }

  // ✏ Editar produto
  edit(id: number): void {
    this.router.navigate(['/admin/products', id]);
  }

  // 🗑 Remover produto
  remove(id: number): void {
    if (!confirm('Deseja realmente remover este produto?')) return;

    this.productService.delete(id).subscribe({
      next: () => this.loadProducts(),
      error: (err: unknown) => {
        console.error(err);
        alert('Erro ao remover produto');
      }
    });
  }
}
