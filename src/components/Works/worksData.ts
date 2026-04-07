export type WorkItem = {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
};

const worksData: WorkItem[] = [
  {
    id: 1,
    category: "Web Application",
    title: "Business Dashboard & Reporting",
    description:
      "A modern web dashboard for operations, analytics, and role-based access.",
    tags: ["Next.js", "APIs", "Role-Based Access"],
  },
  {
    id: 2,
    category: "Mobile Application",
    title: "Field Data Collection App",
    description:
      "A mobile-first app for capturing data on the go with offline-ready flows.",
    tags: ["Mobile", "Offline", "Sync"],
  },
  {
    id: 3,
    category: "Business System",
    title: "Workflow Automation System",
    description:
      "Custom workflows that reduce manual work and improve visibility across teams.",
    tags: ["Automation", "Integrations", "Audit Logs"],
  },
];

export default worksData;

