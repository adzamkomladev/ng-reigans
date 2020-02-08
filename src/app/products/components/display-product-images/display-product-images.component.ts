import { Component, Input, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

interface Image {
  isActive?: number;
  path?: string;
}

@Component({
  selector: 'app-display-product-images',
  templateUrl: './display-product-images.component.html',
  styleUrls: ['./display-product-images.component.scss'],
})
export class DisplayProductImagesComponent implements OnInit {
  @Input() images: Image[] = [
    { isActive: 1, path: '/assets/img/p.jpg' },
    { isActive: 0, path: '/assets/img/p.jpg' },
    { isActive: 0, path: '/assets/img/p.jpg' },
    { isActive: 0, path: '/assets/img/p.jpg' },
    { isActive: 0, path: '/assets/img/p.jpg' },
    { isActive: 0, path: '/assets/img/p.jpg' },
    { isActive: 0, path: '/assets/img/p.jpg' },
    { isActive: 0, path: '/assets/img/p.jpg' },
  ];

  currentImageSubject: BehaviorSubject<Image>;

  get currentImage(): Observable<Image> {
    return this.currentImageSubject.asObservable();
  }

  constructor() {
    this.currentImageSubject = new BehaviorSubject<Image>({
      isActive: 1,
      path: '/assets/img/p.jpg',
    });
  }

  ngOnInit(): void {
    this.currentImageSubject.next(this.images.find(image => image.isActive));
  }

  onClick(image: Image): void {
    this.currentImageSubject.next(image);
  }
}
