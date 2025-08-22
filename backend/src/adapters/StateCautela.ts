import { EstadoCautelaInterface, ICautelaAdapter } from "./adapters";
import { Cautela } from "./ClassCautela";

// *Dentro do prazo: o material esta dentro do prazo vigente para entrega
// *Atrasado: o material esta fora atrasado (Nesse estado mandamos notificações)
// *Aguardando devolucao: o material foi solicitado para devolucao e estamos esperando ser devolvido
// *   e ja foi mandado notificacao e contato para devolucao
// *Devolvido: o material foi devolvido e a cautela foi encerrada

export class realizado implements EstadoCautelaInterface {
  estadoNome: String;
  constructor() {
    this.estadoNome = "realizado";
  }
  dentroDoPrazo(cautela: Cautela): void {
    //Primeiro estado
    cautela.setEstado(new dentroDoPrazo());
  }
  atrasado(cautela: Cautela): void {
    //* Isso sera possivel para fazer notificacao direta
    // o Dentro do Prazo pode transitar para atrasado
    cautela.setEstado(new atrasado()); // Muda para o estado atrasado
  }

  aguardandoDevolucao(cautela: Cautela): void {
    throw new Error(
      "Realizado ainda nao foi para dentro do prazo nem atrasado (notify)"
    );
  }
  devolvido(cautela: Cautela): void {
    throw new Error("A cautela ainda esta em estado realizado");
  }
  getNome(): String {
    return this.estadoNome;
  }
}
export class dentroDoPrazo implements EstadoCautelaInterface {
  estadoNome: String;
  constructor() {
    this.estadoNome = "realizado";
  }
  dentroDoPrazo(cautela: Cautela): void {
    throw new Error("A cautela ja esta dentro do prazo");
  }
  atrasado(cautela: Cautela): void {
    cautela.setEstado(new atrasado());
  }
  aguardandoDevolucao(cautela: Cautela): void {
    throw new Error("A cautela ainda nao foi definifa como atrasada");
  }
  devolvido(cautela: Cautela): void {
    // Para cautela devolvida antes da data prevista
    cautela.setEstado(new devolvido());
  }
  getNome(): String {
    return this.estadoNome;
  }
}

export class atrasado implements EstadoCautelaInterface {
  estadoNome: String;
  constructor() {
    this.estadoNome = "realizado";
  }
  dentroDoPrazo(cautela: Cautela): void {
    //TODO Como fazer para ele voltar para no prazo
    cautela.setEstado(new dentroDoPrazo()); // Inicia o estado
  }
  atrasado(cautela: Cautela): void {
    cautela.setEstado(new atrasado());
    // throw new Error("O estado nao pode inciar em atrasado");
  }
  aguardandoDevolucao(cautela: Cautela): void {
    throw new Error("");
  }
  devolvido(cautela: Cautela): void {
    throw new Error("Method not implemented.");
  }
  getNome(): String {
    return this.estadoNome;
  }
}

export class aguardandoDevolucao implements EstadoCautelaInterface {
  estadoNome: String;
  constructor() {
    this.estadoNome = "realizado";
  }
  dentroDoPrazo(cautela: Cautela): void {
    throw new Error("A cautela ja foi definida como aguardando devolucao");
  }
  atrasado(cautela: Cautela): void {
    throw new Error("A cautela ja foi definida como aguardando devolucao");
  }
  aguardandoDevolucao(cautela: Cautela): void {
    throw new Error("A cautela ja foi definida como aguardando devolucao");
  }
  devolvido(cautela: Cautela): void {
    cautela.setEstado(new devolvido());
  }
  getNome(): String {
    return this.estadoNome;
  }
}

export class devolvido implements EstadoCautelaInterface {
  estadoNome: String;
  constructor() {
    this.estadoNome = "realizado";
  }
  //? Possivelmente vamos ter um modo de abrir a cautela novamente considerand uma pessoa que
  //? pega o mesmo intem toda hora
  dentroDoPrazo(cautela: Cautela): void {
    throw new Error("A cautela ja foi devolvida e encerrada");
  }
  atrasado(cautela: Cautela): void {
    throw new Error("A cautela ja foi devolvida e encerrada");
  }
  aguardandoDevolucao(cautela: Cautela): void {
    throw new Error("A cautela ja foi devolvida e encerrada");
  }
  devolvido(cautela: Cautela): void {
    throw new Error("A cautela ja foi devolvida e encerrada");
  }
  getNome(): String {
    return this.estadoNome;
  }
}
