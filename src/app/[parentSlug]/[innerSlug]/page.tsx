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
import { buildFacilitySchema } from "@/src/lib/schema/facilitiesSchema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string, innerSlug:string }>;
}) {
  const { innerSlug } = await params;
  return await getPageSEO(innerSlug);
}

export default async function DynamicSlugPage({
  params,
  searchParams
}: {
  params: Promise<{ parentSlug: string, innerSlug:string }>;
  searchParams?:any
}) {
  const {parentSlug, innerSlug } = await params;
  const resolvedSearchParams = await searchParams;
  const [{data, error}, seoData] = await Promise.all([
    apiFetch(`cms/${innerSlug}`),
    getPageSEO(innerSlug),
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
    currentPageSlug:`${BASE_URL}${parentSlug}/${innerSlug}`,
    parentMenus: [
      {
        title: "Alumni",
        url: parentSlug,
      },
    ],
  };

  const combinedHtml = Object.values(data?.data?.sections ?? {}).join("");

  const globalSchema = buildGlobalSchema(globalSchemaArgs);

  let eventSchema;

  if(innerSlug == 'hackathons'){
    const eventDetailSchema = {
      staticSegments:[
        {
          name:'Student Corner',
          slug:parentSlug,
        },
        {
          name:pageData.page_title,
          slug:innerSlug,
        },
      ],
      eventName:pageData.page_title,
      visibleEventDescription:'',
    };

    eventSchema = buildEventDetailSchema(eventDetailSchema);
  }

  const isFacilitiesPage = (slug:string)=>{
    return slug == 'academic' || slug == 'campus' || slug == 'other' || slug == 'transport';
  }

  const facilitiesSchemaArgs = {
    facilityType:pageData?.page_title || '',
    facilityUrl:`${BASE_URL}${parentSlug}/${innerSlug}` || '/',
    facilityName:pageData?.page_title || '',
    visibleFacilityDescription:'',

  };

  const facilitiesSchema = buildFacilitySchema(facilitiesSchemaArgs);

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
      {isFacilitiesPage(innerSlug) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(facilitiesSchema) }}
        />
      )}
      <PageHeader pathname={`/${parentSlug}/${innerSlug}`} data={data?.data} slug={innerSlug} />
      {data?.data?.sections?.length == 0 ? <ComingSoon /> : <ReactParserDynamic html={combinedHtml} params={params} searchParams={resolvedSearchParams} />}
    </>
  );
}
