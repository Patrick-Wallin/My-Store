import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { Cart } from '../../carts/models/Cart';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cartStorage = window.localStorage;

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("assets/data/data.json");
  }

  addToCart(product_id: number, quantity: number, price: number, name: string): void {
    const listOfProductsInCart = this.getListOfProductsThatAreInCart();
    let cart: Cart = new Cart();

    cart.product_id = product_id;
    cart.quantity = quantity;
    cart.name = name;
    cart.price = price;

    const productInCart = listOfProductsInCart.filter((cart) => cart.product_id == product_id);
    if(productInCart.length > 0) {
      cart = productInCart[0];
      cart.quantity = cart.quantity + quantity;
      const index = listOfProductsInCart.findIndex((cart) => cart.product_id === product_id);
      listOfProductsInCart[index] = cart;
    }else {
      listOfProductsInCart.push(cart);
    }
  }

  getListOfProductsThatAreInCart() : Cart[] {
    const listOfProducts = this.cartStorage.getItem('cart');

    if(listOfProducts) {
      return JSON.parse(listOfProducts);
    }

    return [];
  }

  getProductDetail(id : number): Product  {
    this.getProducts().subscribe(
      result => {
        let product : Product = new Product();
        const products = result.filter((product) => product.id == id);
        if(products.length > 0) {
          product = products[0];
          return product;
        }
        return product;
      },
      error => {
        return new Product();
      }
    );

    return new Product();
  }
}
