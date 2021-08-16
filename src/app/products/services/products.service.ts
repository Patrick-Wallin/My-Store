import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Product } from '../models/Product';
import { Cart } from '../../carts/models/Cart';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cartStorage = window.localStorage;
  total_quantity: number = 0;
  quantityObservable: Subject<number> = new Subject<number>();
  totalQuantityObservable = this.quantityObservable.asObservable();

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("assets/data/data.json");
  }

  addToCart(product_id: number, quantity: number, price: number, name: string, url: string): void {
    const listOfProductsInCart = this.getListOfProductsThatAreInCart();
    let cart: Cart = new Cart();

    cart.product_id = product_id;
    cart.quantity = quantity;
    cart.name = name;
    cart.price = price;
    cart.url = url;

    const productInCart = listOfProductsInCart.filter((cart) => cart.product_id == product_id);
    if(productInCart.length > 0) {
      cart = productInCart[0];
      cart.quantity = cart.quantity + quantity;
      const index = listOfProductsInCart.findIndex((cart) => cart.product_id === product_id);
      listOfProductsInCart[index] = cart;
    }else {
      listOfProductsInCart.push(cart);
    }

    this.cartStorage.setItem('cart', JSON.stringify(listOfProductsInCart));
    this.getTotalNumberOfQuantity();
  }

  updateToCart(updatedCart: Cart): void {
    const listOfProductsInCart = this.getListOfProductsThatAreInCart();
    const productInCart = listOfProductsInCart.filter((cart) => cart.product_id == updatedCart.product_id);
    if(productInCart.length > 0) {
      const index = listOfProductsInCart.findIndex((cart) => cart.product_id === updatedCart.product_id);
      listOfProductsInCart[index] = updatedCart;
    }

    this.cartStorage.setItem('cart', JSON.stringify(listOfProductsInCart));
    this.getTotalNumberOfQuantity();
  }

  clearCart() : void {
    this.cartStorage.setItem('cart','');
  }

  removeProductFromCart(removedProduct: Cart) : void {
    const listOfProductsInCart = this.getListOfProductsThatAreInCart();
    const productInCart = listOfProductsInCart.filter((cart) => cart.product_id == removedProduct.product_id);
    if(productInCart.length > 0) {
      const index = listOfProductsInCart.findIndex((cart) => cart.product_id === removedProduct.product_id);
      listOfProductsInCart.splice(index,1);
    }

    this.cartStorage.setItem('cart', JSON.stringify(listOfProductsInCart));
    this.getTotalNumberOfQuantity();
  }

  getListOfProductsThatAreInCart() : Cart[] {
    const listOfProducts = this.cartStorage.getItem('cart');

    if(listOfProducts) {
      return JSON.parse(listOfProducts);
    }

    return [];
  }

  /*
  getTotalNumberOfQuantity(): Observable<number> {
    const quantityObservable = new Observable<number>((observer) => {
      // this.total_quantity = 0;
      let quantity : number = 0;

      const listOfProducts = this.getListOfProductsThatAreInCart();
      const reducer = (accumulator: number, currentValue: Cart) => accumulator + currentValue.quantity;
      quantity = listOfProducts.reduce(reducer, 0);
    });

    return quantityObservable;
  }
  */
  getTotalNumberOfQuantity(): void {
    let quantity : number = 0;

    const listOfProducts = this.getListOfProductsThatAreInCart();
    const reducer = (accumulator: number, currentValue: Cart) => accumulator + currentValue.quantity;
    quantity = listOfProducts.reduce(reducer, 0);
    this.quantityObservable.next(quantity);
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
