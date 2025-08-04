import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";

async function startServer() {
  const app = express();

  // Criar servidor Apollo (removemos a propriedade playground)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Apenas introspection para habilitar o GraphQL Studio
    introspection: true,
  });

  await server.start();

  // Aplicar middleware do GraphQL
  server.applyMiddleware({ app, path: "/graphql" });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(
      `🚀 Servidor rodando em http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `📊 GraphQL Studio: http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer().catch((error) => {
  console.error("Erro ao iniciar servidor:", error);
});
