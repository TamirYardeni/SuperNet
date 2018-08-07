import { ChatComponent } from './chat/chat.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth-guard.guard';
import { AdminGuard } from './Guards/admin-guard.guard';
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
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        component: UserManageComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'statistics',
        component: StatisticsComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'chat',
        component: ChatComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'products',
        component: ProductManageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        component: MyProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'cart',
        component: CartComponent,
        canActivate: [AuthGuard]
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
        AnonymousGuard,
        AdminGuard
    ]
})
export class AppRoutingModule { }