import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cart } from '../../models/Cart';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.css']
})
export class ShoppingCartItemComponent implements OnInit {
  @Input() cart: Cart;
  @Output() updateTotal: EventEmitter<Cart> = new EventEmitter;
  selectedQuantity: number = 1;
  quantityList : Array<number> = [];
  subtotal: number = 0.00;

  constructor() {
    this.cart = {
      product_id : 0,
      quantity : 0,
      name : '',
      price : 0.00,
      url: ''
    }

    this.quantityList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  ngOnInit(): void {
    this.selectedQuantity = this.cart.quantity;
    this.subtotal = this.cart.quantity * this.cart.price;
    this.subtotal = Number(this.subtotal.toFixed(2));
  }

  changeQuantity() : void {
    console.log(this.selectedQuantity);
    this.cart.quantity = this.selectedQuantity;
    this.subtotal = this.cart.quantity * this.cart.price;
    this.subtotal = Number(this.subtotal.toFixed(2));
    this.updateTotal.emit(this.cart);
  }

}
