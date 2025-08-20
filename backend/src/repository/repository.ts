// Aqui ficam a classe com os métodos para manipulação de cautelas no banco de dados com prisma
import { Cautela } from "../adapters/ICautela";
import { DevolverCautelaInput, ICautelaAdapter } from "../adapters/adapters";

export interface IcautelaRepository {
  // Querys
  findAll(): Promise<Cautela[]>; // busca todas as cautelas
  findById(id: string): Promise<Cautela | null>; // busca uma cautela pelo ID
  // Mutations
  create(
    cautela: Omit<ICautelaAdapter, "id" | "createdAt" | "updatedAt">
  ): Promise<Cautela>; // cria uma nova cautela
  update(id: string, cautela: Cautela): Promise<Cautela | null>; // atualiza uma cautela existente
  delete(id: string): Promise<boolean>; // deleta uma cautela
  findActive(): Promise<Cautela[] | null>; // busca todas as cautelas ativas
  devolver(data: DevolverCautelaInput): Promise<Cautela | null>;
}

export class CautelaRepository implements IcautelaRepository {
  constructor(private prisma: any) {} //! How to resolve this type for prismaClient

  // Busca todas as cautelass
  async findAll(): Promise<Cautela[]> {
    const cautelas = await this.prisma.cautela.findMany({
      orderBy: { createdAt: "desc" },
    });
    return cautelas.map((cautela: Cautela) => new Cautela(cautela));
  }

  // Busca uma cautela pelo ID
  async findById(id: string): Promise<Cautela | null> {
    const cautela = await this.prisma.cautela.findUnique({
      where: { id },
    });
    return cautela ? new Cautela(cautela) : null;
  }

  //? Devo criar outra interface ou usar essa com omissao de campos ?
  //* Omitimos os campos gerados pelo banco de dados
  async create(
    data: Omit<ICautelaAdapter, "id" | "createdAt" | "updatedAt">
  ): Promise<Cautela> {
    const cautela = await this.prisma.cautela.create({
      data: {
        ...data,
        previsaoRetorno: new Date(data.previsaoRetorno),
        dataHoraCautela: new Date(data.dataHoraCautela),
      },
    });
    return new Cautela(cautela);
  }

  //Acha todas as cautelas ativas (não devolvidas)
  async findActive(): Promise<Cautela[]> {
    const cautelas = await this.prisma.cautela.findMany({
      where: { devolvido: false },
      orderBy: { createdAt: "desc" },
    });
    return cautelas.map((cautela: Cautela) => new Cautela(cautela));
  }

  // Atualiza uma cautela existente
  async update(id: string, data: Partial<ICautelaAdapter>): Promise<Cautela> {
    const cautela = await this.prisma.cautela.update({
      where: { id },
      data,
    });
    return new Cautela(cautela);
  }

  // Atualiza uma cautela existente
  async devolver(data: DevolverCautelaInput): Promise<Cautela> {
    const cautela = await this.prisma.cautela.update({
      where: { id: data.id },
      data: {
        devolvido: true,
        dataHoraDevolucao: new Date(),
      },
    });
    return new Cautela(cautela); //? Porque isso retornar new cautela ?
  }

  // Deleta uma cautela
  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.cautela.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
