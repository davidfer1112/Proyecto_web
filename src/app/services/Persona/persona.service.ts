// persona.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
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

  // Método para inici ar sesión
  iniciarSesion(url: string, data: any): Observable<any> {
    return this.http.post(url, data).pipe(
      catchError((error) => {
        console.error('Error al iniciar sesión:', error);
        return of(false);
      })
    );
  }

  // Método para verificar si ya existe un correo electrónico
  checkCorreoExistente(correo: string): Observable<boolean> {
    return this.getPersonas().pipe(
      map((personas: PersonaModel[]) => {
        const existeCorreo = personas.some(
          (persona) => persona.correoElectronico === correo
        );
        return existeCorreo;
      }),
      catchError((error) => {
        console.error('Error al verificar correo electrónico:', error);
        return of(false); 
      })
    );
  }

  // Método para obtener el id_persona según el correo electrónico
  getIdPersonaPorCorreo(): Observable<number | undefined> {
    const token = this.getCookie('token');
    const correo = decodeURIComponent(this.cookieService.get('cor'));

    // Verificar la existencia de la cookie al cargar el servicio
    if (!token) {
      // Si no hay token, redirigir a la página de login
      // Puedes manejar esto según tus necesidades
      return throwError('No token found');
    }

    // Agregar el token al encabezado de autorización
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Realizar la solicitud HTTP con el encabezado de autorización
    return this.http.get<PersonaModel[]>(`${this.URI}/persona/list`, { headers }).pipe(
      catchError((error) => {
        // Manejar el error según tus necesidades
        return throwError(error);
      }),
      // Map para obtener el id_persona
      map((personas: PersonaModel[]) => {
        const personaEncontrada = personas.find((persona) => persona.correoElectronico === correo);
        return personaEncontrada ? personaEncontrada.id_persona : undefined;
      })
    );
  }

  // Metodo para obtener el valor de una cookie por nombre
 private getCookie(name: string): string | null {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
  }


}

