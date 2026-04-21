import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CheckoutService {

  private http = inject(HttpClient);
  private api = 'http://localhost:8080/orders';

  checkout(payload: { userEmail: string; total: number }) {
    return this.http.post(`${this.api}/checkout`, payload);
  }
}
