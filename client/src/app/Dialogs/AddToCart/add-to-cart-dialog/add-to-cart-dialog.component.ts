import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Button } from 'protractor';
import {CartService} from '../../../Services/cart/cart.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-to-cart-dialog',
  templateUrl: './add-to-cart-dialog.component.html',
  styleUrls: ['./add-to-cart-dialog.component.css']
})
export class AddToCartDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddToCartDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any,
    private cartService:CartService,
    public snackBar: MatSnackBar) { 
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
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.amountForm.valid) {
      this.isSubmitted = true;
      var cartNode = JSON.parse(JSON.stringify(this.data));
      cartNode.isWeight = this.isWeight;
      cartNode.weightAmount = this.amountForm.value.weight;
      cartNode.amount = this.amountForm.value.amount;
      this.cartService.addToCart(cartNode);
      this.closeModal();
    } else {
      this.snackBar.open("Form not valid", 'Error', {
        duration: 2000,
       });
    }
  }
}