# Etapa 1: Build del frontend
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servidor web para servir el contenido estático
FROM nginx:alpine

# Copiamos el build generado al directorio de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiamos configuración básica de nginx si querés personalizarla (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
