import { Component, signal } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho';
import { Router } from '@angular/router';
import { ProdutoService } from '../../services/produto-service';
import { ItemCarrinho } from '../../models/item-carrinho';
import { switchMap } from 'rxjs';
import { PedidoService } from '../../services/pedido-service';

@Component({
  imports: [],
  selector: 'app-carrinho',
  styleUrl: './carrinho.css',
  templateUrl: './carrinho.html',
})
export class Carrinho {
  listaCarrinho = signal<ItemCarrinho[]>([]);

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService,
    private pedidoService: PedidoService,
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

    const novoPedido: PedidoCreate = {
      idpessoa: IDPESSOA_TESTE,
      data_pedido: new Date().toISOString().split('T')[0],
      status_pedido: 'A',
    };

    this.pedidoService
    .criarPedido(novoPedido)
    .pipe(
      switchMap((pedidoCriado) => {
        const produtosDoPedido: PedidoProdutoCreate[] = itens.map((item) => ({
          idpedido: pedidoCriado.idpedido,
          idItem: item.produto.idItem,
          quantidade:item.quantidade,
          precoVenda: item.produto.precoVenda,
        }));

        return this.pedidoService.adicionarProdutos(pedidoCriado.idpedido, produtosDoPedido);
      }),
    )
    .subscribe({
       next: () => {
        console.log('Pedido finalizado com sucesso');
        this.carrinhoService.limparCarrinho();
        this.listarItens();
        this.router.navigate(['/home']);
      },
      error: (msgErro) => {
          console.log('Erro ao finalizar pedido', msgErro);
        },
    });
  }
}
