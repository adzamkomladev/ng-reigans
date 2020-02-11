import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ClrLoadingState } from '@clr/angular';

import { Product } from '../../../core/interfaces/product';

import { ReviewFormData } from '../../interfaces/review-form-data';
import { CartItemFormData } from '../../interfaces/cart-item-form-data';

@Component({
  selector: 'app-display-product-info',
  templateUrl: './display-product-info.component.html',
  styleUrls: ['./display-product-info.component.scss'],
})
export class DisplayProductInfoComponent {
  @Input() product: Product;
  @Input() set submitState(value: ClrLoadingState) {
    console.log({ value });
    this.submitBtnState = value;
  }

  @Output() reviewProduct: EventEmitter<ReviewFormData>;
  @Output() addItemToCart: EventEmitter<CartItemFormData>;

  submitBtnState: ClrLoadingState;
  review: ReviewFormData;
  item: CartItemFormData;

  get isThereStock(): boolean {
    return this.product && this.product.stock > 0;
  }

  get numberOfReviews(): number {
    return this.product ? this.product.reviews.length : 0;
  }

  get productStarRating(): number {
    if (this.numberOfReviews === 0) {
      return 0;
    }

    const totalStars = this.product.reviews.reduce(
      (stars, review) => (stars += review.stars),
      0,
    );

    return totalStars / this.numberOfReviews;
  }

  constructor() {
    this.item = { quantity: 1, size: null };
    this.review = { comment: '', stars: 0 };

    this.reviewProduct = new EventEmitter<ReviewFormData>();
    this.addItemToCart = new EventEmitter<CartItemFormData>();
  }

  onSelectSize(size: string): void {
    this.item.size = size;
  }

  onRate(eventValue: { newValue: number }): void {
    this.review.stars = eventValue.newValue;
  }

  onAdd(): void {
    if (this.item.quantity <= this.product.stock) {
      ++this.item.quantity;
    }
  }

  onSubtract(): void {
    if (this.item.quantity > 1) {
      --this.item.quantity;
    }
  }

  onReview(): void {
    this.reviewProduct.emit(this.review);

    this.review = {
      comment: '',
      stars: 0,
    };
  }

  onAddToCart(): void {
    if (!this.item.size || this.item.quantity > this.product.stock) {
      return;
    }

    this.addItemToCart.emit(this.item);

    this.item = {
      quantity: 1,
      size: null,
    };
  }
}
