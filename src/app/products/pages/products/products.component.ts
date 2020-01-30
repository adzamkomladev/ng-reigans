import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  price: number;
  sizes: number[];
  categories: Observable<string[]>;
  filteredProducts: Observable<
    { name: string; price: number; category: string }[]
  >;

  allProducts = [
    { name: 'Dakashi', price: 200, category: 'Dress' },
    { name: 'Herbi', price: 213, category: 'Co-ord Set' },
    { name: 'Don pre', price: 500, category: 'Three Piece Set' },
    { name: 'Hijabi', price: 400, category: 'Gown' },
    { name: 'Harvey', price: 222, category: 'Gown' },
    { name: 'A Barbi', price: 324, category: 'Layers' },
    { name: 'Rir in arari', price: 100.29, category: 'Dashiki' },
    { name: 'Finessers', price: 89.42, category: 'Scarf' },
    { name: 'Body amour', price: 323.99, category: 'Layers' },
    { name: 'Improvidse', price: 250.99, category: 'Dress' },
    { name: 'Sleeep at night', price: 504, category: 'Dashiki' },
    { name: 'Fight for your right', price: 208, category: 'Three Piece Set' },
    { name: 'Helli', price: 120, category: 'Two Piece Set' },
    { name: 'Goal', price: 123, category: 'Two Piece Set' },
    { name: 'Drink', price: 299, category: 'Co-ord Set' },
    { name: 'Hoodie', price: 450, category: 'Dress' },
    { name: 'Dakashi', price: 200, category: 'Dress' },
    { name: 'Herbi', price: 213, category: 'Co-ord Set' },
    { name: 'Don pre', price: 500, category: 'Three Piece Set' },
    { name: 'Hijabi', price: 400, category: 'Gown' },
    { name: 'Harvey', price: 222, category: 'Gown' },
    { name: 'A Barbi', price: 324, category: 'Layers' },
    { name: 'Rir in arari', price: 100.29, category: 'Dashiki' },
    { name: 'Finessers', price: 89.42, category: 'Scarf' },
    { name: 'Body amour', price: 323.99, category: 'Layers' },
    { name: 'Improvidse', price: 250.99, category: 'Dress' },
    { name: 'Sleeep at night', price: 504, category: 'Dashiki' },
    { name: 'Fight for your right', price: 208, category: 'Three Piece Set' },
    { name: 'Helli', price: 120, category: 'Two Piece Set' },
    { name: 'Goal', price: 123, category: 'Two Piece Set' },
    { name: 'Drink', price: 299, category: 'Co-ord Set' },
    { name: 'Hoodie', price: 450, category: 'Dress' },
  ];
  constructor() {
    this.price = 100;

    this.sizes = [33, 34, 35, 36, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48];
  }

  ngOnInit() {
    this.categories = of([
      'Dress',
      'Co-ord Set',
      'Three Piece Set',
      'Gown',
      'Two Piece Set',
      'Dashiki',
      'Scarf',
      'Layers',
      'Two Piece Set',
      'Dashiki',
      'Scarf',
      'Layers',
    ]);

    this.filteredProducts = of(this.allProducts);
  }
}
