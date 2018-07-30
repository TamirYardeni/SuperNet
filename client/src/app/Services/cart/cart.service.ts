import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

  constructor() { 
    debugger;
    this.products = new Array<JSON>();
  }

  totlPrice: Number;
  products: Array<JSON>;

  saveCart() {

  }

  addToCart(cartNode) {
    debugger;
    this.products.push(cartNode);
    console.log(this.products);
  }

  deleteFromCart(productId) {
    this.products.forEach(product => {
      delete product['_id'];
    });
  }

  changeAmount(amount, isWeight) {

  }

  getCartDetails() {
    return this.products;
  }
}
