import { Component } from '@angular/core';

@Component({
  selector: 'app-reproduccion',
  templateUrl: './reproduccion.component.html',
  styleUrls: ['./reproduccion.component.css']
})
export class ReproduccionComponent {
  imagenesLike = [
    'assets/images/gusta.png',
    'assets/images/gustaRelleno.png'
  ];

  indiceImagenActual = 0;
  reproduciendo = false;

  get imagenLike(): string {
    return this.imagenesLike[this.indiceImagenActual];
  }

  cambiarImagen() {
    setTimeout(() => {
      this.indiceImagenActual = (this.indiceImagenActual + 1) % this.imagenesLike.length;
    }, 100); 
  }

  get imagenPlayPause(): string {
    return this.reproduciendo ? 'assets/images/pausa.png' : 'assets/images/play.png';
  }

  get imagenAlbum(): string {
    return this.reproduciendo ? 'assets/images/disco.png' : 'assets/images/disco.png';
  }

  toggleReproduccion() {
    this.reproduciendo = !this.reproduciendo;
  }

  

}
