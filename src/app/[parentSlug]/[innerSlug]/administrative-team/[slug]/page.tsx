import LeadershipDetail from "@/src/components/leadership/LeadershipDetail";
import { apiFetch } from "@/src/lib/api";
import { getPageSEO } from "@/src/lib/seo";
import { buildPageGlobalSchema } from "@/src/lib/schema/globalSchema";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ parentSlug: string; innerSlug: string; slug: string }>;
}) {
  const { parentSlug, innerSlug, slug } = await params;
  return getPageSEO(`${parentSlug}/${innerSlug}/administrative-team/${slug}`);
}

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
  const globalSchema = buildPageGlobalSchema(
    seoData,
    `${parentSlug}/${innerSlug}/administrative-team/${slug}`,
    data?.leadership_details?.data?.name || seoData.title,
  );

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
      <LeadershipDetail
        data={data?.leadership_details}
        slug={slug}
        parentSlug={parentSlug}
      />
    </>
  );
}
