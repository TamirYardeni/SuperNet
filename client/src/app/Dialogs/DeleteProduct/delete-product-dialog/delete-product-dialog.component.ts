import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Button } from 'protractor';
import {ProductService} from '../../../Services/product/product.service';

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.css']
})
export class DeleteProductDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteProductDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data:any,
              private productService:ProductService) { }

  isSpinner: Boolean;

  ngOnInit() {
    this.isSpinner = false;
  }

  deleteProduct() {
    this.isSpinner = true;

    this.productService.deleteProduct(this.data.id).then((isDeleted) => {
      if (isDeleted) {
        console.log('product deleted');
      } else {
        console.log('product not deleted');
      }

      this.isSpinner = false;
      this.dialogRef.close();
    });  
  }

  deleteProductCancel() {
    this.dialogRef.close();
  }
}
