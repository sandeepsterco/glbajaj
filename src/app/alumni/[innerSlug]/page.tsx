import { apiFetch } from "@/src/lib/api";
import NotFound from "@/src/app/not-found";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { getPageSEO } from "@/src/lib/seo";
import PageHeader from "@/src/components/layout/header/PageHeader";
import { notFound } from "next/navigation";

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

  const combinedHtml = Object.values(data?.data?.sections ?? {}).join("");

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
      <PageHeader pathname={`/${parentSlug}/${innerSlug}`} data={data?.data} slug={innerSlug} />
      {data?.data?.sections?.length == 0 ? <ComingSoon /> : <ReactParserDynamic html={combinedHtml} params={params} searchParams={resolvedSearchParams} />}
    </>
  );
}
