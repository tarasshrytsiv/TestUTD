# Events Backend (NestJS)

API for event listing, filtering/pagination, and event registration.

## Stack

- NestJS + TypeScript
- `class-validator` / `class-transformer`
- BullMQ + Redis
- Swagger (`/api`)

## Run locally (separate services)

```bash
# from events-backend
npm install
npm run start:dev
```

Backend URL: `http://localhost:4000`  
Swagger URL: `http://localhost:4000/api`

Redis must be available on `localhost:6379` (start it from project root):

```bash
docker compose up -d redis
```

## Run everything with Docker (one command)

From the repository root:

```bash
docker compose up --build
```

After startup, services are available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:4000`
- Swagger: `http://localhost:4000/api`

## Stop services

```bash
docker compose down
```



