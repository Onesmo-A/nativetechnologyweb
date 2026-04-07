import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import brandsData from "./brandsData";
import { getBrandsPublic } from "@/lib/publicContent";

type BrandItem = {
  id: string;
  name: string;
  href: string;
  image: string;
};

const Brands = async () => {
  const dbBrands = await getBrandsPublic();
  const brands: BrandItem[] =
    dbBrands && dbBrands.length > 0
      ? dbBrands
      : brandsData.map((b) => ({
          id: String(b.id),
          name: b.name,
          href: b.href,
          image: b.image,
        }));

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
                  {brands.map((brand) => (
                    <SingleBrand key={brand.id} brand={brand} />
                  ))}
                </div>
                <div className="nt-marquee-group" aria-hidden="true">
                  {brands.map((brand) => (
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

const SingleBrand = ({ brand }: { brand: BrandItem }) => {
  const { href, image, name } = brand;

  return (
    <div className="flex shrink-0 items-center justify-center px-4 py-4 sm:px-6">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative h-14 w-[260px] opacity-95 transition hover:opacity-100 dark:opacity-90 dark:hover:opacity-100"
        aria-label={name}
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 220px, 260px"
        />
      </a>
    </div>
  );
};
