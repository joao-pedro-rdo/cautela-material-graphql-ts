-- CreateTable
CREATE TABLE "cautelas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nomeCautelador" TEXT NOT NULL,
    "contatoCautelador" TEXT NOT NULL,
    "deOnde" TEXT NOT NULL,
    "motivoCautela" TEXT NOT NULL,
    "dataHoraCautela" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "previsaoRetorno" DATETIME NOT NULL,
    "cauteladorResponsavel" TEXT NOT NULL,
    "devolvido" BOOLEAN NOT NULL DEFAULT false,
    "dataHoraDevolucao" DATETIME,
    "observacoes" TEXT,
    "estadoNome" TEXT NOT NULL DEFAULT 'realizado',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
