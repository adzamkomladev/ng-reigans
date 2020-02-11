import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {BehaviorSubject, Observable} from 'rxjs';
import {concatMap, take, tap} from 'rxjs/operators';

import {CartService} from '../../../core/services/cart.service';
import {ProductService} from '../../../core/services/product.service';

import {Product} from '../../../core/interfaces/product';
import {Review} from '../../../core/interfaces/review';
import {ReviewFormData} from '../../interfaces/review-form-data';
import {CartItemFormData} from '../../interfaces/cart-item-form-data';
import {ClrLoadingState} from '@clr/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  private productSubject: BehaviorSubject<Product>;
  private submitStateSubject: BehaviorSubject<ClrLoadingState>;

  get product(): Observable<Product> {
    return this.productSubject.asObservable();
  }

  get submitState(): Observable<ClrLoadingState> {
    return this.submitStateSubject.asObservable();
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
  ) {
    this.productSubject = new BehaviorSubject<Product>(null);
    this.submitStateSubject = new BehaviorSubject<ClrLoadingState>(ClrLoadingState.DEFAULT);
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        take(1),
        concatMap(paramMap => this.productService.getById(+paramMap.get('id'))),
        tap(product => this.productSubject.next(product)),
      )
      .subscribe();
  }

  onReviewProduct(reviewFormData: ReviewFormData, product: Product): void {
    this.submitStateSubject.next(ClrLoadingState.LOADING);

    this.productService
      .reviewProduct({
        ...reviewFormData,
        productId: product.id,
      } as Review)
      .pipe(
        take(1),
        concatMap(review => this.productService.getById(review.productId)),
        tap(updatedProduct => {
          this.productSubject.next(updatedProduct);
          this.submitStateSubject.next(ClrLoadingState.SUCCESS);
        }),
      )
      .subscribe();
  }

  onAddItemToCart(cartItemFormData: CartItemFormData, product: Product): void {
    this.cartService.updateCart({ productId: product.id, ...cartItemFormData });

    this.submitStateSubject.next(ClrLoadingState.LOADING);

    setTimeout(() => {
      this.submitStateSubject.next(ClrLoadingState.SUCCESS);
    }, 800);
  }
}
