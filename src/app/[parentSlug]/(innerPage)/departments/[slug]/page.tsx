import { apiFetch } from "@/src/lib/api";
import PageHeader from "@/src/components/layout/header/PageHeader";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";

// import '@/src/styles/fancybox.css';
import "@/src/styles/inner.css";
// import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { getPageSEO } from "@/src/lib/seo";
import { notFound } from "next/navigation";
import { buildDepartmentSchema } from "@/src/lib/schema/departmentSchema";
import { BASE_URL } from "@/src/config/config";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
// import "@/src/styles/parser.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return await getPageSEO(`department/${slug}`);
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ slug: string; parentSlug:string; }>;
}) {
  const { slug, parentSlug } = await params;

  const [{ data, error },{ data: CmsData }, seoData] = await Promise.all([
    apiFetch(`department/${slug}/home`),
    apiFetch(`cms/departments`),
    getPageSEO(`${parentSlug}/departments/${slug}`),
  ]);

  if (error) notFound();

  const combinedHtml = data?.data?.cms
    ? Object.values(data?.data?.cms).join("")
    : "";

    const pageData = CmsData?.data;
    const modularData = data?.data;

    const departmentSchemaArgs = {
      departmentUrl:`${BASE_URL}${parentSlug}/departments/${slug}` || '',
      departmentPageTitle:seoData.title || '',
      metaDescription:seoData.description || '',
      visibleDepartmentDescription:seoData.description || '',
      departmentName:modularData.department_name || '',
      staticSegments:[
        {
          name:"Academics",
          slug:parentSlug
        },
        {
          name:"Departments",
          slug:'departments',
        },
      ],
      departmentSlug:pageData.department_slug || '',
    };

  const departmentSchema = buildDepartmentSchema(departmentSchemaArgs);

  const globalSchemaArgs = {
    canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
    pageTitle: seoData?.title || "",
    metaDescription: seoData?.description || "",
    primaryImageUrl:modularData?.image || '',
    datePublishedIso: pageData?.created_at || "",
    dateModifiedIso: pageData?.updated_at || "",
    languageTag: "en-IN",
    currentPageName: modularData?.department_name || "",
    currentPageSlug: `${BASE_URL}${parentSlug}/departments/${modularData?.department_slug}`,
    parentMenus: [
        ...pageData?.parent_menus,
        {
          title: 'Academics',
          url: `academics`,
        },
      {
        title: pageData?.page_title,
        url: pageData?.current_page_slug,
      },
    ],
};

const globalSchema = buildGlobalSchema(globalSchemaArgs);

  return (
    <>
      {seoData?.schema && (
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
      {departmentSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(departmentSchema) }}
        />
      )}
      <div className="happenings_page">
        {data?.data?.tabs && <PageHeader data={data.data} parentSlug={parentSlug} slug={slug} pathname={`${parentSlug}/department/${slug}`} />}

        {data?.data?.cms?.length == 0 ? (
          <ComingSoon />
        ) : (
          <ReactParserDynamic html={combinedHtml} params={{ slug, parentSlug }} data={data?.data} />
        )}
      </div>
    </>
  );
}
