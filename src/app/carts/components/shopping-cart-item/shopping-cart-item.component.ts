import { Component, OnInit, Input } from '@angular/core';
import { Cart } from '../../models/Cart';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.css']
})
export class ShoppingCartItemComponent implements OnInit {
  @Input() cart: Cart;

  constructor() {
    this.cart = {
      product_id : 0,
      quantity : 0,
      name : '',
      price : 0.00
    }
  }

  ngOnInit(): void {
  }

}
