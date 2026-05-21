import AwardDetail from "@/src/components/awards/detail";
import ApiErrorFallback from "@/src/components/common/ApiErrorFallback";
import PlacementDetail from "@/src/components/placement/detail";
import { apiFetch } from "@/src/lib/api";

export default async function PlacementDetailPage({params}:{params:any}){
    const {slug} = await params;

    const {data, error} = await apiFetch(`alumni-placement/${slug}`);

    if(error){
        return (
            <ApiErrorFallback heading="Couldn't load Placement Detail Page" message={error} />
        )
    }

    return(
        <PlacementDetail data={data?.alumni_placement_details} />
    )
}