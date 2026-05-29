import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import { WorkshopDetail } from "@/src/components/workshop/WorkshopDetail";
import { apiFetch } from "@/src/lib/api";

export default async function WorkshopDetailPage({params}:{params:any}){
    const {slug} = await params;
    const { data, error } = await apiFetch(`workshops/${slug}`);

    if (error) {
        return (
            <ApiErrorFallback heading="Couldn't load Workshop Detail" message={error} />
        )
    }

    const newsData = data?.workshops_details;

    return(
        <>
            <WorkshopDetail data={newsData} />
        </>
    )
}