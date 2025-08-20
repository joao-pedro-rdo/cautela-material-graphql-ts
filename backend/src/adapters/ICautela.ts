import { ICautelaAdapter } from "./adapters";

class Cautela implements ICautelaAdapter {
  public id: String;
  public nomeCautelador: String;
  public contatoCautelador: String;
  public deOnde: String;
  public motivoCautela: String;
  public dataHoraCautela: Date | null;
  public previsaoRetorno: Date;
  public cauteladorResponsavel: String;
  public devolvido: Boolean;
  public dataHoraDevolucao: Date | null;
  public observacoes: String;

  public createdAt: Date | null;
  public updatedAt: Date | null;

  constructor(obj: ICautelaAdapter) {
    this.id = obj.id;
    this.nomeCautelador = obj.nomeCautelador;
    this.contatoCautelador = obj.contatoCautelador;
    this.deOnde = obj.deOnde;
    this.motivoCautela = obj.motivoCautela;
    this.dataHoraCautela = new Date(obj.dataHoraCautela);
    this.previsaoRetorno = new Date(obj.previsaoRetorno);
    this.cauteladorResponsavel = obj.cauteladorResponsavel;
    this.devolvido = obj.devolvido;
    this.dataHoraDevolucao = new Date(obj.dataHoraDevolucao);
    this.observacoes = obj.observacoes;

    this.createdAt = new Date(obj.createdAt);
    this.updatedAt = new Date(obj.updatedAt);
  }

  devolver(): void {
    this.devolvido = true;
    this.dataHoraDevolucao = new Date();
  }

  isAtrasada(): boolean {
    if (this.previsaoRetorno < new Date()) return true;
    return false;
  }
}
export { Cautela };
