import { apiFetch } from "@/src/lib/api";
import NotFound from "@/src/app/not-found";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { getPageSEO } from "@/src/lib/seo";
import PageHeader from "@/src/components/layout/header/PageHeader";
import { notFound } from "next/navigation";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { BASE_URL } from "@/src/config/config";
import { buildEventDetailSchema } from "@/src/lib/schema/eventDetailSchema";

export async function generateMetadata() {
  return await getPageSEO('alumni/events');
}

export default async function DynamicSlugPage({
  searchParams
}: {
  searchParams?:any
}) {
  const resolvedSearchParams = await searchParams;
  const [{data, error}, seoData, {data: eventsData}] = await Promise.all([
    apiFetch(`cms/alumni-events-meets`),
    getPageSEO('alumni/events'),
    apiFetch(`alumni-events`),
  ]);

  if (error || !data?.status) {
    notFound();
  }

  const pageData = data?.data;

  const globalSchemaArgs = {
    canonicalUrl:seoData?.alternates?.canonical || BASE_URL || '',
    pageTitle:seoData?.title || '',
    metaDescription:seoData?.description || '',
    primaryImageUrl:"",
    datePublishedIso:pageData?.created_at || '',
    dateModifiedIso:pageData?.updated_at || '',
    languageTag:'en-IN',
    currentPageName:pageData?.page_title || '',
    // parentMenus:pageData?.parent_menus || [],
    currentPageSlug: `${BASE_URL}alumni/events`,
    parentMenus: [
      {
        title: "Alumni",
        url: "alumni",
      },
    ],
  };

  const combinedHtml = Object.values(data?.data?.sections ?? {}).join("");

  const globalSchema = buildGlobalSchema(globalSchemaArgs);

  pageData.parent_menus = [
    {
      title: "Alumni",
      url: "alumni",
    },
  ];

  let eventSchema;

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
      {eventSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      )}
      {globalSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      )}
      <div className="happenings_page">
      <PageHeader pathname={`/alumni/alumni-events-meets`} data={pageData} slug={'alumni-events-meets'} parentSlug="alumni" />
      {data?.data?.sections?.length == 0 ? <ComingSoon /> : <ReactParserDynamic html={combinedHtml} params={'alumni-events-meets'} searchParams={resolvedSearchParams}  pageName={seoData.title} data={eventsData} />}
      </div>
    </>
  );
}
