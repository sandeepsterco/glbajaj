import ReactParser from "@/src/components/common/reactParser/ReactParser";
import ProgramTabs from "@/src/components/departments/programs/ProgramTabs";
import { apiFetch } from "@/src/lib/api";
import { getSlug } from "@/src/lib/getSlug";
import { getPageSEO } from "@/src/lib/seo";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return await getPageSEO(`department/${slug}/programs`);
}

export default async function DepartmentAboutPage({params}:{params:Promise<{ slug: string }>}) {
    const { slug } = await params;
//   const slug = await getSlug(-2);
  const [{ data }, seoData] = await Promise.all([
    apiFetch(`department/${slug}/programs`),
    getPageSEO(`department/${slug}/programs`),
  ]);
  const pageData = data?.data?.modular?.programs;

  const undergraduate = pageData.filter((p: any) => p.type == "under-graduate");
  const postgraduate = pageData.filter((p: any) => p.type == "post-graduate");

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
      <ProgramTabs undergraduate={undergraduate} postgraduate={postgraduate} />
    </>
  );

}
