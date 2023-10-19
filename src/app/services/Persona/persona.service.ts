import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { PersonaModel } from 'src/app/models/Persona.models';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private URI = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  // metodo para obtener todas las personas
  getPersonas(): Observable<any> {
    return this.http.get(`${this.URI}/persona/list`);
  }

  //metodo para obtener una persona segun el id
  getPersona(id: number): Observable<any> {
    return this.http.get(`${this.URI}/persona/${id}`);
  }

  //metodo para crear una persona segun el id
  createPersona(persona:PersonaModel): Observable<any>{
    return this.http.post(`${this.URI}/persona/create`,persona)
  }

  //metodo para actualizar una persona segun el id
  updatePersona(id:number, persona:PersonaModel): Observable<any>{
    return this.http.put(`${this.URI}/persona/${id}`,persona)
  }

  //metodo para eliminar una persona segun el id
  deletePersona(id:number): Observable<any>{
    return this.http.delete(`${this.URI}/Persona/${id}`)
  }

}
