import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import Video from "@/components/Video";
import WorkProcess from "@/components/WorkProcess";
import Works from "@/components/Works";
import { Metadata } from "next";
import { getHeroSlidesPublic } from "@/lib/publicContent";

export const metadata: Metadata = {
  title: "Native Technology | Web & Mobile Development",
  description:
    "Native Technology builds web apps, mobile apps, business systems, and provides maintenance and IT consulting.",
  // other metadata
};

export default async function Home() {
  const heroSlides = await getHeroSlidesPublic();
  return (
    <>
      <ScrollUp />
      <Hero slides={heroSlides ?? undefined} />
      <Video />
      <Brands />
      <Features />
      <Works />
      <WorkProcess />
      <Testimonials />
      <Team />
      <Blog />
      <Contact />
    </>
  );
}
