import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NguCarouselModule } from '@ngu/carousel';

import { HomeRoutingModule } from './home-routing.module';

import { SharedModule } from '../shared/shared.module';

import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { FilterButtonsSectionComponent } from './components/filter-buttons-section/filter-buttons-section.component';

import { ScrollToDirective } from './directives/scroll-to.directive';

@NgModule({
    declarations: [
        LandingComponent,
        HomeComponent,
        FilterButtonsSectionComponent,
        ScrollToDirective,
    ],
    imports: [CommonModule, HomeRoutingModule, NguCarouselModule, SharedModule],
    exports: [
        ScrollToDirective
    ]
})
export class HomeModule {}
