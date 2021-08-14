import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './products/components/product-list/product-list.component';
import { ProductDetailComponent } from './products/components/product-detail/product-detail.component';
import { ShoppingCartComponent } from './carts/components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: 'product-list', component: ProductListComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
