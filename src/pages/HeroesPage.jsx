// src/pages/HeroesPage.jsx

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { HEROES } from "../data/heroes.js";


const ROLE_OPTIONS =  ["ALL", ...Array.from(new Set(
    HEROES.flatMap((h) => h.roles)
))].sort((a, b) => {
    if (a === "ALL") return -1;
    if (b === "ALL") return 1;
    return a.localeCompare(b);
});

function FilterChip({ label, isActive, onClick }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={[
          "rounded-full px-3 py-1 text-sm ring-1 transition",
          "hover:ring-neutral-600",
          isActive
            ? "bg-[#b81e1e] text-white ring-[#b81e1e]"
            : "bg-neutral-900 text-neutral-200 ring-neutral-800 hover:bg-neutral-800",
        ].join(" ")}
      >
        {label}
      </button>
    );
  }
  
export default function HeroesPage() {
  const [query, setQuery] = useState("");

  const [attrFilter, setAttrFilter] = useState("ALL");
  const [attackFilter, setAttackFilter] = useState("ALL")
  const [roleFilter, setRoleFilter] = useState("ALL");

  const isFiltered =
    query.trim() !== "" ||
    attrFilter!== "ALL" ||
    attackFilter !== "ALL" ||
    roleFilter !== "ALL";

    function handleReset() {
        setQuery("");
        setAttrFilter("ALL");
        setAttackFilter("ALL");
        setRoleFilter("ALL");
    }

  const filteredHeroes = useMemo(() => {
    const q = query.trim().toLowerCase();

    return HEROES.filter((h) => {
        // search
        const haystack = 
            `${h.name} ${h.primaryAttr} ${h.attackType} ${h.roles.join(" ")}`.toLowerCase();
        const matchesQuery = q === "" ? true : haystack.includes(q);

        // attribute filter
        const matchesAttr =
            attrFilter === "ALL" ? true : h.primaryAttr === attrFilter;

        // attack filter
        const matchesAttack =
            attackFilter === "ALL" ? true : h.attackType === attackFilter;
        
        // role filter
        const matchesRole = roleFilter === "ALL" ? true : h.roles.includes(roleFilter);
        return matchesQuery && matchesAttr && matchesAttack && matchesRole;
    });
  }, [query, attrFilter, attackFilter, roleFilter]);

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
        <div className="mt-4 space-y-4">
        <   div className="flex justify-center">
                <button
                    type="button"
                    onClick={handleReset}
                    disabled={!isFiltered}
                    className={[
                        "rounded-full px-4 py-2 text-sm ring-1 transition",
                        "hover:ring-neutral-600",
                        isFiltered
                          ? "bg-[#b81e1e] text-white ring-[#b81e1e] hover:brightness-110"
                          : "bg-neutral-900 text-neutral-500 ring-neutral-800 cursor-not-allowed",
                      ].join(" ")}
                      
                >
                    Reset filters
                </button>
            </div>

            {/* ATTRIBUTE */}
            <div className="space-y-2">
                <div className="text-center text-xs text-neutral-500">Attribute</div>
                <div className="flex flex-wrap justify-center gap-2">
                <FilterChip label="All" isActive={attrFilter === "ALL"} onClick={() => setAttrFilter("ALL")} />
                <FilterChip label="STR" isActive={attrFilter === "STR"} onClick={() => setAttrFilter("STR")} />
                <FilterChip label="AGI" isActive={attrFilter === "AGI"} onClick={() => setAttrFilter("AGI")} />
                <FilterChip label="INT" isActive={attrFilter === "INT"} onClick={() => setAttrFilter("INT")} />
                </div>
            </div>

            {/* ATTACK */}
            <div className="space-y-2">
                <div className="text-center text-xs text-neutral-500">Attack</div>
                <div className="flex flex-wrap justify-center gap-2">
                <FilterChip label="All" isActive={attackFilter === "ALL"} onClick={() => setAttackFilter("ALL")} />
                <FilterChip label="Melee" isActive={attackFilter === "Melee"} onClick={() => setAttackFilter("Melee")} />
                <FilterChip label="Ranged" isActive={attackFilter === "Ranged"} onClick={() => setAttackFilter("Ranged")} />
                </div>
            </div>

            {/* ROLE */}
            <div className="space-y-2">
                <div className="text-center text-xs text-neutral-500">Role</div>
                <div className="flex flex-wrap justify-center gap-2">
                {ROLE_OPTIONS.map((role) => (
                    <FilterChip
                    key={role}
                    label={role}
                    isActive={roleFilter === role}
                    onClick={() => setRoleFilter(role)}
                    />
                ))}
                </div>
            </div>
            </div>


      </header>

      <main className="mx-auto max-w-6xl px-6 pb-10">
        <div className="mt-6 text-sm text-neutral-400">
            Found: <span className="text-neutral-200">{filteredHeroes.length}</span>
        </div>

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
