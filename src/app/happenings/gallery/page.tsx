import GalleryList from "@/src/components/gallery/GalleryList";
import MainGallery from "@/src/components/gallery/MainGallery";
import { apiFetch } from "@/src/lib/api"
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";
import { notFound } from "next/navigation";
import { getPageSEO } from "@/src/lib/seo";
import { BASE_URL } from "@/src/config/config";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";

export async function generateMetadata() {
    return getPageSEO("happenings/gallery");
}

export default async function GalleryPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const [{ data, error }, seoData] = await Promise.all([
        apiFetch(`gallery?page=${currentPage}`),
        getPageSEO("happenings/gallery"),
    ]);

    if (error) notFound();

    const globalSchema = buildGlobalSchema({
        canonicalUrl: seoData.alternates?.canonical || BASE_URL || "",
        pageTitle: seoData.title || "",
        metaDescription: seoData.description || "",
        primaryImageUrl: "",
        languageTag: "en-IN",
        currentPageSlug: `${BASE_URL}happenings/gallery`,
        currentPageName: seoData.title || "",
        parentMenus: [{ title: "Happenings", url: "happenings" }],
    });

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
        <InnerPageLayoutWrapper
            slug={'gallery'}
            pathname={`/happenings/gallery`}
            tabs={null}
            mainClass="happenings_page"
            showTabs={true}
        >
            <MainGallery data={data?.featured} parentSlug={'happenings'} />
            <GalleryList data={data?.others} parentSlug={'happenings'} />
        </InnerPageLayoutWrapper>
        </>
    );
}
