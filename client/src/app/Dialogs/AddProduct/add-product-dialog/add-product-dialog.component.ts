import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {ProductService} from '../../../Services/product/product.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CategoryService} from '../../../Services/category/category.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit {
  @ViewChild('addProductForm') form: ElementRef;
  constructor(private productService:ProductService,
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    private categoryService:CategoryService,
    public snackBar: MatSnackBar) { 
      
      this.categoryService.categories.subscribe(res => {
        if(res!=null){
          this.categories = res;
        }
      });
    }

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

  categories = [];

  onSubmit() {
    debugger;
    if (this.myform.valid) {
      this.isSubmitted = true;
      this.isSpinner = true;
      this.productService.addProduct(this.myform.value).then((isAdded) => {
        if (isAdded) {
           this.snackBar.open("product added", 'Info', {
            duration: 2000,
           });
        } else {
          this.snackBar.open("product not added", 'Error', {
            duration: 2000,
           });;
        }

        this.isSpinner = false;
        this.dialogRef.close();
      });  
    } else {
      this.snackBar.open("Form not valid", 'Error', {
        duration: 2000,
       });
    }
  }
}
