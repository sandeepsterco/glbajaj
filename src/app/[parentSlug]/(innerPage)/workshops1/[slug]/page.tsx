import { WorkshopDetail } from "@/src/components/workshop/WorkshopDetail";
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
    return getPageSEO(`${parentSlug}/workshops/${slug}`);
}

export default async function WorkshopDetailPage({
    params,
}: {
    params: Promise<{ parentSlug: string; slug: string }>;
}) {
    const {parentSlug, slug} = await params;
    const [{ data, error }, seoData] = await Promise.all([
        apiFetch(`workshops/${slug}`),
        getPageSEO(`${parentSlug}/workshops/${slug}`),
    ]);

    if (error) notFound();

    const newsData = data?.workshops_details;
    const pagePath = `${parentSlug}/workshops/${slug}`;
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
            <WorkshopDetail data={newsData} />
        </>
    )
}