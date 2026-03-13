# Events Frontend (Next.js)

Frontend for event listing, filtering, and event registration.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Custom hooks and UI components (without external form/UI libraries)

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Run all services with Docker (one command)

From the repository root:

```bash
docker compose up --build
```

After startup, frontend will be available at `http://localhost:3000`.

## Environment

Create `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
BACKEND_API_URL=http://localhost:4000
```

`BACKEND_API_URL` is used by the Next.js API proxy route.

## Routes

- `/events` - event list:
  - search with 300ms debounce
  - date range filter
  - pagination
  - states: `loading | error | empty | success`
- `/events/[id]` - event details + `Register` button

## Registration modal

- Custom Tailwind modal (overlay + dialog)
- Controlled fields: `fullName`, `email`, `phone`
- Custom validation without `react-hook-form`
- Form state: `idle | loading | success | error`
