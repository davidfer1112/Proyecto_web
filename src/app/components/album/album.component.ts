import { Component, OnInit} from '@angular/core';
import { CancionService } from 'src/app/services/Cancion/cancion.service';
import { CancionModel } from 'src/app/models/Cancion.model';
import { ActivatedRoute } from '@angular/router';
import { ListaService } from 'src/app/services/Lista/lista.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})


export class AlbumComponent implements OnInit {

  canciones: CancionModel[] = [];
  generoselec: string = '';
  numLikes: number | undefined;

  constructor(
    private cancionService: CancionService,
    private listaService: ListaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Obtener el parámetro de la ruta
    this.route.params.subscribe(params => {
      const genero = params['genero'];

      this.generoselec = genero;

      // Llamar al método para obtener canciones por álbum usando el género proporcionado
      this.cancionService.getCancionesPorAlbum(genero)
        .subscribe((canciones: CancionModel[]) => {
          this.canciones = canciones;

          this.listaService.getNumLikesPorNombre(genero)
            .subscribe((numLikes: number | undefined) => {
              this.numLikes = numLikes;
            });
        });
    });
  }

  // metodo para ir a la ruta anterior
  irAtras() {
    window.history.back();
  }

}