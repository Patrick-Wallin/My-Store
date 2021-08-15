import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  totalQuantity : number = 0;

  constructor(private productsService : ProductsService) {


  }

  ngOnInit(): void {
    console.log('hello navigation');
    //this.totalQuantity = this.productsService.total_quantity;
    this.productsService.getTotalNumberOfQuantity().subscribe(quantity => {
      this.totalQuantity = quantity;
      console.log(this.totalQuantity);
    });
    console.log(this.totalQuantity);
  }

}
