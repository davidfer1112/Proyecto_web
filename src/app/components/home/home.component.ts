import { Component, OnInit } from '@angular/core';
import { CancionService } from '../../services/Cancion/cancion.service';
import { ListaService } from 'src/app/services/Lista/lista.service';
import { ListaModel } from 'src/app/models/Lista.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  datos: ListaModel[] = [];

  constructor(private servicio: CancionService, private serviciolista: ListaService) {}

  ngOnInit(): void {
    this.serviciolista.getListas().subscribe(
      (response: ListaModel[]) => {
        this.datos = response;
      },
      (error) => {
        console.error("Error al obtener los datos", error);
      }
    );
  }
}
