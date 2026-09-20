import { NextResponse } from 'next/server';
import { pool } from "@/lib/db";
import type { Recipe } from "@/lib/types";

// GET /api/recipes -> list all
// GET /api/recipes?q=pasta -> search by title
export async function GET(request: Request) {
    // Read ?q= from the URL (null if they did not search)
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    try {
        let result;

        if (q) {
            // $1 is the search word
            result = await pool.query<Recipe>(
                "SELECT id, title, description, ingredients, instructions, prep_time_minutes, created_at FROM recipes WHERE title ILIKE $1 ORDER BY id",
                [`%${q}%`]
            );
        } else {
            result = await pool.query<Recipe>(
                "SELECT id, title, description, ingredients, instructions, prep_time_minutes, created_at FROM recipes ORDER BY id"
            );
        }

        return NextResponse.json(result.rows);
    } catch (error) {
        // Log the error
        console.error(error);
        return NextResponse.json(
            { error: "Failed to load recipes"},
            { status: 500 }
        );
    }
}

// POST /api/recipes -> create one recipe
export async function POST(request: Request) {
    try {
        // Read the JSON
        const body = await request.json();
        const title = body.title;
        const description = body.description;
        const ingredients = body.ingredients;
        const instructions = body.instructions;
        const prep_time_minutes = body.prep_time_minutes;

        // 2. Save it in Postgres. RETURNING * = send the new row back to us
        const result = await pool.query<Recipe>(
            "INSERT INTO recipes (title, description, ingredients, instructions, prep_time_minutes) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [title, description, ingredients, instructions, prep_time_minutes]
        );

        // 3. Send that new recipe to the browser
        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create recipe" },
            { status: 500 }
        );
    }
}
