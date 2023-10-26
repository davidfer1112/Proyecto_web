import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelacionesService {

  private URI = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  // Método para actualizar relaciones entre género y canción con token
  updateRelaciones(idLista: number, idCancion: number): Observable<any> {
    const token = this.getCookie('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.URI}/relaciones/genero/${idLista}/cancion/${idCancion}`;
    return this.http.put(url, null, { headers });
  }

  // Metodo para obtener el valor de una cookie por nombre
  private getCookie(name: string): string | null {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  }
}
