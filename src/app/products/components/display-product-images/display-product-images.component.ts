import { Component, Input } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { share, tap } from 'rxjs/operators';

interface Image {
  id: number;
  imageUrl: string;
}

@Component({
  selector: 'app-display-product-images',
  templateUrl: './display-product-images.component.html',
  styleUrls: ['./display-product-images.component.scss'],
})
export class DisplayProductImagesComponent {
  @Input() images: Image[] = [
    { id: 1, imageUrl: '/assets/img/p.jpg' },
    { id: 2, imageUrl: '/assets/img/p.jpg' },
    { id: 3, imageUrl: '/assets/img/p.jpg' },
    { id: 4, imageUrl: '/assets/img/p.jpg' },
    { id: 5, imageUrl: '/assets/img/p.jpg' },
    { id: 6, imageUrl: '/assets/img/p.jpg' },
    { id: 7, imageUrl: '/assets/img/p.jpg' },
    { id: 8, imageUrl: '/assets/img/p.jpg' },
  ];

  currentImageSubject: BehaviorSubject<Image>;

  get currentImage(): Observable<Image> {
    return this.currentImageSubject.asObservable();
  }

  constructor() {
    this.currentImageSubject = new BehaviorSubject<{
      imageUrl: string;
      id: number;
    }>({ id: 7, imageUrl: '/assets/img/p.jpg' });
  }

  onClick(image: Image): void {
    this.currentImageSubject.next(image);
  }
}
