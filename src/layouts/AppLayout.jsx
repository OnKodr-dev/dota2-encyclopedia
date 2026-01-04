// src/layouts/AppLayout.jsx
import { Link, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="sticky top-0 z-50 border-b border-neutral-900 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
            to="/heroes"
            className="group flex items-baseline transition hover:opacity-95"
            >
            <span className="dh-wordmark text-lg font-bold tracking-tight">
                DotaHead
            </span>
        </Link>


        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-neutral-900 py-6">
        <div className="mx-auto max-w-6xl px-6 text-xs text-neutral-500">
          Fan project. Dota 2 je ochranná známka Valve.
        </div>
      </footer>
    </div>
  );
}
