import AwardDetail from "@/src/components/awards/detail";
import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import { apiFetch } from "@/src/lib/api";

export default async function FacultyDetailPage({params}:{params:any}){
    const {slug} = await params;

    const {data, error} = await apiFetch(`award-recognitions/${slug}`);

    if(error){
        return (
            <ApiErrorFallback heading="Couldn't load Conference Symposium Detail Page" message={error} />
        )
    }

    return(
        <AwardDetail data={data?.award_details} />
    )
}