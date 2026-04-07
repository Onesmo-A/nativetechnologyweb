export type ProcessStep = {
  id: number;
  title: string;
  description: string;
};

const processData: ProcessStep[] = [
  {
    id: 1,
    title: "Discover",
    description:
      "We clarify goals, users, and scope—then define what success looks like.",
  },
  {
    id: 2,
    title: "Design",
    description:
      "UI/UX, prototypes, and flows that look premium and work beautifully.",
  },
  {
    id: 3,
    title: "Build",
    description:
      "Clean implementation with testing, performance checks, and secure patterns.",
  },
  {
    id: 4,
    title: "Launch & Support",
    description:
      "Deployment, monitoring, and continuous improvements to keep everything healthy.",
  },
];

export default processData;

