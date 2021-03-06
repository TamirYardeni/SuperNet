import { Injectable } from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs';

declare const FB:any;

@Injectable()
export class UserService {

  constructor(private http: AuthHttp) {
    FB.init({
      appId      : '224136171639903',
      status     : false,
      cookie     : false,  
      xfbml      : false, 
      version    : 'v2.8' 
    });
  }

  private currentUser : any = {};

  private isAdminBS = new BehaviorSubject<any>(null); 
  isAdmin = this.isAdminBS.asObservable();

  private addressBS = new BehaviorSubject<any>(null); 
  address = this.addressBS.asObservable();

  private isLoggedInBS = new BehaviorSubject<any>(null); 
  isLoggedInObs = this.isLoggedInBS.asObservable();

  initCurrentUser() {
    this.isAdminBS.next(false);
    this.isLoggedInBS.next(false);
  }

  fbLogin() {
    return new Promise((resolve, reject) => {
      FB.login(result => {
        if (result.authResponse) {

          return this.http.post('http://localhost:3000/api/v1/auth/facebook', {access_token: result.authResponse.accessToken})
              .toPromise()
              .then(response => {
                var token = response.headers.get('x-auth-token');
                if (token) {
                  localStorage.setItem('id_token_sn', token);
                }
                resolve(response.json());
              })
              .catch((e) => {console.log(e); reject();});
        } else {
          reject();
        }
      }, {scope: 'public_profile,email'})
    });
  }

  share(url: string) {
    FB.ui({
      method: 'share',
      title: 'your_title',  // The same than name in feed method
      caption: 'your_caption',  
      description: 'your_description',
      href: 'https://developers.facebook.com/docs/',
    }, function(response){});
   
  }

  logout() {
    localStorage.removeItem('id_token_sn');
  }

  isLoggedIn() {    
    return new Promise((resolve, reject) => {
      this.getCurrentUser().then(user => resolve(true)).catch(() => reject(false));
    });
  }

  checkIsAdmin() {    
    debugger;
    return new Promise((resolve, reject) => {
      debugger;
      this.getCurrentUser().then(user => resolve(user['isAdmin'])).catch(() => reject(false));
    });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      return this.http.get('http://localhost:3000/api/v1/auth/me').toPromise().then(response => {
        this.currentUser = response.json();
        this.isAdminBS.next(this.currentUser.isAdmin);
        this.isLoggedInBS.next(true);

        if (this.currentUser.address!=null) {
          this.addressBS.next(this.currentUser.address);
        }
        resolve(response.json());
      }).catch(() => {this.isAdminBS.next(false); this.isLoggedInBS.next(false); reject();});
    });
  }  

  getCurrentUserNotFromServer() {
    return this.currentUser;
  }
  
  getHealthCheck() {
    return new Promise((resolve, reject) => {
      return this.http.get('http://localhost:3000/api/v1/health-check').toPromise().then(response => {
        resolve(response);
      })});
  }

  getUsers(filter) {
    return new Promise((resolve, reject) => {
        return this.http.get('http://localhost:3000/api/v1/users/'+JSON.stringify(filter))
              .toPromise()
              .then(response => {
                
                resolve(response.json());
              })
              .catch((e) => { reject();}); 
    });
  }

  getUsersStatisctics() {
    return new Promise((resolve, reject) => {
        return this.http.get('http://localhost:3000/api/v1/statistics/users')
              .toPromise()
              .then(response => {
                
                resolve(response.json());
              })
              .catch((e) => { reject();}); 
    });
  }

  getProductsStatisctics() {
    return new Promise((resolve, reject) => {
        return this.http.get('http://localhost:3000/api/v1/statistics/products')
              .toPromise()
              .then(response => {
                
                resolve(response.json());
              })
              .catch((e) => { reject();}); 
    });
  }

  getRecommendedByProduct(product) {
    return new Promise((resolve, reject) => {
        return this.http.get('http://localhost:3000/api/v1/statistics/products/'+product._id)
              .toPromise()
              .then(response => {
                
                resolve(response.json());
              })
              .catch((e) => { reject();}); 
    });
  }

  updateAdminStatuses(adminStatuses) {
    return new Promise((resolve, reject) => {
      return this.http.post('http://localhost:3000/api/v1/users/status', adminStatuses)
            .toPromise()
            .then(response => {
              resolve(response.json());
            })
            .catch((e) => { reject();}); 
    });
  }

  updateAddress(address) {
    return new Promise((resolve, reject) => {
      return this.http.post('http://localhost:3000/api/v1/users/address', 
      {_id:this.currentUser._id, address:address})
            .toPromise()
            .then(response => {
              resolve(response.json());
            })
            .catch((e) => { reject();}); 
    });
  }
}