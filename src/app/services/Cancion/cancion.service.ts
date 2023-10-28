import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CancionModel } from 'src/app/models/Cancion.model';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CancionService {


  private URI = "http://localhost:8080"

  constructor(private http: HttpClient, private router:Router) { }

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


}
