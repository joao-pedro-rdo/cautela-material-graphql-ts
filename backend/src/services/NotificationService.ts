import axios from "axios";

export interface WhatsAppWebhookPayload {
  phoneNumber: string;
  message: string;
  metadata: {
    cautelaId: string;
    nomeCautelador: string;
    material: string;
    diasAtraso: number;
    timestamp: string;

    tipo: "ATRASO" | "TESTE";
  };
}

export interface NotificationResult {
  success: boolean;
  totalCautelas: number;
  notificacoesEnviadas: number;
  erros: number;
  detalhes: Array<{
    cautelaId: string;
    nomeCautelador: string;
    phoneNumber?: string;
    enviado: boolean;
    erro?: string;
  }>;
}

export class NotificationService {
  private n8nWebhookUrl: string;

  constructor() {
    this.n8nWebhookUrl =
      process.env.N8N_WEBHOOK_URL ||
      "http://localhost:5678/webhook-test/b9e65f1f-a568-4e8f-814f-32a1369600e1";
  }

  async verificarENotificarCautelasAtrasadas(
    cautelas: any[]
  ): Promise<NotificationResult> {
    console.log(`🔍 Processando ${cautelas.length} cautelas em atraso...`);

    const resultado: NotificationResult = {
      success: true,
      totalCautelas: cautelas.length,
      notificacoesEnviadas: 0,
      erros: 0,
      detalhes: [],
    };

    for (const cautela of cautelas) {
      const detalhe = {
        cautelaId: cautela.id,
        nomeCautelador: cautela.nomeCautelador,
        phoneNumber: undefined as string | undefined,
        enviado: false,
        erro: undefined as string | undefined,
      };

      try {
        // Extrair telefone
        const phoneNumber = this.extrairTelefone(cautela.contatoCautelador);
        detalhe.phoneNumber = phoneNumber || "Inválido";

        if (!phoneNumber) {
          detalhe.erro = "Telefone inválido no contato";
          resultado.erros++;
        } else {
          // Preparar payload para webhook
          const mensagem = this.formatarMensagemAtraso(cautela);
          const diasAtraso = this.calcularDiasAtraso(cautela.previsaoRetorno);

          const webhookPayload: WhatsAppWebhookPayload = {
            phoneNumber: phoneNumber,
            message: mensagem,
            metadata: {
              cautelaId: cautela.id,
              nomeCautelador: cautela.nomeCautelador,
              material: cautela.deOnde,
              diasAtraso: diasAtraso,
              timestamp: new Date().toISOString(),
              tipo: "ATRASO",
            },
          };

          // Enviar webhook
          const enviado = await this.enviarWebhook(webhookPayload);

          if (enviado) {
            detalhe.enviado = true;
            resultado.notificacoesEnviadas++;
          } else {
            detalhe.erro = "Falha no envio do webhook";
            resultado.erros++;
          }
        }

        // Delay entre mensagens
        await this.delay(800);
      } catch (error) {
        detalhe.erro =
          error instanceof Error ? error.message : "Erro desconhecido";
        resultado.erros++;
      }

      resultado.detalhes.push(detalhe);
    }

    // Se houve erros, marca resultado como falha parcial
    if (resultado.erros > 0 && resultado.notificacoesEnviadas === 0) {
      resultado.success = false;
    }

    console.log("📊 Resultado final:", {
      total: resultado.totalCautelas,
      enviadas: resultado.notificacoesEnviadas,
      erros: resultado.erros,
    });

    return resultado;
  }

