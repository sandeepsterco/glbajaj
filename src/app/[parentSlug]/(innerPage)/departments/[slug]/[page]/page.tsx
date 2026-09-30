import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { getPageSEO } from "@/src/lib/seo";

export default async function DepartmentInnerPage({
    params,
  }: {
    params: Promise<{ slug: string; page: string; parentSlug:string; }>;
  }){
    const { slug, page, parentSlug } = await params;
    const [{ data, error }, seoData] = await Promise.all([
      apiFetch(`department/${slug}/${page}`),
      getPageSEO(`${parentSlug}/departments/${slug}/${page}`),
    ]) ;

    const combinedHtml = data?.data?.cms
    ? Object.values(data?.data?.cms).join("")
    : "";

    const pageData = data?.data;

    const globalSchemaArgs = {
      canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
      pageTitle: seoData?.title || "",
      metaDescription: seoData?.description || "",
      primaryImageUrl:pageData?.image || '',
      datePublishedIso: pageData?.created_at || "",
      dateModifiedIso: pageData?.updated_at || "",
      languageTag: "en-IN",
      currentPageName: pageData?.page_title || "",
      currentPageSlug: `${BASE_URL}${parentSlug}/departments/${pageData?.current_page_slug}`,
      parentMenus: [
          {
            title: 'Academics',
            url: `academics`,
          },
          {
            title: 'Departments',
            url: `departments`,
          },
          {
            title: pageData?.department_name,
            url: pageData?.department_slug,
          },
        {
          title: pageData?.page_title,
          url: `${page}`,
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
      <ReactParserDynamic html={combinedHtml} />
      </>
    );
    
}