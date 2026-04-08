"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminTopbar from "./topbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-light text-black dark:bg-black dark:text-white">
      <div className="mx-auto flex w-full max-w-[1400px]">
        <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 border-r border-stroke bg-white/70 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-dark/60 lg:block">
          <div className="mb-6 text-lg font-extrabold">Admin Panel</div>
          <nav className="space-y-2 text-sm">
            <Link
              href="/admin/dashboard"
              className="block rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/settings"
              className="block rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
            >
              Settings
            </Link>
            <div className="pt-2 text-xs font-bold uppercase tracking-wide text-black/50 dark:text-white/40">
              Content
            </div>
            <Link
              href="/admin/hero-slides"
              className="block rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
            >
              Hero Slides
            </Link>
            <Link
              href="/admin/brands"
              className="block rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
            >
              Trusted By
            </Link>
            <Link
              href="/admin/services"
              className="block rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
            >
              Services
            </Link>
            <Link
              href="/admin/works"
              className="block rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
            >
              Works
            </Link>
            <Link
              href="/admin/process"
              className="block rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
            >
              Work Process
            </Link>
            <Link
              href="/admin/stats"
              className="block rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
            >
              Stats
            </Link>
            <Link
              href="/admin/team"
              className="block rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
            >
              Team
            </Link>
            <Link
              href="/admin/testimonials"
              className="block rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
            >
              Testimonials
            </Link>
            <Link
              href="/admin/blog-posts"
              className="block rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
            >
              Blog Posts
            </Link>
          </nav>
        </aside>

        <main className="w-full p-6 md:p-10">
          <AdminTopbar />
          {children}
        </main>
      </div>
    </div>
  );
}
