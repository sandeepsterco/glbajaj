import { WorkshopDetail } from "@/src/components/workshop/WorkshopDetail";
import { apiFetch } from "@/src/lib/api";
import { notFound } from "next/navigation";

export default async function WorkshopDetailPage({params}:{params:any}){
    const {slug} = await params;
    const { data, error } = await apiFetch(`workshops/${slug}`);

    if (error) notFound();

    const newsData = data?.workshops_details;

    return(
        <>
            <WorkshopDetail data={newsData} />
        </>
    )
}