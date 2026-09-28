import AlumniEventsDetail from "@/src/components/alumni-events/detail";
import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import { apiFetch } from "@/src/lib/api";
import { notFound } from "next/navigation";

export default async function AlumniEventsDetailPage({params}:{params:any}){
    const {slug} = await params;

    const {data, error} = await apiFetch(`alumni-events/${slug}`);

    if(error) notFound();

    return(
        <AlumniEventsDetail data={data?.alumni_event_details} />
    )
}