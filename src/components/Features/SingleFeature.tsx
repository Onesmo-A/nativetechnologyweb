import { Feature } from "@/types/feature";
import Image from "next/image";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { image, title, paragraph, items } = feature;
  const categoryId = slugify(title);
  return (
    <div className="w-full scroll-mt-28" id={categoryId}>
      <div className="group rounded-xs border border-stroke bg-white p-6 shadow-one transition hover:shadow-two dark:border-white/10 dark:bg-dark">
        <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
          <div className="absolute left-4 top-4 inline-flex rounded-full bg-white/12 px-4 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
            {title}
          </div>
        </div>

        <p className="mb-5 text-base leading-relaxed text-body-color dark:text-body-color-dark">
          {paragraph}
        </p>

        <ul className="space-y-2 text-sm text-black/80 dark:text-white/80">
          {items.map((item) => (
            <li
              key={item}
              id={`service-${slugify(item)}`}
              className="flex items-start gap-2 scroll-mt-28"
            >
              <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-primary/80" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleFeature;
