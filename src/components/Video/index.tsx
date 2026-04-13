"use client";

import VideoModal from "@/components/video-modal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";

export default function Video() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <section className="relative z-10 py-16 md:py-20 lg:py-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <SectionTitle
                title="About Native Technology"
                paragraph="We help teams turn ideas into working products—delivered with clarity, craftsmanship, and long-term support."
                mb="32px"
              />

              <ul className="mb-10 space-y-3 text-base text-body-color dark:text-body-color-dark sm:text-lg">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <span>Clear scope, realistic timelines, and transparent delivery.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <span>Design-first development that looks premium on every device.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <span>Security, performance, and maintainability baked in.</span>
                </li>
              </ul>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/about"
                  className="rounded-xs bg-primary px-7 py-3 text-base font-semibold text-white duration-300 hover:bg-primary/90"
                >
                  Learn More
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="text-dark inline-flex items-center gap-2 rounded-xs bg-black/5 px-7 py-3 text-base font-semibold duration-300 hover:bg-black/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                >
                  <span className="text-primary inline-flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-white/10">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 18"
                      className="fill-current"
                    >
                      <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
                    </svg>
                  </span>
                  Watch Intro
                </button>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div className="relative mx-auto mt-12 max-w-[620px] overflow-hidden rounded-md shadow-three dark:shadow-three lg:mt-0">
                <div className="relative aspect-77/45 items-center justify-center">
                  <Image
                    src="/images/video/image.png"
                    alt="Native Technology introduction video cover"
                    className="object-cover"
                    fill
                  />
                  <div className="absolute top-0 right-0 flex h-full w-full items-center justify-center bg-black/10 dark:bg-black/20">
                    <button
                      aria-label="video play button"
                      onClick={() => setOpen(true)}
                      className="nt-ripple text-primary flex h-[74px] w-[74px] cursor-pointer items-center justify-center rounded-full bg-white/80 transition hover:bg-white dark:bg-white/10 dark:hover:bg-white/15"
                    >
                      <svg
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        className="fill-current"
                      >
                        <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        channel="youtube"
        videoId="i5g5kNIvyuE"
      />
    </>
  );
};
