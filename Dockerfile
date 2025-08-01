# Etapa de build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Etapa de producción
FROM node:18-alpine AS production

WORKDIR /app

COPY --from=builder /app ./

RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "start"]
