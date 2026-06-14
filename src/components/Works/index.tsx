"use client";

import Image from "next/image";
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
  url?: string;
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
            image: x.image,
            url: x.url,
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
          image: x.image,
          url: x.url,
        }));
        setWorks(fallbackWorks);
      });
  }, []);

  if (works.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section id="works" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Our Projects"
          paragraph="A curated showcase of live websites and digital products designed for growth, trust, and engagement."
          center
          mb="50px"
        />

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {works.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-[26px] border border-stroke bg-white shadow-one transition hover:-translate-y-1 hover:shadow-two dark:border-white/10 dark:bg-dark"
            >
              <div className="relative overflow-hidden bg-slate-100">
                <div className="aspect-[4/3] sm:aspect-[16/11]">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : null}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              <div className="space-y-4 p-6 sm:p-7">
                <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
                  {item.category}
                </span>

                <div className="space-y-3">
                  <a
                    href={item.url ?? "/"}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-xl font-semibold text-black transition hover:text-primary dark:text-white"
                  >
                    {item.title}
                  </a>

                  <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-black/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-black/70 dark:bg-white/10 dark:text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <a
                    href={item.url ?? "/"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-primary/15 bg-primary/5 px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
                  >
                    Visit website
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;