import { apiFetch } from "@/src/lib/api";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { getPageSEO } from "@/src/lib/seo";
import { notFound } from "next/navigation";
import PageHeader from "@/src/components/layout/header/PageHeader";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import { BASE_URL } from "@/src/config/config";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";

export async function generateMetadata() {
  return await   getPageSEO('research-innovation/overview')
}

export default async function AdmissionOverviewPage() {
  const [{data, error}, seoData, {data:infoRes}] = await Promise.all([
    apiFetch(`cms/research-innovation-overview`),
    getPageSEO('research-innovation/overview'),
    apiFetch("info"),
  ]);

  if (error || !data?.status || !data?.data) {
    notFound();
  }

  const pageData = data?.data;

  const combinedHtml = Object.values(data?.data?.sections ?? {}).join("");


  const globalSchemaArgs = {
    canonicalUrl:seoData?.alternates?.canonical || BASE_URL || '',
    pageTitle:seoData?.title || '',
    metaDescription:seoData?.description || '',
    primaryImageUrl:"",
    datePublishedIso:pageData?.created_at || '',
    dateModifiedIso:pageData?.updated_at || '',
    languageTag:'en-IN',
    currentPageSlug:`${BASE_URL}research-innovation/overview`,
    currentPageName:pageData?.page_title || '',
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
      
      <PageHeader pathname={`/research-innovation/overview`} data={data?.data} slug={'research-innovation-overview'} />
      {data?.data?.sections?.length == 0 ? <ComingSoon /> : <ReactParserDynamic html={combinedHtml} />}
      
    </>
  );
}
