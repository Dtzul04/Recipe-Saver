# Recipe Saver

Save recipes by creating, editing, deleting, and searching.

The point of the project is CRUD + REST APIs with Next.js, TypeScript, PostgreSQL, and Tailwind.

**Live demo:** [recipe-saver-alpha.vercel.app](https://recipe-saver-alpha.vercel.app)

## Stack

- Next.js (App Router, API routes — no Express)
- TypeScript (typed `Recipe`, no `any`)
- PostgreSQL (hosted on Supabase; same SQL as local)
- React (`useState`, `useEffect`, controlled forms)
- Tailwind CSS
- Git (small commits, clean messages)

## Features

- List recipes
- View one recipe
- Create a recipe
- Edit a recipe
- Delete a recipe
- Search by title in the API (`?q=`) — list search UI later

## Database

One table first. Not adding extra tables.

| Column | Type | Notes |
|---|---|---|
| `id` | `SERIAL PRIMARY KEY` | auto increment |
| `title` | `TEXT NOT NULL` | required |
| `description` | `TEXT` | optional |
| `ingredients` | `TEXT NOT NULL` | one text field for now |
| `instructions` | `TEXT NOT NULL` | |
| `prep_time_minutes` | `INTEGER` | optional |
| `created_at` | `TIMESTAMPTZ NOT NULL DEFAULT NOW()` | set by the database |

## REST APIs

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/recipes` | list recipes |
| `POST` | `/api/recipes` | create |
| `GET` | `/api/recipes?q=pasta` | search by title |
| `GET` | `/api/recipes/[id]` | get one |
| `PUT` | `/api/recipes/[id]` | update |
| `DELETE` | `/api/recipes/[id]` | delete |

## Folder structure

```text
app/
  page.tsx                      # list ✔️
  recipes/new/page.tsx          # create form ✔️
  recipes/[id]/page.tsx         # detail ✔️
  recipes/[id]/edit/page.tsx    # edit + delete ✔️
  api/recipes/route.ts          # GET list/search, POST create ✔️
  api/recipes/[id]/route.ts     # GET one, PUT, DELETE ✔️
lib/
  db.ts                         # Postgres connection ✔️
  types.ts                      # Recipe interface ✔️
```

## Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Copy the database URI: Project Settings → Database → Connect → URI (Session pooler).
3. Put it in `.env` as `DATABASE_URL=...` (see `.env.example`). Never commit `.env`.
4. In the Supabase SQL Editor, run `schema.sql`.
5. Install packages: `npm install`
6. Start the app: `npm run dev`
7. Open `http://localhost:3000`

## Build order

1. Next.js + TypeScript + Tailwind running ✔️
2. Postgres table + a couple of manual inserts (local or Supabase SQL Editor) ✔️
3. `lib/db.ts` and `Recipe` type (connect with `DATABASE_URL`) ✔️
4. API: list + create ✔️
5. API: get one, update, delete ✔️
6. UI: list + detail ✔️
7. UI: create form (`/recipes/new`) ✔️
8. UI: edit + delete (`/recipes/[id]/edit`) ✔️
9. Search on the list page (API ready; UI later)

## Author

Daniel Tzul

## License

MIT. See `LICENSE`.

