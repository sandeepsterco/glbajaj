import { apiFetch } from "@/src/lib/api";
import PageHeader from "@/src/components/layout/header/PageHeader";
import ComingSoon from "@/src/components/common/comingSoon/ComingSoon";

// import '@/src/styles/fancybox.css';
import "@/src/styles/inner.css";
// import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import { getPageSEO } from "@/src/lib/seo";
import { notFound } from "next/navigation";
// import "@/src/styles/parser.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return await getPageSEO(`department/${slug}`);
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ slug: string; parentSlug:string; }>;
}) {
  const { slug, parentSlug } = await params;

  const [{ data, error }, seoData] = await Promise.all([
    apiFetch(`department/${slug}/home`),
    getPageSEO(`department/${slug}`),
  ]);

  if (error) notFound();

  const combinedHtml = data?.data?.cms
    ? Object.values(data?.data?.cms).join("")
    : "";

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
        {data?.data?.tabs && <PageHeader data={data.data} parentSlug={parentSlug} slug={slug} pathname={`${parentSlug}/department/${slug}`} />}

        {data?.data?.cms?.length == 0 ? (
          <ComingSoon />
        ) : (
          <ReactParserDynamic html={combinedHtml} params={{ slug, parentSlug }} data={data?.data} />
        )}
      </div>
    </>
  );
}
