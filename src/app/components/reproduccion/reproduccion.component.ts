import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/Shared/shared.service';

@Component({
  selector: 'app-reproduccion',
  templateUrl: './reproduccion.component.html',
  styleUrls: ['./reproduccion.component.css']
})
export class ReproduccionComponent implements OnInit{

  imagenesLike = [
    'assets/images/gusta.png',
    'assets/images/gustaRelleno.png'
  ];

  constructor(private sharedService: SharedService) {}

  nombreCancion: string = '';
  artistaCancion: string = '';
  duracionCancion: string = '';

  indiceImagenActual = 0;
  reproduciendo = false;
  duracionTotal = 20; 
  tiempoTranscurrido = 0; 
  barraProgreso = 0;
  intervaloBarraProgreso: any;

  ngOnInit() {
    this.sharedService.nombreCancion$.subscribe((nombre) => (this.nombreCancion = nombre));
    this.sharedService.artistaCancion$.subscribe((artista) => (this.artistaCancion = artista));
    
    this.sharedService.duracionActualCancion$.subscribe((duracionActual) => {
      this.duracionCancion = duracionActual;
    });
  }

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

  formatearTiempo(tiempo: number | string): string {
    const segundos = typeof tiempo === 'string' ? parseInt(tiempo, 10) : tiempo;
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;
    const segundosFormateados = segundosRestantes < 10 ? `0${segundosRestantes}` : segundosRestantes;
  
    return `${minutosFormateados}:${segundosFormateados}`;
  }

}
