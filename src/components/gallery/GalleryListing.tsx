import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import { BASE_URL } from "@/src/config/config";
import { apiFetch } from "@/src/lib/api";
import { buildGlobalSchema } from "@/src/lib/schema/globalSchema";
import { getPageSEO } from "@/src/lib/seo";
import { notFound } from "next/navigation";
import MainGallery from "./MainGallery";
import GalleryList from "./GalleryList";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";

export default async function GalleryListing({page}:{page:number}){
    const [{ data, error }, seoData] = await Promise.all([
        apiFetch(`gallery?page=${page}`),
        getPageSEO("happenings/gallery"),
    ]);

    if (error) notFound();

    if (page > 1 && !data?.others?.data?.length) notFound();

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

            <InnerPageLayoutWrapper
                slug={'gallery'}
                pathname={`/happenings/gallery`}
                tabs={null}
                mainClass="happenings_page"
                showTabs={true}
            >
                <MainGallery data={data?.featured} parentSlug={'happenings'} />
                <GalleryList data={data?.others} parentSlug={'happenings'} paginationBasePath="/happenings/gallery" />
            </InnerPageLayoutWrapper>
        </>
    )
}