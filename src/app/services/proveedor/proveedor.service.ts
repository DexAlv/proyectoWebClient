import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../../interfaces/proveedor';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  private apiURL = 'http://localhost:8082/apiProveedores/proveedores';

  constructor(private http: HttpClient) {}

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiURL);
  }

  getProveedor(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.apiURL}/${id}`);
  }

  postProveedor(proveedor: Proveedor): Observable<Object>{
    return this.http.post(`${this.apiURL}`, proveedor);
  }

  putProveedor(id: number, proveedor: Proveedor): Observable<Object> {
    return this.http.put(`${this.apiURL}/${id}`, proveedor);
  }

  deleteProveedor(id: number): Observable<Object> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
