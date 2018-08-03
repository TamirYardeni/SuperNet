import { Component, OnInit } from '@angular/core';
import {CartService} from '../Services/cart/cart.service';
import {MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../Services/user/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  displayedColumns = ['name', 'image', 'price', 'weight', 'weightAmount', 'deleteProduct'];

  dataSource= new MatTableDataSource();

  constructor(private cartService:CartService,
              private router: Router,
              private userService: UserService) { }

  cartDetails;
  isPayed: Boolean;

  ngOnInit() {
    this.isPayed = false;
    this.cartDetails = this.cartService.getCartDetails();
    this.dataSource = new MatTableDataSource(this.cartDetails);
  }

  saveCart() {
    this.cartService.saveCart().then((isAdded)=> {
      this.isPayed = true;
      this.cartService.deleteAllCart();
    });
  }

  deleteProductFromCart(product) {
    debugger;
    this.cartService.deleteFromCart(product);
    this.cartDetails = this.cartService.getCartDetails();
    this.dataSource = new MatTableDataSource(this.cartDetails);
  }

  returnToMain() {
    this.router.navigate(['/welcome']);
  }

  share() {
    this.userService.share("I just bought in SuperNet");
  }
}

export interface Element {
  name: string;
  amount: number;
  price: number;
  weight: number;
  weightAmount:number;
  imageUrl: string;
}
