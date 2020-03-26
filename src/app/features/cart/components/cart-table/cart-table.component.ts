import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CartItemExtra } from '../../interfaces/cart-item-extra';
import { Product } from '../../../../core/interfaces/product';
import {CartItem} from '../../../../core/interfaces/cart-item';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss'],
})
export class CartTableComponent {
  @Input() cart: CartItemExtra[];

  @Output() updateCart = new EventEmitter<CartItemExtra>();
  @Output() removeItem = new EventEmitter<CartItem>();

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

  onIncreaseQuantity(cartItem: CartItemExtra): void {
    if (cartItem.cartItem.quantity < cartItem.product.stock) {
      const item = {
        cartItem: { ...cartItem.cartItem },
        product: { ...cartItem.product },
      };
      item.cartItem.quantity = 1;

      this.updateCart.emit(item);
    }
  }

  onDecreaseQuantity(cartItem: CartItemExtra): void {
    if (cartItem.cartItem.quantity > 1) {
      const item = {
        cartItem: { ...cartItem.cartItem },
        product: { ...cartItem.product },
      };
      item.cartItem.quantity = -1;

      this.updateCart.emit(item);
    }
  }

  onRemoveItem(cartItem: CartItemExtra): void {
    this.removeItem.emit(cartItem.cartItem);
  }
}
