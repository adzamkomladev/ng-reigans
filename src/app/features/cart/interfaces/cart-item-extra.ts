import {CartItem} from '../../../core/interfaces/cart-item';
import {Product} from '../../../core/interfaces/product';

export interface CartItemExtra {
    cartItem: CartItem;
    product: Product
}
