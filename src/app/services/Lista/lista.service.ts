import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListaModel } from 'src/app/models/Lista.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  private URI = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  // método para obtener todas las listas
  getListas(): Observable<any> {

    const token = this.getCookie('token');
    
    // Agrega el token al encabezado de autorización
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get(`${this.URI}/genero/list`, { headers });
  }

  // método para obtener una lista según el id
  getLista(id: number): Observable<any> {
    return this.http.get(`${this.URI}/genero/${id}`);
  }

   // Método para crear una lista con token
   createLista(lista: ListaModel): Observable<any> {
    const token = this.getCookie('token');
    
    // Agrega el token al encabezado de autorización
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post(`${this.URI}/genero/create`, lista, { headers });
  }


  // método para actualizar una lista según el id
  updateLista(id: number, lista: ListaModel): Observable<any> {
    return this.http.put(`${this.URI}/genero/${id}`, lista);
  }

  // método para eliminar una lista según el id
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.URI}/genero/${id}`);
  }

  // Método para obtener el id de la lista por nombre
  getIdListaPorNombre(nombreLista: string): Observable<number | undefined> {
    return this.getListas().pipe(
      map((listas: ListaModel[]) => {
        const listaEncontrada = listas.find(lista => lista.genero === nombreLista);
        return listaEncontrada ? listaEncontrada.id_lista : undefined;
      })
    );
  }

  // Método para obtener el num_likes de la lista por nombre
getNumLikesPorNombre(nombreLista: string): Observable<number | undefined> {
  return this.getListas().pipe(
    map((listas: ListaModel[]) => {
      const listaEncontrada = listas.find(lista => lista.genero === nombreLista);
      return listaEncontrada ? listaEncontrada.numLikes : undefined;
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
