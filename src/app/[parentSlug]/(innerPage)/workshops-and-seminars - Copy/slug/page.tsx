import GalleryDetailPage from "@/src/components/gallery/GalleryDetail";
import { apiFetch } from "@/src/lib/api"
import { notFound } from "next/navigation";
import { getPageSEO } from "@/src/lib/seo";
import { buildPageGlobalSchema } from "@/src/lib/schema/globalSchema";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ parentSlug: string; slug: string }>;
}) {
    const { parentSlug, slug } = await params;
    return getPageSEO(`${parentSlug}/workshops-and-seminars/${slug}`);
}

export default async function GalleryDetail({
    params,
}: {
    params: Promise<{ parentSlug: string; slug: string }>;
}) {
    const {parentSlug, slug} = await params;

    const [{data, error}, seoData] = await Promise.all([
        apiFetch(`workshops-seminars/${slug}`),
        getPageSEO(`${parentSlug}/workshops-and-seminars/${slug}`),
    ]);

    if(error || data.workshop_details?.length  === 0) notFound();

    const pagePath = `${parentSlug}/workshops-and-seminars/${slug}`;
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
            <GalleryDetailPage gallery_data={data.workshop_details} slug={slug} />
        </>
    )
}