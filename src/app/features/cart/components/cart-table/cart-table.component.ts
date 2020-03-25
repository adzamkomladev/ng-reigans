import { Component, Input } from '@angular/core';

import { CartItemExtra } from '../../interfaces/cart-item-extra';
import { Product } from '../../../../core/interfaces/product';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss'],
})
export class CartTableComponent {
  @Input() cart: CartItemExtra[];

  get totalCost(): number {
    const cart = this.cart ? this.cart : [];

    return cart.reduce(
      (totalCost, cartItem) =>
        totalCost + cartItem.cartItem.quantity * cartItem.product.price,
      0,
    );
  }

  displayImagePath(product: Product): string {
    return product.images.find(image => image.isActive).path;
  }
}
