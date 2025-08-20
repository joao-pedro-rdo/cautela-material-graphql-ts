import { PrismaClient } from "@prisma/client";
import { DateTimeResolver } from "graphql-scalars";
import { NotificationService } from "../services/NotificationService";

const prisma = new PrismaClient();
const notificationService = new NotificationService();

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

    // Nova query para cautelas atrasadas
    cautelasAtrasadas: async () => {
      return await prisma.cautela.findMany({
        where: {
          AND: [{ devolvido: false }, { previsaoRetorno: { lt: new Date() } }],
        },
        orderBy: { previsaoRetorno: "asc" },
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

    // Novas mutations para notificações
    verificarENotificarAtrasadas: async () => {
      try {
        // Buscar cautelas em atraso
        const cautelasAtrasadas = await prisma.cautela.findMany({
          where: {
            AND: [
              { devolvido: false },
              { previsaoRetorno: { lt: new Date() } },
            ],
          },
          orderBy: { previsaoRetorno: "asc" },
        });

        console.log(
          `🔍 Encontradas ${cautelasAtrasadas.length} cautelas em atraso`
        );

        // Processar notificações
        const resultado =
          await notificationService.verificarENotificarCautelasAtrasadas(
            cautelasAtrasadas
          );

        // Atualizar observações das cautelas notificadas
        for (const detalhe of resultado.detalhes) {
          if (detalhe.enviado) {
            const cautelaAtual = await prisma.cautela.findUnique({
              where: { id: detalhe.cautelaId },
            });

            const novaObservacao = `[${new Date().toLocaleString(
              "pt-BR"
            )}] Notificação de atraso enviada para ${detalhe.phoneNumber}`;

            await prisma.cautela.update({
              where: { id: detalhe.cautelaId },
              data: {
                observacoes: cautelaAtual?.observacoes
                  ? `${cautelaAtual.observacoes}\n${novaObservacao}`
                  : novaObservacao,
              },
            });
          }
        }

        return {
          success: resultado.success,
          message: resultado.success
            ? `Processo concluído: ${resultado.notificacoesEnviadas} notificações enviadas`
            : `Processo com falhas: ${resultado.erros} erros de ${resultado.totalCautelas} cautelas`,
          totalCautelas: resultado.totalCautelas,
          notificacoesEnviadas: resultado.notificacoesEnviadas,
          erros: resultado.erros,
          detalhes: resultado.detalhes.map((d: any) => ({
            cautelaId: d.cautelaId,
            nomeCautelador: d.nomeCautelador,
            phoneNumber: d.phoneNumber,
            enviado: d.enviado,
            erro: d.erro,
          })),
        };
      } catch (error) {
        console.error(
          "❌ Erro na mutation verificarENotificarAtrasadas:",
          error
        );

        return {
          success: false,
          message: `Erro no processo: ${
            error instanceof Error ? error.message : "Erro desconhecido"
          }`,
          totalCautelas: 0,
          notificacoesEnviadas: 0,
          erros: 1,
          detalhes: [],
        };
      }
    },

    testarNotificacao: async (_: any, { cautelaId }: { cautelaId: string }) => {
      try {
        // Buscar cautela
        const cautela = await prisma.cautela.findUnique({
          where: { id: cautelaId },
        });

        if (!cautela) {
          return {
            success: false,
            message: "Cautela não encontrada",
            phoneNumber: "",
            webhookSent: false,
          };
        }

        // Testar notificação
        const resultado = await notificationService.testarNotificacaoUnica(
          cautela
        );

        // Registrar teste nas observações
        if (resultado.success) {
          const novaObservacao = `[${new Date().toLocaleString(
            "pt-BR"
          )}] Teste de notificação enviado para ${resultado.phoneNumber}`;

          await prisma.cautela.update({
            where: { id: cautelaId },
            data: {
              observacoes: cautela.observacoes
                ? `${cautela.observacoes}\n${novaObservacao}`
                : novaObservacao,
            },
          });
        }

        return {
          success: resultado.success,
          message: resultado.success
            ? `Notificação de teste enviada para ${resultado.phoneNumber}`
            : `Falha no teste: ${resultado.erro}`,
          phoneNumber: resultado.phoneNumber || "",
          webhookSent: resultado.webhookSent,
        };
      } catch (error) {
        console.error("❌ Erro na mutation testarNotificacao:", error);

        return {
          success: false,
          message: `Erro no teste: ${
            error instanceof Error ? error.message : "Erro desconhecido"
          }`,
          phoneNumber: "",
          webhookSent: false,
        };
      }
    },
  },
};
