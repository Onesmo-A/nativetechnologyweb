"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Login failed");
      return;
    }

    window.location.href = "/admin/dashboard";
  };

  return (
    <div className="min-h-screen bg-gray-light px-4 py-16 dark:bg-black">
      <div className="mx-auto w-full max-w-[520px] rounded-xl border border-stroke bg-white p-8 shadow-two dark:border-white/10 dark:bg-dark">
        <h1 className="mb-2 text-2xl font-extrabold text-black dark:text-white">
          Admin Login
        </h1>
        <p className="mb-8 text-sm text-body-color dark:text-body-color-dark">
          Sign in to manage content.
        </p>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full rounded-md border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-black"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full rounded-md border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-black"
              required
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full rounded-xs bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

