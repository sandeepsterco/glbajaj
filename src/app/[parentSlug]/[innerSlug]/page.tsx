import { apiFetch } from "@/src/lib/api";
import NotFound from "@/src/app/not-found";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { getPageSEO } from "@/src/lib/seo";
import PageHeader from "@/src/components/layout/header/PageHeader";
import { notFound } from "next/navigation";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { BASE_URL } from "@/src/config/config";

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
    primaryImageUrl:"https://project-demo.in/glbitm/assets/img/modules/1/module_1789649006_6aabe06e9b5be.webp",
    datePublishedIso:pageData?.created_at || '',
    dateModifiedIso:pageData?.updated_at || '',
    languageTag:'en-IN',
    currentPageName:pageData?.page_title || ''
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
      <PageHeader pathname={`/${parentSlug}/${innerSlug}`} data={data?.data} slug={innerSlug} />
      {data?.data?.sections?.length == 0 ? <ComingSoon /> : <ReactParserDynamic html={combinedHtml} params={params} searchParams={resolvedSearchParams} />}
    </>
  );
}
