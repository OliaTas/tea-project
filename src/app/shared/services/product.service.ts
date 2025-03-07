import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductType } from '../../../types/product.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://testologia.ru/tea';

  constructor(private http: HttpClient) { }

  getProducts(searchQuery?: string): Observable<ProductType[]> {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.set('search', searchQuery);
    }
    return this.http.get<ProductType[]>(this.apiUrl, { params });
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.ru/tea?id=${id}`);
  }

  createOrder(data: {name: string, last_name: string, phone: string, country: string, zip: string, product: string, address: string, comment: string}) {
    return this.http.post<{success: boolean, message?: string}>(`https://testologia.ru/order-tea`, data);
  }
}
