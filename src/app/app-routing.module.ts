import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { InfoUsuarioComponent } from './components/info-usuario/info-usuario.component';
import { InterfazAdminComponent } from './components/interfaz-admin/interfaz-admin.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { AlbumComponent } from './components/album/album.component';

const routes: Routes = [
  {path: 'login',component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'info/usuario', component: InfoUsuarioComponent},
  {path: 'admin', component: InterfazAdminComponent},
  {path: 'home/admin', component: HomeAdminComponent},
  {path: 'album',component: AlbumComponent},
  {path: '', redirectTo: 'welcome', pathMatch: 'full'}, // cuando se entra a la ruta inicial me redirige a la ruta home
  {path: '**', component: PageNotFoundComponent} // cuando no encuentra la ruta me redirige a pagina no encontrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
