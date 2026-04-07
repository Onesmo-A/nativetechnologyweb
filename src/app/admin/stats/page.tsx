"use client";

import { useEffect, useMemo, useState } from "react";

type StatItem = {
  _id: string;
  value: string;
  label: string;
  note: string;
  order: number;
  active: boolean;
};

export default function AdminStatsPage() {
  const [items, setItems] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [value, setValue] = useState("");
  const [label, setLabel] = useState("");
  const [note, setNote] = useState("");
  const [order, setOrder] = useState(0);
  const [active, setActive] = useState(true);

  const canSubmit = useMemo(() => value.trim().length >= 1 && label.trim().length >= 2, [value, label]);

  const load = async () => {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/stats");
    setLoading(false);
    if (!res.ok) {
      setError("Failed to load stats");
      return;
    }
    const data = (await res.json()) as { items: StatItem[] };
    setItems(data.items);
  };

  useEffect(() => {
    void load();
  }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/admin/stats", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ value, label, note, order, active }),
    });
    if (!res.ok) {
      setError("Failed to create stat");
      return;
    }
    setValue("");
    setLabel("");
    setNote("");
    setOrder(0);
    setActive(true);
    await load();
  };

  const remove = async (id: string) => {
    setError(null);
    const res = await fetch(`/api/admin/stats/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Failed to delete stat");
      return;
    }
    await load();
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="mb-2 text-3xl font-extrabold">Stats</h1>
        <p className="text-body-color dark:text-body-color-dark">
          Manage the numbers section.
        </p>
      </div>

      <form
        onSubmit={create}
        className="rounded-xl border border-stroke bg-white p-6 shadow-one dark:border-white/10 dark:bg-dark"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold">Value</label>
            <input
              className="w-full rounded-md border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-black"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="∞"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Label</label>
            <input
              className="w-full rounded-md border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-black"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Improvements"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold">Note</label>
            <input
              className="w-full rounded-md border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-black"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Continuous updates and maintenance as you grow."
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Order</label>
            <input
              type="number"
              className="w-full rounded-md border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-black"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
            Active
          </label>
        </div>

        {error && (
          <div className="mt-4 rounded-md bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="mt-6 flex items-center justify-end">
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-xs bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
          >
            Create
          </button>
        </div>
      </form>

      <div className="rounded-xl border border-stroke bg-white p-6 shadow-one dark:border-white/10 dark:bg-dark">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-lg font-bold">All Stats</div>
          <button
            type="button"
            onClick={() => void load()}
            className="rounded-md bg-black/5 px-4 py-2 text-sm font-semibold hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-sm text-body-color dark:text-body-color-dark">
            Loading...
          </div>
        ) : (
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="text-sm text-body-color dark:text-body-color-dark">
                No stats yet.
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col gap-3 rounded-lg border border-stroke p-4 dark:border-white/10 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="text-sm font-bold">
                      {item.order}. {item.value} — {item.label}{" "}
                      {!item.active && (
                        <span className="ml-2 rounded-full bg-black/5 px-2 py-0.5 text-xs font-semibold dark:bg-white/10">
                          inactive
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-body-color dark:text-body-color-dark">
                      {item.note}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => void remove(item._id)}
                    className="rounded-md bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-500/15 dark:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

