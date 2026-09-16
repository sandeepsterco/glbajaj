import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import GalleryDetailPage from "@/src/components/gallery/GalleryDetail";
import { apiFetch } from "@/src/lib/api"

export default async function GalleryDetail({params}:{params:any}){
    const {slug} = await params;

    const {data, error} = await apiFetch(`workshops-seminars/${slug}`);

    if(error){
        return (
            <ApiErrorFallback heading="Couldn't load Workshops and Seminars Detail Page" message={error} />
        )
    }

    return(
        <GalleryDetailPage gallery_data={data.workshop_details} slug={slug} />
    )
}