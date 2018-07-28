import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { AlertModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { UserService } from './Services/user/user.service';
import { ProductService } from './Services/product/product.service';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS } from 'angular2-jwt';

import { HttpClientModule } from '@angular/common/http'; 
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { MatIconModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatModule } from './mat.module'

import { MatAutocompleteModule, MatInputModule, MatDialogModule, MatDialogRef } from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CartComponent } from './cart/cart.component';
import { AddProductDialogComponent } from './Dialogs/AddProduct/add-product-dialog/add-product-dialog.component';

export function getAuthHttp(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerName: 'x-auth-token',
    noTokenScheme: true,
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => {
      return localStorage.getItem('id_token_sn')}),
  }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MyProfileComponent,
    UserManageComponent,
    ProductManageComponent,
    StatisticsComponent,
    CartComponent,
    AddProductDialogComponent
  ],
  exports: [
    ReactiveFormsModule
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    BrowserAnimationsModule,
    MatModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  providers: [
    UserService,
    ProductService,
    AUTH_PROVIDERS,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
  ],
  entryComponents: [AddProductDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }