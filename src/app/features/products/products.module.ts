import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';

import { SharedModule } from '../../shared/shared.module';

import { FilterByPriceService } from './services/filter-by-price.service';
import { FilterBySizeService } from './services/filter-by-size.service';

import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, ProductsRoutingModule, SharedModule, FormsModule],
  providers: [FilterByPriceService, FilterBySizeService],
})
export class ProductsModule {}
