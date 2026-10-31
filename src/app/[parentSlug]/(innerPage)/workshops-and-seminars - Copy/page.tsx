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
import { buildPageGlobalSchema } from "@/src/lib/schema/globalSchema";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ parentSlug: string }>;
}) {
    const { parentSlug } = await params;
    return getPageSEO(`${parentSlug}/workshops-and-seminars`);
}

export default async function GalleryPage({
    params,
    searchParams,
  }: {
    params: Promise<{ parentSlug: string }>;
    searchParams: Promise<{ page?: string }>;
  }){
    const { parentSlug } = await params;
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const slug = "workshops-and-seminars";

    const [{data, error}, seoData] = await Promise.all([
        apiFetch(`workshops-seminars?page=${currentPage}`),
        getPageSEO(`${parentSlug}/workshops-and-seminars`),
    ]);
    

    if(error) notFound()

    const pagePath = `${parentSlug}/workshops-and-seminars`;
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
        <InnerPageLayoutWrapper slug={slug}
      pathname={`/${parentSlug}/workshops-and-seminars`} tabs={null} mainClass="happenings_page" showTabs={true}>
            <MainGallery data={data?.featured}  currentPage="workshops" parentSlug='happenings' slug={slug} />
            <GalleryList data={data?.others} currentPage="workshops" customClass="workshops-and-seminars-list" parentSlug={`happenings`} slug={slug} />
            </InnerPageLayoutWrapper>
        </>
    )
}