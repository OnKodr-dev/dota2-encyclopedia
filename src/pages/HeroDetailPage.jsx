// src/pages/HeroDetailPage.jsx
import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { HEROES } from "../data/heroes.js";
import { ABILITIES } from "../data/abilities.js";

function formatValues(values, suffix = "") {
  if (values == null) return "—";
  if (Array.isArray(values)) return values.map((v) => `${v}${suffix}`).join(" / ");
  return `${values}${suffix}`;
}

function AbilityCard({ ability, onOpen }) {
    return (
      <button
        type="button"
        onClick={() => onOpen(ability.id)}
        className="group block w-full text-left rounded-2xl bg-neutral-900 p-4 ring-1 ring-neutral-800 transition hover:ring-neutral-600 hover:bg-neutral-900/80"
      >
        {/* TITLE CENTERED */}
        <div className="mb-3 flex items-center justify-center gap-2 text-center">
          {ability.hotkey && (
            <span className="rounded-lg bg-neutral-800 px-2 py-0.5 text-xs text-neutral-200 ring-1 ring-neutral-700">
              {ability.hotkey}
            </span>
          )}
  
          <div className="text-base font-semibold leading-tight text-neutral-100">
            {ability.name}
          </div>
  
          {ability.category && (
            <span className="rounded-lg bg-neutral-800 px-2 py-0.5 text-xs text-neutral-400 ring-1 ring-neutral-700">
              {ability.category}
            </span>
          )}
        </div>
  
        <div className="flex items-start gap-4">
          {/* ICON */}
          <div className="h-12 w-12 shrink-0 rounded-xl bg-neutral-800 ring-1 ring-neutral-700 overflow-hidden flex items-center justify-center">
            {ability.iconSrc ? (
              <img src={ability.iconSrc} alt="" className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <span className="text-xs text-neutral-400">ICON</span>
            )}
          </div>
  
          {/* TEXT */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="mt-1 text-xs text-neutral-500">
                  {[
                    ability.behavior,
                    ability.affects,
                    ability.damageType ? `DMG: ${ability.damageType}` : null,
                  ]
                    .filter(Boolean)
                    .join(" • ")}
                </div>
              </div>
  
              <div className="flex flex-wrap justify-end gap-2 text-xs">
                <span className="rounded-full bg-neutral-800 px-2 py-1 text-neutral-200">
                  Mana: {formatValues(ability.manaCost)}
                </span>
                <span className="rounded-full bg-neutral-800 px-2 py-1 text-neutral-200">
                  CD: {formatValues(ability.cooldown, "s")}
                </span>
              </div>
            </div>
  
            <p className="mt-3 text-sm text-neutral-300">{ability.description}</p>
  
            {/* ...zbytek: flags + stats + preview... */}
          </div>
        </div>
      </button>
    );
  }
  

export default function HeroDetailPage() {
  const { slug } = useParams();

  // ✅ Hook vždycky nahoře (bez podmínek)
  const [openAbilityId, setOpenAbilityId] = useState(null);

  const hero = useMemo(() => HEROES.find((h) => h.slug === slug), [slug]);

  // ✅ když hero neexistuje, stejně tohle nespadne, protože filtrujeme podle slug stringu
  const heroAbilities = useMemo(
    () => ABILITIES.filter((a) => a.heroSlug === slug),
    [slug]
  );

  const openAbility = useMemo(
    () => ABILITIES.find((a) => a.id === openAbilityId) ?? null,
    [openAbilityId]
  );

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

      <main className="mx-auto max-w-4xl px-6 pb-10 space-y-6">
        <section className="rounded-2xl bg-neutral-900 p-6 ring-1 ring-neutral-800">
          <h2 className="text-xl font-semibold">Role</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {hero.roles.map((r) => (
              <span key={r} className="rounded-full bg-neutral-800 px-3 py-1 text-sm">
                {r}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-neutral-900 p-6 ring-1 ring-neutral-800">
          <h2 className="text-xl font-semibold">Abilities</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {heroAbilities.map((ability) => (
              <AbilityCard
                key={ability.id}
                ability={ability}
                onOpen={setOpenAbilityId}
              />
            ))}
          </div>

          {heroAbilities.length === 0 && (
            <div className="mt-4 text-sm text-neutral-400">
              Zatím tu nejsou abilities pro {hero.name}.
            </div>
          )}
        </section>

        {openAbility && (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 md:items-center"
            onClick={() => setOpenAbilityId(null)}
          >
            <div
              className="w-full max-w-2xl rounded-3xl bg-neutral-950 ring-1 ring-neutral-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 border-b border-neutral-900">
                <div className="font-semibold">{openAbility.name}</div>
                <button
                  type="button"
                  onClick={() => setOpenAbilityId(null)}
                  className="rounded-xl bg-neutral-900 px-3 py-2 text-sm ring-1 ring-neutral-800 hover:ring-neutral-600"
                >
                  Close
                </button>
              </div>

              <div className="p-5 space-y-4">
                {openAbility.previewSrc && (
                  <div className="overflow-hidden rounded-2xl ring-1 ring-neutral-800">
                    <video
                      className="h-56 w-full object-cover"
                      src={openAbility.previewSrc}
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                  </div>
                )}

                <div className="text-sm text-neutral-300">{openAbility.description}</div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-neutral-900 px-3 py-1 ring-1 ring-neutral-800">
                    Mana: {formatValues(openAbility.manaCost)}
                  </span>
                  <span className="rounded-full bg-neutral-900 px-3 py-1 ring-1 ring-neutral-800">
                    CD: {formatValues(openAbility.cooldown, "s")}
                  </span>
                  {openAbility.damageType && (
                    <span className="rounded-full bg-neutral-900 px-3 py-1 ring-1 ring-neutral-800">
                      DMG: {openAbility.damageType}
                    </span>
                  )}
                </div>

                {openAbility.stats?.length > 0 && (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {openAbility.stats.map((s) => (
                      <div
                        key={s.label}
                        className="rounded-2xl bg-neutral-900/40 p-4 ring-1 ring-neutral-800"
                      >
                        <div className="text-xs text-neutral-500">{s.label}</div>
                        <div className="mt-1 text-neutral-100">
                          {formatValues(s.values, s.suffix)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
