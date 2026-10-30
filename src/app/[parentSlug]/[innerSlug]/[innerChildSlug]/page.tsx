import { apiFetch } from "@/src/lib/api";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { getPageSEO } from "@/src/lib/seo";
import PageHeader from "@/src/components/layout/header/PageHeader";
import { notFound } from "next/navigation";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import { BASE_URL } from "@/src/config/config";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ parentSlug: string; innerSlug: string; innerChildSlug: string }>;
}) {
  const { innerChildSlug, parentSlug, innerSlug } = await params;
  return await getPageSEO(`${parentSlug}/${innerSlug}/${innerChildSlug}`);
}

export default async function DynamicSlugPage({
  params,
  searchParams,
}: {
  params: Promise<{
    parentSlug: string;
    innerSlug: string;
    innerChildSlug: string;
  }>;
  searchParams?: any;
}) {
  const { parentSlug, innerSlug, innerChildSlug } = await params;
  const resolvedSearchParams = await searchParams;
  const [{ data, error }, seoData] = await Promise.all([
    apiFetch(`cms/${innerChildSlug}`),
    getPageSEO(`${parentSlug}/${innerSlug}/${innerChildSlug}`),
  ]);

  if (error || !data?.status) {
    notFound();
  }

  const combinedHtml = Object.values(data?.data?.sections ?? {}).join("");
  const currentSlug = `${parentSlug}/${innerSlug}/${innerChildSlug}`;
  const pageData = data?.data;
  const expectedPath = pageData?.full_url.replace(/^\/+|\/+$/g, "");
  if(expectedPath !== currentSlug){
    notFound();
  }

  const globalSchemaArgs = {
    canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
    pageTitle: seoData?.title || "",
    metaDescription: seoData?.description || "",
    primaryImageUrl:'',
    datePublishedIso: pageData?.created_at || "",
    dateModifiedIso: pageData?.updated_at || "",
    languageTag: "en-IN",
    currentPageName: pageData?.page_title || "",
    currentPageSlug: `${BASE_URL}${parentSlug}/${innerSlug}/${innerChildSlug}`,
    // parentMenus:pageData?.parent_menus || [],
    parentMenus: [
      {
        title: parentSlug,
        url: parentSlug,
      },
      {
        title: innerSlug,
        url: innerSlug,
      },
    ],
  };
  

const globalSchema = buildGlobalSchema(globalSchemaArgs);

  console.log('seoData',seoData);

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
        
      <PageHeader
        pathname={`/${parentSlug}/${innerSlug}/${innerChildSlug}`}
        data={data?.data}
        slug={innerChildSlug}
      />
      {data.data.sections.length == 0 ? (
        <ComingSoon />
      ) : (
        <ReactParserDynamic
          html={combinedHtml}
          params={params}
          searchParams={resolvedSearchParams}
          pageName={seoData.title}
        />
      )}
    </>
  );
}
