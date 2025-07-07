# Etapa 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servidor NGINX para contenido estático
FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
