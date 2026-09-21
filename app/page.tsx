"use client";

import { useEffect, useState } from "react";
import type { Recipe } from "@/lib/types";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data: Recipe[]) => setRecipes(data));
  }, []);

  return (
    <main className="max-w-2xl mx-auto p-8 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Recipe Saver</h1>
      <a href="/recipes/new">Add recipe</a>

      <ul className="flex flex-col gap-2">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <a href={`/recipes/${recipe.id}`}>{recipe.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
