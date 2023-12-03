import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../services/libro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Libro } from '../../interfaces/libro.interface';

@Component({
  selector: 'app-libro-page',
  templateUrl: './libro-page.component.html',
  styles: [
  ]
})
export class LibroPageComponent implements OnInit{

  public libro?: Libro;

  constructor(
    private libroService: LibroService,
    private activateRoute:ActivatedRoute,
    private router:Router
    ) {}

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap( ({id}) => this.libroService.getLibroById(id) ),
      ).subscribe( 
        libro => {
          if(!libro) return this.router.navigate([ '/libros/list' ]);
          this.libro = libro;
          return;
        }
      )
  }

  goBack(): void{
    this.router.navigateByUrl('/libros/list')
  }

}

