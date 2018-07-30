import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {ProductService} from '../../../Services/product/product.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit {
  @ViewChild('addProductForm') form: ElementRef;
  constructor(private productService:ProductService,
    public dialogRef: MatDialogRef<AddProductDialogComponent>) { }

  myform: FormGroup;
  isSubmitted: Boolean;
  isSpinner: Boolean;

  ngOnInit() {
    this.isSubmitted = false;
    this.isSpinner = false;
    this.myform = new FormGroup({
      name: new FormControl(),
      price: new FormControl(),
      url: new FormControl(),
      isWeight: new FormControl(),
      weight: new FormControl(),
      category: new FormControl()
    });
  }

  categories = [
    {value: '1', viewValue: 'Milk and Eggs'},
    {value: '2', viewValue: 'Fruits and Vegetables'},
    {value: '3', viewValue: 'Meat Chicken and Fish'},
    {value: '4', viewValue: 'Bread and bakery products'}
  ];

  onSubmit() {
    if (this.myform.valid) {
      this.isSubmitted = true;
      this.isSpinner = true;
      this.productService.addProduct(this.myform.value).then((isAdded) => {
        if (isAdded) {
          console.log('product added');
        } else {
          console.log('product not added');
        }

        this.isSpinner = false;
        this.dialogRef.close();
      });  
    }
  }
}
