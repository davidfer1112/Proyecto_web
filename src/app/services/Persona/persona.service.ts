// persona.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PersonaModel } from 'src/app/models/Persona.models';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private URI = 'http://localhost:8080';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // Método para obtener todas las personas
  getPersonas(): Observable<PersonaModel[]> {
    return this.http.get<PersonaModel[]>(`${this.URI}/persona/list`);
  }

  // Método para obtener una persona según el id
  getPersona(id: number): Observable<any> {
    return this.http.get(`${this.URI}/persona/${id}`);
  }

  // Método para crear una persona según el id
  createPersona(persona: PersonaModel): Observable<any> {
    return this.http.post(`${this.URI}/persona/create`, persona);
  }

  // Método para actualizar una persona según el id
  updatePersona(id: number, persona: PersonaModel): Observable<any> {
    return this.http.put(`${this.URI}/persona/${id}`, persona);
  }

  // Método para eliminar una persona según el id
  deletePersona(id: number): Observable<any> {
    return this.http.delete(`${this.URI}/Persona/${id}`);
  }

  // Método para registrar una persona
  registrarPersona(persona: any): Observable<any> {
    const url = 'http://localhost:8080/auth/register';

    return this.http.post(url, persona).pipe(
      catchError((error) => {
        console.error('Error al registrar persona:', error);
        return of(false); 
      })
    );
  }

  // Método para verificar si ya existe un correo electrónico
  checkCorreoExistente(correo: string): Observable<boolean> {
    return this.getPersonas().pipe(
      map((personas: PersonaModel[]) => {
        const existeCorreo = personas.some(
          (persona) => persona.correo_electronico === correo
        );
        return existeCorreo;
      }),
      catchError((error) => {
        console.error('Error al verificar correo electrónico:', error);
        return of(false); 
      })
    );
  }
}

