import { Component, Renderer2, ElementRef } from '@angular/core';
import { MoveDirection, ClickMode, HoverMode, OutMode, Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { Router } from '@angular/router';
import { PersonaModel } from 'src/app/models/Persona.models';
import { PersonaService } from 'src/app/services/Persona/persona.service';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private router: Router,
    private messageService: MessageService,
    private renderer: Renderer2,
    private el: ElementRef,
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}

  persona: PersonaModel = {
    apellido: '',
    contrasenia: '',
    correo_electronico: '',
    nombre: '',
  };

  esAdminlog: boolean = false;
  esAdminRe: boolean =false;


  @ViewChild('formLogin') formLogin!: NgForm;
  @ViewChild('formRegistro') formRegistro!: NgForm;



  toggleForm() {
    const containerFormulario = this.el.nativeElement.querySelector('.container-fomulario');
    containerFormulario.classList.toggle('active');
  }

  inicioSesion(formLogin: NgForm) {
    
  
    if (!this.persona.correo_electronico || !this.persona.contrasenia) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete todos los campos.'
      });
      return;
    }
  
    const loginData = {
      nombre: this.persona.correo_electronico,
      password: this.persona.contrasenia,
      esAdmin: this.esAdminlog
    };
  
    const loginUrl = 'http://localhost:8080/auth/login';
  
    this.personaService.iniciarSesion(loginUrl, loginData).subscribe(
      (respuesta: any) => {
        // Verificar si la respuesta contiene un token
        if (respuesta && respuesta.token) {
          // Guardar el token en la cookie
          this.cookieService.set('token', respuesta.token, undefined, '/');
  
          // Redirigir a la página correspondiente
          const rutaDestino = this.esAdminlog ? '/home/admin' : '/home';
          this.router.navigate([rutaDestino]);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Credecniales incorrectas o permisos no validos'
          });
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
  
        // Mostrar mensaje de Toast de error
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al iniciar sesión.'
        });
      }
    );
  }
  
  
  


  registrarPersona() {
    if (!this.persona.nombre || !this.persona.apellido || !this.persona.correo_electronico || !this.persona.contrasenia) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete todos los campos.'
      });
      return;
    }
  
    const formData = {
      nombre: this.persona.nombre,
      apellido: this.persona.apellido,
      correo_electronico: this.persona.correo_electronico,
      password: this.persona.contrasenia,
      esAdmin: this.esAdminRe
    };
  
    this.personaService.registrarPersona(formData).subscribe(
      (respuesta) => {
        // Verificar si la respuesta contiene un token
        if (respuesta && respuesta.token) {
          this.cookieService.set('token', respuesta.token, undefined, '/');

          if (this.esAdminRe) {
            this.router.navigate(['/home/admin']);
          }else{
          this.router.navigate(['/home']);
          }

        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al registrar la persona. Token no recibido.'
          });
        }
      },
      (error) => {
        console.error('Error al registrar persona:', error);
  
        // Mostrar mensaje de Toast de error
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al registrar la persona.'
        });
      }
    );
  }
  
  




  ////////////////////////////////

  //fondo
  id = "tsparticles";

  particlesUrl = "http://foo.bar/particles.json";

  particlesOptions = {
    background: {
      color: {
        value: "#000000",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: ClickMode.push,
        },
        onHover: {
          enable: true,
          mode: HoverMode.repulse,
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.bounce,
        },
        random: false,
        speed: 6,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  };

  particlesLoaded(container: Container): void {
    //console.log(container);
  }

  async particlesInit(engine: Engine): Promise<void> {
    //console.log(engine);

    await loadSlim(engine);
  }

}
