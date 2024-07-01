import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendedor } from '../../interfaces/vendedor';

@Injectable({
  providedIn: 'root',
})
export class VendedorService {
  private apiURL = 'http://localhost:8082/apiVendedores/vendedores';

  constructor(private http: HttpClient) {}

  getVendedores(): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>(this.apiURL);
  }

  getVendedor(id: number): Observable<Vendedor> {
    return this.http.get<Vendedor>(`${this.apiURL}/${id}`);
  }

  postVendedor(vendedor: Vendedor): Observable<Object>{
    return this.http.post(`${this.apiURL}`, vendedor);
  }

  putVendedor(id: number): Observable<Object> {
    return this.http.put(`${this.apiURL}/${id}`, id);
  }

  deleteVendedor(id: number): Observable<Object> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
