import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { AdminModel } from 'src/app/models/Admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private URI = "http://localhost:8000"

  constructor(private http: HttpClient) { }

  // metodo para obterner todos los administradores
  getAdmins(): Observable<any> {
    return this.http.get(`${this.URI}/admin/list`);
  }

  //metodo para obterner un admin segun su id
  getAdmin(id:number): Observable<any>{
    return this.http.get(`${this.URI}/admin/${id}`);
  }

  //metodo para crear un admin
  createAdmin(admin:AdminModel): Observable<any>{
    return this.http.post(`${this.URI}/admin/create`,admin)
  }

  //metodo para actualizar un admin segun id
  updateAdmin(id:number,admin:AdminModel): Observable<any>{
    return this.http.put(`${this.URI}/admin/${id}`,admin)
  }

  //metodo para eliminar un admin segun id
  deleteAdmin(id:number): Observable<any>{
    return this.http.delete(`${this.URI}/admin/${id}`)
  }

}
