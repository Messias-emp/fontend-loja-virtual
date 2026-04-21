import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private apiUrl = environment.apiUrl;
  // Base da API
  // 🔗 Base dinâmica (local ou produção)
  private readonly API = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  // CREATE
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.API, product);
  }

  // READ - listar todos
  findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API);
  }

  // READ - buscar por id
  findById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API}/${id}`);
  }

  // UPDATE
  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.API}/${id}`, product);
  }

  // DELETE
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
