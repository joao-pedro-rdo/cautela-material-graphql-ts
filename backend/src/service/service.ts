import { CreateCautelaInput, DevolverCautelaInput } from "../adapters/adapters";
import { Cautela } from "../adapters/ClassCautela";
import { IcautelaRepository } from "../repository/repository";

export class CautelaService {
  constructor(private cautelaRepository: IcautelaRepository) {}

  async criarCautela(input: CreateCautelaInput): Promise<Cautela> {
    const CreateData = {
      ...input,
      dataHoraCautela: new Date(),
      devolvido: false,
      dataHoraDevolucao: null,
      observacoes: "",
    };

    return await this.cautelaRepository.create(CreateData);
  }

  async buscarTodasCautelas(): Promise<Cautela[]> {
    return await this.cautelaRepository.findAll();
  }

  async buscarCautelasAtivas(): Promise<Cautela[] | null> {
    return await this.cautelaRepository.findActive();
  }

  async buscaCautelaPorId(id: string): Promise<Cautela | null> {
    return await this.cautelaRepository.findById(id);
  }

  async devolverCautela(input: DevolverCautelaInput): Promise<Cautela | null> {
    const cautela = await this.cautelaRepository.findById(input.id);

    if (!cautela) throw new Error("Cautela não encontrada");

    try {
      cautela.devolver();
    } catch (error) {
      console.error("Erro ao devolver cautela:", error);
    }

    const devolverCautela = await this.cautelaRepository.devolver(input);
    return devolverCautela;
  }
}
