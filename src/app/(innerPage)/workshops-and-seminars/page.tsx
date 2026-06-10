import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import GalleryList from "@/src/components/gallery/GalleryList";
import MainGallery from "@/src/components/gallery/MainGallery";
import { apiFetch } from "@/src/lib/api"
import { getSlug } from "@/src/lib/getSlug";
import InnerPageLayoutWrapper from "../../layout/InnerPageLayoutWrapper";
import "@/src/styles/inner.css";
import "@/src/styles/responsive1.css";
import "@/src/styles/responsive.css";
import "@/src/styles/program.css";
import "@/src/styles/parser.css";

export default async function GalleryPage({ searchParams }: { searchParams: Promise<{ page?: string }> }){
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const {data, error} = await apiFetch(`workshops-seminars?page=${currentPage}`);
    const slug = await getSlug();

    if(error){
        return (
            <ApiErrorFallback heading="Couldn't load Workshops and Seminars" message={error} />
        )
    }

    return(
        <>
        <InnerPageLayoutWrapper slug={slug} tabs={null} mainClass="happenings_page" showTabs={true}>
            <MainGallery data={data?.featured}  currentPage="workshops-and-seminars" />
            <GalleryList data={data?.others} currentPage="workshops-and-seminars" customClass="workshops-and-seminars-list" />
            </InnerPageLayoutWrapper>
        </>
    )
}