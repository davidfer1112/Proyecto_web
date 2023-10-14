import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private URI = "https://restcountries.com/v3.1"

  constructor(private http: HttpClient) { }


  // Ejemplo de una solicitud GET
  obtenerDatos(): Observable<any> {
    return this.http.get(`${this.URI}/name/Colombia`);
  }

}
