# Events Backend (NestJS)

API for event listing, filtering/pagination, and event registration.

## Stack

- NestJS + TypeScript
- `class-validator` / `class-transformer`
- BullMQ + Redis
- Swagger (`/api`)

## Run locally

```bash
npm install
docker compose up -d
npm run start:dev
```

Server runs on `http://localhost:4000`.

## Run all services with Docker (one command)

From the repository root:

```bash
docker compose up --build
```

After startup:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:4000`
- Swagger: `http://localhost:4000/api`




