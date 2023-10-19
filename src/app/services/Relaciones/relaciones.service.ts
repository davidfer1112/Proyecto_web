import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelacionesService {

  private URI = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  // Método para actualizar relaciones entre género y canción
  updateRelaciones(idLista: number, idCancion: number): Observable<any> {
    const url = `${this.URI}/relaciones/genero/${idLista}/cancion/${idCancion}`;

    return this.http.put(url, null);
  }
}
