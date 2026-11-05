import { apiFetch } from "@/src/lib/api";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import PageHeader from "@/src/components/layout/header/PageHeader";
import { getPageSEO } from "@/src/lib/seo";
import { notFound } from "next/navigation";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { BASE_URL } from "@/src/config/config";

const PARENT_SLUG = "research-innovation";

export default async function ConferencesListing({
  page,
  searchParams = {},
}: {
  page: number;
  searchParams?: Record<string, any>;
}) {
  const [{ data, error }, seoData] = await Promise.all([
    apiFetch(`cms/conferences`),
    getPageSEO(`${PARENT_SLUG}/conferences`),
  ]);

  if (error || !data?.status) notFound();

  const pageData = data?.data;

  const globalSchema = buildGlobalSchema({
    canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
    pageTitle: seoData?.title || "",
    metaDescription: seoData?.description || "",
    primaryImageUrl: "",
    datePublishedIso: pageData?.created_at || "",
    dateModifiedIso: pageData?.updated_at || "",
    languageTag: "en-IN",
    currentPageName: pageData?.page_title || "",
    parentMenus: pageData?.parent_menus || [],
    currentPageSlug: pageData?.current_page_slug,
  });

  const combinedHtml = Object.values(pageData?.sections ?? {}).join("");

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
        <PageHeader pathname={`/${PARENT_SLUG}/conferences`} data={pageData} slug={"conferences"} />
        {pageData?.sections?.length == 0 ? (
          <ComingSoon />
        ) : (
          <ReactParserDynamic
            html={combinedHtml}
            params={{ parentSlug: PARENT_SLUG }}
            searchParams={{ ...searchParams, page: String(page) }}
            pageName={seoData?.title}
          />
        )}
      </div>
    </>
  );
}