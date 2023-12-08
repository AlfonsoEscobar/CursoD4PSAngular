import { Pipe, PipeTransform } from '@angular/core';
import { Libro } from '../interfaces/libro.interface';

@Pipe({
  name: 'imageLibro'
})
export class LibroImagePipe implements PipeTransform {

  transform(libro: Libro): string {

    if(!libro.id || !libro.image?.endsWith('.jpg')){
      return 'assets/no-image.png';
    }

    if(libro.image) return libro.image;

    // return `assets/libros/${libro.id}.jpg`;
    return 'assets/no-image.png';
  }

}