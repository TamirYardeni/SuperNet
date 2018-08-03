import { Injectable } from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {UserService} from '../user/user.service';

@Injectable()
export class CartService {

  constructor(private http: AuthHttp,
  private userService:UserService) { 
    this.products = new Array<JSON>();
  }

  totlPrice: Number;
  products: Array<JSON>;

  saveCart() {
    return new Promise((resolve, reject) => {
      var user = this.userService.getCurrentUserNotFromServer();
      return this.http.post('http://localhost:3000/api/v1/user/cart', {cart:this.products, usr:user._id})
              .toPromise()
              .then(response => {
                resolve(true);
              })
              .catch((e) => { resolve(false);});
    });
  }

  addToCart(cartNode) {
    this.products.push(JSON.parse(JSON.stringify(cartNode)));
    console.log(this.products);
  }

  deleteFromCart(product) {
    this.products.forEach(function(item, index, object) {
      if (item === product) {
        object.splice(index, 1);
      }
    });
  }

  deleteAllCart() {
    this.products = [];
  }

  changeAmount(amount, isWeight) {

  }

  getCartDetails() {
    return this.products;
  }
}
