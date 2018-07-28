import { Injectable } from '@angular/core';

import {UserService} from '../user/user.service';

@Injectable()
export class ProductService {

  constructor(private userService:UserService) { }

  getProducts() {

  }

  addProduct() {
    debugger;
    if (this.userService.getCurrentUserNotFromServer().isAdmin) {
      console.log("Add");
    }
  }

  deleteProduct(id) {
    debugger;
    if (this.userService.getCurrentUserNotFromServer().isAdmin) {
      console.log("delete");
    }
  }

}
