# Etapa 1: Build del sitio
FROM node:18-alpine as builder
WORKDIR /app

# Copiamos archivos necesarios
COPY package*.json ./
COPY next.config.js ./
COPY . .

# Instalamos dependencias
RUN npm install

# Compilamos y exportamos
RUN npm run build && npm run export

# Etapa 2: Imagen final con NGINX
FROM nginx:stable-alpine
COPY --from=builder /app/out /usr/share/nginx/html

# Copia una configuración mínima de NGINX (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
