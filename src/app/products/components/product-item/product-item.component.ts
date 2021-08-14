import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  selectedQuantity: number = 1;
  quantityList : Array<number> = [];

  constructor() {
    this.product = {
      id : 1,
      name : '',
      price : 0,
      url : '',
      description : ''
    };

    this.quantityList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  ngOnInit(): void {
  }

}
