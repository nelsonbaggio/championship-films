import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MovieService } from './services/movie.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  providers: [
    MovieService,
    {
      provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }