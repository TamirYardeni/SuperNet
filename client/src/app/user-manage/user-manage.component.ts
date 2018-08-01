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

  displayedColumns = ['id', 'name', 'email', 'isAdmin'];
  dataSource= new MatTableDataSource();

  filterUserForm: FormGroup;
  isSubmitted: Boolean;
  isSpinner: Boolean;
  userId:String;
  userChangedStatuses;
  userTypes = [
    {value: null, viewValue: 'None'},
    {value: true, viewValue: 'Admin'},
    {value: false, viewValue: 'Regular'}
  ];

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(private userService:UserService) { 
    this.userId = this.userService.getCurrentUserNotFromServer()._id;
    this.userChangedStatuses=[];
  }

  ngOnInit() {
    this.isSubmitted = false;
    this.isSpinner = false;

    this.filterUserForm = new FormGroup({
      isAdmin: new FormControl(),
      email: new FormControl(),
      name: new FormControl()
    });
  }

  onSubmit() {
    debugger;
    if (this.filterUserForm.valid) {
      this.isSubmitted = true;
      this.isSpinner = true;
      this.userService.getUsers(this.filterUserForm.value).then((users: Element[]) => {

        /*users.forEach(user => {
          delete user['_id'];
        });*/
        debugger;
        console.log(users);
        this.dataSource = new MatTableDataSource(users);
        this.isSpinner = false;
      });  
    }
  }

  changeAdminStatus(userId, isChecked) {
    debugger;
    var isChanged = false;
    this.userChangedStatuses.forEach(function(node) {
      if (node.id == userId) {
        node.state = isChecked;
        isChanged = true;
      }
    });

    if (!isChanged) {
      this.userChangedStatuses.push({id:userId, state:isChecked});
    }
  }

  saveAdminChange() {
    this.userService.updateAdminStatuses(this.userChangedStatuses);
  }

}

export interface Element {
  id: String;
  email: string;
  isAdmin: boolean;
  fullName: String;
}