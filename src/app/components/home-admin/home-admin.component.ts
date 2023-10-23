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
  filtroTexto: string = '';

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


  filtrarListas() {
    if (this.filtroTexto.trim() !== '') {
      this.datos = this.datos.filter(lista =>
        lista.genero.toLowerCase().includes(this.filtroTexto.toLowerCase())
      );
    } else {
      // Si el input está vacío, restaura la lista original
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


}
