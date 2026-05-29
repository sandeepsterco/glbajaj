"use client"
import Link from "next/link";
import { apiFetch } from "@/src/lib/api";
import PaginationWrapper from "../common/pagination/PaginationWrapper";
import { BASE_URL } from "@/src/config/config";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface Program {
  name: string;
  duration: string;
  affiliation: string | null;
  type: string;
  slug: string;
}

interface ProgramGroup {
  name: string;
  slug: string;
  programs: Program[];
}

interface ProgramsData {
  current_page: number;
  data: ProgramGroup[];
  last_page: number;
  first_page_url: string;
  last_page_url: string;
  from: number;
  links: unknown[];
}

async function fetchPrograms(type: "under-graduate" | "post-graduate" | "all", page = 1) {
  const { data, error } = await apiFetch(
    `programs?type=${type === "all" ? "" : type}&page=${page}`
  );
  if (error || !data) return null;
  return data as { programs: ProgramsData };
}

function ProgramBox({ program }: { program: Program }) {
  const cleanName = program.name.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  return (
    <div className="program-box">
      <div className="program-text">
        <h6>
          <Link href={`/program/${program.slug}`}>{cleanName}</Link>
        </h6>
      </div>
      <div className="program-right">
        <div className="duration">
          <p>Duration</p>
          <span>{program.duration} years</span>
        </div>
        <div className="affiliation">
          <p>Affiliation</p>
          <span>{program.affiliation || "-"}</span>
        </div>
        <div className="apply-btn">
          <a href="#">Apply Now</a>
        </div>
        <div className="program-btn">
          <Link href={`/program/${program.slug}`}>
            <span>
              <img src="/images/icons/right-arrow.svg" alt="arrow" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function buildUrl(type: string, page: number) {
  const params = new URLSearchParams();
  params.set("type", type);
  params.set("page", String(page));
  return `${BASE_URL}programs-offered?${params.toString()}`;
}

function ProgramGroupSection({ group }: { group: ProgramGroup }) {
  if (!group.programs || group.programs.length === 0) return null;

  return (
    <div className="program-list">
      <h5>{group.name}</h5>
      {group.programs.map((program) => (
        <ProgramBox key={program.slug} program={program} />
      ))}
    </div>
  );
}

export default function ProgramList() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramsType = (searchParams.get("type") as "under-graduate" | "post-graduate" | "all") || "all";
  const page = Number(searchParams.get("page")) || 1;

  const [programsData, setProgramsData] = useState<ProgramsData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Fetching:", { paramsType, page }); // check these are updating
    setLoading(true);
    fetchPrograms(paramsType, page).then((res) => {
      console.log("Response:", res);
      setProgramsData(res?.programs ?? null);
      setLoading(false);
    });
  }, [paramsType, page]);

  return (
    <section className="program-sec">
      <div className="container25">
        <div className="col-lg-12">
          <div className="cus-tab">
            <div className="tabbed-content">
              <nav className="tabs">
                <ul>
                  {[
                    { label: "All Courses", type: "all" },
                    { label: "Undergraduate Courses", type: "under-graduate" },
                    { label: "Postgraduate Courses", type: "post-graduate" },
                  ].map(({ label, type }) => (
                    <li key={type}>
                      <Link
                        href={`${BASE_URL}programs-offered?type=${type}&page=1`}
                        className={paramsType === type ? "active" : ""}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="item">
                <div className="item-content">
                  {loading ? (
                    <p>Loading programs...</p>
                  ) : programsData && programsData.data.length > 0 ? (
                    programsData.data.map((group) => (
                      <ProgramGroupSection key={group.slug} group={group} />
                    ))
                  ) : (
                    <p>No programs found.</p>
                  )}

                  {programsData && (
                    <PaginationWrapper
                    currentPage={programsData.current_page || 1}
                    totalPages={programsData.last_page || 1}
                  />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}