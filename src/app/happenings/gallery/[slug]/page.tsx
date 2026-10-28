import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import GalleryDetailPage from "@/src/components/gallery/GalleryDetail";
import { apiFetch } from "@/src/lib/api"
import { notFound } from "next/navigation";
import { getPageSEO } from "@/src/lib/seo";
import { BASE_URL } from "@/src/config/config";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return getPageSEO(`happenings/gallery/${slug}`);
}

export default async function GalleryDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const {slug} = await params;

    const [{data, error}, seoData] = await Promise.all([
        apiFetch(`gallery/${slug}`),
        getPageSEO(`happenings/gallery/${slug}`),
    ]);

    if(error) notFound();

    const globalSchema = buildGlobalSchema({
        canonicalUrl: seoData.alternates?.canonical || BASE_URL || "",
        pageTitle: seoData.title || "",
        metaDescription: seoData.description || "",
        primaryImageUrl: data?.gallery_details?.image || "",
        languageTag: "en-IN",
        currentPageSlug: `${BASE_URL}happenings/gallery/${slug}`,
        currentPageName: data?.gallery_details?.title || seoData.title || "",
        parentMenus: [
            { title: "Happenings", url: "happenings" },
            { title: "Gallery", url: "gallery" },
        ],
    });

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
            <GalleryDetailPage gallery_data={data.gallery_details} slug={slug} />
        </>
    )
}