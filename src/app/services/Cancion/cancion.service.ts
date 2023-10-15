import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CancionModel } from 'src/app/models/Cancion.model';

@Injectable({
  providedIn: 'root'
})
export class CancionService {


  private URI = "http://localhost:8000"

  constructor(private http: HttpClient) { }

  // metodo para obterner todas las canciones
  getCanciones(): Observable<any> {
    return this.http.get(`${this.URI}/cancion/list`);
  }

  // metodo para obterner una cancion segun el id
  getCancion(id:number): Observable<any> {
    return this.http.get(`${this.URI}/cancion/${id}`);
  }

  // metodo para crear una cancion
  createCancion(cancion:CancionModel): Observable<any> {
    return this.http.post(`${this.URI}/cancion/create`,cancion)
  }

  //metodo para actualizar una cancion segun el id
  updateCancion(id:number, cancion:CancionModel): Observable<any>{
    return this.http.put(`${this.URI}/cancion/${id}`,cancion)
  }

  //metodo para eliminar una cancion segun el id
  deleteCancion(id:number): Observable<any>{
    return this.http.delete(`${this.URI}/cancion/${id}`)
  }
  


  // Ejemplo parar consumir una API
  private URIEjem = "https://restcountries.com/v3.1"

  

  // Ejemplo de una solicitud GET
  obtenerDatos(): Observable<any> {
    return this.http.get(`${this.URIEjem}/name/Colombia`);
  }

}