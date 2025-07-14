# Etapa 1: Construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiamos dependencias y las instalamos
COPY package*.json ./
COPY next.config.js ./
# COPY tsconfig.json ./
COPY . .

RUN npm install
RUN npm run build

# Etapa 2: Imagen final
FROM node:18-alpine

WORKDIR /app

# Copiamos solo lo necesario del build
COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]
