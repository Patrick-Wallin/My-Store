import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Cart } from '../../models/Cart';
import { ProductsService } from 'src/app/products/services/products.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface DialogData {
  product_name: string;
}

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

  constructor(private productsService: ProductsService, private dialog: MatDialog, private router: Router) {
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

  removeProduct() : void {
    const dialogRef = this.dialog.open(DialogShoppingProductRemoveCart, {
      data: {product_name: this.cart.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.productsService.removeProductFromCart(this.cart);
        const currentURL = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentURL]);
        });
      }
    });
  }


}


@Component({
  selector: 'dialog-shopping-product-remove-cart',
  templateUrl: 'dialog-shopping-product-remove.html',
})
export class DialogShoppingProductRemoveCart {
  constructor(
    public dialogRef: MatDialogRef<DialogShoppingProductRemoveCart>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
