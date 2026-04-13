"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type HeroSlide = {
  image: string;
  title: string;
  description: string;
};

const SLIDE_INTERVAL_MS = 6000;
const COPY_EXIT_MS = 800;

const defaultSlides: HeroSlide[] = [
  {
    image: "/images/hero/slide-01.jpg",
    title: "Web & Mobile Solutions Built to Scale",
    description:
      "Native Technology designs and builds modern products for web and mobile — fast, secure, and ready for growth.",
  },
  {
    image: "/images/hero/slide-02.jpg",
    title: "Design, Development, and Long‑Term Support",
    description:
      "From discovery to launch, we deliver premium UI/UX and clean implementation — then keep everything running smoothly.",
  },
  {
    image: "/images/hero/slide-03.jpg",
    title: "Digital Systems That Streamline Your Business",
    description:
      "Custom business systems, integrations, and automation that reduce manual work and improve visibility.",
  },
];

const Hero = ({ slides: slidesProp }: { slides?: HeroSlide[] }) => {
  const slides: HeroSlide[] = useMemo(() => {
    const safe = Array.isArray(slidesProp) ? slidesProp.filter(Boolean) : [];
    return safe.length > 0 ? safe : defaultSlides;
  }, [slidesProp]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState<number | null>(null);
  const currentSlideRef = useRef(currentSlide);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const oldSlide = currentSlideRef.current;
    if (oldSlide === currentSlide) return;

    setPreviousSlide(oldSlide);
    currentSlideRef.current = currentSlide;

    const timeout = setTimeout(() => setPreviousSlide(null), COPY_EXIT_MS);
    return () => clearTimeout(timeout);
  }, [currentSlide]);

  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
    >
      {/* Background Slider */}
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 z-[-2] transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.68), rgba(0,0,0,0.68)), url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      <div className="container relative z-10">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[820px] text-center">
              {previousSlide !== null && (
                <div className="pointer-events-none absolute inset-0">
                  <HeroCopy
                    key={`hero-out-${previousSlide}-${currentSlide}`}
                    slide={slides[previousSlide]}
                    variant="exit"
                    slides={slides}
                    currentSlide={currentSlide}
                    onSelect={setCurrentSlide}
                  />
                </div>
              )}

              <HeroCopy
                key={`hero-in-${currentSlide}`}
                slide={slides[currentSlide]}
                variant="enter"
                slides={slides}
                currentSlide={currentSlide}
                onSelect={setCurrentSlide}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative shapes */}
      <div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
        <Image
          src="/images/hero/shape-01.svg"
          alt=""
          width={450}
          height={556}
          priority
        />
      </div>
      <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
        <Image
          src="/images/hero/shape-02.svg"
          alt=""
          width={364}
          height={201}
          priority
        />
      </div>
    </section>
  );
};

export default Hero;

const HeroCopy = ({
  slide,
  variant,
  slides,
  currentSlide,
  onSelect,
}: {
  slide: HeroSlide;
  variant: "enter" | "exit";
  slides: HeroSlide[];
  currentSlide: number;
  onSelect: (idx: number) => void;
}) => {
  const wrapperClass = variant === "enter" ? "nt-hero-enter" : "nt-hero-exit";

  return (
    <div className={wrapperClass}>
      <h1
        className="nt-hero-item nt-hero-title mb-5 text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight"
        style={{ animationDelay: "40ms" }}
      >
        {slide.title}
      </h1>
      <p
        className="nt-hero-item mb-12 text-base leading-relaxed text-white/90 sm:text-lg md:text-xl"
        style={{ animationDelay: "140ms" }}
      >
        {slide.description}
      </p>

      <div
        className="nt-hero-item flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        style={{ animationDelay: "220ms" }}
      >
        <Link
          href="https://wa.me/255743331626"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/90"
        >
          Contact Us
        </Link>
        <Link
          href="/works"
          className="inline-block rounded-xs bg-white px-8 py-4 text-base font-semibold text-black duration-300 ease-in-out hover:bg-white/90"
        >
          View Our Work
        </Link>
      </div>

      <div
        className="nt-hero-item mt-10 flex items-center justify-center gap-2"
        style={{ animationDelay: "320ms" }}
      >
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => onSelect(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentSlide
                ? "w-8 bg-white"
                : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
