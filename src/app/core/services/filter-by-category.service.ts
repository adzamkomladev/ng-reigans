import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../interfaces/product';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class FilterByCategoryService {
  private category: BehaviorSubject<Category>;

  get filterCategory(): Observable<Category> {
    return this.category.asObservable();
  }

  constructor() {
    this.category = new BehaviorSubject<Category>({ name: 'ALL' });
  }

  setFilterCategory(category: Category): void {
    this.category.next(category);
  }

  filterProducts(products: Product[]): Observable<Product[]> {
    return this.filterCategory.pipe(
      map(filterCategory =>
        filterCategory.name === 'ALL'
          ? products
          : products.filter(
              product =>
                product.category.name.toLowerCase() ===
                filterCategory.name.toLowerCase(),
            ),
      ),
    );
  }
}
