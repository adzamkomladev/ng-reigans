import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { FilterByCategoryService } from '../../../core/services/filter-by-category.service';
import { FilterBySizeService } from '../../services/filter-by-size.service';
import { FilterByPriceService } from '../../services/filter-by-price.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  price: number;
  sizes: number[];
  categories: Observable<string[]>;
  filteredProductsSubject: BehaviorSubject<
    { name: string; price: number; category: string; sizes: number[] }[]
  >;
  filteredProducts: Observable<
    { name: string; price: number; category: string; sizes: number[] }[]
  >;

  allProducts = [
    { name: 'Dakashi', price: 200, category: 'Dress', sizes: [43, 37] },
    { name: 'Herbi', price: 213, category: 'Co-ord Set', sizes: [41, 39] },
    {
      name: 'Don pre',
      price: 500,
      category: 'Three Piece Set',
      sizes: [40, 44],
    },
    { name: 'Hijabi', price: 400, category: 'Gown', sizes: [43, 36, 37] },
    { name: 'Harvey', price: 222, category: 'Gown', sizes: [39] },
    {
      name: 'A Barbi',
      price: 324,
      category: 'Layers',
      sizes: [43, 44, 45, 46, 38, 37],
    },
    {
      name: 'Rir in arari',
      price: 100.29,
      category: 'Dashiki',
      sizes: [40, 38],
    },
    { name: 'Finessers', price: 89.42, category: 'Scarf', sizes: [42] },
    { name: 'Body amour', price: 323.99, category: 'Layers', sizes: [41, 34] },
    {
      name: 'Improvidse',
      price: 250.99,
      category: 'Dress',
      sizes: [43, 44, 45, 41, 39, 36, 37],
    },
    {
      name: 'Sleeep at night',
      price: 504,
      category: 'Dashiki',
      sizes: [43, 44, 45, 46, 38, 37],
    },
    {
      name: 'Fight for your right',
      price: 208,
      category: 'Three Piece Set',
      sizes: [43, 44, 45, 37],
    },
    { name: 'Helli', price: 120, category: 'Two Piece Set', sizes: [38] },
    { name: 'Goal', price: 123, category: 'Two Piece Set', sizes: [45] },
    {
      name: 'Drink',
      price: 299,
      category: 'Co-ord Set',
      sizes: [43, 44, 45, 46, 38, 36, 41, 37],
    },
    {
      name: 'Hoodie',
      price: 450,
      category: 'Dress',
      sizes: [43, 44, 45, 46, 37],
    },
    {
      name: 'Dakashi',
      price: 200,
      category: 'Dress',
      sizes: [43, 41, 40, 40, 38, 37],
    },
    { name: 'Herbi', price: 213, category: 'Co-ord Set', sizes: [43, 44] },
    {
      name: 'Don pre',
      price: 500,
      category: 'Three Piece Set',
      sizes: [36, 37],
    },
    { name: 'Hijabi', price: 400, category: 'Gown', sizes: [37] },
    { name: 'Harvey', price: 222, category: 'Gown', sizes: [36] },
    { name: 'A Barbi', price: 324, category: 'Layers', sizes: [40, 38, 39] },
    {
      name: 'Rir in arari',
      price: 100.29,
      category: 'Dashiki',
      sizes: [41, 38, 39],
    },
    { name: 'Finessers', price: 89.42, category: 'Scarf', sizes: [40, 36] },
    { name: 'Body amour', price: 323.99, category: 'Layers', sizes: [47] },
    { name: 'Improvidse', price: 250.99, category: 'Dress', sizes: [41] },
    {
      name: 'Sleeep at night',
      price: 504,
      category: 'Dashiki',
      sizes: [40, 42],
    },
    {
      name: 'Fight for your right',
      price: 208,
      category: 'Three Piece Set',
      sizes: [38, 39],
    },
    {
      name: 'Helli',
      price: 120,
      category: 'Two Piece Set',
      sizes: [40, 43, 39],
    },
    { name: 'Goal', price: 123, category: 'Two Piece Set', sizes: [37, 46] },
    { name: 'Drink', price: 299, category: 'Co-ord Set', sizes: [40, 34, 39] },
    { name: 'Hoodie', price: 450, category: 'Dress', sizes: [40, 35, 39] },
  ];

  get filterCategory(): Observable<string> {
    return this.filterByCategoryService.filterCategory;
  }

  get filterSizes(): Observable<number[]> {
    return this.filterBySizeService.filterSizes;
  }

  constructor(
    private filterByCategoryService: FilterByCategoryService,
    private filterBySizeService: FilterBySizeService,
    private filterByPriceService: FilterByPriceService,
  ) {
    this.price = 100;

    this.sizes = [33, 34, 35, 36, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48];

    this.filteredProductsSubject = new BehaviorSubject<
      { name: string; price: number; category: string; sizes: number[] }[]
    >(this.allProducts.slice(0, 8));
  }

  ngOnInit() {
    this.categories = of([
      'ALL',
      'Dress',
      'Co-ord Set',
      'Three Piece Set',
      'Gown',
      'Two Piece Set',
      'Dashiki',
      'Scarf',
      'Layers',
      'Two Piece Set',
      'Dashiki',
      'Scarf',
      'Layers',
    ]);

    this.filteredProducts = this.filteredProductsSubject.asObservable().pipe(
      switchMap(filteredProducts =>
        combineLatest([
          this.filterByCategoryService.filterProducts(filteredProducts),
          this.filterBySizeService.filterProducts(filteredProducts),
          this.filterByPriceService.filterProducts(filteredProducts),
        ]),
      ),
      map(
        ([
          categoryFilteredProducts,
          sizeFilteredProducts,
          priceFilteredProducts,
        ]) =>
          categoryFilteredProducts.filter(
            categoryFilteredProduct =>
              sizeFilteredProducts.includes(categoryFilteredProduct) &&
              priceFilteredProducts.includes(categoryFilteredProduct),
          ),
      ),
    );
  }

  onSelectCategory(category: string): void {
    this.filterByCategoryService.setFilterCategory(category);
  }

  onSelectSize(size: number): void {
    this.filterBySizeService.filterSizes
      .pipe(
        take(1),
        tap(sizes => {
          if (sizes.includes(size)) {
            this.filterBySizeService.removeFilterSize(size);
          } else {
            this.filterBySizeService.setFilterSize(size);
          }
        }),
      )
      .subscribe();
  }

  onPriceChange(newPrice: number): void {
    this.price = newPrice;

    this.filterByPriceService.setFilterPrice(this.price);
  }

  showLoadMore(
    products: {
      name: string;
      price: number;
      category: string;
      sizes: number[];
    }[],
  ): boolean {
    return products.length < this.allProducts.length && products.length !== 0;
  }

  onLoadMore(): void {
    this.filteredProductsSubject.next(
      this.allProducts.slice(0, this.filteredProductsSubject.value.length + 8),
    );
  }
}
