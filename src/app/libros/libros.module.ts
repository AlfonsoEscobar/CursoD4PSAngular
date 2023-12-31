import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrosRoutingModule } from './libros-routing.module';
import { LibroPageComponent } from './pages/libro-page/libro-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LibroImagePipe } from './pipes/imageLibro.pipe';
import { TableComponent } from './components/table/table.component';



@NgModule({
  declarations: [
    LibroPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    LibroImagePipe,
    ConfirmDialogComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    LibrosRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class LibrosModule { }
