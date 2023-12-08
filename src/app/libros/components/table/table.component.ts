import { Component, Input, OnInit } from '@angular/core';
import { Libro } from '../../interfaces/libro.interface';
import { LibroService } from '../../services/libro.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: []
})
export class TableComponent implements OnInit {

  @Input()
  public libros: Libro[] = [];
  
  public displayedColumns: string[] = ['id', 'title', 'author', 'genre', 'isbn', 'published', 'publisher', 'acciones',];
  public selectedLibros: Libro[] = [];

  constructor(
    private libroService: LibroService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
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

}
