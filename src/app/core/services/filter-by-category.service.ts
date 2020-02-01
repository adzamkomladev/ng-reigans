import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class FilterByCategoryService {
  private category: BehaviorSubject<string>;

  get filterCategory(): Observable<string> {
    return this.category.asObservable();
  }

  constructor() {
    this.category = new BehaviorSubject<string>('ALL');
  }

  setFilterCategory(category: string): void {
    this.category.next(category);
  }

  filterProducts(products: Product[]): Observable<Product[]> {
    return this.filterCategory.pipe(
      map(filterCategory =>
        filterCategory === 'ALL'
          ? products
          : products.filter(
              product =>
                product.category.toLowerCase() === filterCategory.toLowerCase(),
            ),
      ),
    );
  }
}
