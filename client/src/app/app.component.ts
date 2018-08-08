import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from './Services/user/user.service';
import { Router } from '@angular/router';
import {CategoryService} from './Services/category/category.service';
import { CartService } from './Services/cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('canvas') public canvas: ElementRef;
  //Assets
  @ViewChild('pdf') imageObj: ElementRef;
  canvasEl: any;
  ctx: CanvasRenderingContext2D;

  public isAdmin :Boolean;
  public isLoggedIn :Boolean;
  public badgeCount: Number;

  constructor(private userService: UserService, private router: Router,
  private categoryService:CategoryService,
  private cartService:CartService) { 
    this.userService.initCurrentUser();
  }

  ngOnInit() {
    /*this.userService.getCurrentUser().then(profile => this.currentUser = profile)
        .catch(() => this.currentUser = {});*/
    this.badgeCount = 0;

    this.userService.isAdmin.subscribe(res => {
      if(res!=null){
        this.isAdmin = res;
      }
    });

    this.userService.isLoggedInObs.subscribe(res => {
      if(res!=null){
        this.isLoggedIn = res;
      }
    });

    this.categoryService.getAllCategories();

    this.cartService.productsAmount.subscribe(res => {
      if(res!=null){
        this.badgeCount = res;
      }
    });

  }

  afterLoading() {
    this.ctx.clearRect(0, 0, 100,100);
    this.ctx.drawImage(this.imageObj.nativeElement,0,0, 100, 50);  
  }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext("2d");
  }

  menuButtonClicked(routName) {
    this.router.navigate([routName]);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/welcome']);
  }
}