import { Component, OnInit } from '@angular/core';
import {CartService} from '../Services/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService:CartService,
              private router: Router) { }

  cartDetails;
  isPayed: Boolean;

  ngOnInit() {
    this.isPayed = false;
    this.cartDetails = this.cartService.getCartDetails();
  }

  saveCart() {
    this.cartService.saveCart().then((isAdded)=> {
      this.isPayed = true;
      this.cartService.deleteAllCart();
    });
  }

  returnToMain() {
    this.router.navigate(['/welcome']);
  }
}
