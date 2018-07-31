import { Component, OnInit } from '@angular/core';
import { UserService } from './Services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public currentUser : any = {};

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    debugger;
    this.userService.getCurrentUser().then(profile => this.currentUser = profile)
        .catch(() => this.currentUser = {});

  }

  menuButtonClicked(routName) {
    debugger;
    this.router.navigate([routName]);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/welcome']);
  }
}