import { GraphQLClient } from 'graphql-request';

export const client = new GraphQLClient('http://localhost:4000/graphql');

// Queries
export const GET_CAUTELAS = `
  query GetCautelas {
    cautelas {
      id
      nomeCautelador
      contatoCautelador
      deOnde
      motivoCautela
      dataHoraCautela
      previsaoRetorno
      cauteladorResponsavel
      devolvido
      dataHoraDevolucao
      observacoes
    }
  }
`;

export const CREATE_CAUTELA = `
  mutation CriarCautela($input: CautelaInput!) {
    criarCautela(input: $input) {
      id
      nomeCautelador
      devolvido
    }
  }
`;

export const DEVOLVER_CAUTELA = `
  mutation DevolverCautela($input: DevolverCautelaInput!) {
    devolverCautela(input: $input) {
      id
      devolvido
      dataHoraDevolucao
    }
  }
`;
