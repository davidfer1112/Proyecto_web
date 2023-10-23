import { Component, OnInit } from '@angular/core';
import { CancionService } from '../../services/Cancion/cancion.service';
import { ListaService } from 'src/app/services/Lista/lista.service';
import { ListaModel } from 'src/app/models/Lista.model';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  datosOriginales: ListaModel[] = [];
  datosFiltrados: ListaModel[] = [];
  filtroTexto: string = '';

  constructor(
    private servicio: CancionService,
    private serviciolista: ListaService,
    private router: Router,
    private messageService: MessageService
  ) {}
  

  ngOnInit(): void {
    this.serviciolista.getListas().subscribe(
      (response: ListaModel[]) => {
        this.datosOriginales = response;
        this.datosFiltrados = [...this.datosOriginales]; // Copia los datos originales al array filtrado
      },
      (error) => {
        console.error("Error al obtener los datos", error);
      }
    );
  }

  // Función para filtrar listas segun la entrada en el input de busqueda
  filtrarListas() {
    if (this.filtroTexto.trim() !== '') {
      this.datosFiltrados = this.datosOriginales.filter(lista =>
        lista.genero.toLowerCase().includes(this.filtroTexto.toLowerCase())
      );
  
      if (this.datosFiltrados.length === 0) {
        this.mostrarToastNoEncontrado();
      }
    } else {
      this.datosFiltrados = [...this.datosOriginales];
    }
  }
  
  // Función para mostrar un toast cuando no se encuentran listas que coincidan con la búsqueda
  mostrarToastNoEncontrado() {
    this.messageService.add({
      severity: 'info',
      summary: 'Sin coincidencias',
      detail: 'No se encontraron listas que coincidan con la búsqueda'
    });
  }
  

  get datos(): ListaModel[] {
    return this.filtroTexto.trim() !== '' ? this.datosFiltrados : this.datosOriginales;
  }

}
