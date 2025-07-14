# Etapa 1: Construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiamos solo los archivos necesarios primero para aprovechar el cache
COPY package*.json ./
COPY next.config.js ./
COPY public ./public
COPY . .

RUN npm install
RUN npm run build

# Etapa 2: Imagen final con NGINX para servir el contenido estático
FROM nginx:stable-alpine

# Copiamos el contenido generado por Next.js (estático)
COPY --from=builder /app/out /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Comando de arranque de NGINX
CMD ["nginx", "-g", "daemon off;"]
