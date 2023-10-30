import { Component,Input } from '@angular/core';
import { SharedService } from 'src/app/services/Shared/shared.service';
import { CancionService } from 'src/app/services/Cancion/cancion.service';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.css']
})
export class CancionesComponent {

  constructor(private sharedService: SharedService, private cancionService: CancionService) {
      this.sharedService.rutaActual$.subscribe((ruta) => {
      this.mostrarBotonLike = ruta !== '/home/admin';
    });
  }

  @Input() nombre: string = '';
  @Input() duracion: string = '';
  @Input() artista: string = '';
  @Input() numLikes: number | undefined;

  imagenesLike = [
    'assets/images/gusta.png',
    'assets/images/gustaRelleno.png'
  ];

  indiceImagenActual = 0;
  mostrarBotonLike: boolean = true;

  get imagenLike(): string {
    return this.imagenesLike[this.indiceImagenActual];
  }

  cambiarImagen() {
    setTimeout(() => {
      this.indiceImagenActual = (this.indiceImagenActual + 1) % this.imagenesLike.length;
    }, 100);
  
    this.cancionService.getRelacionPersonaCancion(this.nombre).subscribe(
      resultado => {
        // Actualizar el número de likes en el componente
        this.numLikes = resultado.cancionDTO.numLikes;  // Asegúrate de que la estructura de la respuesta sea la correcta
        console.log('Relación persona-canción:', resultado);
      },
      error => {
        console.error('Error al obtener la relación persona-canción:', error);
      }
    );
  }

  onCancionSeleccionada() {
    this.sharedService.setSongInfo(this.nombre, this.artista, this.duracion);
    this.sharedService.setDuracionActual(this.duracion); 
  }

}