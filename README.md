# URL Shortener

A learning project for practicing backend system design — built one phase at a time.

## Stack

- TypeScript
- Express
- nodemon + tsx (dev reload)
- zod (request validation)
- pino / pino-pretty (logging)
- PostgreSQL via raw `pg` (no ORM)
- dotenv (config)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up PostgreSQL

Use a local install or Docker. Example with Docker:

```bash
docker run --name url-shortener-db \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=url_shortener \
  -p 5432:5432 \
  -d postgres
```

Create the database if you're not using Docker's `POSTGRES_DB` env var:

```bash
createdb url_shortener
```

Tables/migrations are not included in this scaffold — create them yourself as you build out each phase.

### 3. Configure environment variables

```bash
cp .env.example .env
```

Then edit `.env` with your actual Postgres connection string and desired port.

### 4. Run the dev server

```bash
npm run dev
```

This starts the server with nodemon + tsx, reloading on changes to `src/`.

### Build & run for production

```bash
npm run build
npm start
```

## Project structure

```
src/
  routes/       route definitions and handlers (yours to write)
  services/     business logic (yours to write)
  db/           pool.ts — pg Pool setup; queries are yours to write
  middleware/    validation, error handling, etc. (yours to write)
  types/        shared TypeScript types (yours to write)
  logger.ts     pino logger instance
  index.ts      Express app bootstrap (no routes registered yet)
```
