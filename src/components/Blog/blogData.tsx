import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "Designing Products That Feel Premium in Light & Dark Mode",
    paragraph:
      "Practical UI/UX patterns we use to keep interfaces consistent, readable, and elegant across themes.",
    image: "/images/blog/blog-01.jpg",
    author: {
      name: "Native Technology",
      image: "/images/blog/author-03.png",
      designation: "Team",
    },
    tags: ["design"],
    publishDate: "2026",
  },
  {
    id: 2,
    title: "From Idea to MVP: A Simple Delivery Process That Works",
    paragraph:
      "How we scope, design, build, and launch products with predictable milestones and fast feedback loops.",
    image: "/images/blog/blog-02.jpg",
    author: {
      name: "Native Technology",
      image: "/images/blog/author-02.png",
      designation: "Team",
    },
    tags: ["process"],
    publishDate: "2026",
  },
  {
    id: 3,
    title: "Maintenance Matters: Keeping Systems Secure and Stable",
    paragraph:
      "A short guide to monitoring, updates, and proactive improvements that reduce downtime and risk.",
    image: "/images/blog/blog-03.jpg",
    author: {
      name: "Native Technology",
      image: "/images/blog/author-03.png",
      designation: "Team",
    },
    tags: ["maintenance"],
    publishDate: "2026",
  },
];
export default blogData;
