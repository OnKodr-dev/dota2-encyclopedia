// src/pages/HeroDetailPage.jsx

import { Link, useParams } from "react-router-dom";
import { HEROES } from "../data/heroes.js";

export default function HeroDetailPage() {
  const { slug } = useParams();

  const hero = HEROES.find((h) => h.slug === slug);

  if (!hero) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-neutral-900 p-6 ring-1 ring-neutral-800">
            <div className="text-xl font-bold">Hrdina nenalezen</div>
            <p className="mt-2 text-neutral-400">
              URL slug: <span className="text-neutral-200">{slug}</span>
            </p>
            <Link
              to="/heroes"
              className="mt-4 inline-block rounded-xl bg-neutral-100 px-4 py-2 text-neutral-950 font-semibold"
            >
              Zpět na seznam
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="mx-auto max-w-4xl p-6">
        <Link to="/heroes" className="text-neutral-400 hover:text-neutral-200">
          ← Zpět na hrdiny
        </Link>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-800 text-3xl">
            {hero.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{hero.name}</h1>
            <div className="mt-1 text-neutral-400">
              {hero.primaryAttr} • {hero.attackType}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-10">
        <section className="rounded-2xl bg-neutral-900 p-6 ring-1 ring-neutral-800">
          <h2 className="text-xl font-semibold">Role</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {hero.roles.map((r) => (
              <span
                key={r}
                className="rounded-full bg-neutral-800 px-3 py-1 text-sm"
              >
                {r}
              </span>
            ))}
          </div>

          <div className="mt-6 text-neutral-400">
            Sem pak přidáme: abilities, skill build, item buildy, countery…
          </div>
        </section>
      </main>
    </div>
  );
}
