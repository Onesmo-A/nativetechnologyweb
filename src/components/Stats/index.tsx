import statsData from "./statsData";

const Stats = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="rounded-xs bg-gray-light p-8 shadow-one dark:bg-gray-dark dark:shadow-three"
            >
              <div className="mb-2 text-4xl font-extrabold text-black dark:text-white">
                {stat.value}
              </div>
              <div className="mb-2 text-lg font-bold text-black dark:text-white">
                {stat.label}
              </div>
              <p className="text-base text-body-color dark:text-body-color-dark">
                {stat.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

