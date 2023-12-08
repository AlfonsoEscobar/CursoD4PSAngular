import { Component, OnInit, ViewChild } from '@angular/core';
import { Libro } from '../../interfaces/libro.interface';
import { LibroService } from '../../services/libro.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: [],
})
export class ListPageComponent implements OnInit {

  public libros: Libro[] = [];
  public displayedColumns: string[] = ['id', 'title', 'author', 'genre', 'isbn', 'published', 'publisher', 'acciones',];
  public selectedLibros: Libro[] = [];
  public title = new FormControl('');
  public author = new FormControl('');
  public genre = new FormControl('');
  public selectedLibro?: Libro;

  constructor(
    private libroService: LibroService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cargarLibros();
  }

  cargarLibros() {
    this.libroService.getLibros().subscribe((data) => {
      this.libros = data;
    });
  }

  searchLibro(tag: string) {
    const propertyMap: Record<string, FormControl> = {
      'title': this.title,
      'genre': this.genre,
      'author': this.author
    };
  
    const value = propertyMap[tag]?.value || '';
    const query = `?${tag}_like=${value}`;
  
    this.libroService.getSuggestions(query)
      .subscribe(libros => {
        this.libros = libros;
      });
  }

}
