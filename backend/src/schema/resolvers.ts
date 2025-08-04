import { PrismaClient } from "@prisma/client";
import { DateTimeResolver } from "graphql-scalars";

const prisma = new PrismaClient();

export const resolvers = {
  DateTime: DateTimeResolver,

  Query: {
    // Buscar todas as cautelas
    cautelas: async () => {
      return await prisma.cautela.findMany({
        orderBy: { createdAt: "desc" },
      });
    },

    // Buscar uma cautela específica
    cautela: async (_: any, { id }: { id: string }) => {
      return await prisma.cautela.findUnique({
        where: { id },
      });
    },

    // Buscar apenas cautelas ativas (não devolvidas)
    cautelasAtivas: async () => {
      return await prisma.cautela.findMany({
        where: { devolvido: false },
        orderBy: { createdAt: "desc" },
      });
    },
  },

  Mutation: {
    // Criar nova cautela
    criarCautela: async (_: any, { input }: { input: any }) => {
      return await prisma.cautela.create({
        data: {
          ...input,
          previsaoRetorno: new Date(input.previsaoRetorno),
        },
      });
    },

    // Devolver cautela
    devolverCautela: async (_: any, { input }: { input: any }) => {
      return await prisma.cautela.update({
        where: { id: input.id },
        data: {
          devolvido: true,
          dataHoraDevolucao: new Date(),
          observacoes: input.observacoes,
        },
      });
    },
  },
};
