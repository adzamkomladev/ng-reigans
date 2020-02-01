import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { animateProducts } from '../../animations/display-products.animation';

import { Product } from '../../../core/interfaces/product';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.scss'],
  animations: [animateProducts],
})
export class DisplayProductsComponent implements OnChanges {
  @Input() numberOfRows = 4;
  @Input() products: Product[];

  productsListSubject = new BehaviorSubject<Product[]>([]);

  get productsList() {
    return this.productsListSubject.asObservable();
  }

  get classObjectForRow() {
    return {
      'clr-col-md-3': this.numberOfRows === 4,
      'clr-col-md-4': this.numberOfRows === 3,
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.products.isFirstChange()) {
      this.productsListSubject.next(changes.products.currentValue || []);
    }
  }

  onInViewport() {
    this.productsListSubject.next(this.products || []);
  }
}
