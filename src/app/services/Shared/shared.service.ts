import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private nombreCancion = new BehaviorSubject<string>('');
  private artistaCancion = new BehaviorSubject<string>('');
  private duracionCancion = new BehaviorSubject<string>('');
  private rutaActual = new BehaviorSubject<string>('');
  private esAdmin = new BehaviorSubject<boolean>(false);
  private duracionTotalCancion = new BehaviorSubject<number>(0);

  duracionTotalCancion$ = this.duracionTotalCancion.asObservable();
  esAdmin$ = this.esAdmin.asObservable();
  rutaActual$ = this.rutaActual.asObservable();
  nombreCancion$ = this.nombreCancion.asObservable();
  artistaCancion$ = this.artistaCancion.asObservable();
  duracionCancion$ = this.duracionCancion.asObservable();

  constructor(private cookieService: CookieService) {}

  setSongInfo(nombre: string, artista: string, duracion: string) {
    this.nombreCancion.next(nombre);
    this.artistaCancion.next(artista);
    this.duracionCancion.next(duracion);
  }

  setEsAdmin(estado: boolean) {
    this.esAdmin.next(estado);

    // Setear la cookie 'perm' según el estado de administrador
    const permValue = estado ? 'ad' : 'per';
    this.cookieService.set('perm', permValue, undefined, '/');
  }

  setDuracionTotal(duracionTotal: string) {
    const [minutos, segundos] = duracionTotal.split(':').map(Number);
    const duracionEnSegundos = minutos * 60 + segundos;
    this.duracionTotalCancion.next(duracionEnSegundos);
  }

  private duracionActualCancion = new BehaviorSubject<string>('');
  duracionActualCancion$ = this.duracionActualCancion.asObservable();

  setDuracionActual(duracionActual: string) {
    this.duracionActualCancion.next(duracionActual);
  }

  getDuracionTotal(): number {
    return this.duracionTotalCancion.value;
  }

  setRutaActual(ruta: string) {
    this.rutaActual.next(ruta);
  }

}