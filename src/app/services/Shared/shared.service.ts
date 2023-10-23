import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private nombreCancion = new BehaviorSubject<string>('');
  private artistaCancion = new BehaviorSubject<string>('');
  private duracionCancion = new BehaviorSubject<string>('');

  nombreCancion$ = this.nombreCancion.asObservable();
  artistaCancion$ = this.artistaCancion.asObservable();
  duracionCancion$ = this.duracionCancion.asObservable();

  setSongInfo(nombre: string, artista: string, duracion: string) {
    this.nombreCancion.next(nombre);
    this.artistaCancion.next(artista);
    this.duracionCancion.next(duracion);
  }

  private duracionTotalCancion = new BehaviorSubject<number>(0);
  duracionTotalCancion$ = this.duracionTotalCancion.asObservable();

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
}
