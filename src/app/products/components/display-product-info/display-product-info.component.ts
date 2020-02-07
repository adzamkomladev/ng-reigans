import { Component } from '@angular/core';

@Component({
  selector: 'app-display-product-info',
  templateUrl: './display-product-info.component.html',
  styleUrls: ['./display-product-info.component.scss'],
})
export class DisplayProductInfoComponent {
  quantity: number;
  review: string;
  stars: number;

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
