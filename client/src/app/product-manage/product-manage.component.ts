import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ProductService} from '../Services/product/product.service';
import {AddProductDialogComponent} from '../Dialogs/AddProduct/add-product-dialog/add-product-dialog.component';
import {AddToCartDialogComponent} from '../Dialogs/AddToCart/add-to-cart-dialog/add-to-cart-dialog.component';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { UserService } from '../Services/user/user.service';
import {DeleteProductDialogComponent} from '../Dialogs/DeleteProduct/delete-product-dialog/delete-product-dialog.component';
import {CatergoriesDialogComponent} from '../Dialogs/Category/catergories-dialog/catergories-dialog.component';
import { CategoryService } from '../Services/category/category.service';

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
    private dialog:MatDialog,
    private categoryService:CategoryService) {  
      this.currentUser = userService.getCurrentUserNotFromServer();
      if (this.currentUser.isAdmin) {
        this.displayedColumns = ['name', 'price', 'weight', 'image', 'deleteProduct'];

      } else {
        this.displayedColumns = ['name', 'price', 'weight', 'image', 'addToCart'];
      }

      this.categoryService.categories.subscribe(res => {

        if(res!=null){
          this.categories = res.slice();
          this.categories.push({_id:null, name:'None'});
        }
      });
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

  categories = [];

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
      width: '28vw',
      data: product
    });
    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result) {
        console.log(result);
        this.loadProducts();
      }
    });
  }

  openDeleteProductModal(product) {
    let dialogRef = this.dialog.open(DeleteProductDialogComponent, {
      width: '600px',
      data: product
    });
    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result) {
        console.log(result);
        this.loadProducts();
      }
    });
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id).then((isDeleted) => {
      debugger;
      if (isDeleted) {
        this.loadProducts();
      }
    });
  }

  onSubmit() {
    this.loadProducts();
  }

  loadProducts() {
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

  openCategoriesModal(){
    let dialogRef = this.dialog.open(CatergoriesDialogComponent, {
      width: '600px',
      data: 'This text is passed into the dialog!'
    });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}


export interface Element {
  name: string;
  position: number;
  weight: number;
  imageUrl: string;
}