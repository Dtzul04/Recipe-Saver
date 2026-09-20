import { NextResponse } from 'next/server';
import { pool } from "@/lib/db";
import type { Recipe } from "@/lib/types";

// GET /api/recipes/1 -> that one recipe
export async function GET(request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    
    // $1 is the id from the URL
    try {
        const result = await pool.query<Recipe>(
            "SELECT id, title, description, ingredients, instructions, prep_time_minutes, created_at FROM recipes WHERE id = $1",
            [id]
        );

        return NextResponse.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to load recipe"},
            { status: 500 }
        );
    }
}


// PUT /api/recipes/1 -> change that recipe
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        // Fields they sent
        const body = await request.json();
        const title = body.title;
        const description = body.description;
        const ingredients = body.ingredients;
        const instructions = body.instructions;
        const prep_time_minutes = body.prep_time_minutes;

        // Save the new values. $6 is the id
        const result = await pool.query<Recipe>(
            "UPDATE recipes SET title = $1, description = $2, ingredients = $3, instructions = $4, prep_time_minutes = $5 WHERE id = $6 RETURNING *",
            [title, description, ingredients, instructions, prep_time_minutes, id]
        );

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to update recipe" },
            { status: 500 }
        );
    }
}

// DELETE /api/recipes/1 -> remove that recipe
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> } 
) {
    const  { id } = await params;

    try {
        await pool.query(
            "DELETE FROM recipes WHERE id = $1", 
            [id]
        );

        return NextResponse.json({ message: "Recipe deleted" });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to delete recipe" },
            { status: 500 }
        );
    }
}
