import SectionTitle from "../Common/SectionTitle";
import processData from "./processData";
import { getProcessPublic } from "@/lib/publicContent";

const WorkProcess = async () => {
  const dbProcess = await getProcessPublic();
  const steps = dbProcess && dbProcess.length > 0 ? dbProcess : processData;
  return (
    <section
      id="process"
      className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="Our Work Process"
          paragraph="A clear flow that keeps delivery predictable and quality high."
          center
          mb="50px"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div key={step.id} className="relative">
              <div className="rounded-xs border border-stroke bg-white p-7 shadow-one dark:border-white/10 dark:bg-dark dark:shadow-three">
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

              {idx < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 text-primary/80 lg:block"
                >
                  <svg
                    width="56"
                    height="20"
                    viewBox="0 0 56 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-70"
                  >
                    <path
                      d="M2 10H48"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M40 2L48 10L40 18"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
