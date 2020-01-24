import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.scss'],
})
export class DisplayProductComponent {
  @Input() product: { name: string; price: number; category: string };
}
