import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';


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
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'La lista se ha creado con éxito.' });
    }

    if (form) {
      form.reset();
    }
  }

  agregarCancion(form: NgForm) {
  

    if (this.messageService) {
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'La canción se ha agregado con éxito.' });
    } else {
      console.error('MessageService no está disponible.');
    }

    if (form) {
      form.reset();
    }
  }

}
