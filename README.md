# 🛠️ Sistema de Controle de Cautela de Material

> **⚠️ Status:** Em **Desenvolvimento Ativo** - Projeto para estudo e teste de tecnologias modernas

Um sistema completo para controlar a cautela de materiais da seção de TI, desenvolvido como projeto prático para aprender e testar **GraphQL** no backend e **Svelte** no frontend.

Princípios SOLID Aplicados: 4/5
✅ SRP, OCP, ISP aplicados corretamente
⚠️ LSP parcialmente aplicado
❌ DIP precisa de melhorias no container

⚠️ DTO, não usado ainda

## 🎯 Objetivo do Projeto

Este projeto foi criado com fins **educacionais e práticos** para criar uma aplicação para controlar a cautela de materiais:

- Aprender **GraphQL** como alternativa ao REST
- Experimentar o **Svelte** como framework frontend moderno
- Implementar um **ORM moderno** (Prisma) com TypeScript
- Criar uma aplicação **full-stack** completa
- Testar **containerização** com K8s

## 🚀 Tecnologias Utilizadas

### 🔧 Backend

- **Node.js** + **TypeScript**
- **Apollo Server** (GraphQL)
- **Prisma ORM** (SQLite)

### 🎨 Frontend

- **Svelte** + **TypeScript**
- **GraphQL Request** (cliente GraphQL)
- **SvelteKit** (framework)
- **Vite** (build tool)

### 🛠️ DevOps & Ferramentas

- **Docker** & **Docker Compose**
- **ESLint** + **Prettier** (qualidade de código)
- **Git** (controle de versão)

## 📁 Estrutura do Projeto

```
cautela-material/
├── 📂 backend/           # API GraphQL
│   ├── src/
│   │   ├── schema/       # Types & Resolvers GraphQL
│   │   └── server.ts     # Servidor Apollo
│   ├── prisma/           # Banco de dados
│   └── Dockerfile
├── 📂 frontend/          # Interface Svelte
│   ├── src/
│   │   ├── lib/          # Cliente GraphQL
│   │   └── routes/       # Páginas Svelte
│   └── Dockerfile
└── README.md
```

## ⚡ Como Executar

### 🐳 Com Docker (Recomendado)

```bash
# Clonar repositório
git clone https://github.com/joao-pedro-rdo/cautela-material.git
cd cautela-material

# Executar com Docker Compose
docker-compose up --build

# Acessar aplicação
# Frontend: http://localhost:3000
# Backend GraphQL: http://localhost:4000/graphql
```

### 💻 Desenvolvimento Local

#### Backend

```bash
cd backend
npm install
npm run db:generate    # Gerar cliente Prisma
npm run db:migrate     # Criar banco de dados
npm run dev           # Servidor em http://localhost:4000
```

#### Frontend

```bash
cd frontend
npm install
npm run dev           # Interface em http://localhost:5173
```

## 🎮 Funcionalidades Implementadas

### ✅ Já Funcionando

- 📝 **Criar cautela** de material
- 📋 **Listar todas as cautelas**
- 🔍 **Visualizar detalhes** completos
- ✅ **Devolver material** cautelado
- 🎨 **Interface responsiva**
- 📦 **Containerização** com K8s

### 🚧 Em Desenvolvimento

- 📎 **Upload de anexos**
- 🔐 **Sistema de autenticação**
- 📊 **Relatórios**

## 🎓 Conceitos Aprendidos

### GraphQL

- **Schema Definition Language** (SDL)
- **Queries** e **Mutations**
- **Resolvers** e **Type System**
- **Apollo Server** configuração

### Svelte

- **Reatividade** nativa
- **Stores** para estado global
- **SvelteKit** para SSR/routing
- **Binding** bidirecional
- **Lifecycle hooks**

## 🛠️ Scripts Úteis

```bash
# Backend
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run db:studio    # Prisma Studio (GUI)
npm run db:reset     # Reset database

# Frontend
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run preview      # Preview build
npm run check        # Type checking
```

## 🎯 Schema GraphQL

### Queries Disponíveis

```graphql
query {
  cautelas # Todas as cautelas
  cautelasAtivas # Apenas em aberto
  cautela(id: "x") # Específica por ID
}
```

### Mutations Disponíveis

```graphql
mutation {
  criarCautela(input: {...})     # Criar nova
  devolverCautela(input: {...})  # Devolver material
}
```

## 🗄️ Modelo de Dados

```prisma
model Cautela {
  id                    String   @id @default(cuid())
  nomeCautelador        String
  contatoCautelador     String
  deOnde                String
  motivoCautela         String
  previsaoRetorno       DateTime
  cauteladorResponsavel String
  devolvido             Boolean  @default(false)
  dataHoraDevolucao     DateTime?
  observacoes           String?
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
}
```

## 🤝 Contribuindo

Este é um **projeto de estudos**, mas contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 👨‍💻 Autor

**João Pedro** - [@joao-pedro-rdo](https://github.com/joao-pedro-rdo)

---
