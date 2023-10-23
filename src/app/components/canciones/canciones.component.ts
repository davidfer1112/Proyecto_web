import { Component,Input } from '@angular/core';
import { SharedService } from 'src/app/services/Shared/shared.service';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.css']
})
export class CancionesComponent {

  constructor(private sharedService: SharedService) {}

  @Input() nombre: string = '';
  @Input() duracion: string = '';
  @Input() artista: string = '';
  @Input() numLikes: number | undefined;

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

  onCancionSeleccionada() {
    this.sharedService.setSongInfo(this.nombre, this.artista, this.duracion);
    this.sharedService.setDuracionActual(this.duracion); 
  }

}
