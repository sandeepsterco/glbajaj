import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import GalleryList from "@/src/components/gallery/GalleryList";
import MainGallery from "@/src/components/gallery/MainGallery";
import { apiFetch } from "@/src/lib/api"

export default async function GalleryPage(){
    const {data, error} = await apiFetch(`gallery`);

    if(error){
        return (
            <ApiErrorFallback heading="Couldn't load Gallery" message={error} />
        )
    }

    return(
        <>
            <MainGallery data={data?.featured} />
            <GalleryList data={data?.others} />
        </>
    )
}