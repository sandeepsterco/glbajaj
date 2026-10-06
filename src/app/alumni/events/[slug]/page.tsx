import AlumniEventsDetail from "@/src/components/alumni-events/detail";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { getPageSEO } from "@/src/lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({params}:{params: Promise<{ slug: string }>}) {
  const { slug } = await params;
  return await getPageSEO(`alumni/events/${slug}`);
}


export default async function AlumniEventsDetailPage({
  params,
}: {
  params: any;
}) {
  const { slug } = await params;

  const [{ data, error }, { data: CmsData }, seoData] = await Promise.all([
    apiFetch(`alumni-events/${slug}`),
    apiFetch(`cms/alumni-events-meets`),
    getPageSEO(`alumni/events/${slug}`),
  ]);

  if (error) notFound();

  const pageData = CmsData?.data;
  const modularData = data?.alumni_event_details?.data;

  const globalSchemaArgs = {
    canonicalUrl: seoData?.alternates?.canonical || BASE_URL || "",
    pageTitle: seoData?.title || "",
    metaDescription: seoData?.description || "",
    primaryImageUrl: modularData?.image || "",
    datePublishedIso: pageData?.created_at || "",
    dateModifiedIso: pageData?.updated_at || "",
    languageTag: "en-IN",
    currentPageSlug: `${BASE_URL}alumni/events/${slug}`,
    currentPageName: modularData?.title || "",
    parentMenus: [
      {
        title: "Alumni",
        url: "alumni",
      },
      {
        title: "Events",
        url: "events",
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
      <AlumniEventsDetail data={data?.alumni_event_details} />
    </>
  );
}
