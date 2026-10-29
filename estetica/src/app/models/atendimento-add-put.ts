import { AtendimentoItemAddPut } from './atendimento-item-add-put';

export interface AtendimentoAddPut {
  idAtendimento: number;
  idPessoa: number;
  dataAtendimento: string;      // formato "yyyy-MM-dd"
  statusAtendimento: string;
  itens: AtendimentoItemAddPut[];
}