import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import FacultyList from "@/src/components/faculty/FacultyList";
import { apiFetch } from "@/src/lib/api";
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import FacultyTabular from "@/src/components/faculty/FacultyTabular";
import FacultyFilters from "@/src/components/faculty/FacultyFilters";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";

interface SearchParams {
  page?: string;
  grid_page?: string;
  table_page?: string;
  department?: string;
  filter?: string;
}

export default async function FacultyPage({
  params,
  searchParams,
}: {
  params: Promise<{ parentSlug: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { parentSlug } = await params;
  const sp = await searchParams;
  const currentPage = Number(sp.page) || 1;
  const department = sp.department || "";
  const filter = sp.filter || "a-z";
  // Build query string for faculty API
  const facultyQuery = new URLSearchParams({
    page: String(currentPage),
    ...(department && { department }),
    filter,
  }).toString();

  const [{ data, error }, { data: deptData }, {data:CMSData}] = await Promise.all([
    apiFetch(`faculty?${facultyQuery}`),
    apiFetch("department-faculty-list"),
    apiFetch(`cms/${parentSlug}`),
  ]);

  if (error) {
    return (
      <ApiErrorFallback heading="Couldn't load Faculty" message={error} />
    );
  }

  const departments: { name: string; slug: string; image: string }[] =
    deptData?.departments || [];

  const facultyType = data?.type;

  const combinedHtml = Object.values(CMSData?.data?.sections ?? {}).join("");

  return (
    <InnerPageLayoutWrapper
      slug={parentSlug}
      pathname={`/${parentSlug}/faculty`}
      tabs={null}
      mainClass="happenings_page"
      showTabs={false}
    >
      <ReactParserDynamic html={combinedHtml} />

      <section className="faculty_section">
        <div className="container25">
          {/* Filters — client component handles URL updates */}
          <FacultyFilters
            departments={departments}
            currentDepartment={department}
            currentFilter={filter}
          />

          {data?.data?.data.length <= 0 && (
            <div className="faculty_grid">
                <h4>No Faculty Found!</h4>
            </div>
          )}

          {facultyType == 'Grid' ? (
            data?.data?.data.length > 0 && (
              <FacultyList
                  data={data?.data}
                  currentPage={currentPage}
                  pageKey="page"
              />
            )
          ) : (
            data?.data?.data.length > 0 && (
              <FacultyTabular
                  data={data?.data}
                  currentPage={currentPage}
                  pageKey="page"
              />
            )
          )}

          {/* Grid section with its own pagination */}
          
          

          {/* Table section with its own pagination */}
          
          
        </div>
      </section>
    </InnerPageLayoutWrapper>
  );
}