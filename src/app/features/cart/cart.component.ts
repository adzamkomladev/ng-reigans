import { Component, OnInit } from '@angular/core';

import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';

import { CartItemExtra } from './interfaces/cart-item-extra';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Observable<CartItemExtra[]>;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.cart = combineLatest(
      this.productService.getAll(),
      this.cartService.cart,
    ).pipe(
      map(([products, cart]) =>
        cart.map(cartItem => ({
          cartItem,
          product: products.find(product => product.id === cartItem.productId),
        })),
      ),
    );
  }
}
