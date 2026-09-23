import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import GalleryList from "@/src/components/gallery/GalleryList";
import MainGallery from "@/src/components/gallery/MainGallery";
import { apiFetch } from "@/src/lib/api"
import InnerPageLayoutWrapper from "@/src/app/layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";

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

    const {data, error} = await apiFetch(`workshops-seminars?page=${currentPage}`);
    

    if(error){
        return (
            <ApiErrorFallback heading="Couldn't load Workshops and Seminars" message={error} />
        )
    }

    return(
        <>
        <InnerPageLayoutWrapper slug={slug}
      pathname={`/${parentSlug}/workshops-and-seminars`} tabs={null} mainClass="happenings_page" showTabs={true}>
            <MainGallery data={data?.featured}  currentPage="workshops-and-seminars" parentSlug={parentSlug} slug={slug} />
            <GalleryList data={data?.others} currentPage="workshops-and-seminars" customClass="workshops-and-seminars-list" parentSlug={parentSlug} slug={slug} />
            </InnerPageLayoutWrapper>
        </>
    )
}