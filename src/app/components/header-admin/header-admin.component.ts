import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent {

  constructor(
    private router: Router,
    private cookieService: CookieService
  ){}

  desplegarBotones = false;

  desplegar(){
    this.desplegarBotones = !this.desplegarBotones;
  }

  //metodo para salir de la sesion
  salir(){
    this.cookieService.delete('token');
    this.cookieService.delete('perm');
    this.router.navigate(['/']);
  }

  irAAdmin(){
    this.router.navigate(['/admin']);
  }
}
