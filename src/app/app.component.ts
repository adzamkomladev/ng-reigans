import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { FilterByCategoryService } from './core/services/filter-by-category.service';
import { CategoryService } from './core/services/category.service';

import { Category } from './core/interfaces/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLandingPage: boolean;
  categories: Observable<Category[]>;

  private currentUrl: string;

  get currentYear(): number {
    return new Date().getFullYear();
  }

  get filterCategory(): Observable<Category> {
    return this.filterByCategoryService.filterCategory;
  }

  constructor(
    private router: Router,
    private filterByCategoryService: FilterByCategoryService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.categories = this.categoryService
      .getAll()
      .pipe(
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

  onNavigateToCategory(category: Category): void {
    this.filterByCategoryService.setFilterCategory(category);

    if (this.currentUrl !== '/products') {
      this.router.navigate(['/products']);
    }
  }
}
