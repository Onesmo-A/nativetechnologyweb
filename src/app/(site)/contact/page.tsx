import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Native Technology",
  description: "Contact Native Technology to discuss your web or mobile project.",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact"
        description="Share your needs and we’ll respond with next steps and a clear plan."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
