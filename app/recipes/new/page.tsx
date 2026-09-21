"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewRecipe() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description: null,
        ingredients,
        instructions,
        prep_time_minutes: null,
      }),
    });

    const recipe = await res.json();
    router.push(`/recipes/${recipe.id}`);
  }

  return (
    <main className="max-w-2xl mx-auto p-8 flex flex-col gap-4">
      <a href="/">← Back</a>
      <h1 className="text-2xl font-semibold">Add recipe</h1>

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
    </main>
  );
}
