"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Recipe } from "@/lib/types";

export default function EditRecipe() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then((res) => res.json())
      .then((recipe: Recipe) => {
        setTitle(recipe.title);
        setIngredients(recipe.ingredients);
        setInstructions(recipe.instructions);
      });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch(`/api/recipes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description: null,
        ingredients,
        instructions,
        prep_time_minutes: null,
      }),
    });

    router.push(`/recipes/${id}`);
  }

  async function handleDelete() {
    await fetch(`/api/recipes/${id}`, { method: "DELETE" });
    router.push("/");
  }

  return (
    <main className="max-w-2xl mx-auto p-8 flex flex-col gap-4">
      <a href={`/recipes/${id}`}>← Back</a>
      <h1 className="text-2xl font-semibold">Edit recipe</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border rounded px-3 py-2"
        />
        <textarea
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
          className="border rounded px-3 py-2"
        />
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
          className="border rounded px-3 py-2"
        />
        <button type="submit" className="border rounded px-3 py-2 w-fit">
          Save
        </button>
      </form>

      <button type="button" onClick={handleDelete} className="text-red-600 w-fit">
        Delete
      </button>
    </main>
  );
}
