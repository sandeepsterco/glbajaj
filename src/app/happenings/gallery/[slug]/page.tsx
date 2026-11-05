import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import GalleryDetailPage from "@/src/components/gallery/GalleryDetail";
import { apiFetch } from "@/src/lib/api"
import { notFound, permanentRedirect } from "next/navigation";
import { getPageSEO } from "@/src/lib/seo";
import { BASE_URL } from "@/src/config/config";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import GalleryListing from "@/src/components/gallery/GalleryListing";

const isNumeric = (s: string) => /^\d+$/.test(s);

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    if (isNumeric(slug)) return getPageSEO("happenings/gallery");
    return getPageSEO(`happenings/gallery/${slug}`);
}

export default async function GalleryDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const {slug} = await params;

    // pagination: /happenings/gallery/2, /3 ...
    if(isNumeric(slug)){
        const page = Number(slug);
        if (page < 1) notFound();
        if (page === 1) permanentRedirect("/happenings/gallery");
        return <GalleryListing page={page} />;
    }

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