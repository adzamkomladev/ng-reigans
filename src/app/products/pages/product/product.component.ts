import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { ProductService } from '../../../core/services/product.service';

import { Product } from '../../../core/interfaces/product';
import { ReviewFormData } from '../../interfaces/review-form-data';
import { CartItemFormData } from '../../interfaces/cart-item-form-data';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {}

  ngOnInit() {
    this.product = this.route.paramMap.pipe(
      concatMap(paramMap => this.productService.getById(+paramMap.get('id'))),
    );
  }

  mergeImagesAndVideos(images, videos) {
    return images.concat(videos);
  }

  onReviewProduct(reviewFormData: ReviewFormData, product: Product): void {
    console.log({ reviewFormData });
  }

  onAddItemToCart(cartItemFormData: CartItemFormData, product: Product): void {
    console.log({ cartItemFormData });
  }
}
