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
  topSellingProductsSubject: BehaviorSubject<
    { name: string; price: number; category: string; sizes: number[] }[]
  >;
  latestProducts: Observable<
    { name: string; price: number; category: string; sizes: number[] }[]
  >;
  topSellingProducts: Observable<
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

    this.topSellingProductsSubject = new BehaviorSubject<
      { name: string; price: number; category: string; sizes: number[] }[]
    >(this.allProducts.slice(0, 8));
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
