import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';

import { SharedModule } from '../shared/shared.module';

import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';

@NgModule({
  declarations: [ProductsComponent, ProductComponent],
  imports: [CommonModule, ProductsRoutingModule, FormsModule, SharedModule],
})
export class ProductsModule {}
