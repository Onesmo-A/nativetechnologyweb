import statsData from "./statsData";
import { getStatsPublic } from "@/lib/publicContent";

const Stats = async () => {
  const dbStats = await getStatsPublic();
  const stats = dbStats && dbStats.length > 0 ? dbStats : statsData;
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="group relative overflow-hidden rounded-xs bg-white p-[1px] shadow-one transition hover:shadow-two dark:bg-dark dark:shadow-three"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/35 via-transparent to-secondary/25 opacity-70 transition group-hover:opacity-100" />
              <div className="relative rounded-[10px] bg-white p-8 text-center dark:bg-dark">
                <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-4xl font-extrabold leading-none text-primary">
                  {stat.value}
                </div>
                <div className="mb-2 text-lg font-bold text-black dark:text-white">
                  {stat.label}
                </div>
                <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                  {stat.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
