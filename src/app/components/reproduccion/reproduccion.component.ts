import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('audioPlayer') audioPlayer!: ElementRef;

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
  tiempoReproduccionActual = 0;

  rutaDelAudio = 'assets/audio/elisir.mp3'; 

  ngOnInit() {
    this.sharedService.nombreCancion$.subscribe((nombre) => (this.nombreCancion = nombre));
    this.sharedService.artistaCancion$.subscribe((artista) => (this.artistaCancion = artista));
  
    this.sharedService.duracionActualCancion$.subscribe((duracionActual) => {
    this.duracionCancion = duracionActual || '00:00';
    });
    
  }

  get imagenLike(): string {
    return this.imagenesLike[this.indiceImagenActual];
  }

  cambiarImagen() {
    this.detenerBarraDeProgreso();
    this.indiceImagenActual = (this.indiceImagenActual + 1) % this.imagenesLike.length;
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
  
    const duracionEnSegundos = this.convertirTiempoASegundos(this.duracionCancion);
    this.duracionTotal = duracionEnSegundos;
  
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
  
  convertirTiempoASegundos(tiempo: string): number {
    const [minutos, segundos] = tiempo.split(':').map(Number);
    return minutos * 60 + segundos;
  }
  
  
  
  detenerBarraDeProgreso() {
    clearInterval(this.intervaloBarraProgreso);
    this.tiempoReproduccionActual = this.tiempoTranscurrido;
  }

  toggleReproduccion() {
    if (this.reproduciendo) {
      this.detenerBarraDeProgreso();
      this.audioPlayer.nativeElement.pause();
    } else {
      this.iniciarBarraDeProgreso();
      // Inicia la barra de progreso desde el tiempo guardado
      this.tiempoTranscurrido = this.tiempoReproduccionActual;
      this.actualizarBarraDeProgreso();
      this.audioPlayer.nativeElement.play();
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
    let segundos: number;
  
    if (typeof tiempo === 'string') {
      const [minutos, segundosStr] = tiempo.split(':').map(Number);
      segundos = minutos * 60 + segundosStr;
    } else {
      segundos = tiempo;
    }
  
    const minutosFormateados = Math.floor(segundos / 60);
    const segundosFormateados = segundos % 60;
  
    const minutosStr = minutosFormateados < 10 ? `0${minutosFormateados}` : minutosFormateados;
    const segundosStr = segundosFormateados < 10 ? `0${segundosFormateados}` : segundosFormateados;
  
    return `${minutosStr}:${segundosStr}`;
  }

  reiniciarBarraDeProgreso() {
    this.detenerBarraDeProgreso();
    this.iniciarBarraDeProgreso();
  }


}
