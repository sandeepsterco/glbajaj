import { apiFetch } from "@/src/lib/api";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import PageHeader from "@/src/components/layout/header/PageHeader";
import { getPageSEO } from "@/src/lib/seo";
import { notFound } from "next/navigation";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { BASE_URL } from "@/src/config/config";

export default async function AchievementsListing({
  page,
  searchParams = {},
}: {
  page: number;
  searchParams?: Record<string, any>;
}) {
  const [{ data, error }, seoData] = await Promise.all([
    apiFetch(`cms/glb-achievements`),
    getPageSEO("why-glbitm/achievements"),
  ]);

  if (error || !data?.status) notFound();

  const pageData = data?.data;

  const globalSchema = buildGlobalSchema({
    canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
    pageTitle: seoData?.title || "",
    metaDescription: seoData?.description || "",
    primaryImageUrl:
      "https://project-demo.in/glbitm/assets/img/modules/1/module_1789649006_6aabe06e9b5be.webp",
    datePublishedIso: pageData?.created_at || "",
    dateModifiedIso: pageData?.updated_at || "",
    languageTag: "en-IN",
    currentPageName: pageData?.page_title || "",
    parentMenus: pageData?.parent_menus || [],
    currentPageSlug: pageData?.current_page_slug,
  });

  const combinedHtml = Object.values(pageData?.sections ?? {}).join("");

  // the parsed list reads the page number from searchParams
  const effectiveParams = { ...searchParams, page: String(page) };

  return (
    <>
      {seoData?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seoData.schema) }}
        />
      )}
      {globalSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      )}
      <div className="happenings_page">
        <PageHeader pathname={`/why-glbitm/achievements`} data={pageData} slug={"achievements"} />
        {pageData?.sections?.length == 0 ? (
          <ComingSoon />
        ) : (
          <ReactParserDynamic html={combinedHtml} searchParams={effectiveParams} pageName={seoData.title} />
        )}
      </div>
    </>
  );
}