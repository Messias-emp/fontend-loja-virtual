import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models/product.model';


/**
 * Resolver responsável por:
 * 🔹 Buscar produtos ANTES da rota carregar
 * 🔹 Garantir que o componente já receba dados prontos
 */
export const productsResolver: ResolveFn<Product[]> = () => {

  // Injeção moderna (Angular 16+)
  const productService = inject(ProductService);

  // Chamada direta ao backend
  return productService.findAll();
};
