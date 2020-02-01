import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { FilterByCategoryService } from '../../../core/services/filter-by-category.service';

import { Product } from '../../../core/interfaces/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('homeCarousel', { static: true }) homeCarousel: NguCarousel<any>;

  carouselConfig: NguCarouselConfig;
  carouselItems: Observable<{ id: number; url: string }[]>;
  categories: Observable<string[]>;
  topSellingProductsSubject: BehaviorSubject<Product[]>;
  latestProducts: Observable<Product[]>;
  topSellingProducts: Observable<Product[]>;

  allProducts: Product[] = [
    { id: 1, name: 'Dakashi', price: 200, category: 'Dress', sizes: [43, 37] },
    {
      id: 2,
      name: 'Herbi',
      price: 213,
      category: 'Co-ord Set',
      sizes: [41, 39],
    },
    {
      id: 3,
      name: 'Don pre',
      price: 500,
      category: 'Three Piece Set',
      sizes: [40, 44],
    },
    {
      id: 4,
      name: 'Hijabi',
      price: 400,
      category: 'Gown',
      sizes: [43, 36, 37],
    },

    {
      id: 5,
      name: 'A Barbi',
      price: 324,
      category: 'Layers',
      sizes: [43, 44, 45, 46, 38, 37],
    },
    {
      id: 6,
      name: 'Rir in arari',
      price: 100.29,
      category: 'Dashiki',
      sizes: [40, 38],
    },
    { id: 7, name: 'Finessers', price: 89.42, category: 'Scarf', sizes: [42] },
    {
      id: 8,
      name: 'Body amour',
      price: 323.99,
      category: 'Layers',
      sizes: [41, 34],
    },
    {
      id: 9,
      name: 'Improvidse',
      price: 250.99,
      category: 'Dress',
      sizes: [43, 44, 45, 41, 39, 36, 37],
    },
    {
      id: 10,
      name: 'Sleeep at night',
      price: 504,
      category: 'Dashiki',
      sizes: [43, 44, 45, 46, 38, 37],
    },
    {
      id: 11,
      name: 'Fight for your right',
      price: 208,
      category: 'Three Piece Set',
      sizes: [43, 44, 45, 37],
    },
    {
      id: 12,
      name: 'Helli',
      price: 120,
      category: 'Two Piece Set',
      sizes: [38],
    },
    {
      id: 13,
      name: 'Goal',
      price: 123,
      category: 'Two Piece Set',
      sizes: [45],
    },
    {
      id: 14,
      name: 'Drink',
      price: 299,
      category: 'Co-ord Set',
      sizes: [43, 44, 45, 46, 38, 36, 41, 37],
    },
    {
      id: 15,
      name: 'Hoodie',
      price: 450,
      category: 'Dress',
      sizes: [43, 44, 45, 46, 37],
    },
    {
      id: 16,
      name: 'Dakashi',
      price: 200,
      category: 'Dress',
      sizes: [43, 41, 40, 40, 38, 37],
    },
    {
      id: 17,
      name: 'Herbi',
      price: 213,
      category: 'Co-ord Set',
      sizes: [43, 44],
    },
    {
      id: 18,
      name: 'Don pre',
      price: 500,
      category: 'Three Piece Set',
      sizes: [36, 37],
    },
    { id: 19, name: 'Hijabi', price: 400, category: 'Gown', sizes: [37] },
    { id: 20, name: 'Harvey', price: 222, category: 'Gown', sizes: [36] },
    {
      id: 21,
      name: 'A Barbi',
      price: 324,
      category: 'Layers',
      sizes: [40, 38, 39],
    },
    {
      id: 22,
      name: 'Rir in arari',
      price: 100.29,
      category: 'Dashiki',
      sizes: [41, 38, 39],
    },
    {
      id: 23,
      name: 'Finessers',
      price: 89.42,
      category: 'Scarf',
      sizes: [40, 36],
    },
    {
      id: 24,
      name: 'Body amour',
      price: 323.99,
      category: 'Layers',
      sizes: [47],
    },
    {
      id: 25,
      name: 'Improvidse',
      price: 250.99,
      category: 'Dress',
      sizes: [41],
    },
    {
      id: 26,
      name: 'Sleeep at night',
      price: 504,
      category: 'Dashiki',
      sizes: [40, 42],
    },
    {
      id: 27,
      name: 'Fight for your right',
      price: 208,
      category: 'Three Piece Set',
      sizes: [38, 39],
    },
    {
      id: 28,
      name: 'Helli',
      price: 120,
      category: 'Two Piece Set',
      sizes: [40, 43, 39],
    },
    {
      id: 29,
      name: 'Goal',
      price: 123,
      category: 'Two Piece Set',
      sizes: [37, 46],
    },
    {
      id: 30,
      name: 'Drink',
      price: 299,
      category: 'Co-ord Set',
      sizes: [40, 34, 39],
    },
    {
      id: 31,
      name: 'Hoodie',
      price: 450,
      category: 'Dress',
      sizes: [40, 35, 39],
    },
    { id: 32, name: 'Harvey', price: 222, category: 'Gown', sizes: [39] },
  ];

  constructor(
    private cdr: ChangeDetectorRef,
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

    this.topSellingProductsSubject = new BehaviorSubject<Product[]>(
      this.allProducts.slice(0, 8),
    );
  }

  ngOnInit(): void {
    this.carouselItems = of([
      { id: 1, url: '/assets/img/c1.jpg' },
      { id: 2, url: '/assets/img/c2.jpg' },
      { id: 3, url: '/assets/img/c3.jpg' },
    ]);

    this.categories = of([
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

    this.latestProducts = of(this.allProducts.slice(0, 8));

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

  onFilterByCategory(category: string): void {
    this.filterByCategoryService.setFilterCategory(category);
  }

  onLoadMore(): void {
    this.filterByCategoryService.setFilterCategory('ALL');

    this.topSellingProductsSubject.next(
      this.allProducts.slice(
        0,
        this.topSellingProductsSubject.value.length + 8,
      ),
    );
  }
}
