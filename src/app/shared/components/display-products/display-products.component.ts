import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { animateProducts } from '../../animations/display-products.animation';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.scss'],
  animations: [animateProducts],
})
export class DisplayProductsComponent implements OnChanges {
  @Input() products: { name: string; price: number; category: string }[];

  productsListSubject = new BehaviorSubject<
    { name: string; price: number; category: string }[]
  >([]);

  get productsList() {
    return this.productsListSubject.asObservable();
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