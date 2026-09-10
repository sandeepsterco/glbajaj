import { apiFetch } from "@/src/lib/api";
import NotFound from "@/src/app/not-found";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { getPageSEO } from "@/src/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return await getPageSEO(slug);
}

export default async function DynamicSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [data, seoData] = await Promise.all([
    apiFetch(`cms/${slug}`),
    getPageSEO(slug),
  ]);

  const combinedHtml = Object.values(data?.data?.data?.sections ?? {}).join("");

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
      <ReactParserDynamic html={combinedHtml} />
    </>
  );
}
