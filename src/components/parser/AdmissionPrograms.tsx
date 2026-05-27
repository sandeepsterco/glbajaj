"use client"
import { apiFetch } from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import { SkeletonGroup } from "../ui/Skeleton";
import Link from "next/link";
import { APPLY_NOW } from "@/src/config/config";

const fetchPrograms = async () => {
  const { data, error } = await apiFetch(`all-programs`);
  if (error) throw new Error(error);
  return data?.programs;
};

export default function AdmissionPrograms() {
  const { data: programs, isLoading, isFetching } = useQuery({
    queryKey: ["admission-programs"],
    queryFn: fetchPrograms,
  });

  if (isLoading || isFetching) {
    return <div className="program-loading"><SkeletonGroup count={6} wrapperClassName="grid gap-[3rem] !grid-cols-1" className="w-full h-[10rem]" /></div>;
  }

  if (!programs || programs.length === 0) {
    return <div className="program-empty">No programs available.</div>;
  }

  // Group programs by type
  const grouped = programs.reduce((acc: any, program: any) => {
    const type = program.type || "other";
    if (!acc[type]) acc[type] = [];
    acc[type].push(program);
    return acc;
  }, {});


  const formatTypeLabel = (type: string) =>
    type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  // Preferred display order
  const typeOrder = ["under-graduate", "post-graduate"];
  const orderedTypes = [
    ...typeOrder.filter((t) => grouped[t]),
    ...Object.keys(grouped).filter((t) => !typeOrder.includes(t)),
  ];

  return (
    <>
      {orderedTypes.map((type) => (
        <div className="program-list" key={type}>
          <h5>{formatTypeLabel(type)}</h5>

          {grouped[type].map((program: any) => (
            <div className="program-box" key={program.slug}>
              <div className="program-text">
                <h6>
                  <a href={`/programs/${program.slug}`}>{program.name}</a>
                </h6>
              </div>
              <div className="program-right">
                <div className="duration">
                  <p>Duration</p>
                  <span>
                    {program.duration}{" "}
                    {program.duration === 1 ? "year" : "years"}
                  </span>
                </div>
                <div className="affiliation">
                  <p>Affiliation</p>
                  <span>{program.affiliation}</span>
                </div>
                <div className="apply-btn">
                  <a href={APPLY_NOW}>Apply Now</a>
                </div>
                <div className="program-btn">
                  <Link href={`/program/${program.slug}`}>
                    <span>
                      <img
                        src="/images/icons/right-arrow.svg"
                        alt="GEU"
                      />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}