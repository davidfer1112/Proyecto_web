import { Component, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/Shared/shared.service';
import { ListaService } from 'src/app/services/Lista/lista.service';


import { ListaModel } from 'src/app/models/Lista.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})

export class ListasComponent {
  @Input() lista: ListaModel = { genero: '', numLikes: 0 };

  imagenesLike = [
    'assets/images/gusta.png',
    'assets/images/gustaRelleno.png'
  ];

  indiceImagenActual = 0;

  get imagenLike(): string {
    return this.imagenesLike[this.indiceImagenActual];
  }

  constructor(private router: Router,
              private route: ActivatedRoute, 
              private sharedService: SharedService,
              private listaService: ListaService
     ) {
      this.sharedService.setRutaActual(this.router.url);
    }

  idPersona: string | undefined;



  // Este método se ejecuta cuando se hace click en el botón de like, para alternar entre
  // me gusta o no la imagen
  cambiarImagen() {
    setTimeout(() => {
      this.indiceImagenActual = (this.indiceImagenActual + 1) % this.imagenesLike.length;
    }, 100);
  }

  // Este método redirige a la página de álbum
  navegarAAlbum(genero: string) {
    this.router.navigate(['/album', genero]);
  }

  esRutaAdmin(): boolean {
    return this.router.url === '/home/admin';
  }

  darLike() {
    // Verifica si id_lista está definido antes de llamar al servicio
    if (this.lista.id_lista !== undefined) {
      // Llamar al servicio para dar "like" a la lista actual
      this.listaService.likeLista(this.lista.id_lista).subscribe(
        (response) => {
          // Manejar la respuesta si es necesario
          console.log('Like exitoso', response);
          // También puedes actualizar la propiedad numLikes de la lista si lo necesitas
          this.lista.numLikes++;
        },
        (error) => {
          // Manejar el error si es necesario
          console.error('Error al dar like', error);
        }
      );
    } else {
      console.error('id_lista es undefined');
    }
  }

}