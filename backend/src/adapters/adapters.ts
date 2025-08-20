export interface ICautelaAdapter {
  id: String;
  nomeCautelador: String;
  contatoCautelador: String;
  deOnde: String;
  motivoCautela: String;
  dataHoraCautela: any; //? How to resolve DateTime
  previsaoRetorno: any; //? How to resolve DateTime
  cauteladorResponsavel: String;
  devolvido: Boolean;
  dataHoraDevolucao: any; //? How to resolve DateTime
  observacoes: String;

  createdAt: any; //? How to resolve DateTime
  updatedAt: any; //? How to resolve DateTime
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
