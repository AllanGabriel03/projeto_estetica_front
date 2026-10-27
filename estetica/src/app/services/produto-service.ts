import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7000/api/Produto'; // ajuste para a URL da sua API

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }
}