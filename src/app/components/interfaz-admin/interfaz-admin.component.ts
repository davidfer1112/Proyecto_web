import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CancionModel } from 'src/app/models/Cancion.model';
import { ListaModel } from 'src/app/models/Lista.model';
import { ListaService } from 'src/app/services/Lista/lista.service';
import { CancionService } from 'src/app/services/Cancion/cancion.service';
import { RelacionesService } from 'src/app/services/Relaciones/relaciones.service';


@Component({
  selector: 'app-interfaz-admin',
  templateUrl: './interfaz-admin.component.html',
  styleUrls: ['./interfaz-admin.component.css']
})


export class InterfazAdminComponent {


  constructor(
    private router: Router,
    private messageService: MessageService,
    private listaService: ListaService,  
    private cancionService: CancionService,
    private relacionesService: RelacionesService
  ) {}


  desplegarBotones = false;
  listaSeleccionada = true;
  cancionSeleccionada = false;
  nombreLista = null

  cancion: CancionModel ={
    album: "",
    artista: "",
    duracion: "",
    nombre: "",
    num_likes: 0,
    id_lista: 0
  }


  irAHome(){
    this.router.navigate(['/home']);
  }

  desplegar(){
    this.desplegarBotones = !this.desplegarBotones;
  }

  irAInfo(){
    this.router.navigate(['/info/usuario']);
  }

  irAAdmin(){
    this.router.navigate(['/admin']);
  }

  mostrarLista(){
    this.listaSeleccionada = true;
    this.cancionSeleccionada = false;
  }

  mostrarCancion(){
    this.listaSeleccionada = false;
    this.cancionSeleccionada = true;
  }

  crearLista(form: NgForm) {
    let nombrelist = this.nombreLista
    if (this.nombreLista == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se ingresó un nombre de lista'
      });
    } else {
      const nuevaLista: ListaModel = {
        genero: this.nombreLista,
        num_likes: 0 
      };

      this.listaService.createLista(nuevaLista).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: `La lista ${nombrelist} se ha creado con éxito.`
          });

        },
        (error) => {
          console.error('Error al crear la lista:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al crear la lista. Consulta la consola para más detalles.'
          });
        }
      );
    }

    if (form) {
      form.reset();
    }
  }

  agregarCancion(form: NgForm) {
    var artista = this.cancion.artista;
    var album = this.cancion.album;
    var nombre = this.cancion.nombre;
    var duracion = this.cancion.duracion;
  
    if (
      artista == null ||
      artista == "" ||
      album == null ||
      album == "" ||
      nombre == null ||
      nombre == "" ||
      duracion == null ||
      duracion == ""
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Asegurate de llenar todos los espacios',
      });
    } else {
      this.listaService.getIdListaPorNombre(album).subscribe(
        (idLista) => {
          if (idLista !== undefined) {
            // Se encontró el ID de la lista, ahora puedes crear la canción
            console.log(idLista)
            const nuevaCancion: CancionModel = {
              album: album,
              artista: artista,
              duracion: duracion,
              nombre: nombre,
              num_likes: 0,
              id_lista: idLista,
            };
  
            // Llamada al servicio para crear la canción
            this.cancionService.createCancion(nuevaCancion).subscribe(
              (response) => {
                // Obtener el ID de la canción creada
                const idCancionCreada = response.id_cancion; 
            
                // Llamar al servicio para actualizar relaciones
                this.relacionesService.updateRelaciones(idLista, idCancionCreada).subscribe(
                  (relacionesResponse) => {
                    // Manejar la respuesta si es necesario
                    console.log('Relaciones actualizadas con éxito:', relacionesResponse);
                    this.messageService.add({
                      severity: 'success',
                      summary: 'Éxito',
                      detail: `La canción ${nombre} se ha agregado con éxito y se ha relacionado con la lista.`,
                    });
                  },
                  (relacionesError) => {
                    console.error('Error al actualizar relaciones:', relacionesError);
                    this.messageService.add({
                      severity: 'error',
                      summary: 'Error',
                      detail: 'Error al actualizar relaciones.',
                    });
                  }
                );
              },
              (error) => {
                console.error('Error al crear la canción:', error);
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Error al crear la canción',
                });
              }
            );
          } else {
            // No se encontró la lista, muestra un mensaje de error
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `No se encontró la lista con el nombre ${album}.`,
            });
          }
        },
        (error) => {
          console.error('Error al obtener el ID de la lista:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al obtener el ID de la lista. Consulta la consola para más detalles.',
          });
        }
      );
    }
  
    if (form) {
      form.reset();
    }
  }
  

}
