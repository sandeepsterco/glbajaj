import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import { ConferenceDetail } from "@/src/components/conference-symposium/ConferenceDetail";
import { apiFetch } from "@/src/lib/api";

export default async function NewsDetailPage({params}:{params:any}){
    const {slug} = await params;
    const { data, error } = await apiFetch(`research-conferences/${slug}`);

    if (error) {
        return (
            <ApiErrorFallback heading="Couldn't load Research Conferences" message={error} />
        )
    }

    const conferenceData = data?.research_conference_details;

    return(
        <>
            <ConferenceDetail data={conferenceData} />
        </>
    )
}