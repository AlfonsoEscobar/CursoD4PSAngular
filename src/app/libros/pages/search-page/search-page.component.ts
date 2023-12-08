import { Component, OnInit } from '@angular/core';
import { Libro, LibroBusqueda } from '../../interfaces/libro.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { LibroService } from '../../services/libro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public libroForm = new FormGroup({
    title:        new FormControl('',),
    author:       new FormControl(''),
    genre:        new FormControl(''),
    isbn:         new FormControl(''),
    from:         new FormControl(''),
    to:    new FormControl(''),
    publisher:    new FormControl(''),
  });

  public searchInput = new FormControl('');
  public libros: Libro[] = [];
  public selectedLibro?: Libro;


  constructor(
    private librosService: LibroService,
    private router: Router
    ) { }

  onSubmit(): void{
    const libroBusqueda = this.libroForm.value as LibroBusqueda;
  
    let busqueda: string = '?';

    const queryParams = [
      { key: 'title', prefix: 'title_like' },
      { key: 'author', prefix: 'author_like' },
      { key: 'genre', prefix: 'genre_like' },
      { key: 'from', prefix: 'published_gte' },
      { key: 'to', prefix: 'published_lte' },
      { key: 'isbn', prefix: 'isbn_like' },
      { key: 'publisher', prefix: 'publisher_like' }
    ];
    
    for (const param of queryParams) {
      if (libroBusqueda[param.key as keyof LibroBusqueda]) {
        busqueda += `&${param.prefix}=${libroBusqueda[param.key as keyof LibroBusqueda]}`;
      }
    }

    if(busqueda != '?'){
      this.librosService.getSuggestions(busqueda)
        .subscribe( data => {
          this.libros = data;
        });
    }
  }

  onClean(): void {
    this.libroForm.reset();
    this.libros = [];
  }

}
