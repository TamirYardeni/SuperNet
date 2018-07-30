import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Button } from 'protractor';
import {CartService} from '../../../Services/cart/cart.service';

@Component({
  selector: 'app-add-to-cart-dialog',
  templateUrl: './add-to-cart-dialog.component.html',
  styleUrls: ['./add-to-cart-dialog.component.css']
})
export class AddToCartDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddToCartDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any,
    private cartService:CartService) { 
  }

  amountForm: FormGroup;
  isSubmitted: Boolean;
  isWeight: Boolean;

  ngOnInit() {
    this.isSubmitted = false;

    if (this.data.weight != null) {
      this.isWeight = true;
    } else {
      this.isWeight = false;
    }
    this.amountForm = new FormGroup({
      amount: new FormControl(),
      weight: new FormControl()
    });
  }

  addToCartCancel() {
    this.closeModal();
  }

  closeModal() {
    debugger;
    this.dialogRef.close();
  }

  onSubmit() {
    this.isSubmitted = true;
    var cartNode = this.data;
    cartNode.isWeight = this.isWeight;
    cartNode.weight = this.amountForm.value.weight;
    cartNode.amount = this.amountForm.value.amount;
    this.cartService.addToCart(cartNode);
      /*this.productService.addProduct(this.myform.value).then((isAdded) => {
        if (isAdded) {
          console.log('product added');
        } else {
          console.log('product not added');
        }

        this.isSpinner = false;
        this.dialogRef.close();
      });  */
    this.closeModal();
  }
}