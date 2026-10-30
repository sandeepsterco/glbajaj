import ReactParser from "@/src/components/common/reactParser/ReactParser";
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
    return getPageSEO(`${parentSlug}/why-clubs-societies/${slug}`);
}

export default async function PlacementDetailPage({
    params,
}: {
    params: Promise<{ parentSlug: string; slug: string }>;
}) {
    const {parentSlug, slug} = await params;

    const [{data, error}, seoData] = await Promise.all([
        apiFetch(`clubs-societies/${slug}`),
        getPageSEO(`${parentSlug}/why-clubs-societies/${slug}`),
    ]);

    if(error) notFound();

    const whyClubDetailData = data?.club_or_society_details?.cms ?? {};
    const pagePath = `${parentSlug}/why-clubs-societies/${slug}`;
    const globalSchema = buildPageGlobalSchema(seoData, pagePath);

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
            {Object.keys(whyClubDetailData).map((key: any) => (
                <ReactParser key={key} html={whyClubDetailData[key]} />
            ))}
        </>
    )
}