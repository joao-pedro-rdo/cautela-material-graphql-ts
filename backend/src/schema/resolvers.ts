import { PrismaClient } from "@prisma/client";
import { DateTimeResolver } from "graphql-scalars";
import { CautelaRepository } from "../repository/repository";
import { CautelaService } from "../service/service";
import { CreateCautelaInput, DevolverCautelaInput } from "../adapters/adapters";

// Formato completo de um resolver:
//*nomeDoResolver: (parent, args, context, info) => {
// parent: resultado do resolver pai (não usado aqui)
// args: argumentos enviados na query/mutation
// context: dados compartilhados (user, db, etc.)
// info: metadados da query GraphQL
//};

//* Podemos passar as classses por caontexto tambnem para ser usado ai usariamos desse modo
// const resolvers = {
//   Query: {
//     cautelas: async (parent, args, context) => {
//       // Usa o service, não o repository diretamente
//       return context.cautelaService.buscarCautelas();
//     },
//   },
// };

// Dependency Injection Container
const prisma = new PrismaClient();
const cautelaRepository = new CautelaRepository(prisma);
const cautelaService = new CautelaService(cautelaRepository);

export const resolvers = {
  DateTime: DateTimeResolver,

  // Campos calculados para Cautela
  Cautela: {
    isAtrasada: (parent: any) => {
      if (parent.devolvido) return false;
      return new Date(parent.previsaoRetorno) < new Date();
    },
    diasAtraso: (parent: any) => {
      if (parent.devolvido) return 0;
      const hoje = new Date();
      const previsao = new Date(parent.previsaoRetorno);
      const diffTime = hoje.getTime() - previsao.getTime();
      return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    },
  },

  Query: {
    // Buscar todas as cautelas
    cautelas: async () => {
      return await cautelaService.buscarTodasCautelas();
    },

    // Buscar uma cautela específica
    cautela: async (_: any, { id }: { id: string }) => {
      const cautela = await cautelaService.buscaCautelaPorId(id);
      if (!cautela) {
        throw new Error("Cautela não encontrada");
      }
      return cautela;
    },

    // Buscar apenas cautelas ativas (não devolvidas)
    cautelasAtivas: async () => {
      return await cautelaService.buscarCautelasAtivas();
    },
  },

  Mutation: {
    // Criar nova cautela
    criarCautela: async (_: any, { input }: { input: CreateCautelaInput }) => {
      try {
        return await cautelaService.criarCautela(input);
      } catch (error) {
        throw new Error(`Erro ao criar cautela:`);
      }
    },

    // Devolver cautela
    devolverCautela: async (
      _: any,
      { input }: { input: DevolverCautelaInput }
    ) => {
      try {
        return await cautelaService.devolverCautela(input);
      } catch (error) {
        throw new Error(`Erro ao devolver cautela: ${error}`);
      }
    },
  },
};
