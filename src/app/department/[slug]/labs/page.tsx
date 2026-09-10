import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";
import { getPageSEO } from "@/src/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return await getPageSEO(`department/${slug}/labs`);
}

export default async function DepartmentAboutPage() {
  const slug = await getSlug(-2);
  const [{ data }, seoData] = await Promise.all([
    apiFetch(`department/${slug}/labs`),
    getPageSEO(`department/${slug}/labs`),
  ]);

  const cmsSections = data?.data?.cms;

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
