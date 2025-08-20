import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });

  const PORT = Number(process.env.PORT) || 4000;

  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: PORT },
    });

    console.log(`🚀 Servidor GraphQL rodando em ${url}`);
    console.log(`📊 GraphQL Studio: ${url}`);
    console.log(`📱 Pronto para receber mutations de notificação!`);
  } catch (error) {
    console.error("❌ Erro ao iniciar servidor:", error);
  }
}

startServer();
