import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatList} from '@angular/material';
import { Button } from 'protractor';
import {CategoryService} from '../../../Services/category/category.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-catergories-dialog',
  templateUrl: './catergories-dialog.component.html',
  styleUrls: ['./catergories-dialog.component.css']
})
export class CatergoriesDialogComponent implements OnInit {

  categoriesForm: FormGroup;

  categories;

  constructor(public dialogRef: MatDialogRef<CatergoriesDialogComponent>,
    private categoryService:CategoryService,
    public snackBar: MatSnackBar) {

    this.categoryService.categories.subscribe(res => {
      if(res!=null){
        this.categories = res;
      }
    });
   }

  ngOnInit() {
    this.categoriesForm = new FormGroup({
      name: new FormControl()
    });
  }

  onSubmit() {
    this.categoryService.addCategory(this.categoriesForm.value.name).then((category) => {
      (<HTMLInputElement>document.getElementById('categoryNameToInsert')).value = null;
      this.categoriesForm.value.name = null;
    });
  }

  deleteCategory(category) {
    this.categoryService.deleteCategory(category).then((isDeleted) => {
      if (isDeleted) {
        this.snackBar.open("Category deleted", 'Info', {
          duration: 2000,
         });
      } else {
        this.snackBar.open("Catetgory not deleted", 'Error', {
          duration: 2000,
         });
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
