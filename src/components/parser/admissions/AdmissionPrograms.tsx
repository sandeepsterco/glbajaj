import Link from "next/link";
import { apiFetch } from "@/src/lib/api";
import ProgramApplyProvider from "./Programapplyprovider";
import ProgramApplyButton from "./Programapplybutton";

interface Program {
  slug: string;
  name: string;
  type?: string;
  duration?: number;
  affiliation?: string;
  department_slug?: string;
}

async function fetchPrograms(): Promise<Program[]> {
  const { data, error } = await apiFetch(`all-programs`);
  if (error) throw new Error(error); // handled by the route's error.tsx
  return data?.programs ?? [];
}

function formatTypeLabel(type: string) {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function AdmissionPrograms() {
  const data = await fetchPrograms();

  if (!data.length) {
    return <div className="program-empty">No programs available.</div>;
  }

  const grouped = data.reduce<Record<string, Program[]>>((acc, program) => {
    const type = program.type || "other";
    if (!acc[type]) acc[type] = [];
    acc[type].push(program);
    return acc;
  }, {});

  const typeOrder = ["under-graduate", "post-graduate"];
  const orderedTypes = [
    ...typeOrder.filter((t) => grouped[t]),
    ...Object.keys(grouped).filter((t) => !typeOrder.includes(t)),
  ];

  return (
    
    <ProgramApplyProvider>
      {orderedTypes.map((type) => (
        <div className="program-list" key={type}>
          <h5>{formatTypeLabel(type)}</h5>

          {grouped[type].map((program) => (
            <div className="program-box" key={program.slug}>
              <div className="program-text">
                <h6>
                  <a href={`/academics/programs/${program.slug}`}>{program.name}</a>
                </h6>
              </div>
              <div className="program-right">
                <div className="duration">
                  <p>Duration</p>
                  <span>
                    {program.duration} {program.duration === 1 ? "year" : "years"}
                  </span>
                </div>
                <div className="affiliation">
                  <p>Affiliation</p>
                  <span>{program.affiliation || "-"}</span>
                </div>
                <div className="apply-btn">
                  {/* Client component: opens the (also client) apply modal */}
                  <ProgramApplyButton
                    departmentSlug={program.department_slug || program.slug}
                  />
                </div>
                <div className="program-btn">
                  <Link href={`/academics/programs/${program.slug}`}>
                    <span>
                      <img src="/images/icons/right-arrow.svg" alt="arrow" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </ProgramApplyProvider>
  );
}