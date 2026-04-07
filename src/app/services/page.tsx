import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Native Technology",
  description:
    "Native Technology services: web & mobile development, design, business systems, maintenance, support, and IT consulting.",
};

const ServicesPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Services"
        description="Explore our core services—from product design and development to long-term maintenance and consulting."
      />
      <Features />

      {/* Work Process Section */}
      <section className="py-16 md:py-20 lg:py-28 bg-gray-light dark:bg-white/5">
        <div className="container">
          <div className="mx-auto mb-12 max-w-[600px] text-center">
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl">Our Work Process</h2>
            <p className="text-base text-body-color">Jinsi tunavyofanya kazi kuanzia wazo mpaka kukukabidhi bidhaa yako.</p>
          </div>
          <div className="relative w-full aspect-[16/9] max-w-[1000px] mx-auto overflow-hidden rounded-xl shadow-lg">
            <Image 
              src="/images/process/work-process-diagram.png" 
              alt="Work Process Diagram"
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
};

export default ServicesPage;
