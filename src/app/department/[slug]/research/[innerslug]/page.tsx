import NotFound from "@/src/app/not-found";
import ReactParser from "@/src/components/common/reactParser/ReactParser";
import NoData from "@/src/components/ui/NoData";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";
import { getPageSEO } from "@/src/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; innerslug: string }>;
}) {
  const { slug, innerslug } = await params;
  return await getPageSEO(`department/${slug}/research/${innerslug}`);
}

export default async function DepartmentLabsDetail({
  params,
}: {
  params: Promise<{ slug: string; innerslug: string }>;
}) {
  // const slug = await getSlug();
  const { slug, innerslug } = await params;

  const [{ data, error }, seoData] = await Promise.all([
    apiFetch(`research/${innerslug}`),
    getPageSEO(`department/${slug}/research/${innerslug}`),
  ]);
  const researchData = data?.research_details?.cms;

  if (error) {
    return <NotFound />;
  }

  if (Object.keys(researchData).length == 0) {
    return <NoData />;
  }

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
      {Object.keys(researchData).map((key) => {
        return <ReactParser key={key} html={researchData[key]} />;
      })}
    </>
  );
}
