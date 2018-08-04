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
  newsTxt;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getCurrentUser().then(profile => this.currentUser = profile)
        .catch(() => this.currentUser = {});
    this.newsTxt = "";
    var url = 'https://newsapi.org/v2/top-headlines?' +
      'country=us&' +
      'apiKey=6ee435df1f0d47439b3223b89e227267';
    var req = new Request(url);
    fetch(req).then((response) => {
      var txt = "";
      response.json().then(response => {
          response['articles'].forEach(element => {
            txt += element.title + " | ";
          });
          debugger;
          this.newsTxt = txt;
      });
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/welcome']);
  }

} 