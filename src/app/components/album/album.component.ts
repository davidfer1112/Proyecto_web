import { Component, OnInit} from '@angular/core';
import { CancionService } from 'src/app/services/Cancion/cancion.service';
import { CancionModel } from 'src/app/models/Cancion.model';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit{

  canciones: CancionModel[] = [];

  constructor(private cancionService: CancionService) { }

  ngOnInit() {
    // Llamar al método para obtener canciones por álbum (en este caso, álbum = 'Bachata')
    this.cancionService.getCancionesPorAlbum('Electrónica')
      .subscribe((canciones: CancionModel[]) => {
        this.canciones = canciones;
        console.log(this.canciones); // Puedes hacer lo que necesites con el arreglo de canciones
      });
  }

  


}
