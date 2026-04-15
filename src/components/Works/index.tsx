"use client";

import Image from "next/image";
import Link from "next/link";
import SectionTitle from "../Common/SectionTitle";
import worksData from "./worksData";
import { useState, useEffect } from "react";
import { getWorksPublic } from "@/lib/publicContent";

type WorkItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image?: string;
};

const Works = () => {
  const [works, setWorks] = useState<WorkItem[]>([]);

  useEffect(() => {
    getWorksPublic()
      .then((data) => {
        if (data && data.length > 0) {
          setWorks(data);
        } else {
          const fallbackWorks = worksData.map((x) => ({
            id: String(x.id),
            title: x.title,
            category: x.category,
            description: x.description,
            tags: x.tags,
            image: "/images/works/work-01.jpg",
          }));
          setWorks(fallbackWorks);
        }
      })
      .catch(() => {
        const fallbackWorks = worksData.map((x) => ({
          id: String(x.id),
          title: x.title,
          category: x.category,
          description: x.description,
          tags: x.tags,
          image: "/images/works/work-01.jpg",
        }));
        setWorks(fallbackWorks);
      });
  }, []);

  if (works.length === 0) {
    return <div>Loading...</div>;
  }

  const duplicatedWorks = [...works, ...works];

  return (
    <section id="works" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Our Works"
          paragraph="Real projects we've delivered for retail, awards platforms, corporate brands and modern business systems."
          center
          mb="50px"
        />

        <div className="works-marquee h-[500px] md:h-[450px] lg:h-[400px]">
          <div className="works-marquee-track flex h-full flex-nowrap items-stretch gap-8">
            {duplicatedWorks.map((item, idx) => {
              const pass = Math.floor(idx / works.length);

              return (
                <div
                  key={`${item.id}-${pass}`}
                  className="group relative w-full min-w-[300px] max-w-[400px] flex-shrink-0 overflow-hidden rounded-xs border border-stroke bg-white/75 p-8 shadow-one backdrop-blur-sm transition hover:bg-white/80 hover:shadow-two dark:border-white/10 dark:bg-dark/60 dark:hover:bg-dark/70"
                >
                  <Image
                    src={item.image || "/images/works/work-01.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover opacity-45 dark:opacity-35"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/45 to-white/10 dark:from-black/70 dark:via-black/45 dark:to-black/10" />

                  <div className="relative">
                    <div className="mb-5 inline-flex rounded-full bg-white px-4 py-1 text-sm font-semibold text-primary">
                      {item.category}
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
                      {item.title}
                    </h3>

                    <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                      {item.description}
                    </p>

                    <div className="mb-7 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-black/5 px-3 py-1 text-xs font-medium text-black/70 dark:bg-white/10 dark:text-white/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-base font-semibold text-primary transition group-hover:gap-3"
                    >
                      Discuss a similar project <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;