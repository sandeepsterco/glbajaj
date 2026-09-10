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
  return await getPageSEO(`department/${slug}/activity/${innerslug}`);
}

export default async function DepartmentActivityDetail({
  params,
}: {
  params: Promise<{ slug: string; innerslug: string }>;
}) {
  const { slug, innerslug } = await params;

  const [{ data }, seoData] = await Promise.all([
    apiFetch(`department-activities/${innerslug}`),
    getPageSEO(`department/${slug}/activity/${innerslug}`),
  ]);
  const CoEsData = data?.department_activities_details?.cms;

  if (CoEsData == "") {
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
      {Object.keys(CoEsData).map((key) => {
        return <ReactParser key={key} html={CoEsData[key]} />;
      })}
    </>
  );
}
