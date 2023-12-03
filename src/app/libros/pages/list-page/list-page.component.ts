import { Component, OnInit, ViewChild } from '@angular/core';
import { Libro } from '../../interfaces/libro.interface';
import { LibroService } from '../../services/libro.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarLibros();
  }

  cargarLibros() {
    this.libroService.getLibros().subscribe((data) => {
      this.libros = data;
    });
  }

  borrarLibro(libro: Libro) {
    const index = this.selectedLibros.indexOf(libro);
    if (index >= 0) {
      this.selectedLibros.splice(index, 1);
    } else {
      this.selectedLibros.push(libro);
      this.libroService.deleteLibro(libro.id)
        .subscribe(data => { 
          if (data) {
            this.libros = this.libros.filter(lib => lib.id !== libro.id);
          }
        });
    }

  }

  editarLibro(libro: Libro) {
    const index = this.selectedLibros.indexOf(libro);
    if (index >= 0) {
      this.selectedLibros.splice(index, 1);
    } else {
      this.selectedLibros.push(libro);
      this.router.navigate(['/libros/edit', libro.id])
    }

  }

  searchLibro(tag: string) {
    let value: string = '';

    if(tag === 'title'){
      value = this.title.value || '';
    }else if(tag === 'genre'){
      value = this.genre.value || '';
    }else if(tag === 'author'){
      value = this.author.value || '';
    }

    this.libroService.getSuggestions(tag, value)
      .subscribe( libros => {
        this.libros = libros
      });
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent, tag: string): void {
    if( !event.option.value ){
      this.selectedLibro = undefined;
      return;
    }
    
    const libro: Libro = event.option.value;
    if(tag === 'title'){
      this.title.setValue(libro.title);
    }else if(tag === 'genre'){
      this.genre.setValue(libro.genre);
    }else if(tag === 'author'){
      this.author.setValue(libro.author);
    }
    this.router.navigate(['/libros/edit', libro.id]);
  }

}
