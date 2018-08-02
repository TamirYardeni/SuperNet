import { Component, OnInit } from '@angular/core';
import { UserService } from './Services/user/user.service';
import { Router } from '@angular/router';
import {CategoryService} from './Services/category/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public isAdmin :Boolean;
  public isLoggedIn :Boolean;

  constructor(private userService: UserService, private router: Router,
  private categoryService:CategoryService) { 
    this.userService.initCurrentUser();
  }

  ngOnInit() {
    /*this.userService.getCurrentUser().then(profile => this.currentUser = profile)
        .catch(() => this.currentUser = {});*/

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

  }

  menuButtonClicked(routName) {
    this.router.navigate([routName]);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/welcome']);
  }
}