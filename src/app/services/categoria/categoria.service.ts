import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../../interfaces/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private apiURL = 'http://localhost:8082/apiCategoria/categorias';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiURL);
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiURL}/${id}`);
  }

  postCategoria(categoria: Categoria): Observable<Object> {
    return this.http.post(this.apiURL, categoria);
  }

  putCategoria(id: number, categoria: Categoria): Observable<Object> {
    return this.http.put(`${this.apiURL}/${id}`, categoria);
  }

  deleteCategoria(id: number): Observable<Object> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
