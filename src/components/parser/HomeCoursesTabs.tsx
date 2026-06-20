"use client"
import Link from "next/link";
import { apiFetch } from "@/src/lib/api";
import { APPLY_NOW } from "@/src/config/config";
import { useEffect, useState, useCallback } from "react";
import { SkeletonGroup } from "../ui/Skeleton";
import '@/src/styles/program.css'

interface Program {
  name: string;
  duration: string;
  affiliation: string | null;
  type: string | null;
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

const TABS = [
  { label: "Under Graduate Courses", type: "under-graduate" },
  { label: "Post Graduate Courses", type: "post-graduate" },
] as const;

type TabType = (typeof TABS)[number]["type"];

async function fetchPrograms(type: TabType, page = 1) {
  const { data, error } = await apiFetch(`programs?type=${type}&page=${page}`);
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
        {/* <div className="duration">
          <p>Duration</p>
          <span>{program.duration} years</span>
        </div> */}
        {/* <div className="affiliation">
          <p>Affiliation</p>
          <span>{program.affiliation || "-"}</span>
        </div> */}
        {/* <div className="apply-btn">
          <Link href={APPLY_NOW ?? "/apply-now"}>Apply Now</Link>
        </div> */}
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

function ProgramGroupSection({ group }: { group: ProgramGroup}) {
  return (
    // <div className="program-list">
    <div className="single_program">
      {/* <h5>{group.name}</h5> */}
      {group.programs && group.programs.length > 0 ? (
        group.programs.map((program) => (
          <ProgramBox key={program.slug} program={program} />
        ))
      ) : (
        <div className="program-box">
          <p className="no-programs">No programs available.</p>
        </div>
      )}
    </div>
  );
}

export default function HomeCoursesTabs() {
  const [activeTab, setActiveTab] = useState<TabType>("under-graduate");
  const [programsData, setProgramsData] = useState<ProgramsData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchPrograms(activeTab, 1).then((res) => {
      if (!active) return;
      setProgramsData(res?.programs ?? null);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [activeTab]);

  const handleTabClick = useCallback((type: TabType) => {
    setActiveTab(type);
  }, []);

  return (
    
      <div className="tabbed-content homepage">
          <div className="courses_links">
            {TABS.map(({ label, type }) => (
              <li key={type}>
                <button
                  type="button"
                  onClick={() => handleTabClick(type)}
                  className={`course_link ${activeTab === type ? "active" : ""}`}
                >
                  {label}
                </button>
              </li>
            ))}
          </div>

            {/* <div className="item-content"> */}
              {loading ? (
                <div className="program-list">
                  <SkeletonGroup
                    count={4}
                    wrapperClassName="!block gap-[3rem]"
                    className="w-full h-[8rem] !mb-[1.5rem]"
                  />
                </div>
              ) : programsData && programsData.data.length > 0 ? (
                  <div className="program-list">
                    {programsData.data.map((group) => (
                      <ProgramGroupSection key={group.slug} group={group} />
                    ))}
                  </div>
              ) : (
                <p>No programs found.</p>
              )}
            {/* </div> */}
      </div>
  );
}