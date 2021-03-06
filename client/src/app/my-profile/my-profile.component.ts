import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {UserService} from '../Services/user/user.service';
import { MatInput, MatButton } from '@angular/material';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  @ViewChild('address') public address: ElementRef;

  isEdit:Boolean;
  user: JSON;
  displayedColumns = ['date', 'total'];
  dataSource= new MatTableDataSource();

  constructor(private userService:UserService) { 
    this.isEdit = false;
  }

  ngOnInit() {
    this.user = this.userService.getCurrentUserNotFromServer();
    (<MatInput>this.address.nativeElement).value = this.user['address'];
    this.dataSource = new MatTableDataSource(this.user['carts']);
  }

  changeState() {
    var btn = document.getElementById('editBtn');
    if (this.isEdit) {
      this.isEdit = false;
      btn.innerText = "Edit";
      this.userService.updateAddress(this.address.nativeElement.value).then((oldUser)=>{
        this.userService.getCurrentUser().then((user:JSON)=> {
          this.user = user;
          (<MatInput>this.address.nativeElement).value = this.user['address'];
          this.dataSource = new MatTableDataSource(this.user['carts']);
        });
      });
    } else {
      this.isEdit = true;
      btn.innerText = "Save";
    }    
  }

}
