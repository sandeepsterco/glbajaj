import { apiFetch } from "@/src/lib/api";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { getPageSEO } from "@/src/lib/seo";
import PageHeader from "@/src/components/layout/header/PageHeader";
import { notFound } from "next/navigation";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; innerSlug: string; innerChildSlug: string }>;
}) {
  const { innerChildSlug } = await params;
  return await getPageSEO(innerChildSlug);
}

export default async function DynamicSlugPage({
  params,
  searchParams,
}: {
  params: Promise<{
    parentSlug: string;
    innerSlug: string;
    innerChildSlug: string;
  }>;
  searchParams?: any;
}) {
  const { parentSlug, innerSlug, innerChildSlug } = await params;
  const resolvedSearchParams = await searchParams;
  const [{ data, error }, seoData] = await Promise.all([
    apiFetch(`cms/${innerChildSlug}`),
    getPageSEO(innerChildSlug),
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
      <PageHeader
        pathname={`/${parentSlug}/${innerSlug}/${innerChildSlug}`}
        data={data?.data}
        slug={innerChildSlug}
      />
      {data.data.sections.length == 0 ? (
        <ComingSoon />
      ) : (
        <ReactParserDynamic
          html={combinedHtml}
          params={params}
          searchParams={resolvedSearchParams}
        />
      )}
    </>
  );
}
