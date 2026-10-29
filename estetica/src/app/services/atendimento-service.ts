import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Atendimento } from '../models/atendimento';
import { AtendimentoItem } from '../models/atendimento-item';

@Injectable({
    providedIn: 'root',
})
export class AtendimentoService {
    private urlBase = 'http://127.0.0.1:8000/atendimentos';

    constructor(private http: HttpClient) {}

    criarAtendimento(atendimento: AtendimentoCreate): Observable<Atendimento> {
        return this.http.post<Atendimento>(`${this.urlBase}/`, atendimento);
    }

    adicionarProdutos(
      idAtendimento: number,
      produtos: AtendimentoItem[]
    ): Observable<AtendimentoItem[]> {
    return this.http.post<AtendimentoItem[]>(
      `${this.urlBase}/${idAtendimento}/produtos`,
      produtos
    );
  }

  buscarDetalhado(idAtendimento: number): Observable<AtendimentoDetalhado> {
  return this.http.get<AtendimentoDetalhado>(`${this.urlBase}/${idAtendimento}/detalhado`);
  }
}
