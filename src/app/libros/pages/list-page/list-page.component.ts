import { Component, OnInit, ViewChild } from '@angular/core';
import { Libro } from '../../interfaces/libro.interface';
import { LibroService } from '../../services/libro.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs/operators';

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

  borrarLibro(libro: Libro) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: libro,
    });

    dialogRef.afterClosed()
        .pipe(
          filter( (result: boolean) => result ),
          switchMap( () => this.libroService.deleteLibro(libro.id)),
          filter( (wasDeleted: boolean) => wasDeleted ),
        )
        .subscribe(result => {
          if (result) {
            this.libros = this.libros.filter(lib => lib.id !== libro.id);
          }
      });
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
