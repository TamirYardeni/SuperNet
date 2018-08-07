import { Injectable } from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CategoryService {

  constructor(private http: AuthHttp) { }

  private categoriesBS = new BehaviorSubject<any>(null); 
  categories = this.categoriesBS.asObservable();

  getAllCategories() {
    return new Promise((resolve, reject) => {
      return this.http.get('http://localhost:3000/api/v1/categories')
            .toPromise()
            .then(response => {
              resolve(response.json());
              this.categoriesBS.next(response.json());
            })
            .catch((e) => { reject();}); 
    });
  }

  addCategory(name) {
    return new Promise((resolve, reject) => {
      return this.http.post('http://localhost:3000/api/v1/categories', {catName:name})
            .toPromise()
            .then(response => {
              this.getAllCategories();
              resolve(response.json());
            })
            .catch((e) => { reject();}); 
    });
  }

  deleteCategory(category) {
    return new Promise((resolve, reject) => {
      return this.http.delete('http://localhost:3000/api/v1/categories/'+category._id)
            .toPromise()
            .then(response => {
              this.getAllCategories();
              resolve(response.json());
            })
            .catch((e) => { reject();}); 
    });
  }
}
