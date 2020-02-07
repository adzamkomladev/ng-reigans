import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { FilterByCategoryService } from '../../../core/services/filter-by-category.service';

import { Product } from '../../../core/interfaces/product';
import { Category } from '../../../core/interfaces/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('homeCarousel', { static: true }) homeCarousel: NguCarousel<any>;

  carouselConfig: NguCarouselConfig;
  carouselItems: Observable<{ id: number; url: string }[]>;
  categories: Observable<Category[]>;
  latestProducts: Observable<Product[]>;
  topSellingProducts: Observable<Product[]>;
  topSellingProductsSubject: BehaviorSubject<Product[]>;
  productsSubject: BehaviorSubject<Product[]>;

  get products(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private productService: ProductService,
    private categoryService: CategoryService,
    private filterByCategoryService: FilterByCategoryService,
  ) {
    this.carouselConfig = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      load: 3,
      interval: { timing: 4000, initialDelay: 1000 },
      loop: true,
      touch: true,
      velocity: 0.2,
      animation: 'lazy',
    };

    this.productsSubject = new BehaviorSubject<Product[]>([]);
    this.topSellingProductsSubject = new BehaviorSubject<Product[]>([]);
  }

  ngOnInit(): void {
    this.carouselItems = of([
      { id: 1, url: '/assets/img/c1.jpg' },
      { id: 2, url: '/assets/img/c2.jpg' },
      { id: 3, url: '/assets/img/c3.jpg' },
    ]);

    this.categories = this.categoryService.getAll();

    this.latestProducts = this.productService.getAll().pipe(
      tap(products => {
        this.productsSubject.next(products);
        this.topSellingProductsSubject.next(products.slice(0, 8));
      }),
      map(products => products.slice(0, 8)),
    );

    this.topSellingProducts = this.topSellingProductsSubject
      .asObservable()
      .pipe(
        switchMap(topSellingProducts =>
          this.filterByCategoryService.filterProducts(topSellingProducts),
        ),
      );
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  getUrlStyle(url: string): string {
    return `url('${url}')`;
  }

  onFilterByCategory(category: Category): void {
    this.filterByCategoryService.setFilterCategory(category);
  }

  onLoadMore(): void {
    this.filterByCategoryService.setFilterCategory({ name: 'ALL' });

    this.topSellingProductsSubject.next(
      this.productsSubject.value.slice(
        0,
        this.topSellingProductsSubject.value.length + 8,
      ),
    );
  }
}
