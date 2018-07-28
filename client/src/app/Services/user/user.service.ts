import { Injectable } from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

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

  fbLogin() {
    return new Promise((resolve, reject) => {
      FB.login(result => {
        if (result.authResponse) {
          debugger;

          return this.http.post('http://localhost:3000/api/v1/auth/facebook', {access_token: result.authResponse.accessToken})
              .toPromise()
              .then(response => {
                debugger;
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

  logout() {
    localStorage.removeItem('id_token_sn');
  }

  isLoggedIn() {
    debugger;
    return new Promise((resolve, reject) => {
      this.getCurrentUser().then(user => resolve(true)).catch(() => reject(false));
    });
  }

  getCurrentUser() {
    debugger;
    return new Promise((resolve, reject) => {
      return this.http.get('http://localhost:3000/api/v1/auth/me').toPromise().then(response => {
        this.currentUser = response.json();
        resolve(response.json());
      }).catch(() => reject());
    });
  }  

  getCurrentUserNotFromServer() {
    return this.currentUser;
  }
  
  getHealthCheck() {
    return new Promise((resolve, reject) => {
      debugger;
      return this.http.get('http://localhost:3000/api/v1/health-check').toPromise().then(response => {
        debugger;
        resolve(response);
      })});
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      return this.http.post('http://localhost:3000/api/v1/users', {})
                .toPromise()
                .then(response => {
                  debugger;
                  
                  resolve(response.json());
                })
                .catch((e) => {console.log(e); reject();});
    });
  }
}