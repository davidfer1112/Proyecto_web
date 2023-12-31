import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgParticlesModule } from "ng-particles";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MainAdminComponent } from './components/main-admin/main-admin.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HeaderComponent } from './components/header/header.component';
import { ListasComponent } from './components/listas/listas.component';
import { ReproduccionComponent } from './components/reproduccion/reproduccion.component';
import { InterfazAdminComponent } from './components/interfaz-admin/interfaz-admin.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { CancionesComponent } from './components/canciones/canciones.component';
import { AlbumComponent } from './components/album/album.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    MainAdminComponent,
    WelcomeComponent,
    HeaderComponent,
    ListasComponent,
    ReproduccionComponent,
    InterfazAdminComponent,
    HomeAdminComponent,
    HeaderAdminComponent,
    CancionesComponent,
    AlbumComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgParticlesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ToastModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
