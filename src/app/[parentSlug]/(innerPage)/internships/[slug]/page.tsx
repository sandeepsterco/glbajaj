import AwardDetail from "@/src/components/awards/detail";
import PlacementDetail from "@/src/components/placement/detail";
import { apiFetch } from "@/src/lib/api";
import { notFound } from "next/navigation";

export default async function PlacementDetailPage({params}:{params:any}){
    const {slug} = await params;

    const {data, error} = await apiFetch(`intern-placement/${slug}`);

    if(error) notFound();

    return(
        <PlacementDetail data={data?.intern_placement_details} />
    )
}