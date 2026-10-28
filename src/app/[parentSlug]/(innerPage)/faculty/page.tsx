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
import { notFound } from "next/navigation";
import { getPageSEO } from "@/src/lib/seo";
import { BASE_URL } from "@/src/config/config";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";

interface SearchParams {
  page?: string;
  grid_page?: string;
  table_page?: string;
  department?: string;
  filter?: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ parentSlug: string }>;
}) {
  const { parentSlug } = await params;
  return await getPageSEO(`${parentSlug}/faculty`);
}

export default async function FacultyPage({
  params,
  searchParams,
}: {
  params: Promise<{ parentSlug: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { parentSlug } = await params;
  const currentSlug = "faculty";
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

  const [{ data, error }, { data: deptData }, { data: CMSData }, seoData] =
    await Promise.all([
      apiFetch(`${currentSlug}?${facultyQuery}`),
      apiFetch("department-faculty-list"),
      apiFetch(`cms/faculty`),
      getPageSEO(`${parentSlug}/faculty`),
    ]);

  if (error) notFound();

  const departments: { name: string; slug: string; image: string }[] =
    deptData?.departments || [];

  const facultyType = data?.type;

  const combinedHtml = Object.values(CMSData?.data?.sections ?? {}).join("");

  const globalSchemaArgs = {
    canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
    pageTitle: seoData?.title || "",
    metaDescription: seoData?.description || "",
    primaryImageUrl: "",
    datePublishedIso: data?.created_at || "",
    dateModifiedIso: data?.updated_at || "",
    languageTag: "en-IN",
    currentPageSlug: "",
    currentPageName: data?.page_title || "",
  };

  const globalSchema = buildGlobalSchema(globalSchemaArgs);

  return (
    <>
      {seoData.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoData.schema),
          }}
        />
      )}
      {globalSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      )}

      <InnerPageLayoutWrapper
        slug={currentSlug}
        pathname={`/${parentSlug}/${currentSlug}`}
        tabs={null}
        mainClass="happenings_page"
        showTabs={false}
      >
        <ReactParserDynamic
          html={combinedHtml}
          pageName={
            seoData?.title
          }
        />

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

            {facultyType == "Grid"
              ? data?.data?.data.length > 0 && (
                  <FacultyList
                    data={data?.data}
                    currentPage={currentPage}
                    pageKey="page"
                  />
                )
              : data?.data?.data.length > 0 && (
                  <FacultyTabular
                    data={data?.data}
                    currentPage={currentPage}
                    pageKey="page"
                  />
                )}

            {/* Grid section with its own pagination */}

            {/* Table section with its own pagination */}
          </div>
        </section>
      </InnerPageLayoutWrapper>
    </>
  );
}
