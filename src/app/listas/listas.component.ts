import { Component } from '@angular/core';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})
export class ListasComponent {
  imagenesLike = [
    'assets/images/gusta.png',
    'assets/images/gustaRelleno.png'
  ];

  indiceImagenActual = 0;

  get imagenLike(): string {
    return this.imagenesLike[this.indiceImagenActual];
  }

  cambiarImagen() {
    // Agregar un retraso antes de cambiar la imagen
    setTimeout(() => {
      this.indiceImagenActual = (this.indiceImagenActual + 1) % this.imagenesLike.length;
    }, 100); // 100 milisegundos de retraso (puedes ajustar según tus preferencias)
  }
}

