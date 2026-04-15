import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import WorkProcess from "@/components/WorkProcess";
import Works from "@/components/Works";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Works | Native Technology",
  description:
    "A snapshot of the kind of web apps, mobile apps, and business systems Native Technology builds and supports.",
};

const WorksPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Works"
        description="A snapshot of the kind of products we design, build, and maintain."
      />
      <Works />
      <WorkProcess />
      <Testimonials />
      <Contact />
    </>
  );
};

export default WorksPage;

