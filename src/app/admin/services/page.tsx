"use client";

import { useEffect, useMemo, useState } from "react";

type ServiceCategory = {
  _id: string;
  title: string;
  paragraph: string;
  image: string;
  items: string[];
  order: number;
  active: boolean;
};

export default function AdminServicesPage() {
  const [items, setItems] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [image, setImage] = useState("");
  const [itemsCsv, setItemsCsv] = useState("");
  const [order, setOrder] = useState(0);
  const [active, setActive] = useState(true);

  const canSubmit = useMemo(() => title.trim().length >= 2, [title]);

  const load = async () => {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/services");
    setLoading(false);
    if (!res.ok) {
      setError("Failed to load services");
      return;
    }
    const data = (await res.json()) as { items: ServiceCategory[] };
    setItems(data.items);
  };

  useEffect(() => {
    void load();
  }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const itemsArr = itemsCsv
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title,
        paragraph,
        image,
        items: itemsArr,
        order,
        active,
      }),
    });
    if (!res.ok) {
      setError("Failed to create service category");
      return;
    }
    setTitle("");
    setParagraph("");
    setImage("");
    setItemsCsv("");
    setOrder(0);
    setActive(true);
    await load();
  };

  const remove = async (id: string) => {
    setError(null);
    const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Failed to delete service category");
      return;
    }
    await load();
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="mb-2 text-3xl font-extrabold">Services</h1>
        <p className="text-body-color dark:text-body-color-dark">
          Manage service categories and their items.
        </p>
      </div>

      <form
        onSubmit={create}
        className="rounded-xl border border-stroke bg-white p-6 shadow-one dark:border-white/10 dark:bg-dark"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold">Title</label>
            <input
              className="w-full rounded-md border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="WEB SOLUTIONS"
              required
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
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold">Paragraph</label>
            <textarea
              className="min-h-[100px] w-full rounded-md border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-black"
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Image</label>
            <input
              className="w-full rounded-md border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-black"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="/images/services/web-solutions.svg"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Items (comma separated)
            </label>
            <input
              className="w-full rounded-md border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-black"
              value={itemsCsv}
              onChange={(e) => setItemsCsv(e.target.value)}
              placeholder="Web Development, Mobile App Development"
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
          <div className="text-lg font-bold">All Categories</div>
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
                No categories yet.
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col gap-3 rounded-lg border border-stroke p-4 dark:border-white/10 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="text-sm font-bold">
                      {item.order}. {item.title}{" "}
                      {!item.active && (
                        <span className="ml-2 rounded-full bg-black/5 px-2 py-0.5 text-xs font-semibold dark:bg-white/10">
                          inactive
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-body-color dark:text-body-color-dark">
                      {item.items?.length ?? 0} items
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

