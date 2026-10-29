import AwardDetail from "@/src/components/awards/detail";
import PlacementDetail from "@/src/components/placement/detail";
import { apiFetch } from "@/src/lib/api";
import { notFound } from "next/navigation";
import { getPageSEO } from "@/src/lib/seo";
import { buildPageGlobalSchema } from "@/src/lib/schema/globalSchema";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ parentSlug: string; slug: string }>;
}) {
    const { parentSlug, slug } = await params;
    return getPageSEO(`${parentSlug}/internships/${slug}`);
}

export default async function PlacementDetailPage({
    params,
}: {
    params: Promise<{ parentSlug: string; slug: string }>;
}) {
    const { parentSlug, slug } = await params;

    const [{data, error}, seoData] = await Promise.all([
        apiFetch(`intern-placement/${slug}`),
        getPageSEO(`${parentSlug}/internships/${slug}`),
    ]);

    if(error) notFound();

    const pagePath = `${parentSlug}/internships/${slug}`;
    const globalSchema = buildPageGlobalSchema(
        seoData,
        pagePath,
        data?.intern_placement_details?.title || seoData.title,
    );

    return(
        <>
            {seoData.schema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(seoData.schema) }}
                />
            )}
            {globalSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
                />
            )}
            <PlacementDetail data={data?.intern_placement_details} />
        </>
    )
}