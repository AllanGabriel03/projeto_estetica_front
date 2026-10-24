import { Injectable, computed, signal } from '@angular/core';
import { Produto } from '../models/produto';
import { ItemCarrinho } from '../models/item-carrinho';

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  itens = signal<ItemCarrinho[]>([]);

  total = computed(() =>
    this.itens().reduce((soma, i) => soma + i.produto.precoVenda * i.quantidade, 0)
  );

  adicionar(produto: Produto): string {
    const lista = this.itens();
    const existente = lista.find(i => i.produto.idItem === produto.idItem);
    const ehProduto = produto.tipoItem === 'Produto'; // ajuste para o valor real do seu banco

    if (existente) {
      // serviço não é mercadoria: não aumenta a quantidade
      if (!ehProduto) return 'Este serviço já está no carrinho.';

      if (existente.quantidade >= (produto.quantidadeEstoque ?? 0))
        return 'Quantidade máxima em estoque atingida.';

      this.itens.set(lista.map(i =>
        i.produto.idItem === produto.idItem ? { ...i, quantidade: i.quantidade + 1 } : i));
      return 'Quantidade atualizada.';
    }

    if (ehProduto && (produto.quantidadeEstoque ?? 0) <= 0)
      return 'Produto indisponível.';

    this.itens.set([...lista, { produto, quantidade: 1 }]);
    return 'Item adicionado ao carrinho.';
  }

  alterarQuantidade(idItem: number, quantidade: number) {
    this.itens.set(this.itens().map(i =>
      i.produto.idItem === idItem ? { ...i, quantidade } : i));
  }

  remover(idItem: number) {
    this.itens.set(this.itens().filter(i => i.produto.idItem !== idItem));
  }

  limpar() {
    this.itens.set([]);
  }
}