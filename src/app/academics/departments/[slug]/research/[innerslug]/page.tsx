import ReactParser from "@/src/components/common/reactParser/ReactParser";
import NoData from "@/src/components/ui/NoData";
import { apiFetch } from "@/src/lib/api";
import { getPageSEO } from "@/src/lib/seo";
import { buildPageGlobalSchema } from "@/src/lib/schema/globalSchema";
import { notFound } from "next/navigation";

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
  const { slug, innerslug } = await params;

  const [{ data, error }, seoData] = await Promise.all([
    apiFetch(`research/${innerslug}`),
    getPageSEO(`department/${slug}/research/${innerslug}`),
  ]);
  const researchData = data?.research_details?.cms;
  const globalSchema = buildPageGlobalSchema(
    seoData,
    `department/${slug}/research/${innerslug}`,
  );

  if (error) notFound();

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
      {globalSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      )}
      {Object.keys(researchData).map((key) => {
        return <ReactParser key={key} html={researchData[key]} />;
      })}
    </>
  );
}
