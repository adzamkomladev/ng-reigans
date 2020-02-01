import { Component, Input } from '@angular/core';

import {Product} from '../../../core/interfaces/product';

@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.scss'],
})
export class DisplayProductComponent {
  @Input() product: Product;
}
