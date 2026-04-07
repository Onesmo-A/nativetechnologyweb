export type StatItem = {
  id: number;
  value: string;
  label: string;
  note: string;
};

const statsData: StatItem[] = [
  {
    id: 1,
    value: "5",
    label: "Core Services",
    note: "Web, mobile, systems, support, and consulting.",
  },
  {
    id: 2,
    value: "4",
    label: "Work Stages",
    note: "Discover, design, build, launch & support.",
  },
  {
    id: 3,
    value: "2",
    label: "Platforms",
    note: "Web and mobile products, built to scale.",
  },
  {
    id: 4,
    value: "∞",
    label: "Improvements",
    note: "Continuous updates and maintenance as you grow.",
  },
];

export default statsData;

