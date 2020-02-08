import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { Product } from '../interfaces/product';
import { Review } from '../interfaces/review';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly productsUrl: string;
  private readonly productUrl: string;
  private readonly reviewUrl: string;
  constructor(private http: HttpClient) {
    this.productsUrl = `${environment.apiUrl}products`;
    this.productUrl = `${environment.apiUrl}product`;
    this.reviewUrl = `${environment.apiUrl}review`;
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getById(id: number): Observable<Product> {
    return this.http
      .get<Product>(`${this.productUrl}/${id}`)
      .pipe(tap(product => console.log({ product })));
  }

  reviewProduct(review: Review): Observable<Review> {
    return this.http.post<Review>(this.reviewUrl, review);
  }
}
