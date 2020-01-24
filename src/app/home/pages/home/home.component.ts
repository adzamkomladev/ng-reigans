import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';

import { Observable, of } from 'rxjs';

import { FilterByCategoryService } from '../../services/filter-by-category.service';

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
  latestProducts: Observable<
    { name: string; price: number; category: string }[]
  >;
  topSellingProducts: Observable<
    { name: string; price: number; category: string }[]
  >;

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
  }

  ngOnInit() {
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
    const allProducts = [
      { name: 'Dakashi', price: 200, category: 'Dress' },
      { name: 'Herbi', price: 213, category: 'Co-ord Set' },
      { name: 'Don pre', price: 500, category: 'Three Piece Set' },
      { name: 'Hijabi', price: 400, category: 'Gown' },
      { name: 'Harvey', price: 222, category: 'Gown' },
      { name: 'A Barbi', price: 324, category: 'Layers' },
      { name: 'Rir in arari', price: 100.29, category: 'Dashiki' },
      { name: 'Finessers', price: 89.42, category: 'Scarf' },
      { name: 'Body amour', price: 323.99, category: 'Layers' },
      { name: 'Improvidse', price: 250.99, category: 'Dress' },
      { name: 'Sleeep at night', price: 504, category: 'Dashiki' },
      { name: 'Fight for your right', price: 208, category: 'Three Piece Set' },
      { name: 'Helli', price: 120, category: 'Two Piece Set' },
      { name: 'Goal', price: 123, category: 'Two Piece Set' },
      { name: 'Drink', price: 299, category: 'Co-ord Set' },
      { name: 'Hoodie', price: 450, category: 'Dress' },
    ];
    this.latestProducts = of(allProducts);

    this.topSellingProducts = this.filterByCategoryService.filterProducts(
      allProducts,
    );
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  getUrlStyle(url: string): string {
    return `url('${url}')`;
  }

  onFilterByCategory(category: string): void {
    this.filterByCategoryService.setFilterCategory(category);
  }
}
