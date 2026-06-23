# NestJS Monorepo

## Структура

```
nest/
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
└── packages/
    └── gateway-service/
        ├── Dockerfile
        ├── .dockerignore
        ├── package.json
        └── src/
```

## Команди

```bash
# Встановлення залежностей (з кореня)
pnpm install

# Додати новий сервіс
nest new packages/<name> --package-manager pnpm
# Потім видалити .git зсередини, перенести .gitignore в корінь

# Build всіх сервісів
pnpm -r build

# Запуск одного сервісу в dev
pnpm --filter gateway-service start:dev

# Docker build
docker build -f packages/gateway-service/Dockerfile -t gateway-service .
```

## Docker

- **Multi-stage + pnpm deploy** — обраний підхід
- Slim image (node:22-slim) замість Alpine через проблеми з native модулями (glibc vs musl)
- `pnpm deploy` створює окрему папку з готовим до деплою сервісом
- Фінальний образ ~80MB

## Вирішені проблеми

- **`@nestjs/schematics` cannot be resolved** — pnpm ховає пакети в content-addressable store, `schematics-cli` не може знайти. Рішення: `npm install -g @nestjs/cli`
- **pnpm approve-builds** — `unrs-resolver` (native Rust бінарник для Jest) потребує схвалення. Виконати `pnpm approve-builds` перед install
- **Версії пакетів** — `@nestjs/cli@11.0.23` та `@nestjs/schematics@11.1.0` можуть мати конфлікти при встановленні через pnpm
