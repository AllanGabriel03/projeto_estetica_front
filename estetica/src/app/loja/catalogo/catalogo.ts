import { Component, signal  } from '@angular/core';
import { ProdutoService } from '../../services/produto-service';
import { Router } from '@angular/router';
import { Produto } from '../../models/produto';
import { CarrinhoService } from '../../services/carrinho';

@Component({
  imports: [],
  selector: 'app-catalogo',
  styleUrl: './catalogo.css',
  templateUrl: './catalogo.html',
})
export class Catalogo {
  listaProduto = signal<Produto[]>([]);

  constructor(
    private router: Router, 
    private produtoService: ProdutoService,
    private carrinho: CarrinhoService) {}

  ngOnInit() {
    this.produtoService.listar().subscribe({
      next: dados => this.listaProduto.set(dados),
      error: () => alert('Erro ao carregar o catálogo.')
    });
  }

  adicionarAoCarrinho(produto: Produto) {
    const mensagem = this.carrinho.adicionar(produto);
    alert(mensagem); // depois você pode trocar por uma mensagem na tela (RF19)
  }
}
