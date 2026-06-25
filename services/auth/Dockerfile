FROM node:24-slim AS builder
WORKDIR /app

RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

RUN corepack enable

COPY . .

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile

RUN pnpm --filter auth... build

RUN pnpm --filter auth deploy --legacy /app/deploy

WORKDIR /app/deploy
RUN pnpm prisma generate

FROM node:24-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/deploy ./

CMD ["node", "dist/src/main"]