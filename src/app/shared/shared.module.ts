import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ClarityModule } from '@clr/angular';

import { DisplayProductsComponent } from './components/display-products/display-products.component';
import { DisplayProductComponent } from './components/display-product/display-product.component';

import { InViewportDirective } from './directives/in-viewport.directive';

@NgModule({
  declarations: [
    DisplayProductsComponent,
    DisplayProductComponent,
    InViewportDirective,
  ],
  imports: [CommonModule, ClarityModule, RouterModule],
  exports: [
    ClarityModule,
    DisplayProductsComponent,
    DisplayProductComponent,
    InViewportDirective,
  ],
  providers: [{ provide: Window, useValue: window }],
})
export class SharedModule {}
