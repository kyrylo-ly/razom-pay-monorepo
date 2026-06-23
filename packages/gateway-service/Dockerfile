FROM node:22-slim AS builder
WORKDIR /app
RUN corepack enable
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter gateway-service build
RUN pnpm --filter gateway-service deploy /app/deploy

FROM node:22-slim
WORKDIR /app
COPY --from=builder /app/deploy ./
RUN npm install --omit=dev
CMD ["node", "dist/main"]
