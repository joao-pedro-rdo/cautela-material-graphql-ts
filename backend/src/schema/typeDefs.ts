import { gql } from "graphql-tag";

//  se for '!' o retorno sempre vai ser um texto
// aqui definomos a especie de rota que teremos
export const typeDefs = gql`
  scalar DateTime

  type Cautela {
    id: ID!
    nomeCautelador: String!
    contatoCautelador: String!
    deOnde: String!
    motivoCautela: String!
    dataHoraCautela: DateTime!
    previsaoRetorno: DateTime!
    cauteladorResponsavel: String!
    devolvido: Boolean!
    dataHoraDevolucao: DateTime
    observacoes: String
    createdAt: DateTime!
    updatedAt: DateTime!
    # Campos calculados
    isAtrasada: Boolean!
    diasAtraso: Int!
  }

  type NotificationResult {
    success: Boolean!
    message: String!
    totalCautelas: Int!
    notificacoesEnviadas: Int!
    erros: Int!
    detalhes: [NotificationDetail!]!
  }

  type NotificationDetail {
    cautelaId: String!
    nomeCautelador: String!
    phoneNumber: String
    enviado: Boolean!
    erro: String
  }

  type TestNotificationResult {
    success: Boolean!
    message: String!
    phoneNumber: String
    webhookSent: Boolean!
  }

  input CautelaInput {
    nomeCautelador: String!
    contatoCautelador: String!
    deOnde: String!
    motivoCautela: String!
    previsaoRetorno: DateTime!
    cauteladorResponsavel: String!
    observacoes: String
  }

  input DevolverCautelaInput {
    id: ID!
    observacoes: String
  }

  type Query {
    cautelas: [Cautela!]!
    cautela(id: ID!): Cautela
    cautelasAtivas: [Cautela!]!
    cautelasAtrasadas: [Cautela!]!
  }

  type Mutation {
    criarCautela(input: CautelaInput!): Cautela!
    devolverCautela(input: DevolverCautelaInput!): Cautela!

    # Notificações via GraphQL
    verificarENotificarAtrasadas: NotificationResult!
    testarNotificacao(cautelaId: ID!): TestNotificationResult!
  }
`;
