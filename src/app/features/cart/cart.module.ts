import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';

import { SharedModule } from '../../shared/shared.module';

import { CartComponent } from './cart.component';
import { CartTableComponent } from './components/cart-table/cart-table.component';

@NgModule({
  declarations: [CartComponent, CartTableComponent],
  imports: [CommonModule, CartRoutingModule, SharedModule],
})
export class CartModule {}
