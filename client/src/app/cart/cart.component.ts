import { Component, OnInit } from '@angular/core';
import {CartService} from '../Services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService:CartService) { }

  cartDetails;

  ngOnInit() {
    this.cartDetails = this.cartService.getCartDetails();
  }

}
