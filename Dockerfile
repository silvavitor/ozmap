# Etapa de build para compilar o TypeScript
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# Compilar o TypeScript para a pasta dist
RUN yarn build

# Etapa de produção para rodar o Express
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Copiar apenas os arquivos compilados
COPY --from=builder /usr/src/app/dist ./dist
COPY package.json yarn.lock ./
RUN yarn install --production

# Expor a porta do Express
EXPOSE 3000

ENV GOOGLE_API_KEY=${GOOGLE_API_KEY}

# Rodar o servidor Express
CMD ["node", "dist/server/index.js"]