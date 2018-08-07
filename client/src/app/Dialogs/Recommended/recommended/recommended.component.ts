import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatList} from '@angular/material';
import { Button } from 'protractor';
import { CartService } from '../../../Services/cart/cart.service';
import { UserService } from '../../../Services/user/user.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RecommendedComponent>,
  private cartService: CartService,
  private userService: UserService) { }

  recommendedProduct;
  isSpinner;

  ngOnInit() {
    debugger;
    var product = this.cartService.getRandomProductFromCart();
    this.isSpinner = true;
    this.getRecommendedProduct(product);
  }

  getRecommendedProduct(product) {
    this.userService.getRecommendedByProduct(product).then((product) => {
      this.recommendedProduct = product;
      this.isSpinner = false;
    });
  }

  addToCart(isAdd) {
    if (isAdd) {
      this.recommendedProduct.amount = 1;
      this.recommendedProduct.isWeight = false;
      this.cartService.addToCart(this.recommendedProduct);
      this.dialogRef.close(true);
    } 

    this.dialogRef.close(true);
  }

}
