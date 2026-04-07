export type TeamMember = {
  id: number;
  name: string;
  role: string;
  skills: string[];
};

const teamData: TeamMember[] = [
  {
    id: 1,
    name: "Skilled Team Member",
    role: "Full-Stack Developer",
    skills: ["Web Apps", "APIs", "Performance"],
  },
  {
    id: 2,
    name: "Skilled Team Member",
    role: "Mobile Developer",
    skills: ["Android/iOS", "Offline UX", "Sync"],
  },
  {
    id: 3,
    name: "Skilled Team Member",
    role: "UI/UX Designer",
    skills: ["Design Systems", "Prototyping", "Accessibility"],
  },
];

export default teamData;

