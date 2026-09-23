import GalleryDetailPage from "@/src/components/gallery/GalleryDetail";
import { apiFetch } from "@/src/lib/api"
import { notFound } from "next/navigation";

export default async function GalleryDetail({params}:{params:any}){
    const {slug} = await params;

    const {data, error} = await apiFetch(`workshops-seminars/${slug}`);

    if(error) notFound();

    return(
        <GalleryDetailPage gallery_data={data.workshop_details} slug={slug} />
    )
}