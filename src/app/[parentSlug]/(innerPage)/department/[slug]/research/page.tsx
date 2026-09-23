import ReactParser from "@/src/components/common/reactParser/ReactParser";
import PageHeader from "@/src/components/layout/header/PageHeader";
import NoData from "@/src/components/ui/NoData";
import { apiFetch } from "@/src/lib/api";
import { getPageSEO } from "@/src/lib/seo";
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

  if (cmsSections?.length == 0) {
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
      <PageHeader data={data?.data} slug={slug} pathname={`/department/${slug}/research`} />
      {cmsSections?.map((item: any) => {
        return <ReactParser key={item.id} html={item.cms} />;
      })}
    </>
    // <ReactParser html={section1} />
  );
}
