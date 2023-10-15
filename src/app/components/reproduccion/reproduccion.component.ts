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
  duracionTotal = 20; 
  tiempoTranscurrido = 0; 
  barraProgreso = 0;
  intervaloBarraProgreso: any;

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

  iniciarBarraDeProgreso() {
    const intervalo = 1000; 
  
    if (this.tiempoTranscurrido >= this.duracionTotal) {
      this.tiempoTranscurrido = 0;
      this.barraProgreso = 0;
    }
  
    this.actualizarBarraDeProgreso(); 
  
    this.intervaloBarraProgreso = setInterval(() => {
      this.tiempoTranscurrido += 1;
  
      if (this.tiempoTranscurrido >= this.duracionTotal) {
        this.tiempoTranscurrido = 0; 
        this.barraProgreso = 0; 
        this.toggleReproduccion(); 
      } else {
        this.actualizarBarraDeProgreso();
      }
    }, intervalo);
  }
  
  
  detenerBarraDeProgreso() {
    clearInterval(this.intervaloBarraProgreso);
  }

  toggleReproduccion() {
    if (this.reproduciendo) {
      this.detenerBarraDeProgreso();
    } else {
      this.iniciarBarraDeProgreso();
    }
  
    this.reproduciendo = !this.reproduciendo;
  }

  actualizarBarraDeProgreso() {
    this.barraProgreso = (this.tiempoTranscurrido / this.duracionTotal) * 100;
  
    if (this.barraProgreso > 100) {
      this.barraProgreso = 100;
    }
  }

  formatearTiempo(tiempo: number): string {
    const minutos = Math.floor(tiempo / 60);
    const segundos = tiempo % 60;
    const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;
    const segundosFormateados = segundos < 10 ? `0${segundos}` : segundos;

    return `${minutosFormateados}:${segundosFormateados}`;
  }

}