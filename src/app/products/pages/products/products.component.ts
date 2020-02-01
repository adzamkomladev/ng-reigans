import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { FilterByCategoryService } from '../../../core/services/filter-by-category.service';
import { FilterBySizeService } from '../../services/filter-by-size.service';
import { FilterByPriceService } from '../../services/filter-by-price.service';

import { Product } from '../../../core/interfaces/product';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  price: number;
  sizes: number[];
  categories: Observable<string[]>;
  filteredProducts: Observable<Product[]>;
  productsSubject: BehaviorSubject<Product[]>;
  filteredProductsSubject: BehaviorSubject<Product[]>;

  get filterCategory(): Observable<string> {
    return this.filterByCategoryService.filterCategory;
  }

  get filterSizes(): Observable<number[]> {
    return this.filterBySizeService.filterSizes;
  }

  constructor(
    private productService: ProductService,
    private filterByCategoryService: FilterByCategoryService,
    private filterBySizeService: FilterBySizeService,
    private filterByPriceService: FilterByPriceService,
  ) {
    this.price = 100;

    this.sizes = [33, 34, 35, 36, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48];

    this.filteredProductsSubject = new BehaviorSubject<Product[]>([]);
    this.productsSubject = new BehaviorSubject<Product[]>([]);
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
    ]);

    this.productService
      .getAll()
      .pipe(
        take(1),
        tap(products => {
          this.productsSubject.next(products);
          this.filteredProductsSubject.next(products.slice(0, 7));
        }),
      )
      .subscribe();

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
    return (
      products.length < this.productsSubject.value.length &&
      products.length !== 0
    );
  }

  onLoadMore(): void {
    this.filteredProductsSubject.next(
      this.productsSubject.value.slice(
        0,
        this.filteredProductsSubject.value.length + 6,
      ),
    );
  }
}
