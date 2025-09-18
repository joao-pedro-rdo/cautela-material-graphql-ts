import { ApolloServer } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";
import { CautelaRepository } from "./repository/repository";
import { CautelaService } from "./service/service";

// Container simples das dependências
const prisma = new PrismaClient();
const cautelaRepository = new CautelaRepository(prisma);
const cautelaService = new CautelaService(cautelaRepository);

async function startServer() {
  try {
    // Conectar ao banco primeiro
    await prisma.$connect();
    console.log("✅ Conectado ao banco de dados");

    // Criar servidor Apollo
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,
      context: () => ({
        // Injetar dependências no contexto para usar nos resolvers se necessário
        cautelaService,
        prisma,
      }),
    });

    const PORT = process.env.PORT || 4000;

    // Para apollo-server standalone, usamos listen() diretamente
    const { url } = await server.listen(PORT);

    console.log(`🚀 Servidor rodando em ${url}`);
    console.log(`📊 GraphQL Studio: ${url}`);

    // Graceful shutdown
    process.on("SIGTERM", async () => {
      console.log("🔄 Recebido SIGTERM, parando servidor...");
      await server.stop();
      await prisma.$disconnect();
      console.log("✅ Servidor parado com sucesso");
      process.exit(0);
    });

    process.on("SIGINT", async () => {
      console.log("🔄 Recebido SIGINT (Ctrl+C), parando servidor...");
      await server.stop();
      await prisma.$disconnect();
      console.log("✅ Servidor parado com sucesso");
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar servidor:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

startServer();
