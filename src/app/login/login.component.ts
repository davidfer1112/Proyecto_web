import { Component, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  toggleForm() {
    const containerFormulario = this.el.nativeElement.querySelector('.container-fomulario');
    containerFormulario.classList.toggle('active');
  }

}
