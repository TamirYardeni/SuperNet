import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Button } from 'protractor';
import {ProductService} from '../../../Services/product/product.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.css']
})
export class DeleteProductDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteProductDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data:any,
              private productService:ProductService,
              public snackBar: MatSnackBar) { }

  isSpinner: Boolean;
  isProductDeleted: Boolean;

  ngOnInit() {
    this.isSpinner = false;
    this.isProductDeleted = false;
  }

  deleteProduct() {
    this.isSpinner = true;

    this.productService.deleteProduct(this.data.id).then((isDeleted) => {
      if (isDeleted) {
        this.isProductDeleted = true;
        this.snackBar.open("Product deleted", 'Info', {
          duration: 2000,
         });
      } else {
        this.isProductDeleted = false;
        this.snackBar.open("Product not deleted", 'Info', {
          duration: 2000,
         });
      }

      this.isSpinner = false;
      this.dialogRef.close(this.isProductDeleted);
    });  
  }

  deleteProductCancel() {
    this.dialogRef.close(this.isProductDeleted);
  }
}
