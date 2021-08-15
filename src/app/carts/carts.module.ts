import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingCartItemComponent } from './components/shopping-cart-item/shopping-cart-item.component';
import { DialogShoppingCart } from './components/shopping-cart/shopping-cart.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { ConfirmationOrderComponent } from './components/confirmation-order/confirmation-order.component';

@NgModule({
  declarations: [
    ShoppingCartComponent,
    ShoppingCartItemComponent,
    DialogShoppingCart,
    ConfirmationOrderComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ]
})
export class CartsModule { }
