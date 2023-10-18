import { Component, Input } from '@angular/core';

import { ListaModel } from 'src/app/models/Lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})

export class ListasComponent {
  @Input() lista: ListaModel = { genero: '', num_likes: 0 };

  imagenesLike = [
    'assets/images/gusta.png',
    'assets/images/gustaRelleno.png'
  ];

  indiceImagenActual = 0;

  get imagenLike(): string {
    return this.imagenesLike[this.indiceImagenActual];
  }

  cambiarImagen() {
    setTimeout(() => {
      this.indiceImagenActual = (this.indiceImagenActual + 1) % this.imagenesLike.length;
    }, 100); 
  }
}
