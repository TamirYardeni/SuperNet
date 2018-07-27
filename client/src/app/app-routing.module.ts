import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth-guard.guard';
import { AnonymousGuard } from './Guards/anonymous-guard.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CartComponent } from './cart/cart.component';

const appRoutes: Routes = [
    {
        path: 'welcome',
        component: LoginComponent,
        canActivate: [AnonymousGuard]
    },
    {
        path: 'about',
        component: DashboardComponent/*,
        canActivate: [AuthGuard]*/
    },
    {
        path: 'users',
        component: UserManageComponent
    },
    {
        path: 'statistics',
        component: StatisticsComponent
    },
    {
        path: 'products',
        component: ProductManageComponent
    },
    {
        path: 'profile',
        component: MyProfileComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    { path: '', redirectTo: 'welcome' , pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard,
        AnonymousGuard
    ]
})
export class AppRoutingModule { }