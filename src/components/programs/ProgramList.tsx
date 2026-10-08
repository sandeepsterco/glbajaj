"use client"
import Link from "next/link";
import { apiFetch } from "@/src/lib/api";
import PaginationWrapper from "../common/pagination/PaginationWrapper";
import { APPLY_NOW, BASE_URL } from "@/src/config/config";
import { useEffect, useState, useCallback } from "react";
import ProgramApplyModal from "./ProgramApplyModal";
import { SkeletonGroup } from "../ui/Skeleton";

type ProgramType = "under-graduate" | "post-graduate" | "all";

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

async function fetchPrograms(type: ProgramType, page = 1) {
  const params = new URLSearchParams({
    type: type === "all" ? "" : type,
    page: String(page),
  });
  const { data, error } = await apiFetch(
    `programs?${params.toString()}`,
    { method: "GET" }
  );
  if (error || !data) return null;
  return data as { programs: ProgramsData };
}

function ProgramBox({
  parentSlug,
  currentSlug,
  program,
  departmentSlug,
  onApply,
}: {
  parentSlug:string;
  currentSlug:string;
  program: Program;
  departmentSlug: string;
  onApply: (departmentSlug: string) => void;
}) {
  const cleanName = program.name.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  return (
    <div className="program-box">
      <div className="program-text">
        <h6>
          <Link href={`${BASE_URL}${parentSlug}/${currentSlug}/${program.slug}`}>{cleanName}</Link>
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
          <Link href={APPLY_NOW ?? '/admission/apply'}>
            Apply Now
          </Link>
        </div>
        <div className="program-btn">
          <Link href={`${BASE_URL}${parentSlug}/${currentSlug}/${program.slug}`}>
            <span>
              <img src="/images/icons/right-arrow.svg" alt="arrow" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProgramGroupSection({
  parentSlug,
  currentSlug,
  group,
  onApply,
}: {
  parentSlug:string;
  currentSlug:string;
  group: ProgramGroup;
  onApply: (departmentSlug: string) => void;
}) {
  return (
    <div className="program-list">
      <h5>{group.name}</h5>
      {group.programs && group.programs.length > 0 ? (
        group.programs.map((program) => (
          <ProgramBox
          parentSlug={parentSlug}
          currentSlug={currentSlug}
            key={program.slug}
            program={program}
            departmentSlug={group.slug}
            onApply={onApply}
          />
        ))
      ) : (
        <div className="program-box">
          <p className="no-programs">No programs available.</p>
        </div>
      )}
    </div>
  );
}

export default function ProgramList({parentSlug, currentSlug, activeType="all"}:{parentSlug:string; currentSlug:string; activeType?:ProgramType;}) {
  const [paramsType, setParamsType] = useState<ProgramType>(activeType);
  const [page, setPage] = useState(1);
  const [programsData, setProgramsData] = useState<ProgramsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [applyModal, setApplyModal] = useState<{
    open: boolean;
    departmentSlug?: string;
  }>({ open: false });

  const openApplyModal = useCallback((departmentSlug: string) => {
    setApplyModal({ open: true, departmentSlug });
  }, []);

  const closeApplyModal = useCallback(() => {
    setApplyModal({ open: false });
  }, []);

  const tabs: { label: string; type: ProgramType }[] = [
    { label: "All Courses", type: "all" },
    { label: "Undergraduate Courses", type: "under-graduate" },
    { label: "Postgraduate Courses", type: "post-graduate" },
  ];

  useEffect(() => {
    setLoading(true);
    fetchPrograms(paramsType, page).then((res) => {
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
                  {tabs.map(({ label, type }) => (
                    <li key={type}>
                      <Link
                        className={paramsType === type ? "active" : ""}
                        href={`${BASE_URL}${parentSlug}/${currentSlug}/${type === "all" ? "" : type}`}
                        // onClick={() => {
                        //   setParamsType(type);
                        //   setPage(1);
                        // }}
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
                    <SkeletonGroup count={6} wrapperClassName="!block gap-[3rem]" className="w-full h-[25rem] !mb-[3rem]" />
                  ) : programsData &&  programsData.data.length > 0 ? (
                    programsData.data.map((group) => {
                      return <ProgramGroupSection
                      parentSlug={parentSlug}
                      currentSlug={currentSlug}
                        key={group.slug}
                        group={group}
                        onApply={openApplyModal}
                      />
                    })
                  ) : (
                    <p>No programs found.</p>
                  )}

                  {programsData && (
                    <PaginationWrapper
                    currentPage={programsData.current_page || 1}
                    totalPages={programsData.last_page || 1}
                    onPageChange={setPage}
                  />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <ProgramApplyModal
        open={applyModal.open}
        departmentSlug={applyModal.departmentSlug}
        onClose={closeApplyModal}
      /> */}
    </section>
  );
}