import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../../core/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class FilterBySizeService {
  private sizes: BehaviorSubject<number[]>;

  get filterSizes(): Observable<number[]> {
    return this.sizes.asObservable();
  }

  constructor() {
    this.sizes = new BehaviorSubject<number[]>([]);
  }

  setFilterSize(size: number): void {
    this.sizes.next([size, ...this.sizes.value]);
  }

  removeFilterSize(size: number): void {
    this.sizes.next(this.sizes.value.filter(s => size !== s));
  }

  filterProducts(products: Product[]): Observable<Product[]> {
    return this.filterSizes.pipe(
      map(filterSizes =>
        filterSizes.length === 0
          ? products
          : products.filter(product =>
              filterSizes.some(
                filterSize => product.variations.sizes.indexOf(filterSize.toString()) >= 0,
              ),
            ),
      ),
    );
  }
}
