import Link from "next/link";
import { apiFetch } from "@/src/lib/api";
import PaginationWrapper from "../common/pagination/PaginationWrapper";

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

interface ProgramsResponse {
  programs: {
    current_page: number;
    data: ProgramGroup[];
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    from: number;
    links: unknown[];
  };
}

interface ProgramListProps {
  searchParams?: { page?: string };
}

async function fetchPrograms(type: "under-graduate" | "post-graduate", page = 1) {
  const { data, error } = await apiFetch(`programs?type=${type}&page=${page}`, {
    cache: "no-store",
  });
  if (error || !data) return null;
  return data as ProgramsResponse;
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
            <span>{program.affiliation || '-'}</span>
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

export default async function ProgramList({ searchParams }: ProgramListProps) {
  const page = Number(searchParams?.page) || 1;

  const [ugData, pgData] = await Promise.all([
    fetchPrograms("under-graduate", page),
    fetchPrograms("post-graduate", page),
  ]);

  const ugPrograms = ugData?.programs;
  const pgPrograms = pgData?.programs;

  return (
    <section className="program-sec">
      <div className="container25">
        <div className="col-lg-12">
          <div className="cus-tab">
            <div className="tabbed-content">
              <nav className="tabs">
                <ul>
                  <li>
                    <a href="#tab1" className="active">
                      Undergraduate Courses
                    </a>
                  </li>
                  <li>
                    <a href="#tab2">Postgraduate Courses</a>
                  </li>
                </ul>
              </nav>

              {/* Undergraduate Tab */}
              <div id="tab1" className="item active" data-title="Tab 1">
                <div className="item-content">
                  {ugPrograms?.data && ugPrograms.data.length > 0 ? (
                    ugPrograms.data.map((group) => (
                      <ProgramGroupSection key={group.slug} group={group} />
                    ))
                  ) : (
                    <p>No undergraduate programs found.</p>
                  )}

                  {ugPrograms && (
                    <PaginationWrapper
                      currentPage={ugPrograms.current_page || 1}
                      totalPages={ugPrograms.last_page || 1}
                    />
                  )}
                </div>
              </div>

              {/* Postgraduate Tab */}
              <div id="tab2" className="item" data-title="Tab 2">
                <div className="item-content">
                  {pgPrograms?.data && pgPrograms.data.length > 0 ? (
                    pgPrograms.data.map((group) => (
                      <ProgramGroupSection key={group.slug} group={group} />
                    ))
                  ) : (
                    <p>No postgraduate programs found.</p>
                  )}

                  {pgPrograms && (
                    <PaginationWrapper
                      currentPage={pgPrograms.current_page || 1}
                      totalPages={pgPrograms.last_page || 1}
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