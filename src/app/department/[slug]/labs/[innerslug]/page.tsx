import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";
import { getPageSEO } from "@/src/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; innerslug: string }>;
}) {
  const { slug, innerslug } = await params;
  return await getPageSEO(`department/${slug}/labs/${innerslug}`);
}

export default async function DepartmentLabsDetail({
  params,
}: {
  params: Promise<{ slug: string; innerslug: string }>;
}) {
  const { slug, innerslug } = await params;
  // const slug = await getSlug();

  const [{ data }, seoData] = await Promise.all([
    apiFetch(`ceo-and-activity-level/${innerslug}`),
    getPageSEO(`department/${slug}/labs/${innerslug}`),
  ]);
  const CoEsData = data?.ceoAndAdvanceLevelDetail?.cms ?? {};

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
      {Object.keys(CoEsData).map((key) => {
        return <ReactParser key={key} html={CoEsData[key]} />;
      })}
    </>
  );
}
