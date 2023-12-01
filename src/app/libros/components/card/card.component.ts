import { Component, Input, OnInit } from '@angular/core';
import { Libro } from '../../interfaces/libro.interface';

@Component({
  selector: 'libros-libro-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit{
  
  
  @Input()
  public libro!: Libro;
  
  ngOnInit(): void {
    if(!this.libro) throw new Error('Libro properti is necesary.');
  }

}
