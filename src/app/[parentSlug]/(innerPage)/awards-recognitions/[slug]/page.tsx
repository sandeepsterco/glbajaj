import AwardDetail from "@/src/components/awards/detail";
import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import { apiFetch } from "@/src/lib/api";
import { notFound } from "next/navigation";

export default async function FacultyDetailPage({params}:{params:any}){
    const {slug} = await params;

    const {data, error} = await apiFetch(`award-recognitions/${slug}`);

    if(error) notFound();

    return(
        <AwardDetail data={data?.award_details} />
    )
}