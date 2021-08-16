import { Component, OnInit, Inject } from '@angular/core';
import { Cart } from '../../models/Cart';
import { ProductsService } from 'src/app/products/services/products.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface DialogData {
  totalPrice: number;
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  full_name : string;
  address : string;
  credit_card_number : string;
  total_price: number;

  carts: Cart[] = [];

  constructor(private productsService: ProductsService, private dialog: MatDialog, private router: Router) {
    this.full_name = '';
    this.address = '';
    this.credit_card_number = '';
    this.total_price = 0.00;
  }

  ngOnInit(): void {
    this.carts = this.productsService.getListOfProductsThatAreInCart();
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void{
    const reducer = (accumulator: number, currentValue: Cart) => accumulator + (currentValue.price * currentValue.quantity);
    this.total_price = this.carts.reduce(reducer, 0);
    this.total_price = Number.parseFloat(this.total_price.toFixed(2));
  }

  updateTotal(cart: Cart): void {
    this.productsService.updateToCart(cart);
    this.calculateTotalPrice();
  }

  submitCart() : void {
    const dialogRef = this.dialog.open(DialogShoppingCart, {
      data: {totalPrice: this.total_price}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.productsService.clearCart();
        this.router.navigateByUrl(`confirmation/${this.full_name}/${this.total_price}`);
      }
    });
  }
}

@Component({
  selector: 'dialog-shopping-cart',
  templateUrl: 'dialog-shopping-cart.html',
})
export class DialogShoppingCart {
  constructor(
    public dialogRef: MatDialogRef<DialogShoppingCart>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
