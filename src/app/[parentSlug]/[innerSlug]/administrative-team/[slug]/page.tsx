import LeadershipDetail from "@/src/components/leadership/LeadershipDetail";
import { apiFetch } from "@/src/lib/api";
import { getPageSEO } from "@/src/lib/seo";
import { notFound } from "next/navigation";

export default async function FacultyDetailPage({
  params,
}: {
  params: Promise<{ parentSlug: string; slug: string; innerSlug: string }>;
}) {
  const { parentSlug, innerSlug, slug } = await params;

  const [{ data, error }, seoData] = await Promise.all([
    apiFetch(`leadership/${slug}`),
    getPageSEO(`${parentSlug}/${innerSlug}/administrative-team/${slug}`),
  ]);

  if (error) notFound();

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
      <LeadershipDetail
        data={data?.leadership_details}
        slug={slug}
        parentSlug={parentSlug}
      />
    </>
  );
}
