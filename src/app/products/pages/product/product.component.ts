import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { concatMap, take, tap } from 'rxjs/operators';

import { ProductService } from '../../../core/services/product.service';

import { Product } from '../../../core/interfaces/product';
import { Review } from '../../../core/interfaces/review';

import { ReviewFormData } from '../../interfaces/review-form-data';
import { CartItemFormData } from '../../interfaces/cart-item-form-data';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  private productSubject: BehaviorSubject<Product>;

  get product(): Observable<Product> {
    return this.productSubject.asObservable();
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {
    this.productSubject = new BehaviorSubject<Product>(null);
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
    this.productService
      .reviewProduct({
        ...reviewFormData,
        productId: product.id,
      } as Review)
      .pipe(
        take(1),
        concatMap(review => this.productService.getById(review.productId)),
        tap(updatedProduct => this.productSubject.next(updatedProduct)),
      )
      .subscribe();
  }

  onAddItemToCart(cartItemFormData: CartItemFormData, product: Product): void {
    console.log({ cartItemFormData });
  }
}
