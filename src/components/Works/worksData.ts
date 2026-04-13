export type WorkItem = {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
};

const worksData: WorkItem[] = [
  {
    id: 1,
    category: "POS System",
    title: "Stokapos – Modern POS System",
    description:
      "A scalable POS system for supermarkets, shops, pharmacies and growing businesses built with React and Laravel.",
    tags: ["React", "Laravel", "Point of Sale", "Inventory"],
    image: "/images/works/work-01.jpg",
  },
  {
    id: 2,
    category: "Awards Platform",
    title: "BusinessAwards.co.tz",
    description:
      "A web app for award management, nominations, judging and full ceremony workflows for Business Awards Tanzania.",
    tags: ["Award Management", "Web App", "Workflows"],
    image: "/images/works/work-02.jpg",
  },
  {
    id: 3,
    category: "Awards Platform",
    title: "TapheAwards.co.tz",
    description:
      "An awards platform that supports event listings, nominations, voting and the complete awards process.",
    tags: ["Awards", "Voting", "Event Management"],
    image: "/images/works/work-03.jpg",
  },
  {
    id: 4,
    category: "Corporate Website",
    title: "MutualGeneration.co.tz",
    description:
      "A corporate website and client engagement platform for Mutual Generation showcasing services and business value.",
    tags: ["Corporate", "Branding", "Client Engagement"],
    image: "/images/works/work-01.jpg",
  },
  {
    id: 5,
    category: "Business Website",
    title: "DelphineCompany.co.tz",
    description:
      "A professional business website for Delphine Company with service showcases, portfolio and contact workflows.",
    tags: ["Business Site", "Responsive", "SEO"],
    image: "/images/works/work-02.jpg",
  },
];

export default worksData;
