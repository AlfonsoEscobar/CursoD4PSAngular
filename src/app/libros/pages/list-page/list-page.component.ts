import { Component, OnInit } from '@angular/core';
import { Libro } from '../../interfaces/libro.interface';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit{
  
  public libros: Libro[] = [];
  
  constructor(private libroService: LibroService){ }

  ngOnInit(): void {
    this.libroService.getLibros()
      .subscribe(libros =>{
        this.libros = libros
      });
  }

  displayedColumns: string[] = ['id', 'titulo', 'autor', 'editorial'];
  dataSource = this.libros;

}