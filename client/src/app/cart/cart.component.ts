import { Component, OnInit } from '@angular/core';
import {CartService} from '../Services/cart/cart.service';
import {MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../Services/user/user.service';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RecommendedComponent } from '../Dialogs/Recommended/recommended/recommended.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  displayedColumns = ['name', 'image', 'price', 'weight', 'weightAmount', 'deleteProduct'];

  dataSource= new MatTableDataSource();

  constructor(private cartService:CartService,
              private http: HttpClient,
              private router: Router,
              private userService: UserService,
              private dialog:MatDialog,
              public snackBar: MatSnackBar) { }

  cartDetails;
  isPayed: Boolean;
  money;
  totalPrice:Number;

  ngOnInit() {
    this.isPayed = false;
    this.cartDetails = this.cartService.getCartDetails();
    this.dataSource = new MatTableDataSource(this.cartDetails);
    this.totalPrice = 0;
    this.calcTotalAmount();
  }

  saveCart() {
    this.cartService.saveCart().then((isAdded)=> {
      if (isAdded) {
        this.isPayed = true;
        this.cartService.deleteAllCart();
        this.totalPrice = 0.0;
      } else {
        this.snackBar.open("Could not execute payment", 'Error', {
          duration: 2000,
        });
      }
    });
  }

  deleteProductFromCart(product) {
    this.cartService.deleteFromCart(product);
    this.cartDetails = this.cartService.getCartDetails();
    this.dataSource = new MatTableDataSource(this.cartDetails);
    this.calcTotalAmount();
  }

  returnToMain() {
    this.router.navigate(['/welcome']);
  }

  share() {
    this.userService.share("I just bought in SuperNet");
  }

  calcTotalAmount() {
    var total = 0.0;
    this.cartDetails.forEach(function(product) {
      debugger;
      if (product.isWeight) {
        total = total + (product.weight * product.weightAmount * product.price);
      } else {
        total =total +  (product.amount * product.price);
      }
    });

    this.totalPrice = total;
  }

  openRecommendedModal() {
    let dialogRef = this.dialog.open(RecommendedComponent, {
      width: '600px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result) {
        console.log(result);
        this.saveCart();
      }
    });
  }
}

export interface Element {
  name: string;
  amount: number;
  price: number;
  weight: number;
  weightAmount:number;
  imageUrl: string;
}
