import { Component, OnInit } from '@angular/core';
import { Libro } from '../../interfaces/libro.interface';
import { FormControl } from '@angular/forms';
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

  public searchInput = new FormControl('');
  public libros: Libro[] = [];
  public selectedHero?: Libro;


  constructor(
    private librosService: LibroService,
    private router: Router
    ) { }
  
  searchLibro() {
    const value: string = this.searchInput.value || '';

    this.librosService.getSuggestions(value)
      .subscribe( libros => {
        this.libros = libros
      });
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent): void {
    if( !event.option.value ){
      this.selectedHero = undefined;
      return;
    }
    
    const libro: Libro = event.option.value;
    this.searchInput.setValue(libro.title);
    this.router.navigate(['/libros/edit', libro.id]);
  }

}
