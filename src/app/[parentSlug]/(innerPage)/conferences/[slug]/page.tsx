import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import { ConferenceDetail } from "@/src/components/conference-symposium/ConferenceDetail";
import { apiFetch } from "@/src/lib/api";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({params}:{params:any}){
    const {slug} = await params;
    const { data, error } = await apiFetch(`research-conferences/${slug}`);

    if (error) notFound();

    const conferenceData = data?.research_conference_details;

    return(
        <>
            <ConferenceDetail data={conferenceData} />
        </>
    )
}