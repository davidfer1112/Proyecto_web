import { Component, OnInit} from '@angular/core';
import { CancionService } from 'src/app/services/Cancion/cancion.service';
import { CancionModel } from 'src/app/models/Cancion.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit{

  canciones: CancionModel[] = [];

  constructor(
    private cancionService: CancionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Obtener el parámetro de la ruta
    this.route.params.subscribe(params => {
      const genero = params['genero'];

      // Llamar al método para obtener canciones por álbum usando el género proporcionado
      this.cancionService.getCancionesPorAlbum(genero)
        .subscribe((canciones: CancionModel[]) => {
          this.canciones = canciones;
          console.log(this.canciones); // Puedes hacer lo que necesites con el arreglo de canciones
        });
    });
  }

}
