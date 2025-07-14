# Etapa 1: build
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Etapa 2: producción
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app ./

RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "start"]
