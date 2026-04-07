import { Brand } from "@/types/brand";
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import brandsData from "./brandsData";

const Brands = () => {
  return (
    <section id="trusted-by" className="pt-16">
      <div className="container">
        <SectionTitle
          title="Trusted By"
          paragraph="Teams and organizations trust Native Technology to build and support reliable digital products."
          center
          mb="40px"
        />
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="nt-marquee rounded-xs bg-gray-light px-4 py-6 dark:bg-gray-dark sm:px-6 md:px-10 md:py-8 xl:px-12 2xl:px-16">
              <div className="nt-marquee-track" aria-label="Trusted by logos">
                <div className="nt-marquee-group">
                  {brandsData.map((brand) => (
                    <SingleBrand key={brand.id} brand={brand} />
                  ))}
                </div>
                <div className="nt-marquee-group" aria-hidden="true">
                  {brandsData.map((brand) => (
                    <SingleBrand key={`${brand.id}-duplicate`} brand={brand} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, name } = brand;

  return (
    <div className="flex shrink-0 items-center justify-center px-3 py-3 sm:px-4">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative h-10 w-[160px] opacity-70 transition hover:opacity-100 dark:opacity-60 dark:hover:opacity-100"
        aria-label={name}
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 120px, 160px"
        />
      </a>
    </div>
  );
};
