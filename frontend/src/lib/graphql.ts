import { GraphQLClient } from 'graphql-request';

// Use variável de ambiente ou detecte automaticamente
const GRAPHQL_URL = process.env.NODE_ENV === 'production' 
  ? 'http://localhost:4000/graphql'  // Para Docker
  : 'http://localhost:4000/graphql'; // Para desenvolvimento

export const client = new GraphQLClient(GRAPHQL_URL);

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
