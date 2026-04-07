"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const pathname = usePathname();

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [openSubmenuId, setOpenSubmenuId] = useState<number | null>(null);

  const [sticky, setSticky] = useState(false);

  const closeMobileMenus = () => {
    setNavbarOpen(false);
    setOpenSubmenuId(null);
  };

  useEffect(() => {
    const handleStickyNavbar = () => setSticky(window.scrollY >= 80);
    window.addEventListener("scroll", handleStickyNavbar);
    handleStickyNavbar();
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  useEffect(() => {
    closeMobileMenus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const isActive = useMemo(() => {
    return (path?: string) => {
      if (!path) return false;
      const basePath = path.split("#")[0];
      if (!basePath) return false;
      return pathname === basePath;
    };
  }, [pathname]);

  return (
    <header
      className={`header left-0 top-0 z-40 flex w-full items-center ${
        sticky
          ? "fixed z-[9999] bg-white/80 shadow-sticky backdrop-blur-xs transition dark:bg-gray-dark dark:shadow-sticky-dark"
          : "absolute bg-transparent"
      }`}
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4 xl:mr-12">
            <Link
              href="/"
              className={`header-logo block w-full ${
                sticky ? "py-5 lg:py-2" : "py-8"
              } `}
              onClick={closeMobileMenus}
            >
              <Image
                src="/images/logo/native-technology-light.png"
                alt="Native Technology"
                width={56}
                height={56}
                className="h-10 w-auto dark:hidden"
                priority
              />
              <Image
                src="/images/logo/native-technology-dark.png"
                alt="Native Technology"
                width={56}
                height={56}
                className="hidden h-10 w-auto dark:block"
                priority
              />
            </Link>
          </div>

          <div className="flex w-full items-center justify-between px-4">
            <div className="lg:flex lg:flex-1 lg:justify-center">
              <button
                onClick={() => setNavbarOpen((v) => !v)}
                id="navbarToggler"
                aria-label="Mobile Menu"
                className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
              >
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                    navbarOpen ? "top-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                    navbarOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                    navbarOpen ? "top-[-8px] -rotate-45" : ""
                  }`}
                />
              </button>

              <nav
                id="navbarCollapse"
                className={`navbar absolute right-0 z-30 w-[280px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:relative lg:w-full lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                  navbarOpen
                    ? "visibility top-full opacity-100"
                    : "invisible top-[120%] opacity-0"
                }`}
              >
                <ul className="block lg:flex lg:justify-center lg:space-x-12">
                  {menuData.map((menuItem) => {
                    const hasSubmenu = !!menuItem.submenu?.length;
                    const isOpen = openSubmenuId === menuItem.id;

                    if (!hasSubmenu) {
                      return (
                        <li key={menuItem.id} className="group">
                          <Link
                            href={menuItem.path ?? "#"}
                            onClick={closeMobileMenus}
                            className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                              isActive(menuItem.path)
                                ? "text-primary dark:text-white"
                                : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                            }`}
                          >
                            {menuItem.title}
                          </Link>
                        </li>
                      );
                    }

                    return (
                      <li key={menuItem.id} className="group">
                        <div className="flex items-center justify-between lg:block">
                          <Link
                            href={menuItem.path ?? "#"}
                            onClick={closeMobileMenus}
                            className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                              isActive(menuItem.path)
                                ? "text-primary dark:text-white"
                                : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                            }`}
                          >
                            {menuItem.title}
                          </Link>
                          <button
                            type="button"
                            aria-label={`Toggle ${menuItem.title} submenu`}
                            onClick={() =>
                              setOpenSubmenuId((prev) =>
                                prev === menuItem.id ? null : menuItem.id,
                              )
                            }
                            className="rounded-md p-2 text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10 lg:hidden"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className={`transition ${
                                isOpen ? "rotate-180" : "rotate-0"
                              }`}
                            >
                              <path
                                d="M5 7.5L10 12.5L15 7.5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Mobile submenu */}
                        <div className={`${isOpen ? "block" : "hidden"} lg:hidden`}>
                          <div className="mt-1 space-y-4 rounded-md bg-black/5 p-3 dark:bg-white/5">
                            {menuItem.submenu?.map((group) => (
                              <div key={group.id}>
                                <Link
                                  href={group.path ?? "#"}
                                  onClick={closeMobileMenus}
                                  className="block text-xs font-bold tracking-wide text-black/70 dark:text-white/70"
                                >
                                  {group.title}
                                </Link>
                                <ul className="mt-2 space-y-2">
                                  {group.submenu?.map((item) => (
                                    <li key={item.id}>
                                      <Link
                                        href={item.path ?? "#"}
                                        onClick={closeMobileMenus}
                                        className="block text-sm text-black/80 hover:text-primary dark:text-white/80 dark:hover:text-white"
                                      >
                                        {item.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Desktop mega dropdown */}
                        <div className="invisible absolute left-1/2 top-full hidden w-[min(980px,calc(100vw-2rem))] -translate-x-1/2 translate-y-2 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 lg:block">
                          <div className="mx-auto rounded-xl border border-stroke bg-white p-7 shadow-two dark:border-white/10 dark:bg-dark">
                            <div className="grid grid-cols-12 gap-8">
                              <div className="col-span-8 grid grid-cols-3 gap-6">
                                {menuItem.submenu?.map((group) => (
                                  <div key={group.id}>
                                    <Link
                                      href={group.path ?? "#"}
                                      className="mb-3 inline-flex text-xs font-extrabold tracking-wide text-black/70 hover:text-primary dark:text-white/70 dark:hover:text-white"
                                    >
                                      {group.title}
                                    </Link>
                                    <ul className="space-y-2">
                                      {group.submenu?.map((item) => (
                                        <li key={item.id}>
                                          <Link
                                            href={item.path ?? "#"}
                                            className="block text-sm font-medium text-black hover:text-primary dark:text-white/90 dark:hover:text-white"
                                          >
                                            {item.title}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>

                              <div className="col-span-4">
                                <div className="rounded-lg bg-gray-light p-6 dark:bg-white/5">
                                  <div className="mb-2 text-lg font-bold text-black dark:text-white">
                                    Need a custom solution?
                                  </div>
                                  <p className="mb-5 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                                    Tell us your goals, timeline, and budget — we’ll propose the best approach.
                                  </p>
                                  <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 rounded-xs bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
                                  >
                                    Get a quote <span aria-hidden="true">→</span>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div className="flex items-center justify-end pr-16 lg:pr-0">
              <Link
                href="/contact"
                className="ease-in-up hidden rounded-xs bg-primary px-8 py-3 text-base font-medium text-white shadow-btn transition duration-300 hover:bg-primary/90 hover:shadow-btn-hover md:block md:px-9 lg:px-6 xl:px-9"
              >
                Contact Us
              </Link>
              <div className="ml-3">
                <ThemeToggler />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
