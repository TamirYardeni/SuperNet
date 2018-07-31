import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ProductService} from '../Services/product/product.service';
import {AddProductDialogComponent} from '../Dialogs/AddProduct/add-product-dialog/add-product-dialog.component';
import {AddToCartDialogComponent} from '../Dialogs/AddToCart/add-to-cart-dialog/add-to-cart-dialog.component';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { UserService } from '../Services/user/user.service';
import {DeleteProductDialogComponent} from '../Dialogs/DeleteProduct/delete-product-dialog/delete-product-dialog.component';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.css']
})
export class ProductManageComponent implements OnInit {

  displayedColumns;
  dataSource= new MatTableDataSource();
  currentUser;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(private productService:ProductService,
    private userService:UserService,
    private dialog:MatDialog) {  
      this.currentUser = userService.getCurrentUserNotFromServer();
      if (this.currentUser.isAdmin) {
        this.displayedColumns = ['name', 'price', 'weight', 'image', 'deleteProduct'];

      } else {
        this.displayedColumns = ['name', 'price', 'weight', 'image', 'addToCart'];
      }
    }

  filterProductForm: FormGroup;
  isSubmitted: Boolean;
  isSpinner: Boolean;

  ngOnInit() {
    this.isSubmitted = false;
    this.isSpinner = false;

    this.filterProductForm = new FormGroup({
      name: new FormControl(),
      price: new FormControl(),
      category: new FormControl()
  });
  }

  categories = [
    {value: '1', viewValue: 'Milk and Eggs'},
    {value: '2', viewValue: 'Fruits and Vegetables'},
    {value: '3', viewValue: 'Meat Chicken and Fish'},
    {value: '4', viewValue: 'Bread and bakery products'}
  ];

  openAddProductModal() {
    let dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '600px',
      data: 'This text is passed into the dialog!'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      //this.dialogResult = result;
    });
  }

  openAddToCartModal(product) {
    let dialogRef = this.dialog.open(AddToCartDialogComponent, {
      width: '600px',
      data: product
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      //this.dialogResult = result;
    });
  }

  openDeleteProductModal(product) {
    let dialogRef = this.dialog.open(DeleteProductDialogComponent, {
      width: '600px',
      data: product
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      //this.dialogResult = result;
    });
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id);
  }

  onSubmit() {
    if (this.filterProductForm.valid) {
      this.isSubmitted = true;
      this.isSpinner = true;
      this.productService.getProducts(this.filterProductForm.value).then((products: Element[]) => {
        console.log(products);
        this.dataSource = new MatTableDataSource(products);
        this.isSpinner = false;
      });  
    }
  }
}


export interface Element {
  name: string;
  position: number;
  weight: number;
  imageUrl: string;
}