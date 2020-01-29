import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NguCarouselModule } from '@ngu/carousel';
import { ClarityModule } from '@clr/angular';

import { HomeRoutingModule } from './home-routing.module';

import { ScrollToDirective } from './directives/scroll-to.directive';
import { InViewportDirective } from './directives/in-viewport.directive';

import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { DisplayProductsComponent } from './components/display-products/display-products.component';
import { DisplayProductComponent } from './components/display-product/display-product.component';
import { FilterButtonsSectionComponent } from './components/filter-buttons-section/filter-buttons-section.component';

@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent,
    DisplayProductsComponent,
    DisplayProductComponent,
    ScrollToDirective,
    InViewportDirective,
    FilterButtonsSectionComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, NguCarouselModule, ClarityModule],
  providers: [{ provide: Window, useValue: window }],
})
export class HomeModule {}
