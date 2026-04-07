import Link from "next/link";
import SectionTitle from "../Common/SectionTitle";
import worksData from "./worksData";

const Works = () => {
  return (
    <section id="works" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Our Works"
          paragraph="A snapshot of the kind of products we design, build, and maintain. Replace these examples with your real projects anytime."
          center
          mb="50px"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {worksData.map((item) => (
            <div
              key={item.id}
              className="group rounded-xs border border-stroke bg-white p-8 shadow-one transition hover:shadow-two dark:border-white/10 dark:bg-dark"
            >
              <div className="mb-5 inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
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
                Discuss a similar project
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;

