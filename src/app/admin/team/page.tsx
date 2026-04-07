"use client";

import { useEffect, useMemo, useState } from "react";

type TeamMember = {
  _id: string;
  name: string;
  role: string;
  skills: string[];
  image: string;
  order: number;
  active: boolean;
};

export default function AdminTeamPage() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [image, setImage] = useState("");
  const [order, setOrder] = useState(0);
  const [active, setActive] = useState(true);

  const canSubmit = useMemo(() => name.trim().length >= 2 && role.trim().length >= 2, [name, role]);

  const load = async () => {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/team");
    setLoading(false);
    if (!res.ok) {
      setError("Failed to load team");
      return;
    }
    const data = (await res.json()) as { items: TeamMember[] };
    setItems(data.items);
  };

  useEffect(() => {
    void load();
  }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/admin/team", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name,
        role,
        image,
        order,
        active,
        skills: skills
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      }),
    });
    if (!res.ok) {
      setError("Failed to create team member");
      return;
    }
    setName("");
    setRole("");
    setSkills("");
    setImage("");
    setOrder(0);
    setActive(true);
    await load();
  };

  const remove = async (id: string) => {
    setError(null);
    const res = await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Failed to delete team member");
      return;
    }
    await load();
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="mb-2 text-3xl font-extrabold">Team</h1>
        <p className="text-body-color dark:text-body-color-dark">
          Manage team members and their skills.
        </p>
      </div>

      <form
        onSubmit={create}
        className="rounded-xl border border-stroke bg-white p-6 shadow-one dark:border-white/10 dark:bg-dark"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold">Name</label>
            <input
              className="w-full rounded-md border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Role</label>
            <input
              className="w-full rounded-md border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-black"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Image</label>
            <input
              className="w-full rounded-md border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-black"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="/images/team/member-01.png"
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
            <label className="mb-2 block text-sm font-semibold">
              Skills (comma separated)
            </label>
            <input
              className="w-full rounded-md border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-black"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Web Apps, APIs, Performance"
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
          <div className="text-lg font-bold">All Team Members</div>
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
                No members yet.
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col gap-3 rounded-lg border border-stroke p-4 dark:border-white/10 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="text-sm font-bold">
                      {item.order}. {item.name} — {item.role}{" "}
                      {!item.active && (
                        <span className="ml-2 rounded-full bg-black/5 px-2 py-0.5 text-xs font-semibold dark:bg-white/10">
                          inactive
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-body-color dark:text-body-color-dark">
                      {item.skills?.length ?? 0} skills
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

