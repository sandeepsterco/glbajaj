import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { apiFetch } from "@/src/lib/api";
import { getPageSEO } from "@/src/lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return await getPageSEO(`department/${slug}/activity`);
}

export default async function DepartmentActivityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [{ data }, seoData] = await Promise.all([
    apiFetch(`department/${slug}/activity`),
    getPageSEO(`department/${slug}/activity`),
  ]);

  const cmsSections = data?.data?.cms;

  if (cmsSections?.length == 0) notFound();

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

      {Object.keys(cmsSections || {}).map((key: any) => {
        return <ReactParser key={key} html={cmsSections[key]} />;
      })}
    </>

    // <ReactParser html={section1} />
  );
}
