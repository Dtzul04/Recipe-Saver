"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Recipe } from "@/lib/types";

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data: Recipe) => setRecipe(data));
  }, [id]);

  if (!recipe) return <main className="p-8">Loading...</main>;

  return (
    <main className="max-w-2xl mx-auto p-8 flex flex-col gap-4">
      <a href="/">← Back</a>
      <h1 className="text-2xl font-semibold">{recipe.title}</h1>
      <p>{recipe.ingredients}</p>
      <p>{recipe.instructions}</p>
      <a href={`/recipes/${id}/edit`}>Edit</a>
    </main>
  );
}
