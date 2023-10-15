import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { ListaModel } from 'src/app/models/Lista.model';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  private URI = "http://localhost:8000"

  constructor(private http: HttpClient) { }

  // metodo para obtener todas las listas
  getListas(): Observable<any> {
    return this.http.get(`${this.URI}/genero/list`);
  }

  //metodo para obtener una lista segun el id
  getLista(id: number): Observable<any>{
    return this.http.get(`${this.URI}/genero/${id}`);
  }

  //metodo para crear una lista
  createLista(lista:ListaModel): Observable<any>{
    return this.http.post(`${this.URI}/genero/create`,lista);
  }

  //metodo para actualizar una lista segun el id
  updateLista(id:number,lista:ListaModel): Observable<any>{
    return this.http.put(`${this.URI}/genero/${id}`,lista)
  }

  //metodo para eliminar una lista segun el id
  delete(id:number): Observable<any>{
    return this.http.delete(`${this.URI}/genero/${id}`)
  }

}
