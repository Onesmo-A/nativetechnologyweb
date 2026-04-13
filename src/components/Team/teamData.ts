export type TeamMember = {
  id: number;
  name: string;
  role: string;
  skills: string[];
  image?: string;
};

const teamData: TeamMember[] = [
  {
    id: 1,
    name: "Alexander OT",
    role: "Full-Stack Developer",
    skills: [
      "Scalable Web Applications",
      "RESTful APIs",
      "System Architecture",
    ],
    image: "/images/team/member-01.png",
  },
  {
    id: 2,
    name: "Janeth Mrema",
    role: "Mobile App Developer",
    skills: [
      "Android & iOS Apps",
      "Offline-First Experience",
      "Real-Time Data Sync",
    ],
    image: "/images/team/member-02.png",
  },
  {
    id: 3,
    name: "Msofe AJ",
    role: "UI/UX Designer",
    skills: [
      "User-Centered Design",
      "Prototyping & Wireframing",
      "Design Systems",
    ],
    image: "/images/team/member-03.png",
  },
  {
    id: 4,
    name: "Japheth KJ",
    role: "Network Engineer",
    skills: [
      "Network Infrastructure Design",
      "Routing & Switching",
      "Cloud Networking",
      "System Reliability",
    ],
    image: "/images/team/member-04.png",
  },
  {
    id: 5,
    name: "Brian KM",
    role: "Security Engineer",
    skills: [
      "Application Security",
      "Penetration Testing",
      "Vulnerability Management",
      "Data Protection & Encryption",
    ],
    image: "/images/team/member-05.png",
  },
];

export default teamData;