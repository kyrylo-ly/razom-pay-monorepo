# Docker Workflow

This directory contains the local infrastructure stack for the whole backend repository:

- PostgreSQL
- Redis
- RabbitMQ
- Prometheus
- Loki
- Promtail
- Grafana
- Jaeger
- Exporters for PostgreSQL, Redis, RabbitMQ, and Node

## Prerequisites

- Docker and Docker Compose installed
- The external network `razom-pay` available
- A local `.env` file in this directory based on [`.env-example`](.env-example)

Create the network once if it does not already exist:

```bash
docker network create razom-pay
```

Copy the example environment file and adjust the values if needed:

```bash
cp .env-example .env
```

## Start The Infrastructure

From this directory:

```bash
docker compose up -d
```

To recreate the observability stack after changes:

```bash
docker compose up -d --force-recreate loki grafana promtail
```

Useful service ports:

- PostgreSQL: `5433`
- Redis: `6379`
- RabbitMQ: `5672`, management UI `15672`
- Prometheus: `9090`
- Loki: `3100`
- Grafana: `3002`
- Jaeger: `16686`
- PostgreSQL exporter: `9187`
- Redis exporter: `9121`
- RabbitMQ exporter: `9419`
- Node exporter: `9100`

## Start Application Services

The application services live outside this folder. Run them from their own directories.

### `auth-service`

```bash
cd ../auth-service
pnpm install
pnpm start:dev
```

- HTTP port: `9101`
- Metrics are scraped by Prometheus from `auth-service:9101`
- Logs are expected under `../.logs/auth`

### `gateway-service`

```bash
cd ../gateway-service
pnpm install
pnpm start:dev
```

- HTTP port comes from `HTTP_PORT` in the service environment
- Swagger is served at `/docs`
- Prometheus scrapes the gateway on `gateway-service:4000`
- Logs are expected under `../.logs/gateway`

## Logs And Monitoring

Promtail tails log files from `../.logs` and forwards them to Loki. Grafana is provisioned automatically with:

- a Prometheus datasource
- a Loki datasource
- starter dashboards for backend metrics and logs

You can open:

- Grafana at `http://localhost:3002`
- Prometheus at `http://localhost:9090`
- Loki at `http://localhost:3100`

## Stop The Stack

```bash
docker compose down
```

To also remove the named volumes managed by this stack:

```bash
docker compose down -v
```

## Notes

- The compose file expects the external network `razom-pay` to exist.
- If you add a new service, update both `prometheus.yml` and `promtail-config.yml` so metrics and logs are picked up automatically.
- Keep log output under `../.logs/<service>` so Promtail can discover it.
