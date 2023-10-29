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
import { SharedService } from 'src/app/services/Shared/shared.service';
import { ListaService } from 'src/app/services/Lista/lista.service';



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
    private cookieService: CookieService,
    private sharedService: SharedService,
    private listaService: ListaService
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


  ngOnInit() {
    // Verificar la existencia de la cookie al cargar el componente
    const tokenExists = this.cookieService.check('token');
  
    if (tokenExists) {
      // Obtener el estado de administrador desde el servicio compartido
      const permValue = this.cookieService.get('perm');
  
      // Realizar la validación del token antes de redirigir
      this.listaService.getListas().subscribe(
        () => {
          // Token válido, redirigir según el estado de administrador
          if (permValue == 'ad') {
            this.router.navigate(['/home/admin']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          // Token no válido o error al realizar la validación, redirigir a login
          this.cookieService.delete('token');
          this.router.navigate(['/login']);
        }
      );
    }
  }
  



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

          this.sharedService.setEsAdmin(this.esAdminlog);
  
          // Redirigir a la página correspondiente
          this.redirigirSegunEstado();
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

          this.sharedService.setEsAdmin(this.esAdminRe);

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

  private redirigirSegunEstado() {
    // Obtener el estado de administrador desde el servicio compartido
    const permValue = this.cookieService.get('perm');

      // Redirigir según el estado de administrador
      if (permValue == 'ad') {
      this.router.navigate(['/home/admin']);
    } else {
      this.router.navigate(['/home']);
    }
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
