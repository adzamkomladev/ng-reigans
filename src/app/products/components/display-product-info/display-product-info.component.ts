import { Component, Input } from '@angular/core';

import { Product } from '../../../core/interfaces/product';

@Component({
  selector: 'app-display-product-info',
  templateUrl: './display-product-info.component.html',
  styleUrls: ['./display-product-info.component.scss'],
})
export class DisplayProductInfoComponent {
  @Input() product: Product;

  quantity: number;
  review: string;
  stars: number;

  get isThereStock(): boolean {
    return this.product && this.product.stock > 0;
  }

  constructor() {
    this.quantity = 1;
    this.review = '';
  }

  onRate(eventValue: { newValue: number }) {
    this.stars = eventValue.newValue;
  }

  onAdd(): void {
    ++this.quantity;
  }

  onSubtract(): void {
    if (this.quantity > 1) {
      --this.quantity;
    }
  }

  onSubmit(): void {
    console.log({ review: this.review, stars: this.stars });
  }
}
