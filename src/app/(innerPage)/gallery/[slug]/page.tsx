import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import GalleryDetailPage from "@/src/components/gallery/GalleryDetail";
import { apiFetch } from "@/src/lib/api"

export default async function GalleryDetail({params}:{params:any}){
    const {slug} = await params;

    const {data, error} = await apiFetch(`gallery/${slug}`);

    if(error){
        return (
            <ApiErrorFallback heading="Couldn't load Gallery Detail Page" message={error} />
        )
    }

    return(
        <GalleryDetailPage data={data.gallery_details} />
    )
}