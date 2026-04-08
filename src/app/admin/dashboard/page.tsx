"use client";

import { useState } from "react";

export default function AdminDashboardPage() {
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);
  const [health, setHealth] = useState<string | null>(null);

  const seed = async () => {
    setSeeding(true);
    setSeedResult(null);
    const res = await fetch("/api/admin/seed", { method: "POST" });
    setSeeding(false);
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      setSeedResult(`Seed failed (${res.status})\n${txt}`);
      return;
    }
    const data = (await res.json()) as { result?: unknown };
    setSeedResult(JSON.stringify(data.result ?? {}, null, 2));
  };

  const checkHealth = async () => {
    setHealth(null);
    const res = await fetch("/api/admin/health");
    const txt = await res.text().catch(() => "");
    setHealth(`Status ${res.status}\n${txt}`);
  };

  return (
    <div>
      <h1 className="mb-2 text-3xl font-extrabold">Dashboard</h1>
      <p className="text-body-color dark:text-body-color-dark">
        Backend is ready. Next step: connect Atlas and manage content.
      </p>

      <div className="mt-8 rounded-xl border border-stroke bg-white p-6 shadow-one dark:border-white/10 dark:bg-dark">
        <div className="mb-2 text-lg font-bold">Quick Setup</div>
        <p className="mb-5 text-sm text-body-color dark:text-body-color-dark">
          Seed the database with the current default content (Hero, Brands,
          Services, Works, Process, Stats, Team, Testimonials).
        </p>
        <button
          type="button"
          onClick={() => void seed()}
          disabled={seeding}
          className="rounded-xs bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
        >
          {seeding ? "Seeding..." : "Seed Default Content"}
        </button>

        <button
          type="button"
          onClick={() => void checkHealth()}
          className="ml-3 rounded-xs bg-black/5 px-6 py-3 text-sm font-semibold hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15"
        >
          Check DB Health
        </button>

        {seedResult && (
          <pre className="mt-5 overflow-auto rounded-lg bg-black/5 p-4 text-xs text-black/80 dark:bg-white/10 dark:text-white/80">
            {seedResult}
          </pre>
        )}

        {health && (
          <pre className="mt-5 overflow-auto rounded-lg bg-black/5 p-4 text-xs text-black/80 dark:bg-white/10 dark:text-white/80">
            {health}
          </pre>
        )}
      </div>
    </div>
  );
}
