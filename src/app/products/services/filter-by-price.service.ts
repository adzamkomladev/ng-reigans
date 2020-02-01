import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../../core/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class FilterByPriceService {
  private price: BehaviorSubject<number>;

  get filterPrice(): Observable<number> {
    return this.price.asObservable();
  }

  constructor() {
    this.price = new BehaviorSubject<number>(100);
  }

  setFilterPrice(price: number) {
    this.price.next(price);
  }

  filterProducts(products: Product[]): Observable<Product[]> {
    return this.filterPrice.pipe(
      map(filterPrice =>
        products.filter(product => filterPrice <= product.price),
      ),
    );
  }
}
