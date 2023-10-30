import { Component,Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/Shared/shared.service';
import { CancionService } from 'src/app/services/Cancion/cancion.service';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.css']
})
export class CancionesComponent implements OnInit {

  constructor(private sharedService: SharedService, private cancionService: CancionService) {
      this.sharedService.rutaActual$.subscribe((ruta) => {
      this.mostrarBotonLike = ruta !== '/home/admin';
    });
  }

  ngOnInit(): void {
    this.verificarLike();
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
  tieneLike: boolean = false;

  get imagenLike(): string {
    return this.imagenesLike[this.indiceImagenActual];
  }

  verificarLike() {
    if (this.nombre) {
      this.cancionService.getLikeEstadoCancion(this.nombre).subscribe(
        (response) => {
          // Asegúrate de que el valor de response sea 1 o 0
          this.indiceImagenActual = response === 1 ? 1 : 0;
          console.log('Estado de like:', response);
        },
        (error) => {
          console.error('Error al obtener estado de like', error);
        }
      );
    } else {
      console.error('Nombre de la canción no definido');
    }
  }
  
  darLike() {
    this.cancionService.getRelacionPersonaCancion(this.nombre).subscribe(
      resultado => {
        // Actualizar el número de likes en el componente
        this.numLikes = resultado.cancionDTO.numLikes;  // Asegúrate de que la estructura de la respuesta sea la correcta
        console.log('Relación persona-canción:', resultado);
        this.verificarLike(); // Después de dar like, verifica y actualiza la imagen
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