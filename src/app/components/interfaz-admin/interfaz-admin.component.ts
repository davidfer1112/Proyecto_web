import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CancionModel } from 'src/app/models/Cancion.model';


@Component({
  selector: 'app-interfaz-admin',
  templateUrl: './interfaz-admin.component.html',
  styleUrls: ['./interfaz-admin.component.css']
})
export class InterfazAdminComponent {


  constructor(private router: Router,private messageService: MessageService) {}


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

    console.log('Nombre de la lista:', this.nombreLista);

    if(this.nombreLista == null){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ingreso un nombre de lista' });
    }
    else{
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `La lista ${this.nombreLista} se ha creado con éxito.` });
    }

    if (form) {
      form.reset();
    }
  }

  agregarCancion(form: NgForm) {

    var artista = this.cancion.artista
    var album = this.cancion.album
    var nombre = this.cancion.nombre
    var duracion = this.cancion.duracion

    if(artista == null || artista == "" ||
       album == null || album == "" ||
       nombre == null || nombre == "" ||
       duracion == null || duracion == ""){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Asegurate de llenar todos los espacios' });
    }else{
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `La cancion ${nombre} se agrego con exito`});
    }

    if (form) {
      form.reset();
    }
  }

}
