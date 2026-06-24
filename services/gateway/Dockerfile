FROM node:22-slim AS builder
WORKDIR /app
RUN corepack enable
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter gateway build
RUN pnpm --filter gateway deploy --legacy /app/deploy

FROM node:22-slim
WORKDIR /app
COPY --from=builder /app/deploy ./
CMD ["node", "dist/main"]
