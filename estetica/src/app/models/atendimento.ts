import { AtendimentoItem } from './atendimento-item';

export interface Atendimento {
  idAtendimento: number;
  idPessoa: number;
  nomePessoa: string;
  dataAtendimento: string;      // DateOnly chega como "2026-10-29"
  statusAtendimento: string;
  itens: AtendimentoItem[];
}