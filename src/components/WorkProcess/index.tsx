import SectionTitle from "../Common/SectionTitle";
import processData from "./processData";

const WorkProcess = () => {
  return (
    <section id="process" className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Our Work Process"
          paragraph="A simple process that keeps delivery predictable and quality high."
          center
          mb="50px"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processData.map((step) => (
            <div
              key={step.id}
              className="rounded-xs bg-white p-7 shadow-one dark:bg-dark dark:shadow-three"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-lg font-bold text-primary">
                {step.id}
              </div>
              <h3 className="mb-2 text-lg font-bold text-black dark:text-white">
                {step.title}
              </h3>
              <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;

