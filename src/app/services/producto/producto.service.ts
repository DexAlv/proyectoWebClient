import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../../interfaces/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiURL = 'http://localhost:8082/apiProductos/productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiURL);
  }

  getCliente(id: number): Observable<Producto>{
    return this.http.get<Producto>(`${this.apiURL}/${id}`)
  }

  postCliente(producto: Producto): Observable<Object>{
    return this.http.post(`${this.apiURL}`, producto);
  }

  putProducto(id: number, producto: Producto): Observable<Object> {
    return this.http.put(`${this.apiURL}/${id}`, producto);
  }

  deleteProducto(id: number): Observable<Object> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
