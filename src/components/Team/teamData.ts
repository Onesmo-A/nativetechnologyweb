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
    name: "Skilled Team Member",
    role: "Full-Stack Developer",
    skills: ["Web Apps", "APIs", "Performance"],
    image: "/images/team/member-01.png",
  },
  {
    id: 2,
    name: "Skilled Team Member",
    role: "Mobile Developer",
    skills: ["Android/iOS", "Offline UX", "Sync"],
    image: "/images/team/member-02.png",
  },
  {
    id: 3,
    name: "Skilled Team Member",
    role: "UI/UX Designer",
    skills: ["Design Systems", "Prototyping", "Accessibility"],
    image: "/images/team/member-03.png",
  },
];

export default teamData;

