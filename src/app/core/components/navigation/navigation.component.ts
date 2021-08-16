import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products/services/products.service';
import { Cart } from '../../../carts/models/Cart';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  totalQuantity : number = 0;

  constructor(private productsService : ProductsService) {}

  ngOnInit(): void {
    this.productsService.totalQuantityObservable.subscribe(quantity => {
      this.totalQuantity = quantity;
    });
    this.productsService.updateToCart(new Cart());
  }

}
