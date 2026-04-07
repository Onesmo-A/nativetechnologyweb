import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";
import { getServicesPublic } from "@/lib/publicContent";

const Features = async () => {
  const dbServices = await getServicesPublic();
  const services =
    dbServices && dbServices.length > 0
      ? dbServices.map((x) => ({
          id: Number(x.id),
          title: x.title,
          paragraph: x.paragraph,
          image: x.image,
          items: x.items,
        }))
      : featuresData;

  return (
    <>
      <section id="services" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title="Our Services"
            paragraph="From product design to long-term support, we build reliable digital solutions that help your organization grow."
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {services.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
