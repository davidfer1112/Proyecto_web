import { Component, OnInit } from '@angular/core';
import { CancionService } from '../../services/Cancion/cancion.service';
import { ListaService } from 'src/app/services/Lista/lista.service';
import { ListaModel } from 'src/app/models/Lista.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  datos: ListaModel[] = [];

  constructor(
    private servicio: CancionService, 
    private serviciolista: ListaService, 
    private router: Router) {}


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
