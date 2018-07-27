import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public currentUser : any = {};

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getCurrentUser().then(profile => this.currentUser = profile)
        .catch(() => this.currentUser = {});

    var c= <HTMLCanvasElement> document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.font = "14px Arial";
    ctx.strokeText("אין לי מושג מה עושים עם הcanvas הזה אבל חייב להשתמש בו לאליקציות אינטר", 100,20);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/welcome']);
  }

} 