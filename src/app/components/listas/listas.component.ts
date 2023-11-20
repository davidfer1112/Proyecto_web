import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/Shared/shared.service';
import { ListaService } from 'src/app/services/Lista/lista.service';
import { CookieService } from 'ngx-cookie-service';



import { ListaModel } from 'src/app/models/Lista.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})

export class ListasComponent implements OnInit{

  ngOnInit(): void {
    this.verificarLike();
  }


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
              private listaService: ListaService,
              private cookieService: CookieService
     ) {
      this.sharedService.setRutaActual(this.router.url);
    }

  idPersona: string | undefined;


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
          console.log('Like exitoso', response);
          // Actualizar la propiedad numLikes de la lista localmente
          this.lista.numLikes++;
          // Verificar y actualizar el estado de la imagen
          this.verificarLike();
        },
        (error) => {
          console.error('Error al dar like', error);
        }
      );
    } else {
      console.error('id_lista es undefined');
    }
  }


  verificarLike() {
    const valorPermCookie = this.cookieService.get('perm');
    // Verifica si id_lista está definido antes de llamar al servicio
    if (this.lista.id_lista !== undefined && valorPermCookie !== 'ad') {
      // Llamar al servicio para obtener el estado de like de la lista actual
      this.listaService.getLikeEstado(this.lista.id_lista).subscribe(
        (response) => {
          // Manejar la respuesta y determinar el estado del like
          this.indiceImagenActual = response.like === 1 ? 1 : 0;
        },
        (error) => {
          // Manejar el error si es necesario
          console.error('Error al obtener estado de like', error);
        }
      );
    } else {
      console.error('id_lista es undefined');
    }
  }
  

}