import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NguCarouselModule } from '@ngu/carousel';
import {ClarityModule} from '@clr/angular';

import { HomeRoutingModule } from './home-routing.module';

import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [LandingComponent, HomeComponent],
  imports: [CommonModule, HomeRoutingModule, NguCarouselModule, ClarityModule],
})
export class HomeModule {}
