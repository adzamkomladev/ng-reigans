import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Product } from '../interfaces/product';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly productsUrl: string;
  private readonly productUrl: string;

  constructor(private http: HttpClient) {
    this.productsUrl = `${environment.apiUrl}products`;
    this.productUrl = `${environment.apiUrl}product`;
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getById(id: number): Observable<Product> {
    return this.http
      .get<Product>(`${this.productUrl}/${id}`)
      .pipe(tap(product => console.log({ product })));
  }
}
