import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { AlertModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { UserService } from './Services/user/user.service';
import { ProductService } from './Services/product/product.service';
import { CartService } from './Services/cart/cart.service';
import { CategoryService } from './Services/category/category.service';
import { MapService } from './Services/map/map.service';
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
import { AddToCartDialogComponent } from './Dialogs/AddToCart/add-to-cart-dialog/add-to-cart-dialog.component';
import { DeleteProductDialogComponent } from './Dialogs/DeleteProduct/delete-product-dialog/delete-product-dialog.component';
import { CatergoriesDialogComponent } from './Dialogs/Category/catergories-dialog/catergories-dialog.component';
import { MapComponent } from './map/map.component';

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
    AddProductDialogComponent,
    AddToCartDialogComponent,
    DeleteProductDialogComponent,
    CatergoriesDialogComponent,
    MapComponent
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
    CartService,
    CategoryService,
    MapService,
    AUTH_PROVIDERS,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
  ],
  entryComponents: [AddProductDialogComponent, AddToCartDialogComponent, 
                    DeleteProductDialogComponent,CatergoriesDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }