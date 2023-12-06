import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'Listar Libros', icon: 'label', url: './list' },
    { label: 'Añadir Libro', icon: 'add', url: './new-libro' },
    { label: 'Busqueda Avanzada', icon: 'search', url: './search' },
  ]

}
