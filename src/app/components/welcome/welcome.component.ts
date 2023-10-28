// welcome.component.ts
import { Component,OnInit } from '@angular/core';
import { MoveDirection, ClickMode, HoverMode, OutMode, Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from 'src/app/services/Shared/shared.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private sharedService: SharedService
  ) {}

  navigateToLogin() {
    // Verificar la existencia de la cookie al hacer clic en el botón
    const tokenExists = this.cookieService.check('token');

    if (tokenExists) {
      // Obtener el estado de administrador desde el servicio compartido
      const permValue = this.cookieService.get('perm');

      // Redirigir según el estado de administrador
      if (permValue == 'ad') {
        this.router.navigate(['/home/admin']);
      } else {
        this.router.navigate(['/home']);
      }
    } else {
      // Si no hay cookie, dirigir a la ruta /login
      this.router.navigate(['/login']);
    }
  }


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
