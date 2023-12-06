import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { filter, switchMap } from 'rxjs/operators';

import { Libro } from '../../interfaces/libro.interface';
import { LibroService } from '../../services/libro.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{

  constructor(
    private librosService: LibroService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
    ) { }
  
  get currentLibro(): Libro {
    const libro = this.libroForm.value as Libro;
    return libro;
  }

  ngOnInit(): void {
    if ( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.librosService.getLibroById(id)),
      ).subscribe( libro => {
        if (!libro) return this.router.navigateByUrl('/');

        this.libroForm.reset( libro );
        return;
      });

  }
  
  public libroForm = new FormGroup({
    id:           new FormControl(''),
    title:        new FormControl('',),
    author:       new FormControl(''),
    image:        new FormControl(''),
    genre:        new FormControl(''),
    isbn:         new FormControl(''),
    published:    new FormControl(''),
    publisher:    new FormControl(''),
    description:  new FormControl(''),
  });

  onSubmit(): void {

    if( this.libroForm.invalid ) return;

    if( this.currentLibro.id ){
      this.librosService.updateLibro( this.currentLibro )
        .subscribe( libro => {
          this.showSnackbar(`${libro.title} updated.`);
        });
    }else{
      this.librosService.addLibro(this.currentLibro)
        .subscribe(libro => {
          this.showSnackbar(`${libro.title} created.`);
          this.router.navigate(['/libros/edit', libro.id]);
        });
    }


  }

  onDeleteLibro(){
    if(!this.currentLibro.id) throw Error('Libro id is required');

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: this.libroForm.value,
      });

      dialogRef.afterClosed()
        .pipe(
          filter( (result: boolean) => result ),
          switchMap( () => this.librosService.deleteLibro(this.currentLibro.id)),
          filter( (wasDeleted: boolean) => wasDeleted ),
        )
        .subscribe(result => {
          this.router.navigate(['/libros'])
      });
    
  }

  showSnackbar( message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500
    })
  }

}
