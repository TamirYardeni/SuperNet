import { Injectable } from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {UserService} from '../user/user.service';

@Injectable()
export class ProductService {

  constructor(private userService:UserService,
    private http: AuthHttp) { }

  getProducts(filter) {
    return new Promise((resolve, reject) => {
        return this.http.get('http://localhost:3000/api/v1/products/'+JSON.stringify(filter))
              .toPromise()
              .then(response => {
                debugger;
                
                resolve(response.json());
              })
              .catch((e) => { reject();}); 
    });
  }

  addProduct(product) {
    return new Promise((resolve, reject) => {
      if (this.userService.getCurrentUserNotFromServer().isAdmin) {
        return this.http.post('http://localhost:3000/api/v1/products', {product})
                .toPromise()
                .then(response => {
                  debugger;
                  
                  resolve(true);
                })
                .catch((e) => { resolve(false);});
      } else {
        resolve(false);
      }  
    });
  }

  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      if (this.userService.getCurrentUserNotFromServer().isAdmin) {
        debugger;
        return this.http.delete('http://localhost:3000/api/v1/products/'+id)
                .toPromise()
                .then(response => {
                  debugger;
                  
                  resolve(true);
                })
                .catch((e) => { resolve(false);});
      } else {
        resolve(false);
      }  
    });
  }
}
