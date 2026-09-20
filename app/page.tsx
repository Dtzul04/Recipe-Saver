export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-8 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-center">Recipe Saver</h1>

      <a
        href="/recipes/new"
        className="bg-zinc-900 text-white px-4 py-2 rounded w-fit dark:bg-zinc-100 dark:text-zinc-900"
      >
        Add recipe
      </a>

      <input
        type="text"
        placeholder="Search"
        className="w-full border rounded px-3 py-2"
      />

      <ul className="flex flex-col gap-4">
        <li className="border rounded-lg p-4">
          <a href="/recipes/1" className="font-semibold">
            Garlic Pasta
          </a>
        </li>
      </ul>
    </main>
  );
}
