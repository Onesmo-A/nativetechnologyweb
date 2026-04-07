import SectionTitle from "../Common/SectionTitle";
import teamData from "./teamData";
import Image from "next/image";
import { getTeamPublic } from "@/lib/publicContent";

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p.charAt(0).toUpperCase()).join("");
};

const Team = async () => {
  const dbTeam = await getTeamPublic();
  const members = dbTeam && dbTeam.length > 0 ? dbTeam : teamData;
  return (
    <section id="team" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Skilled Team"
          paragraph="A multidisciplinary team focused on quality design, clean code, and dependable support."
          center
          mb="50px"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="rounded-xs border border-stroke bg-white p-8 shadow-one dark:border-white/10 dark:bg-dark"
            >
              <div className="mb-5 flex items-center gap-4">
                {member.image ? (
                  <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-primary/15">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                ) : (
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                    {getInitials(member.name)}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-black dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-body-color dark:text-body-color-dark">
                    {member.role}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-black/5 px-3 py-1 text-xs font-medium text-black/70 dark:bg-white/10 dark:text-white/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
