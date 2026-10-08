import LeadershipDetail from "@/src/components/leadership/LeadershipDetail";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { buildLeadershipSchema } from "@/src/lib/schema/leadershipSchema";
import { getPageSEO } from "@/src/lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return await getPageSEO(`about-us/leadership-messages/${slug}`);
}

export default async function LeadershipDetailPage({
  params,
}: {
  params: Promise<{ parentSlug: string; slug: string }>;
}) {
  const { parentSlug, slug } = await params;

  const [{ data, error }, seoData] = await Promise.all([
    apiFetch(`leadership/${slug}`),
    getPageSEO(`about-us/leadership-messages/${slug}`),
  ]);

  if (error) notFound();

  const pageData = data?.leadership_details?.data;

  const leadershipSchemaArgs = {
    leaderUrl: `${BASE_URL}${parentSlug}/leadership-messages/${slug}` || '',
    leaderName: pageData?.name || '',
    designation: pageData?.designation || '',
    profileSummary:seoData?.description || '',
    visibleBioSummary:'',
    profileImageUrl: pageData?.image || '',
    staticSegments: [
      { name: "About Us", slug: parentSlug },
      { name: "Leadership Messages", slug: "leadership-messages" },
    ],
    leaderSlug: slug,
  };

  const leadershipSchema = buildLeadershipSchema(leadershipSchemaArgs);

  return (
    <>
      {leadershipSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(leadershipSchema) }}
        />
      )}
      <LeadershipDetail
        data={data?.leadership_details}
        slug={"leadership-messages"}
        parentSlug={parentSlug}
      />
    </>
  );
}
