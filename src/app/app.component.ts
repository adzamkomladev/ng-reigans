import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { FilterByCategoryService } from './core/services/filter-by-category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLandingPage: boolean;
  categories: Observable<string[]>;

  private currentUrl: string;

  get currentYear(): number {
    return new Date().getFullYear();
  }

  get filterCategory(): Observable<string> {
    return this.filterByCategoryService.filterCategory;
  }

  constructor(
    private router: Router,
    private filterByCategoryService: FilterByCategoryService,
  ) {}

  ngOnInit(): void {
    this.categories = of([
      'Dress',
      'Co-ord Set',
      'Three Piece Set',
      'Gown',
      'Two Piece Set',
      'Dashiki',
      'Scarf',
      'Layers',
    ]).pipe(
      map(categories => categories.filter((category, index) => index <= 5)),
    );

    this.router.events
      .pipe(
        tap(event => {
          if (event instanceof NavigationStart) {
            this.currentUrl = event.url;
            // Don't show header and nav-bar
            this.isLandingPage = event.url === '/';
          }
        }),
      )
      .subscribe();
  }

  onNavigateToCategory(category: string): void {
    this.filterByCategoryService.setFilterCategory(category);

    if (this.currentUrl !== '/products') {
      this.router.navigate(['/products']);
    }
  }
}
