# Etapa 1: build del proyecto
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: servir los archivos estáticos
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Copia archivo de configuración de NGINX (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
