import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './User/header/header.component';
import { FooterComponent } from './User/footer/footer.component';
import { BaseComponent } from './core/base/base.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './User/cart/cart.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { BillComponentComponent } from './User/bill-component/bill-component.component';
import { ContactComponent } from './User/contact/contact.component';
import { NewsComponent } from './User/news/news.component';
// import { ProductDeltailComponent } from './User/product-deltail/product-deltail.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BaseComponent,
    CartComponent,
    BillComponentComponent,
    ContactComponent,
    NewsComponent,
    // ProductDeltailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NzNotificationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
