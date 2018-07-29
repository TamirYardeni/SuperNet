import { Component, OnInit } from '@angular/core';
import {UserService} from '../Services/user/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(private userService:UserService) { }

  user: JSON;

  ngOnInit() {
    this.user = this.userService.getCurrentUserNotFromServer();
    console.log(this.userService.getCurrentUserNotFromServer());
  }

}
