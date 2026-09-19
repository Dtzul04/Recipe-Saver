# Recipe Saver

Save recipes by creating, editing, delete, and search.

The point of the project is CRUD + REST APIs with Next.js, TypeScript, PostreSQL, and Tailwind. 

## Stack

- Next.js (App Router, API routes - no Express)
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
| `ingredients` | `TEXT` | optional | 
| `ingredients` | `TEXT` | optional |
| `instructions` | `TEXT NOT NULL` | one text field for now
| `prep_time_minutes` | `INTEGER` | optional |
| `creted_at` | `TIMESTAMPTZ NOT NULL DEFAULT NOW()` | set by the database 

## REST APIs

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/recipes` | list recipes |
| `GET` | `/api/recipes?q=pasta` | search by title |
| `POST` | `/api/recipes` | create |
| `GET` | `/api/recipes/[id]` | get one |
| `PUT` | `/api/recipes/[id]` | update |
| `DELETE` | `/api/recipes/[id]` | delete |

## Folder Structure

```text
app/
    page.tsx                        # list recipes
    recipes/new/pages/tsx           # create form
    recipes/[id]/page.tsx           # detail
    recipes/[id]/edit/page.tsx      # edit form
    api/recipes/route.ts            # GET list, POST create
    api/recipes/[id]/route.ts       # GET one, PUT, DELETE
lib/
    db.ts                           # Postgres connection
    types.ts                        # Recipe interface