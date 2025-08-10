import { gql } from "apollo-server-express";

//  se for '!' o retorno sempre vai ser um texto

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
  }

  type Mutation {
    criarCautela(input: CautelaInput!): Cautela!
    devolverCautela(input: DevolverCautelaInput!): Cautela!
  }
`;
