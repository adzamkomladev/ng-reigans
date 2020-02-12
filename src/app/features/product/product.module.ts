import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RatingModule } from 'ng-starrating';

import { ProductRoutingModule } from './product-routing.module';

import { SharedModule } from '../../shared/shared.module';

import {ProductComponent} from './product.component';
import {DisplayProductImagesComponent} from './components/display-product-images/display-product-images.component';
import {DisplayProductInfoComponent} from './components/display-product-info/display-product-info.component';

@NgModule({
  declarations: [
    ProductComponent,
    DisplayProductImagesComponent,
    DisplayProductInfoComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    SharedModule,
    RatingModule,
  ],
})
export class ProductModule {}
