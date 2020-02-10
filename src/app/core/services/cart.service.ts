import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../interfaces/cart-item';

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

  updateCart(cartItem: CartItem): void {
    const { cartCopy, cartItemIndex } = this.getCartCopyAndCartItemIndex(
      this.cartSubject.value,
      cartItem,
    );

    cartItemIndex !== -1
      ? (cartCopy[cartItemIndex].quantity += cartItem.quantity)
      : cartCopy.push(cartItem);

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
