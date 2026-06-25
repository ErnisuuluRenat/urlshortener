# URL Shortener

A backend REST API that receives a long URL and shortens it into a unique short code.

## Tech Stack
- NestJS
- TypeScript
- TypeORM
- PostgreSQL

## Features
- Shorten any URL into a unique short code
- Redirect to original URL via short code
- Input validation
- Unit tests

## Setup

```bash
git clone <your-repo-url>
cd urlshortener
npm install
```

Configure your `.env` file:
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
PORT=

Requires PostgreSQL installed and running.

```bash
npm run start:dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /links | Get all links |
| POST | /links | Create short link |
| GET | /links/:id | Get link by id |
| PATCH | /links/:id | Update link |
| DELETE | /links/:id | Delete link |
| GET | /:shortCode | Redirect to original URL |

## Tests
```bash
npm test
```