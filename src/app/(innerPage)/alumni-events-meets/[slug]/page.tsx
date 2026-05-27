import AlumniEventsDetail from "@/src/components/alumni-events/detail";
import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import { apiFetch } from "@/src/lib/api";

export default async function AlumniEventsDetailPage({params}:{params:any}){
    const {slug} = await params;

    const {data, error} = await apiFetch(`alumni-events/${slug}`);

    if(error){
        return (
            <ApiErrorFallback heading="Couldn't load Alumni Events Detail Page" message={error} />
        )
    }

    return(
        <AlumniEventsDetail data={data?.alumni_event_details} />
    )
}