import { apiFetch } from "@/src/lib/api";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { getPageSEO } from "@/src/lib/seo";
import PageHeader from "@/src/components/layout/header/PageHeader";
import { notFound } from "next/navigation";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { BASE_URL } from "@/src/config/config";

export async function generateMetadata() {
  return await getPageSEO(`alumni/achievements`);
}

export default async function DynamicSlugPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const requestedPage = Number(resolvedSearchParams?.page);
  const alumniPage =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const [{ data, error }, seoData, { data: alumniData }] = await Promise.all([
    apiFetch(`cms/achievements`),
    getPageSEO(`alumni/achievements`),
    apiFetch(`alumni-achivement?page=${alumniPage}`),
  ]);

  if (error || !data?.status) {
    notFound();
  }

  const pageData = data?.data;

  const globalSchemaArgs = {
    canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
    pageTitle: seoData?.title || "",
    metaDescription: seoData?.description || "",
    primaryImageUrl:"",
    datePublishedIso: pageData?.created_at || "",
    dateModifiedIso: pageData?.updated_at || "",
    languageTag: "en-IN",
    currentPageName: pageData?.page_title || "",
    currentPageSlug: `${BASE_URL}alumni/achievements`,
    parentMenus: [
      {
        title: "Alumni",
        url: "alumni",
      },
    ],
  };

  const combinedHtml = Object.values(data?.data?.sections ?? {}).join("");

  const globalSchema = buildGlobalSchema(globalSchemaArgs);

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
        <PageHeader
          pathname={`/alumni/achievements`}
          data={data?.data}
          slug={"achievements"}
        />
        {data?.data?.sections?.length == 0 ? (
          <ComingSoon />
        ) : (
          <ReactParserDynamic
            html={combinedHtml}
            searchParams={resolvedSearchParams}
            pageName={seoData.title}
            data={alumniData}
          />
        )}
      </div>
    </>
  );
}
