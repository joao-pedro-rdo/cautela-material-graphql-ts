import { Cautela } from "./ClassCautela";

export interface ICautelaAdapter {
  id: String;
  nomeCautelador: String;
  contatoCautelador: String;
  deOnde: String;
  motivoCautela: String;
  dataHoraCautela: any; //? How to resolve DateTime
  previsaoRetorno: any; //? How to resolve DateTime
  cauteladorResponsavel: String;
  dataHoraDevolucao: any; //? How to resolve DateTime
  observacoes: String;

  estado: EstadoCautelaInterface;
  estadoNome: String;

  createdAt: any; //? How to resolve DateTime
  updatedAt: any; //? How to resolve DateTime
}
// interface da do StatePattern
export interface EstadoCautelaInterface {
  estadoNome: String;
  // cautelar(cautela: ICautelaAdapter): void;
  // aguardandoDevolucao(cautela: ICautelaAdapter): void;
  // devolver(cautela: ICautelaAdapter): void;
  //? Acho que nao precisa do metodo realizado para essa operacao
  //? pois ele é o inicial e dele vai pra dentro do prazo
  // realizado(cautela: Cautela): void;
  dentroDoPrazo(cautela: Cautela): void;
  atrasado(cautela: Cautela): void;
  aguardandoDevolucao(cautela: Cautela): void;
  devolvido(cautela: Cautela): void;
  getNome(): String;
}
export interface CreateCautelaInput {
  //TODO Trasnformar em DTO
  nomeCautelador: string;
  contatoCautelador: string;
  deOnde: string;
  motivoCautela: string;
  previsaoRetorno: string;
  cauteladorResponsavel: string;
}

export interface DevolverCautelaInput {
  //TODO Trasnformar em DTO
  //   Transformar interfaces em classes
  // Adicionar validações
  // Implementar métodos de transformação

  id: string;
  //   observacoes?: string;
}
