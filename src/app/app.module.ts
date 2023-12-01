import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './libros/components/card/card.component';
import { ConfirmDialogComponent } from './libros/components/confirm-dialog/confirm-dialog.component';
import { LibroPageComponent } from './libros/pages/libro-page/libro-page.component';
import { LayoutPageComponent } from './libros/pages/layout-page/layout-page.component';
import { ListPageComponent } from './libros/pages/list-page/list-page.component';
import { NewPageComponent } from './libros/pages/new-page/new-page.component';
import { SearchPageComponent } from './libros/pages/search-page/search-page.component';


@NgModule({
  declarations: [	
    AppComponent, CardComponent, ConfirmDialogComponent, LibroPageComponent, LayoutPageComponent, ListPageComponent, NewPageComponent, SearchPageComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
