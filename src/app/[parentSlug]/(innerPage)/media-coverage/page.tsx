import PaginationWrapper from "@/src/components/common/pagination/PaginationWrapper";
import { apiFetch } from "@/src/lib/api";
import MediaGrid from "./Mediagrid";
import { notFound } from "next/navigation";
import { getPageSEO } from "@/src/lib/seo";
import { buildPageGlobalSchema } from "@/src/lib/schema/globalSchema";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ parentSlug: string }>;
}) {
    const { parentSlug } = await params;
    return getPageSEO(`${parentSlug}/media-coverage`);
}

export default async function MediaGridPage({
    params,
    searchParams,
}: {
    params: Promise<{ parentSlug: string }>;
    searchParams: Promise<{ page?: string }>;
}) {
    const { parentSlug } = await params;
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const [{ data, error }, seoData] = await Promise.all([
        apiFetch(`media-coverage?page=${currentPage}`),
        getPageSEO(`${parentSlug}/media-coverage`),
    ]);

    if (error) notFound();

    const pagePath = `${parentSlug}/media-coverage`;
    const globalSchema = buildPageGlobalSchema(seoData, pagePath);

    const updatedData = data?.media_coverage?.data;

    return (
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
            <section className="media_coverage">
                <div className="container25">
                    {updatedData?.length > 0 && <MediaGrid items={updatedData} />}

                    {updatedData?.length > 0 && (
                        <PaginationWrapper
                            currentPage={data?.media_coverage?.current_page || 1}
                            totalPages={data?.media_coverage?.last_page || 1}
                        />
                    )}
                </div>
            </section>
        </>
    )
}