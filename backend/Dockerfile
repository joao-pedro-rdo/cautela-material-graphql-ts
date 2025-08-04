FROM node:lts-bullseye-slim

# Instalar OpenSSL para o Prisma
RUN apt-get update && apt-get install -y openssl

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json (se existir)
COPY package*.json ./

# Instalar TODAS as dependências (incluindo devDependencies para build)
RUN npm ci

# Copiar código fonte
COPY . .

# Gerar cliente Prisma com a plataforma correta
RUN npx prisma generate

# Compilar TypeScript
RUN npm run build

# Remover devDependencies após o build para reduzir tamanho
RUN npm prune --production

# Expor porta
EXPOSE 4000

# Comando para iniciar
CMD ["npm", "start"]