  async testarNotificacaoUnica(cautela: any): Promise<{
    success: boolean;
    phoneNumber?: string;
    webhookSent: boolean;
    erro?: string;
  }> {
    try {
      const phoneNumber = this.extrairTelefone(cautela.contatoCautelador);

      if (!phoneNumber) {
        return {
          success: false,
          phoneNumber: "Inválido",
          webhookSent: false,
          erro: "Número de telefone inválido",
        };
      }

      const mensagem = this.formatarMensagemTeste(cautela);
      const diasAtraso = this.calcularDiasAtraso(cautela.previsaoRetorno);

      const webhookPayload: WhatsAppWebhookPayload = {
        phoneNumber: phoneNumber,
        message: mensagem,
        metadata: {
          cautelaId: cautela.id,
          nomeCautelador: cautela.nomeCautelador,
          material: cautela.deOnde,
          diasAtraso: diasAtraso,
          timestamp: new Date().toISOString(),
          tipo: "TESTE",
        },
      };

      const webhookSent = await this.enviarWebhook(webhookPayload);

      return {
        success: webhookSent,
        phoneNumber: phoneNumber,
        webhookSent: webhookSent,
        erro: webhookSent ? undefined : "Falha no envio do webhook",
      };
    } catch (error) {
      return {
        success: false,
        webhookSent: false,
        erro: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  }

  private async enviarWebhook(
    payload: WhatsAppWebhookPayload
  ): Promise<boolean> {
    try {
      console.log("🚀 Enviando webhook para N8N:", {
        url: this.n8nWebhookUrl,
        phoneNumber: payload.phoneNumber,
        cautelaId: payload.metadata.cautelaId,
      });

      const response = await axios.post(this.n8nWebhookUrl, payload, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Cautela-Material-GraphQL/1.0",
          "X-Source": "graphql-mutation",
        },
        timeout: 15000,
      });

      if (response.status >= 200 && response.status < 300) {
        console.log(
          `✅ Webhook enviado com sucesso para ${payload.phoneNumber}`
        );
        return true;
      } else {
        console.error(`❌ Webhook falhou com status ${response.status}`);
        return false;
      }
    } catch (error) {
      // Versão super simples - só loga o erro como string
      console.error("❌ Erro no webhook:", String(error));
      return false;
    }
  }

  private formatarMensagemAtraso(cautela: any): string {
    const diasAtraso = this.calcularDiasAtraso(cautela.previsaoRetorno);

    return `🚨 *ATENÇÃO - Material em Atraso* 🚨

Olá *${cautela.nomeCautelador}*!

Você possui um material cautelado que está em atraso:

📋 *Detalhes da Cautela:*
• *Material:* ${cautela.deOnde}
• *Motivo:* ${cautela.motivoCautela}
• *Responsável:* ${cautela.cauteladorResponsavel}
• *Previsão de retorno:* ${new Date(cautela.previsaoRetorno).toLocaleDateString(
      "pt-BR"
    )}
• *Dias em atraso:* ${diasAtraso} dia(s)

⚠️ Por favor, providencie a devolução do material o mais breve possível.

Para dúvidas, entre em contato com a seção de TI.

_Mensagem automática do Sistema de Controle de Cautela_`;
  }

  private formatarMensagemTeste(cautela: any): string {
    return `🧪 *TESTE - Sistema de Notificações* 🧪

Olá *${cautela.nomeCautelador}*!

Esta é uma mensagem de teste do sistema de cautela.

📋 *Cautela testada:*
• *Material:* ${cautela.deOnde}
• *Status:* ${cautela.devolvido ? "Devolvido" : "Em aberto"}
• *Data criação:* ${new Date(cautela.createdAt).toLocaleDateString("pt-BR")}

✅ Sistema funcionando corretamente!

_Teste automático do Sistema de Controle de Cautela_`;
  }

  private extrairTelefone(contato: string): string | null {
    // Remove tudo exceto números
    const somenteNumeros = contato.replace(/\D/g, "");

    // Procura por padrão de celular brasileiro (10 ou 11 dígitos)
    const match = somenteNumeros.match(/(\d{2})(\d{4,5})(\d{4})/);

    if (match) {
      let [, ddd, numero1, numero2] = match;

      // Se número tem 10 dígitos, adiciona o 9
      if (numero1.length === 4) {
        numero1 = "9" + numero1;
      }

      // Formato internacional: 55 + DDD + Número
      return `55${ddd}${numero1}${numero2}`;
    }

    // Fallback: se já tem 13 dígitos (55 + 11 dígitos)
    if (somenteNumeros.length === 13 && somenteNumeros.startsWith("55")) {
      return somenteNumeros;
    }

    // Fallback: se tem 11 dígitos (DDD + número)
    if (somenteNumeros.length === 11) {
      return `55${somenteNumeros}`;
    }

    return null;
  }

  private calcularDiasAtraso(previsaoRetorno: Date): number {
    const hoje = new Date();
    const previsao = new Date(previsaoRetorno);
    const diffTime = hoje.getTime() - previsao.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
