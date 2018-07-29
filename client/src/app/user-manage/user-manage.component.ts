import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {UserService} from '../Services/user/user.service';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css']
})
export class UserManageComponent implements OnInit {

  displayedColumns = ['id', 'email', 'isAdmin'];
  dataSource= new MatTableDataSource();

  filterUserForm: FormGroup;
  isSubmitted: Boolean;
  isSpinner: Boolean;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(private userService:UserService) { 

  }

  ngOnInit() {
    this.isSubmitted = false;
    this.isSpinner = false;

    this.filterUserForm = new FormGroup({
      id: new FormControl(),
      email: new FormControl()
    });
  }

  onSubmit() {
    debugger;
    if (this.filterUserForm.valid) {
      this.isSubmitted = true;
      this.isSpinner = true;
      this.userService.getUsers(this.filterUserForm.value).then((users: Element[]) => {

        users.forEach(user => {
          delete user['_id'];
        });
        
        console.log(users);
        this.dataSource = new MatTableDataSource(users);
        this.isSpinner = false;
      });  
    }
  }

}

export interface Element {
  id: String;
  email: string;
  isAdmin: boolean;
}