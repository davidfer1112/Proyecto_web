import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CancionModel } from 'src/app/models/Cancion.model';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PersonaService } from '../Persona/persona.service';

@Injectable({
  providedIn: 'root'
})
export class CancionService {


  private URI = "http://localhost:8080"

  constructor(
    private http: HttpClient, 
    private router:Router,
    private personaService: PersonaService
    ){}

  // Método para obtener todas las canciones con token
  getCanciones(): Observable<any> {
    const token = this.getCookie('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.URI}/cancion/list`, { headers }).pipe(
      catchError((error) => {
        if (error.status === 403) {
          this.router.navigate(['/login']);
        }
        return throwError(error); 
      })
    );
  }

  // método para obtener canciones por el nombre del album
  getCancionesPorAlbum(album: string): Observable<CancionModel[]> {
    return this.getCanciones().pipe(
      map((canciones: CancionModel[]) => {
        // Filtrar las canciones por el nombre del álbum
        return canciones.filter(c => c.album === album);
      })
    );
  }

  // metodo para obterner una cancion segun el id
  getCancion(id:number): Observable<any> {
    return this.http.get(`${this.URI}/cancion/${id}`);
  }

  // Método para crear una canción con token
  createCancion(cancion: CancionModel): Observable<any> {
    const token = this.getCookie('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.URI}/cancion/create`, cancion, { headers });
  }

  //metodo para actualizar una cancion segun el id
  updateCancion(id:number, cancion:CancionModel): Observable<any>{
    return this.http.put(`${this.URI}/cancion/${id}`,cancion)
  }

  //metodo para eliminar una cancion segun el id
  deleteCancion(id:number): Observable<any>{
    return this.http.delete(`${this.URI}/cancion/${id}`)
  }


  // Metodo para obtener el valor de una cookie por nombre
  private getCookie(name: string): string | null {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  }


  // Método para obtener el ID de una canción por su nombre
  getIdCancionPorNombre(nombreCancion: string): Observable<number | undefined> {
    return this.getCanciones().pipe(
      map((canciones: CancionModel[]) => {
        const cancionEncontrada = canciones.find(c => c.nombre === nombreCancion);
        return cancionEncontrada ? cancionEncontrada.id_cancion : undefined;
      })
    );
  }

  // Método para obtener la relación entre persona y canción
  getRelacionPersonaCancion(nombreCancion: string): Observable<any> {

    const token = this.getCookie('token');
    
    // Verificar la existencia de la cookie al cargar el servicio
    if (!token) {
      // Si no hay token, redirigir a la página de login
      this.router.navigate(['/login']);
      return throwError('No token found');
    }
    // Obtener el ID de persona
    return this.personaService.getIdPersonaPorCorreo().pipe(
      switchMap((idPersona) => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        // Obtener el ID de canción
        return this.getIdCancionPorNombre(nombreCancion).pipe(
          switchMap((idCancion) => {
            // Realizar la consulta HTTP para la relación
            return this.http.put(`${this.URI}/relaciones/persona/${idPersona}/cancion/${idCancion}`, null, { headers });
          })
        );
      })
    );
  }

}
