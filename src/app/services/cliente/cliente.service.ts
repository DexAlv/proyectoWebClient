import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../interfaces/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiURL = 'http://localhost:8082/apiClientes/clientes';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiURL);
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiURL}/${id}`);
  }

  postCliente(cliente: Cliente): Observable<Object>{
    return this.http.post(`${this.apiURL}`, cliente);
  }

  putCliente(id: number, cliente: Cliente): Observable<Object> {
    return this.http.put(`${this.apiURL}/${id}`, cliente);
  }

  deleteCliente(id: number): Observable<Object> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
