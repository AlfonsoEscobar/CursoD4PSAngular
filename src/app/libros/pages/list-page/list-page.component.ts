import { Component, OnInit, ViewChild } from '@angular/core';
import { Libro } from '../../interfaces/libro.interface';
import { LibroService } from '../../services/libro.service';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';

// @Component({
//   selector: 'app-list-page',
//   templateUrl: './list-page.component.html',
//   styles: [
//   ]
// })
// export class ListPageComponent implements OnInit{
  
//   public libros: Libro[] = [];
  
//   constructor(private libroService: LibroService){ }

//   ngOnInit(): void {
//     this.libroService.getLibros()
//       .subscribe(libros =>this.libros = libros);
//   }

//   columnas: string[] = ['codigo', 'descripcion', 'precio', 'borrar'];

//   datos: Libro[] = this.libros;

//   librosselect: Libro = this.libros[0];

//   @ViewChild(MatTable) tabla1!: MatTable<Libro>;

//   borrarFila(cod: number) {
//     if (confirm("Realmente quiere borrarlo?")) {
//       this.datos.splice(cod, 1);
//       this.tabla1.renderRows();
//     }
//   }

// }

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: [],
})
export class ListPageComponent implements OnInit {
  libros: Libro[] = [];
  displayedColumns: string[] = ['id', 'title', 'author', 'genre', 'isbn', 'published', 'publisher', 'acciones',];

  selectedLibros: Libro[] = [];

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

  // Método para manejar la selección de filas
  borrarLibro(libro: Libro) {
    const index = this.selectedLibros.indexOf(libro);
    if (index >= 0) {
      this.selectedLibros.splice(index, 1);
    } else {
      this.selectedLibros.push(libro);
      console.log(libro.id)
      this.libroService.deleteLibro(libro.id)
        .subscribe();
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

}
