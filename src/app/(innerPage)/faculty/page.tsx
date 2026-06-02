import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import FacultyList from "@/src/components/faculty/FacultyList";
import { apiFetch } from "@/src/lib/api";
import InnerPageLayoutWrapper from "../../layout/InnerPageLayoutWrapper";
import { getSlug } from "@/src/lib/getSlug";
import FacultyTabular from "@/src/components/faculty/FacultyTabular";
import FacultyFilters from "@/src/components/faculty/FacultyFilters";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";

interface SearchParams {
  page?: string;
  grid_page?: string;
  table_page?: string;
  department?: string;
  filter?: string;
}

export default async function FacultyPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const gridPage = Number(params.grid_page) || 1;
  const tablePage = Number(params.table_page) || 1;
  const department = params.department || "";
  const filter = params.filter || "a-z";

  const slug = await getSlug();

  // Build query string for faculty API
  const facultyQuery = new URLSearchParams({
    grid_page: String(gridPage),
    table_page: String(tablePage),
    ...(department && { department }),
    filter,
  }).toString();

  const [{ data, error }, { data: deptData }] = await Promise.all([
    apiFetch(`faculty?${facultyQuery}`),
    apiFetch("departments"),
  ]);

  if (error) {
    return (
      <ApiErrorFallback heading="Couldn't load Faculty" message={error} />
    );
  }

  const departments: { name: string; slug: string; image: string }[] =
    deptData?.data || [];

  const facultyType = data?.type;

  return (
    <InnerPageLayoutWrapper
      slug={slug}
      tabs={null}
      mainClass="happenings_page"
      showTabs={false}
    >
      <section className="faculty_section">
        <div className="container25">
          {/* Filters — client component handles URL updates */}
          <FacultyFilters
            departments={departments}
            currentDepartment={department}
            currentFilter={filter}
          />

          {data?.grid?.data.length <= 0 && data?.table?.data.length <= 0 && (
            <div className="faculty_grid">
                <h4>No Faculty Found!</h4>
            </div>
          )}

          {facultyType == 'Grid' ? (
            data?.data?.data.length > 0 && (
              <FacultyList
                  data={data?.data}
                  currentPage={gridPage}
                  pageKey="grid_page"
              />
            )
          ) : (
            data?.data?.data.length > 0 && (
              <FacultyTabular
                  data={data?.data}
                  currentPage={tablePage}
                  pageKey="table_page"
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