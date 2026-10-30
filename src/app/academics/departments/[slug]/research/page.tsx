import ReactParser from "@/src/components/common/reactParser/ReactParser";
import PageHeader from "@/src/components/layout/header/PageHeader";
import { apiFetch } from "@/src/lib/api";
import { getPageSEO } from "@/src/lib/seo";
import { buildPageGlobalSchema } from "@/src/lib/schema/globalSchema";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return await getPageSEO(`department/${slug}/research`);
}

export default async function DepartmentResearchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [{ data, error }, seoData] = await Promise.all([
    apiFetch(`department/${slug}/research`),
    getPageSEO(`department/${slug}/research`),
  ]);

  const cmsSections = data?.data?.cms;

  if (error) notFound();

  if (cmsSections?.length == 0) return notFound();

  const combinedHtml = data?.data?.cms
    ? Object.values(data?.data?.cms).join("")
    : "";
  const globalSchema = buildPageGlobalSchema(
    seoData,
    `department/${slug}/research`,
  );

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
      <ReactParser html={combinedHtml} />
    </>
    // <ReactParser html={section1} />
  );
}
