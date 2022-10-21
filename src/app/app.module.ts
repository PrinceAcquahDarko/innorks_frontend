import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth/auth.module';
import { SharedModule } from './shared/shared/shared.module';
import { BookModule } from './book/book/book.module';
import { AppRoutingModule } from './app.routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptorModule } from './http.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    HttpInterceptorModule,
    BookModule,
    AuthModule,
    AppRoutingModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
