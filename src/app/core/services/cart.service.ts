import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { CartItem } from '../interfaces/cart-item';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject: BehaviorSubject<CartItem[]>;

  get cart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  constructor() {
    this.cartSubject = new BehaviorSubject<CartItem[]>([]);
  }

  updateCart(cartItem: CartItem, product: Product): void {
    const { cartCopy, cartItemIndex } = this.getCartCopyAndCartItemIndex(
      this.cartSubject.value,
      cartItem,
    );

    if (cartItemIndex !== -1) {
      if (
        product.stock <
        cartCopy[cartItemIndex].quantity + cartItem.quantity
      ) {
        return;
      }

      cartCopy[cartItemIndex].quantity += cartItem.quantity;
    } else {
      const quantity = cartCopy
        .filter(item => item.productId === cartItem.productId)
        .reduce((totalQuantity, item) => (totalQuantity += item.quantity), 0);

      if (product.stock < quantity + cartItem.quantity) {
        return;
      }

      cartCopy.push(cartItem);
    }

    this.cartSubject.next(cartCopy);
  }

  removeFromCart(cartItem: CartItem): void {
    const { cartCopy, cartItemIndex } = this.getCartCopyAndCartItemIndex(
      this.cartSubject.value,
      cartItem,
    );

    if (cartItemIndex !== -1) {
      cartCopy.splice(cartItemIndex, 1);

      this.cartSubject.next(cartCopy);
    }
  }

  clearCart(): void {
    this.cartSubject.next([]);
  }

  private getCartCopyAndCartItemIndex(
    currentCart: CartItem[],
    cartItem: CartItem,
  ): { cartCopy: CartItem[]; cartItemIndex: number } {
    return {
      cartCopy: [...currentCart],
      cartItemIndex: currentCart.findIndex(
        item =>
          item.productId === cartItem.productId && item.size === cartItem.size,
      ),
    };
  }
}
