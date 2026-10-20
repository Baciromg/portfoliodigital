import "dotenv/config";
import { db } from "../index";
import { technologies } from "./schema";

const TECHS = [
  { name: "Next.js", color: "#000000" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "React", color: "#61DAFB" },
  { name: "Tailwind CSS", color: "#38BDF8" },
  { name: "Node.js", color: "#3C873A" },
  { name: "Express", color: "#000000" },
  { name: "Drizzle ORM", color: "#C5F74F" },
  { name: "Turso", color: "#4FF8D2" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "HTML5", color: "#E34F26" },
  { name: "CSS3", color: "#1572B6" },
];

async function main() {
  for (const tech of TECHS) {
    await db.insert(technologies).values(tech).onConflictDoNothing();
  }
  console.log(`Seed concluído: ${TECHS.length} tecnologias verificadas/criadas.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
