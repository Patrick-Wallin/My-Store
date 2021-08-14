import { Component, OnInit } from '@angular/core';

import { Cart } from '../../models/Cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  carts: Cart[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  submitCart() : void {

  }

}
