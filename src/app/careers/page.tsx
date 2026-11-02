import { apiFetch } from "@/src/lib/api";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { getPageSEO } from "@/src/lib/seo";
import PageHeader from "@/src/components/layout/header/PageHeader";
import { notFound } from "next/navigation";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { BASE_URL } from "@/src/config/config";

export async function generateMetadata() {
  return await getPageSEO(`careers`);
}

export default async function CareerPage({
  searchParams
}: {
  searchParams?:any
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  
  const [{data, error}, seoData, {data:jobsData}] = await Promise.all([
    apiFetch(`cms/careers`),
    getPageSEO(`careers`),
    apiFetch(`job-openings?page=${page}`),
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
    currentPageSlug:`${BASE_URL}careers`,
    parentMenus: [
      {
        title: "Careers",
        url: "careers",
      },
    ],
  };

  const combinedHtml = Object.values(data?.data?.sections ?? {}).join("");

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
      
      <PageHeader pathname="/careers" data={data?.data} slug="careers" />
      {data?.data?.sections?.length == 0 ? <ComingSoon /> : <ReactParserDynamic html={combinedHtml} params={'careers'} searchParams={resolvedSearchParams}  pageName={seoData.title} data={jobsData} />}
    </>
  );
}
