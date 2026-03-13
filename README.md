# Events App

## Run locally (separate services)

### 1) Start Redis
From project root:

```bash
docker compose up -d redis
```

### 2) Start backend
In `events-backend`:

```bash
npm install
npm run start:dev
```

Backend URLs:
- API: `http://localhost:4000`
- Swagger: `http://localhost:4000/api`

### 3) Start frontend
In `events-frontend`:

```bash
npm install
npm run dev
```

Frontend URL:
- `http://localhost:3000`

## Run everything with one command (Docker)

From project root:

```bash
docker compose up --build
```

URLs:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`
- Swagger: `http://localhost:4000/api`

## Stop services

```bash
docker compose down
```
