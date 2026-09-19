# Recipe Saver

Save recipes by creating, editing, deleting, and searching.

The point of the project is CRUD + REST APIs with Next.js, TypeScript, PostgreSQL, and Tailwind.

## Stack

- Next.js (App Router, API routes — no Express)
- TypeScript (typed `Recipe`, no `any`)
- PostgreSQL
- React (`useState`, `useEffect`, controlled forms)
- Tailwind CSS
- Git (small commits, clean messages)

## Features

- List recipes
- View one recipe
- Create a recipe
- Edit a recipe
- Delete a recipe
- Search/filter by title (`?q=`)

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
| `GET` | `/api/recipes?q=pasta` | search by title |
| `POST` | `/api/recipes` | create |
| `GET` | `/api/recipes/[id]` | get one |
| `PUT` | `/api/recipes/[id]` | update |
| `DELETE` | `/api/recipes/[id]` | delete |

## Folder structure

```text
app/
  page.tsx                      # list recipes
  recipes/new/page.tsx          # create form
  recipes/[id]/page.tsx         # detail
  recipes/[id]/edit/page.tsx    # edit form
  api/recipes/route.ts          # GET list, POST create
  api/recipes/[id]/route.ts     # GET one, PUT, DELETE
lib/
  db.ts                         # Postgres connection
  types.ts                      # Recipe interface
```

Those `app/recipes`, `app/api`, and `lib` files are the plan. They are not created yet.

## Setup

1. Install Node.js and PostgreSQL.
2. Install packages: `npm install`
3. Create a `.env` file:
   `DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/recipe_saver`
4. Create the database and run the schema SQL.
5. Start the app: `npm run dev`
6. Open `http://localhost:3000`

## Build order

1. Next.js + TypeScript + Tailwind running
2. Postgres table + a couple of manual inserts
3. `lib/db.ts` and `Recipe` type
4. API: list + create
5. API: get one, update, delete
6. UI: list + detail
7. UI: create form
8. UI: edit + delete
9. Search `?q=`

## Where we stopped

Step 1 is done. The Next.js app runs, TypeScript and Tailwind are set up, and PostgreSQL 16 is installed.

Next session: create the `recipe_saver` database and the `recipes` table.
