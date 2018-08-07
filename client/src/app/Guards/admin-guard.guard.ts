import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Route
} from '@angular/router';
import { UserService } from '../Services/user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkLogin();
    }

    checkLogin(): Promise<boolean> {
      debugger;
        return new Promise((resolve, reject) => {
          debugger;
            this.userService.checkIsAdmin().then((isAdmin:boolean) => {
              debugger;
              if (isAdmin) {
                resolve(isAdmin);
              } else {
                this.router.navigate(['/welcome']);
                reject(false);
              }
            }).catch(() => {
                this.router.navigate(['/welcome']);
                reject(false);
            });
        });
    }
}