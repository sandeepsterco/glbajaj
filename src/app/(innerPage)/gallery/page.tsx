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

export default async function GalleryPage(){
    const {data, error} = await apiFetch(`gallery`);
    const slug = await getSlug();

    if(error){
        return (
            <ApiErrorFallback heading="Couldn't load Gallery" message={error} />
        )
    }

    return(
        <>
        <InnerPageLayoutWrapper slug={slug} tabs={null} mainClass="happenings_page" showTabs={true}>
            <MainGallery data={data?.featured} />
            <GalleryList data={data?.others} />
            </InnerPageLayoutWrapper>
        </>
    )
}