import { Component, Input, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { animateProducts } from '../../animations/display-products.animation';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.scss'],
  animations: [animateProducts],
})
export class DisplayProductsComponent implements OnInit {
  @Input() products;

  productsListSubject = new BehaviorSubject([]);

  get productsList() {
    return this.productsListSubject.asObservable();
  }

  constructor() {}

  ngOnInit() {}

  onInViewport() {
    this.productsListSubject.next(this.products || []);
  }
}
