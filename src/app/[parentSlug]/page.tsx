import { apiFetch } from "@/src/lib/api";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { getPageSEO } from "@/src/lib/seo";
import { notFound } from "next/navigation";
import PageHeader from "@/src/components/layout/header/PageHeader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ parentSlug: string }>;
}) {
  const { parentSlug } = await params;
  return await getPageSEO(parentSlug);
}

export default async function DynamicSlugPage({
  params,
}: {
  params: Promise<{ parentSlug: string }>;
}) {
  const { parentSlug } = await params;
  const [{data, error}, seoData] = await Promise.all([
    apiFetch(`cms/${parentSlug}`),
    getPageSEO(parentSlug),
  ]);

  if (error || !data?.status || !data?.data) {
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
      <PageHeader pathname={`/${parentSlug}`} data={data?.data} slug={parentSlug} />
      <ReactParserDynamic html={combinedHtml} />
    </>
  );
}
