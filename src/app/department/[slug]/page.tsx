import ReactParser from "@/src/components/common/reactParser/ReactParser";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";
import NotFound from "../../not-found";
import PageHeader from "@/src/components/layout/header/PageHeader";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";

// import '@/src/styles/fancybox.css';
import "@/src/styles/inner.css";
// import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { getPageSEO } from "@/src/lib/seo";
// import "@/src/styles/parser.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return await getPageSEO(`department/${slug}`);
}

export default async function DepartmentPage() {
  const slug = await getSlug();

  const [{ data, error }, seoData] = await Promise.all([
    apiFetch(`department/${slug}/home`),
    getPageSEO(`department/${slug}`),
  ]);

  if (error) {
    return <NotFound />;
  }

  const combinedHtml = data?.data?.cms
    ? Object.values(data?.data?.cms).join("")
    : "";

    console.log('seoData',seoData);

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
      <div className="happenings_page">
        {data?.data?.tabs && <PageHeader data={data.data} slug={slug} />}

        {data.data.cms.length == 0 ? (
          <ComingSoon />
        ) : (
          <ReactParserDynamic html={combinedHtml} />
        )}
      </div>
    </>
  );
}
