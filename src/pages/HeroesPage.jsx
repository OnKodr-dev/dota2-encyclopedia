// src/pages/HeroesPage.jsx

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { HEROES } from "../data/heroes.js";

export default function HeroesPage() {
  const [query, setQuery] = useState("");

  const filteredHeroes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return HEROES;

    return HEROES.filter((h) => {
      const haystack = `${h.name} ${h.primaryAttr} ${h.attackType} ${h.roles.join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="mx-auto max-w-6xl p-6">
        <h1 className="text-3xl font-bold">Dota 2 Encyclopedia</h1>
        <p className="mt-1 text-neutral-400">Vyber hrdinu a otevři detail.</p>

        <div className="mt-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hledej: pudge, agi, support, ranged..."
            className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-neutral-100 placeholder:text-neutral-500 outline-none ring-1 ring-neutral-800 focus:ring-neutral-600"
          />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredHeroes.map((h) => (
            <Link
              key={h.id}
              to={`/heroes/${h.slug}`}
              className="group rounded-2xl bg-neutral-900 p-4 ring-1 ring-neutral-800 transition hover:ring-neutral-600"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800 text-2xl">
                  {h.icon}
                </div>
                <div className="min-w-0">
                  <div className="truncate font-semibold">{h.name}</div>
                  <div className="text-sm text-neutral-400">
                    {h.primaryAttr} • {h.attackType}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {h.roles.slice(0, 3).map((r) => (
                  <span
                    key={r}
                    className="rounded-full bg-neutral-800 px-2 py-1 text-xs text-neutral-200"
                  >
                    {r}
                  </span>
                ))}
              </div>

              <div className="mt-3 text-sm text-neutral-500 group-hover:text-neutral-400">
                Otevřít detail →
              </div>
            </Link>
          ))}
        </div>

        {filteredHeroes.length === 0 && (
          <div className="mt-10 rounded-2xl bg-neutral-900 p-6 ring-1 ring-neutral-800">
            <div className="font-semibold">Nic nenalezeno</div>
            <div className="mt-1 text-neutral-400">
              Zkus jiný výraz (např. “support”, “agi”, “melee”…).
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
