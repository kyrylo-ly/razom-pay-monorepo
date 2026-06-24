# NestJS Monorepo

## Структура

```
nest/
├── .github/workflows/
│   ├── gateway.yml   ← build, test, lint, docker push
│   └── publish-core.yml      ← publish @razom-pay/core в npm
├── .gitignore
├── package.json              ← packageManager: pnpm@11.9.0
├── pnpm-workspace.yaml       ← packages: ["packages/*"]
└── packages/
    ├── gateway/
    │   ├── Dockerfile
    │   ├── .dockerignore
    │   ├── .prettierrc        ← extends @razom-pay/core/prettier
    │   ├── package.json
    │   └── src/
    └── core/
        ├── package.json       ← @razom-pay/core (prettier config)
        └── src/
```

## Команди

```bash
# Встановлення залежностей (з кореня)
pnpm install

# Схвалити native збірки (unrs-resolver для Jest)
pnpm approve-builds

# Додати новий сервіс
nest new packages/<name> --package-manager pnpm
# Видалити .git зсередини, .gitignore перенести в корінь

# Додати існуючий пакет
# Скопіювати в packages/, видалити .git/.github/yarn.lock/node_modules/.gitignore

# Build всіх сервісів
pnpm -r build

# Запуск одного сервісу в dev
pnpm --filter gateway start:dev

# Docker build
docker build -f services/gateway/Dockerfile -t gateway .
```

## Docker

- **Multi-stage + pnpm deploy** — обраний підхід
- Slim image (node:24-slim) замість Alpine через glibc vs musl
- `pnpm deploy --legacy` створює готову папку з dist + node_modules
- Другий етап: просто `COPY --from=builder` + `CMD` (без npm install)
- Фінальний образ ~80MB

## CI/CD

- Бранч: `main`
- **gateway.yml** — при змінах в `gateway` або `core`
  - build job: `pnpm install` → lint → test → build
  - docker job: Docker build-push в GHCR (cache: GHA)
- **publish-core.yml** — при змінах в `core`
  - `pnpm install` → `pnpm publish --no-git-checks`
- Секрет: `NPM_TOKEN` в GitHub Settings → Secrets → Actions
- Permissions: "Read and write permissions"

## Prettier

- `gateway` наслідує конфіг з `@razom-pay/core`
- `.prettierrc`: `"extends": "@razom-pay/core/prettier"`
