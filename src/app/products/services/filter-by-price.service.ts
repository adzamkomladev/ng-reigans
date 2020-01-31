import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  filterProducts(
    products: {
      name: string;
      price: number;
      sizes: number[];
      category: string;
    }[],
  ): Observable<
    { name: string; price: number; sizes: number[]; category: string }[]
  > {
    return this.filterPrice.pipe(
      map(filterPrice =>
        products.filter(product => filterPrice <= product.price),
      ),
    );
  }
}
