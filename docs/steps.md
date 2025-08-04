# Sistema de Controle de Cautela de Material

## Arquitetura do Projeto

### Tecnologias Utilizadas

**Backend:**

- Node.js + TypeScript
- Express.js (servidor web)
- Apollo Server (GraphQL)
- Prisma (ORM)
- SQLite (banco de dados)

**Frontend:**

- Svelte + TypeScript
- Apollo Client (cliente GraphQL)
- CSS vanilla

### Estrutura de Pastas

```
cautela-material/
├── backend/
│   ├── src/
│   │   ├── schema/
│   │   │   ├── typeDefs.ts
│   │   │   └── resolvers.ts
│   │   └── server.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── lib/
│   │   │   └── apollo.ts
│   │   └── routes/
│   │       └── +page.svelte
│   └── package.json
└── docs/
    └── steps.md
```

## Passos de Configuração

### 1. Inicialização do Backend

- Criação do projeto Node.js
- Instalação das dependências
- Configuração do TypeScript
- Configuração do Prisma

### 2. Modelagem do Banco de Dados

- Criação do schema Prisma
- Definição da tabela 'cautelas'
- Campos para controle de empréstimo e devolução

### 3. API GraphQL

- Definição dos tipos GraphQL
- Criação dos resolvers para queries e mutations
- Configuração do servidor Apollo

### 4. Frontend Svelte

- Configuração do cliente Apollo
- Criação da interface para listar cautelas
- Formulário para criar novas cautelas

## Como Executar

### Backend:

```bash
cd backend
npm run db:generate
npm run db:migrate
npm run dev
```

### Frontend:

```bash
cd frontend
npm run dev
```

## Funcionalidades Implementadas

- ✅ Criar nova cautela
- ✅ Listar todas as cautelas
- ✅ Visualizar status (devolvido/em aberto)
- ✅ Interface responsiva
- ⏳ Funcionalidade de devolução (próximo passo)

## Próximos Passos

1. Implementar funcionalidade de devolução
2. Adicionar filtros (por status, data, etc.)
3. Melhorar a interface visual
4. Adicionar validações mais robustas
5. Implementar sistema de autenticação
