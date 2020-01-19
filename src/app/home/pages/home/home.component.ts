import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';

import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('homeCarousel', { static: true }) homeCarousel: NguCarousel<any>;

  carouselConfig: NguCarouselConfig;
  carouselItems: Observable<{ id: number; url: string }[]>;

  constructor(private cdr: ChangeDetectorRef) {
    this.carouselItems = of([
      { id: 1, url: '/assets/img/c1.jpg' },
      { id: 2, url: '/assets/img/c2.jpg' },
      { id: 3, url: '/assets/img/c3.jpg' },
    ]);

    this.carouselConfig = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      load: 3,
      interval: { timing: 4000, initialDelay: 1000 },
      loop: true,
      touch: true,
      velocity: 0.2,
      animation: 'lazy',
    };
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  getUrlStyle(url: string): string {
    return `url('${url}')`;
  }
}
