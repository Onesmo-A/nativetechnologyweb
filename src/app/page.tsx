import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import Team from "@/components/Team";
import Video from "@/components/Video";
import WorkProcess from "@/components/WorkProcess";
import Works from "@/components/Works";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Native Technology | Web & Mobile Development",
  description:
    "Native Technology builds web apps, mobile apps, business systems, and provides maintenance and IT consulting.",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Video />
      <Brands />
      <Features />
      <Works />
      <WorkProcess />
      <Stats />
      <Testimonials />
      <Team />
      <Blog />
      <Contact />
    </>
  );
}
