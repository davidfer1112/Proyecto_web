import { Component, OnInit } from '@angular/core';
import { CancionService } from '../../services/Cancion/cancion.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  datos:any

  constructor(private servicio: CancionService){}

  ngOnInit(): void {
    this.servicio.obtenerDatos().subscribe(
      (response) => {
        this.datos = response;
        console.log('Datos obtenidos:', this.datos);
      },
      (error) => {
        console.error("Error al ontener los datos", error)
      }
    )
  }

}
