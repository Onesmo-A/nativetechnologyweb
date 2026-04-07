"use client";

import { useEffect, useState } from "react";

type Settings = {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  socials: {
    facebook?: string;
    x?: string;
    youtube?: string;
    instagram?: string;
    tiktok?: string;
    whatsapp?: string;
  };
};

export default function AdminSettingsPage() {
  const [item, setItem] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setError(null);
    const res = await fetch("/api/admin/settings");
    if (!res.ok) {
      setError("Failed to load settings");
      return;
    }
    const data = (await res.json()) as { item: Settings };
    setItem(data.item);
  };

  useEffect(() => {
    void load();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;
    setSaving(true);
    setError(null);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(item),
    });
    setSaving(false);
    if (!res.ok) {
      setError("Failed to save settings");
      return;
    }
    await load();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-extrabold">Settings</h1>
        <p className="text-body-color dark:text-body-color-dark">
          Manage company details and social links.
        </p>
      </div>

      {!item ? (
        <div className="text-sm text-body-color dark:text-body-color-dark">
          Loading...
        </div>
      ) : (
        <form
          onSubmit={save}
          className="rounded-xl border border-stroke bg-white p-6 shadow-one dark:border-white/10 dark:bg-dark"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Company Name
              </label>
              <input
                className="w-full rounded-md border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-black"
                value={item.companyName ?? ""}
                onChange={(e) =>
                  setItem((prev) =>
                    prev ? { ...prev, companyName: e.target.value } : prev,
                  )
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Email</label>
              <input
                type="email"
                className="w-full rounded-md border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-black"
                value={item.email ?? ""}
                onChange={(e) =>
                  setItem((prev) =>
                    prev ? { ...prev, email: e.target.value } : prev,
                  )
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Phone</label>
              <input
                className="w-full rounded-md border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-black"
                value={item.phone ?? ""}
                onChange={(e) =>
                  setItem((prev) =>
                    prev ? { ...prev, phone: e.target.value } : prev,
                  )
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Address
              </label>
              <input
                className="w-full rounded-md border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-black"
                value={item.address ?? ""}
                onChange={(e) =>
                  setItem((prev) =>
                    prev ? { ...prev, address: e.target.value } : prev,
                  )
                }
              />
            </div>

            <div className="md:col-span-2">
              <div className="mb-2 text-sm font-semibold">Social Links</div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {(
                  [
                    "facebook",
                    "x",
                    "youtube",
                    "instagram",
                    "tiktok",
                    "whatsapp",
                  ] as const
                ).map((key) => (
                  <div key={key}>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-black/50 dark:text-white/40">
                      {key}
                    </label>
                    <input
                      className="w-full rounded-md border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-black"
                      value={item.socials?.[key] ?? ""}
                      onChange={(e) =>
                        setItem((prev) =>
                          prev
                            ? {
                                ...prev,
                                socials: {
                                  ...(prev.socials ?? {}),
                                  [key]: e.target.value,
                                },
                              }
                            : prev,
                        )
                      }
                      placeholder="https://"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-md bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="mt-6 flex items-center justify-end">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xs bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

