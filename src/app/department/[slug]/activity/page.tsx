import NotFound from "@/src/app/not-found";
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
  return await getPageSEO(`department/${slug}/activity`);
}

export default async function DepartmentActivityPage() {
  const slug = await getSlug(-2);
  const [{ data }, seoData] = await Promise.all([
    apiFetch(`department/${slug}/activity`),
    getPageSEO(`department/${slug}/activity`),
  ]);

  const cmsSections = data?.data?.cms;

  if (cmsSections?.length == 0) {
    return <NotFound />;
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

      {Object.keys(cmsSections || {}).map((key: any) => {
        return <ReactParser key={key} html={cmsSections[key]} />;
      })}
    </>

    // <ReactParser html={section1} />
  );
}
