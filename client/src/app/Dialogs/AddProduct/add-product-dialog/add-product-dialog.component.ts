import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {ProductService} from '../../../Services/product/product.service';


@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit {
  @ViewChild('addProductForm') form: ElementRef;
  constructor(private productService:ProductService) { }

  myform: FormGroup;

  ngOnInit() {
    this.myform = new FormGroup({
      /*name: new FormGroup({ 
          firstName: new FormControl(), 
          lastName: new FormControl(),
      }),*/
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
    debugger;
    if (this.myform.valid) {
      this.productService.addProduct(this.myform.value).then((isAdded) => {
        if (isAdded) {
          console.log('product added');
        } else {
          console.log('product not added');
        }
      });  
    }
  }
}
