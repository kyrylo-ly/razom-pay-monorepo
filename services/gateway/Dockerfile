FROM node:24-slim AS builder
WORKDIR /app

RUN corepack enable

COPY . .

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile

RUN pnpm --filter gateway... build

RUN pnpm --filter gateway deploy --legacy /app/deploy


FROM node:24-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/deploy ./

CMD ["node", "dist/main"]