import { ICautelaAdapter, EstadoCautelaInterface } from "./adapters";
import {
  realizado,
  dentroDoPrazo,
  atrasado,
  aguardandoDevolucao,
  devolvido,
} from "./StateCautela";

class Cautela implements ICautelaAdapter {
  public id: String;
  public nomeCautelador: String;
  public contatoCautelador: String;
  public deOnde: String;
  public motivoCautela: String;
  public dataHoraCautela: Date | null;
  public previsaoRetorno: Date;
  public cauteladorResponsavel: String;
  public dataHoraDevolucao: Date | null;
  public observacoes: String;

  public estado: EstadoCautelaInterface;
  public estadoNome: String; // Adaptacao para persisitencia de dados

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
    this.dataHoraDevolucao = new Date(obj.dataHoraDevolucao);
    this.observacoes = obj.observacoes;

    // State Pattern: Realizado é o estado inicial
    this.estadoNome = obj.estadoNome || "realizado";
    this.estado = this.criarEstadoPorNome(this.estadoNome) || new realizado();

    this.createdAt = new Date(obj.createdAt);
    this.updatedAt = new Date(obj.updatedAt);
  }

  public setEstado(estado: EstadoCautelaInterface): void {
    this.estado = estado;
  }

  // Design Pattern State
  dentroDoPrazo(cautela: Cautela): void {
    this.estado.dentroDoPrazo(cautela);
    this.estadoNome = this.estado.getNome();
  }
  atrasado(cautela: Cautela): void {
    this.estado.atrasado(cautela);
    this.estadoNome = this.estado.getNome();
  }
  aguardandoDevolucao(cautela: Cautela): void {
    this.estado.aguardandoDevolucao(cautela);
    this.estadoNome = this.estado.getNome();
  }
  devolver(): void {
    this.estado.devolvido(this);
    this.estadoNome = this.estado.getNome();
  }

  //Adaptacao para persistencia de dados no banco de dados
  private criarEstadoPorNome(nomeEstado: String): EstadoCautelaInterface {
    switch (nomeEstado) {
      case "realizado":
        return new realizado();
      case "dentroDoPrazo":
        return new dentroDoPrazo();
      case "atrasado":
        return new atrasado();
      case "aguardandoDevolucao":
        return new aguardandoDevolucao();
      case "devolvido":
        return new devolvido();
      default:
        return new realizado();
    }
  }
}
export { Cautela };
