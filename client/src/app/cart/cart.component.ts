import { Component, OnInit } from '@angular/core';
import {CartService} from '../Services/cart/cart.service';
import {MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  displayedColumns = ['name', 'image', 'price', 'weight', 'deleteProduct'];

  dataSource= new MatTableDataSource();

  constructor(private cartService:CartService,
              private router: Router) { }

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
}

export interface Element {
  name: string;
  amount: number;
  price: number;
  weight: number;
  imageUrl: string;
}
