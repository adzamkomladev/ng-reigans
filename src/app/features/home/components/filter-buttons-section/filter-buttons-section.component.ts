import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Category } from '../../../../core/interfaces/category';

@Component({
  selector: 'app-filter-buttons-section',
  templateUrl: './filter-buttons-section.component.html',
  styleUrls: ['./filter-buttons-section.component.scss'],
})
export class FilterButtonsSectionComponent {
  @Input() categories: Category[];

  @Output() filterByCategory: EventEmitter<Category>;

  activeCategory: Category;

  constructor() {
    this.filterByCategory = new EventEmitter<Category>();
  }

  onClick(category: Category): void {
    this.activeCategory = category;
    this.filterByCategory.emit(category);
  }
}
