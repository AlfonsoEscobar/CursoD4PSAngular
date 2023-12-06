import { Component, OnInit } from '@angular/core';
import { Libro, LibroBusqueda } from '../../interfaces/libro.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { LibroService } from '../../services/libro.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
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
  
  // searchLibro() {
  //   const value: string = this.searchInput.value || '';

  //   this.librosService.getSuggestions(value)
  //     .subscribe( libros => {
  //       this.libros = libros
  //     });
  // }

  onSubmit(): void{
    const libroBusqueda = this.libroForm.value as LibroBusqueda;
    console.log({libroBusqueda});

    // Construimos la sentencia de busqueda
    const filteredSearchCriteria = Object.entries(libroBusqueda).filter(([_, value]) => value !== '');

    // Realizar la solicitud al servidor con los criterios de búsqueda
    // ...

    console.log(filteredSearchCriteria);

    let busqueda: string = '?';

    // if(libroBusqueda.title){
    //   busqueda += `title_like=${libroBusqueda.title}`
    // }
    // if(libroBusqueda.author){
    //   busqueda += `&author_like=${libroBusqueda.author}`
    // }
    // if(libroBusqueda.genre){
    //   busqueda += `&genre_like=${libroBusqueda.genre}`
    // }
    // if(libroBusqueda.from){ // FROM
    //   busqueda += `&published_gte=${libroBusqueda.from}`
    // }
    // if(libroBusqueda.to){ // TO
    //   busqueda += `&published_lte=${libroBusqueda.to}`
    // }
    // if(libroBusqueda.isbn){ // FROM
    //   busqueda += `&isbn_like=${libroBusqueda.isbn}`
    // }
    // if(libroBusqueda.publisher){ // FROM
    //   busqueda += `&publisher_like=${libroBusqueda.publisher}`
    // }

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

    console.log(busqueda);

    this.librosService.getSuggestions(busqueda)
      .subscribe();

  }

}
