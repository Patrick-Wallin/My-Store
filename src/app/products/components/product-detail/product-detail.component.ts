import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/Product';
import { ProductsService } from '../../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId: string = "";
  product : Product = new Product();
  selectedQuantity: number = 1;
  quantityList : Array<number> = [];

  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService, private matSnackBar: MatSnackBar) {
    this.quantityList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.productId = params.get("id") || "";
      this.populateProductDetail();
    })
  }

  submitProduct() : void {
    this.productsService.addToCart(this.product.id, this.selectedQuantity, this.product.price, this.product.name, this.product.url);
    this.matSnackBar.open(this.selectedQuantity + " of " + this.product.name + " has been added to cart.", 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  private populateProductDetail() : void {
    this.productsService.getProducts().subscribe(result => {
      const products = result.filter((product) => product.id == parseInt(this.productId));
      if(products.length > 0) {
        this.product = products[0];
      }
    });
  }


}
