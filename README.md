# Giga Backend API

Express.js + MySQL + Prisma REST API. Use this backend instead of Next.js API routes.

## Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your MySQL credentials

npm install
npx prisma generate
npx prisma db push   # or: npx prisma migrate dev
```

## Run

```bash
npm run dev    # development with --watch
npm start      # production
```

API base: `http://localhost:4000/api`

## Endpoints

| Method | Path           | Description        |
|--------|----------------|-------------------|
| GET    | /api           | API info           |
| GET    | /api/health    | Health check       |
| GET    | /api/users     | List users         |
| GET    | /api/users/:id | Get user by ID     |

## Next.js frontend

Point fetch calls to the backend:

```js
const res = await fetch("http://localhost:4000/api/users");
const data = await res.json();
```

For same-origin in production, use env:

```js
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
fetch(`${API_URL}/api/users`);
```

Add to Next.js `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Database

- **Prisma schema:** `prisma/schema.prisma`
- **Generate client:** `npm run db:generate`
- **Push schema:** `npm run db:push`
- **Migrations:** `npm run db:migrate`
- **Prisma Studio:** `npm run db:studio`
