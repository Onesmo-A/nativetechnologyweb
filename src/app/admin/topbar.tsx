"use client";

export default function AdminTopbar() {
  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="mb-8 flex items-center justify-end">
      <button
        type="button"
        onClick={() => void logout()}
        className="rounded-md bg-black/5 px-4 py-2 text-sm font-semibold hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15"
      >
        Logout
      </button>
    </div>
  );
}

