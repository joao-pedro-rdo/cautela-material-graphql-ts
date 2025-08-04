# Multi-stage build
FROM node:20 AS build

WORKDIR /app

# Copiar e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar código
COPY . .

# Build
RUN npm run build

EXPOSE 3000

# Usar o comando dev em vez de preview
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]