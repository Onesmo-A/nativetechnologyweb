import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import WorkProcess from "@/components/WorkProcess";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Native Technology",
  description:
    "Native Technology services: web & mobile development, digital marketing, corporate ICT services, maintenance, support, and IT consulting.",
};

const ServicesPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Services"
        description="Explore our services — from design and development to long-term support and consulting."
      />
      <Features />
      <WorkProcess />
      <Contact />
    </>
  );
};

export default ServicesPage;

