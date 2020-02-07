import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RatingModule } from 'ng-starrating';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { DisplayProductImagesComponent } from './components/display-product-images/display-product-images.component';
import { DisplayProductInfoComponent } from './components/display-product-info/display-product-info.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    DisplayProductImagesComponent,
    DisplayProductInfoComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    SharedModule,
    RatingModule,
  ],
})
export class ProductsModule {}
