import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-buttons-section',
  templateUrl: './filter-buttons-section.component.html',
  styleUrls: ['./filter-buttons-section.component.scss'],
})
export class FilterButtonsSectionComponent {
  @Input() categories: string[];

  @Output() filterByCategory: EventEmitter<string>;

  constructor() {
    this.filterByCategory = new EventEmitter<string>();
  }

  onClick(category: string): void {
    this.filterByCategory.emit(category);
  }
}
