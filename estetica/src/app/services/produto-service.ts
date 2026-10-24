import { Injectable, Service } from '@angular/core';
import { Produto } from '../models/produto';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {
    private produto: Produto[] = []

    listar(): Produto[]{
        return this.produto
    }
}
