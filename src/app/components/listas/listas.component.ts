import { Component, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/Shared/shared.service';


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

  constructor(private router: Router, private route: ActivatedRoute, private sharedService: SharedService) {

    this.sharedService.setRutaActual(this.router.url);
  }


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

}