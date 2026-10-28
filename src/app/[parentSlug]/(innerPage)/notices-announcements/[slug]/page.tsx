import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import ReactParserDynamic from "@/src/components/common/reactParser/ReactParserDynamic";
import NoData from "@/src/components/ui/NoData";
import { apiFetch } from "@/src/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPageSEO } from "@/src/lib/seo";
import { buildPageGlobalSchema } from "@/src/lib/schema/globalSchema";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ parentSlug: string; slug: string }>;
}) {
    const { parentSlug, slug } = await params;
    return getPageSEO(`${parentSlug}/notices-announcements/${slug}`);
}

export default async function NoticeAnnouncementPage({
    params,
}: {
    params: Promise<{ parentSlug: string; slug: string }>;
}) {
    const { parentSlug, slug } = await params;

    const [{ data, error }, seoData] = await Promise.all([
        apiFetch(`notice-and-announcements/${slug}`),
        getPageSEO(`${parentSlug}/notices-announcements/${slug}`),
    ]);

    if (error) notFound();

    if (Object.keys(data?.notice_and_announcement_details?.cms).length == 0) {
        return (
            <NoData />
        )
    }

    const combinedHtml = Object.values(data?.notice_and_announcement_details?.cms ?? {}).join("");
    const pagePath = `${parentSlug}/notices-announcements/${slug}`;
    const globalSchema = buildPageGlobalSchema(
        seoData,
        pagePath,
        data?.notice_and_announcement_details?.page_title || seoData.title,
    );

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
            <ReactParserDynamic html={combinedHtml} pageName={seoData.title} />
        </>
    );
}