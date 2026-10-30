import { Component, signal } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho';
import { Router } from '@angular/router';
import { ProdutoService } from '../../services/produto-service';
import { ItemCarrinho } from '../../models/item-carrinho';
import { switchMap } from 'rxjs';
import { AtendimentoService } from '../../services/atendimento-service';
import { AtendimentoAddPut } from '../../models/atendimento-add-put';
import { ResumoCarrinho } from '../../resumo-carrinho/resumo-carrinho';

@Component({
  imports: [ResumoCarrinho],
  selector: 'app-carrinho',
  styleUrl: './carrinho.css',
  templateUrl: './carrinho.html',
})
export class Carrinho {
  listaCarrinho = signal<ItemCarrinho[]>([]);

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService,
    private atendimentoService: AtendimentoService,
  ) {}

  ngOnInit(){
    this.listarItens();
  }

  listarItens() {
    const itens = this.carrinhoService.listar();
    this.listaCarrinho.set(
      [...itens].sort((a, b) => a.produto.item.localeCompare(b.produto.item)),
    );
  }

  excluirProduto(item: ItemCarrinho) {
    if (confirm(`Deseja excluir ${item.produto.item} do carrinho? `)){
       this.carrinhoService.removerDoCarrinho(item.produto.idItem);
       this.listarItens();
    }
  }

  alterarQuantidade(item: ItemCarrinho, event: Event) {
    const input = event.target as HTMLInputElement;
    const quantidade = Number(input.value);

    if (quantidade >= 1 && quantidade <= item.produto.quantidadeEstoque){
      this.carrinhoService.alterarQuantidade(item.produto.idItem, quantidade);
      this.listarItens();
    }
  }

  finalizarPedido(){
    const itens = this.carrinhoService.listar();
    
    if (itens.length === 0) {
      alert('O carrinho está vazio.');
      return;
    }

    const IDPESSOA_TESTE = 1;
    const IDFUNCIONARIO_PADRAO = 1;

    const novoAtendimento: AtendimentoAddPut = {
      idAtendimento: 0,
      idPessoa: IDPESSOA_TESTE,
      dataAtendimento: new Date().toISOString().split('T')[0],
      statusAtendimento: 'Aberto',
      itens: itens.map((item) => ({
        idAtendimento: 0,
        idItem: item.produto.idItem,
        idFuncionario: IDFUNCIONARIO_PADRAO,
        quantidade: item.quantidade,
        valorUnitario: item.produto.precoVenda,
      })),
    };

    this.atendimentoService.criar(novoAtendimento).subscribe({
      next: () => {
        alert('Atendimento registrado com sucesso!');
        this.carrinhoService.limparCarrinho();
        this.listarItens();
        this.router.navigate(['/catalogo']);
      },
      error: (erro) => {
        console.log('Erro ao finalizar atendimento', erro);
        alert(erro.error?.mensagem ?? 'Erro ao registrar o atendimento.');
      },
    });
  }
}
