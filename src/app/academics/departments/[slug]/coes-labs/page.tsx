import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { apiFetch } from "@/src/lib/api";
import { getPageSEO } from "@/src/lib/seo";
import { buildPageGlobalSchema } from "@/src/lib/schema/globalSchema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return await getPageSEO(`academics/departments/${slug}/coes-labs`);
}

export default async function DepartmentAboutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [{ data }, seoData] = await Promise.all([
    apiFetch(`department/${slug}/coes-labs`),
    getPageSEO(`academics/departments/${slug}/coes-labs`),
  ]);

  const cmsSections = data?.data?.cms;
  const globalSchema = buildPageGlobalSchema(seoData, `academics/departments/${slug}/coes-labs`);

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
      {Object.keys(cmsSections || {}).map((key: any) => {
        return <ReactParser key={key} html={cmsSections[key]} pageName={seoData.title} />;
      })}
    </>

    // <ReactParser html={section1} />
  );
}
