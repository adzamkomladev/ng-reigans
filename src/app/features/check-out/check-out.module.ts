import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { CheckOutRoutingModule } from './check-out-routing.module';

import { CheckOutComponent } from './check-out.component';
import { CheckOutFormComponent } from './components/check-out-form/check-out-form.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';

@NgModule({
  declarations: [
    CheckOutComponent,
    CheckOutFormComponent,
    CartSummaryComponent,
  ],
  imports: [CommonModule, CheckOutRoutingModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class CheckOutModule {}
