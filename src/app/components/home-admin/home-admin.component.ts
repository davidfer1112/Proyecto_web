import { Component, OnInit } from '@angular/core';
import { CancionService } from '../../services/Cancion/cancion.service';
import { ListaService } from 'src/app/services/Lista/lista.service';
import { ListaModel } from 'src/app/models/Lista.model';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  datos: ListaModel[] = [];

  constructor(private servicio: CancionService, private serviciolista: ListaService) {}

  ngOnInit(): void {
    this.serviciolista.getListas().subscribe(
      (response: ListaModel[]) => {
        this.datos = response;
        console.log('Datos obtenidos:', this.datos);
      },
      (error) => {
        console.error("Error al obtener los datos", error);
      }
    );
  }
}