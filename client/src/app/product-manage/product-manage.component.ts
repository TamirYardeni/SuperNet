import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ProductService} from '../Services/product/product.service';
import {AddProductDialogComponent} from '../Dialogs/AddProduct/add-product-dialog/add-product-dialog.component';
import {FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.css']
})
export class ProductManageComponent implements OnInit {

  displayedColumns = ['name', 'price', 'weight', 'image'];
  dataSource= new MatTableDataSource();

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(private productService:ProductService,
  private dialog:MatDialog) {  }

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
  symbol: string;
}